// Return Character: /(\r\n|\n|\r)/gm

let code = generateCode(customCode);
let charIndex = 0;
let charUntypableSpaces = 0;
let codeFinished = false;

let preCode = document.querySelector('body');
preCode.addEventListener('keypress', charType);

let inputCode = document.querySelector('#invisibleInput');
inputCode.addEventListener('keydown', charDelete);

setInterval( function() {
     inputCode.focus();  
    }, 10);


let breaks = 0;
for (let i = 0; i < code.length; i++) {
    if (code[i].match(/(\r\n|\n|\r)/gm)) {
        breaks++;
    }
}
for (let i = 1; i <= breaks+1; i++) {
    let spanNumber = document.createElement('span');
    spanNumber.innerHTML = i;
    spanNumber.classList.add('lineNumber');
    document.querySelector('#numberPane').appendChild(spanNumber);
}




