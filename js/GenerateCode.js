// Return Character: /(\r\n|\n|\r)/gm

function generateCode(code) {
    code = fixCode(code);
    let code_array = code.split('');
    let preCode = document.querySelector('#code');
    preCode.innerHTML = '';
    

    let temp = 0;
    
    for (let i = 0; i < code_array.length; i++) {
        
        if (i > 0) {
            if (code_array[i-1].match(/(\r\n|\n|\r)/gm) && code_array[i] == '	' && code_array[i+1] != ' ') {
                code_array.splice(i, 1, ' ');
                code_array.splice(i+1, 0, ' ');
            }

            if (code_array[i-1].match(/(\r\n|\n|\r)/gm) && code_array[i] == ' ' && code_array[i+1] != ' ') {
                code_array.splice(i+1, 0, ' ');
            }
        }

        if (code_array[i] == '	') {
            code_array.splice(i+1, 0, ' ');
            code_array.splice(i+2, 0, ' ');
            code_array.splice(i, 1);
        }

        if (i > 2) {
            if (code_array[i] == ' ' && code_array[i+1] == ' ' && code_array[i+2] == '}' && (code_array[i+5] == '}' || code_array[i+6] == '}')) {
                code_array.splice(i, 1, '  ');
                code_array.splice(i+1, 1, '  ');
            }
        }
















        // Fix lines without text
        temp = 0;
        if (code_array[i].match(/(\r\n|\n|\r)/gm)) {

            for (let j = 0; j < 20; j++) {
                if (code_array[i+1] == ' ') {
                    if (code_array[i+2].match(/(\r\n|\n|\r)/gm)) {
                        code_array.splice(i+1, 1);
                    }                  
                } else {
                    break;
                }
            }
            

        }

        let spanChar = document.createElement('span');
        spanChar.innerHTML = code_array[i];
        if (i == 0) {
            spanChar.classList.add('char-active');
        } else {
            spanChar.classList.add('initial');
        }      
        preCode.appendChild(spanChar);
    }
   
    
    
    console.log(code_array);
    return code_array;
}

