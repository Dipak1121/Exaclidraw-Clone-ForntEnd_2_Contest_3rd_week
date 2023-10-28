let initialPosition = null;
const history = [];
history.push(c.getImageData(0,0, canvas.width, canvas.height));
let historyCount = 0;
let draw = false;

function onMouseDown(event){

    if(!(actions.freehand || actions.rect || actions.circle || actions.eraser || actions.line)){
        
        return;
    }
    c.beginPath();
    initialPosition = [event.clientX, event.clientY];
    c.strokeStyle = selectObject.strokestyle;
    c.lineWidth = selectObject.strokewidth;
    c.lineCap = "round";
    c.lineJoin = "round";
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(event){
    
    draw = true;
    let currentPosition = [event.clientX, event.clientY];
    if(actions.freehand){
        drawFreehand(currentPosition);
    }
    else if (actions.eraser){
        
        eraseDrawing(currentPosition);
    }
    else if(actions.circle){
        drawCircle(currentPosition);
    }
    else if ( actions.rect){
        drawRectangle(currentPosition);
    }
    else if (actions.line){
        drawLine(currentPosition);
    }
}
function onMouseUp(event){
    if (draw){
        history.push(c.getImageData(0,0, canvas.width, canvas.height));
        historyCount++;
    }
    
    draw = false;
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
}

function drawFreehand(currentPosition){
    c.beginPath();
    c.moveTo(initialPosition[0], initialPosition[1]);
    c.lineTo(currentPosition[0], currentPosition[1]);
    c.stroke();
    c.closePath();
    initialPosition = currentPosition;
}

function eraseDrawing(currentPosition){
    c.clearRect(currentPosition[0], currentPosition[1], selectObject.strokewidth, selectObject.strokewidth);
}

function drawCircle(currentPosition){
    let X = currentPosition[0] - initialPosition[0];
    let Y = currentPosition[1] - initialPosition[1];
    let radius = Math.sqrt((X*X) + (Y*Y));
    c.putImageData(history[historyCount],0,0);
    c.beginPath();
    c.arc(initialPosition[0], initialPosition[1], radius, 0, 2 * Math.PI, true);
    c.stroke();
}

function drawRectangle(currentPosition){
    let width = currentPosition[0] - initialPosition[0];
    let height = currentPosition[1] - initialPosition[1];
    c.putImageData(history[historyCount],0,0);
    c.strokeRect(initialPosition[0], initialPosition[1], width, height);
}

function drawLine(currentPosition){
    c.putImageData(history[historyCount],0,0);
    c.beginPath();
    c.moveTo(initialPosition[0], initialPosition[1]);
    c.lineTo(currentPosition[0], currentPosition[1]);
    c.stroke();
    c.closePath();
}
canvas.addEventListener("mousedown", onMouseDown);