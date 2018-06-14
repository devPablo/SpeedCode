// Return Character: /(\r\n|\n|\r)/gm

let customCode = `import * as fs from 'fs';
import {DefaultTransporter} from 'google-auth-library';
import * as pify from 'pify';
import * as url from 'url';
import * as util from 'util';

import {GoogleApis} from '..';
import {GeneratedAPIs} from '../apis/index';

import {GlobalOptions, ServiceOptions} from './api';
import {createAPIRequest} from './apirequest';
import {Endpoint} from './endpoint';
import {Schema, Schemas} from './schema';

export type EndpointCreator = (options: GlobalOptions, google: GoogleApis) =>
    Endpoint;

const fsp = pify(fs);

export interface DiscoveryOptions {
  includePrivate?: boolean;
  debug?: boolean;
}

export class Discovery {
  private transporter = new DefaultTransporter();
  private options: DiscoveryOptions;

  /**
   * Discovery for discovering API endpoints
   *
   * @param options Options for discovery
   */
  constructor(options: DiscoveryOptions) {
    this.options = options || {};
  }

  /**
   * Generate and Endpoint from an endpoint schema object.
   *
   * @param schema The schema from which to generate the Endpoint.
   * @return A function that creates an endpoint.
   */
  private makeEndpoint(schema: Schema) {
    return (options: {}) => {
      const ep = new Endpoint(options);
      ep.applySchema(ep, schema, schema, ep);
      return ep;
    };
  }

  /**
   * Log output of generator. Works just like console.log
   */
  private log(...args: string[]) {
    if (this.options && this.options.debug) {
      console.log.apply(this, arguments);
    }
  }

  /**
   * Generate all APIs and return as in-memory object.
   * @param discoveryUrl
   */
  async discoverAllAPIs(discoveryUrl: string): Promise<GeneratedAPIs> {
    const headers = this.options.includePrivate ? {} : {'X-User-Ip': '0.0.0.0'};
    const res =
        await this.transporter.request<Schemas>({url: discoveryUrl, headers});
    const items = res.data.items;
    const apis = await Promise.all(items.map(async api => {
      const endpointCreator = await this.discoverAPI(api.discoveryRestUrl);
      return {api, endpointCreator};
    }));

    const versionIndex:
        {[index: string]: {[index: string]: EndpointCreator}} = {};
    // tslint:disable-next-line no-any
    const apisIndex: {[index: string]: any} = {};
    for (const set of apis) {
      if (!apisIndex[set.api.name]) {
        versionIndex[set.api.name] = {};
        apisIndex[set.api.name] = (options: ServiceOptions|string) => {
          const type = typeof options;
          let version: string;
          if (type === 'string') {
            version = options as string;
            options = {};
          } else if (type === 'object') {
            version = (options as ServiceOptions).version!;
            delete (options as ServiceOptions).version;
          } else {
            throw new Error('Argument error: Accepts only string or object');
          }
          try {
            const endpointCreator = versionIndex[set.api.name][version];
            const ep =
                // tslint:disable-next-line: no-any
                set.endpointCreator(options as GlobalOptions, this as any);
            return Object.freeze(ep);  // create new & freeze
          } catch (e) {
            throw new Error(util.format(
                'Unable to load endpoint %s("%s"): %s', set.api.name, version,
                e.message));
          }
        };
      }
      versionIndex[set.api.name][set.api.version] = set.endpointCreator;
    }
    return apisIndex as GeneratedAPIs;
  }`;


