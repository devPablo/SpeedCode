// Return Character: /(\r\n|\n|\r)/gm

function isFinished() {  
    if (code[charIndex] == null) {

        codeFinished = true;

        let code_total = document.getElementsByClassName('t').length-charUntypableSpaces;
        let code_missed = document.getElementsByClassName('w').length + document.getElementsByClassName('ew').length;
        let code_correct = code_total-code_missed;

        let code_missed_percentage = ((code_missed/code_total)*100).toFixed(0);
        let code_correct_percentage = ((code_correct/code_total)*100).toFixed(0);

        console.log('Correct: ' + code_correct + '/' + code_total + ' (' + code_correct_percentage + '%)');
        console.log('Missed: ' + code_missed + '/' + code_total + ' (' + code_missed_percentage + '%)');
     
        
        
    }

}

function fixCode(code) {
    code = code.split('');
    for (let a = 0; a < 1; a++) { // Increase to maximize accuracy - TODO
      
      for (let i = 0; i < code.length; i++) {
        if (code[i] == ' ') {
          if (code[i-1] == ' ') {
            code.splice(i, 1);
          }
        }
      }
    }
    code = code.join('');   
    return code;
  }