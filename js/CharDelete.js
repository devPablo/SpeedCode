// Return Character: /(\r\n|\n|\r)/gm

function charDelete(e) {
    if (!codeFinished) {
        if (e.keyCode == 8) {
        
            let charTyped = document.getElementsByClassName('t')[charIndex-1];
            let charNext = document.getElementsByClassName('char-active')[0]; 
    
            charNext.classList.add('initial');
            charNext.classList.remove('char-active');
            charNext.classList.remove('e');
            charNext.classList.remove('ew');
    
            charTyped.classList.add('char-active');
            charTyped.classList.remove('t');
            charTyped.classList.remove('ew');
            charTyped.classList.remove('w');
    
            if (charTyped.innerHTML.match(/(\r\n|\n|\r)/gm)) {
                charTyped.classList.add('e');
            } else {
    
                if (code[charIndex-1] == ' ' && code[charIndex-2] == ' ') {
    
                    let charSpaces = 0;
                    for (let i = 1; i < code.length; i++) {
    
                        if (code[charIndex-i] == ' ') {          
                            charSpaces++;
                        } else {
                            break;
                        }
                    }
    
                    for (let i = 0; i < charSpaces; i++) {
                        charIndex--;
                        charUntypableSpaces--;
                        charTyped = document.getElementsByClassName('t')[charIndex-1];
                        charNext = document.getElementsByClassName('char-active')[0]; 
                        
                        charNext.classList.remove('char-active');
                        charTyped.classList.remove('t');
        
                        charTyped.classList.add('char-active');
                        charNext.classList.add('initial');  
    
                        if (charTyped.innerHTML.match(/(\r\n|\n|\r)/gm)) {
                            charTyped.classList.add('e');
                            charTyped.classList.remove('ew');        
                        }
                    }   
                }
            }
            charIndex--;
        }
    }
    
}