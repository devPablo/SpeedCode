function charType(e) {

    // Prevent scrolling when pressing 'Space'
    if (e.keyCode == 32) {
        e.preventDefault();
    }

    if (!codeFinished) {

        if (code[charIndex].match(/(\r\n|\n|\r)/gm)) {
        
            if (e.keyCode == 13) { // Correct key
                
                let charTyped = document.getElementsByClassName('char-active')[0];
                let charNext = document.getElementsByClassName('initial')[0];
    
                charTyped.classList.remove('char-active');
                charTyped.classList.add('t');
                charTyped.classList.remove('e');
    
                if (charNext.innerHTML.match(/(\r\n|\n|\r)/gm)) {
                    charNext.classList.add('char-active');
                    charNext.classList.add('e');
                    charNext.classList.remove('initial');
                }
                charNext.classList.add('char-active');
                charNext.classList.remove('initial');
    
                // Autocomplete unnecessary spaces
                let charSpaces = 0;
                for (let i = charIndex; i < code.length; i++) {
                    
                    if (code[i+1] == ' ') {          
                        charSpaces++;
                    } else {
                        break;
                    }
                }
    
                for (let i = 0; i < charSpaces; i++) {
                    charTyped = document.getElementsByClassName('char-active')[0];
                    charNext = document.getElementsByClassName('initial')[0];
                    
                    charTyped.classList.remove('char-active');
                    charTyped.classList.add('t');
    
                    if (charNext.innerHTML.match(/(\r\n|\n|\r)/gm)) {
                        charNext.classList.add('char-active');
                        charNext.classList.add('e');
                        charNext.classList.remove('initial');
                    }
                    charNext.classList.add('char-active');
                    charNext.classList.remove('initial');
    
                    charIndex++;
                    charUntypableSpaces++;
                }
    
    
            } else { // Missed key
    
                let charTyped = document.getElementsByClassName('char-active')[0];
                let charNext = document.getElementsByClassName('initial')[0];
    
                charTyped.classList.remove('char-active');
                charTyped.classList.remove('e');
                charTyped.classList.add('t');
                charTyped.classList.add('ew');
    
                if (charNext.innerHTML.match(/(\r\n|\n|\r)/gm)) {
                    charNext.classList.add('char-active');
                    charNext.classList.add('e');
                    charNext.classList.remove('initial');
                }
                charNext.classList.add('char-active');
                charNext.classList.remove('initial');
    
                // Autocomplete unnecessary spaces
                let charSpaces = 0;
                for (let i = charIndex; i < code.length; i++) {
                    if (code[i+1] == ' ') {
                        charSpaces++;
                    } else {
                        break;
                    }
                }
    
                for (let i = 0; i < charSpaces; i++) {
                    charTyped = document.getElementsByClassName('char-active')[0];
                    charNext = document.getElementsByClassName('initial')[0];
                    
                    charTyped.classList.remove('char-active');
                    charTyped.classList.add('t');
    
                    if (charNext.innerHTML.match(/(\r\n|\n|\r)/gm)) {
                        charNext.classList.add('char-active');
                        charNext.classList.add('e');
                        charNext.classList.remove('initial');
                    }
                    charNext.classList.add('char-active');
                    charNext.classList.remove('initial');
    
                    charIndex++;
                    charUntypableSpaces++;
                }
    
    
            }
            charIndex++;
    
    
            
    
    
            
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        } else {
            if (e.key == code[charIndex]) { // Correct key
    
                let charTyped = document.getElementsByClassName('char-active')[0];
                let charNext = document.getElementsByClassName('initial')[0];
    
                charTyped.classList.remove('char-active');
                charTyped.classList.add('t');
    
                if (code[charIndex+1] != null) {
                    charNext.classList.add('char-active');
                    charNext.classList.remove('initial');
                }
                
    
    
            } else { // Missed key
    
                let charTyped = document.getElementsByClassName('char-active')[0];
                let charNext = document.getElementsByClassName('initial')[0];
    
                charTyped.classList.remove('char-active');
                charTyped.classList.add('t', 'w');
    
                if (code[charIndex+1] != null) {
                    charNext.classList.add('char-active');
                    charNext.classList.remove('initial');
                }
    
    
            }
    
            if (code[charIndex+1] != null) {
                if (code[charIndex+1].match(/(\r\n|\n|\r)/gm)) {
                    let charEnter = document.getElementsByClassName('char-active')[0];
                    charEnter.classList.add('e');
                }
            }
    
    
    
            charIndex++;
    
        }
        isFinished();
    }
    
}