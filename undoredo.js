const undo = document.getElementById("undo");
const redo = document.getElementById("redo");
let redoArr = [];
let redoLength = 0;
function onUndo(){
    if(historyCount){
        redoArr.push(history.pop());
        redoLength++;
        historyCount--;
        c.putImageData(history[historyCount],0,0);
    }
}


function onRedo(){
    if(redoLength){
    history.push(redoArr.pop());
    historyCount++;
    redoLength--;
    c.putImageData(history[historyCount],0,0);
    }
}

undo.addEventListener("click", onUndo);
redo.addEventListener("click", onRedo);