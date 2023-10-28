const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

const menuSelect = document.querySelector(".form");
const actionButtons = document.querySelectorAll("#actionbuttons > button");

let selectObject = {
    strokestyle : "black",
    strokewidth : 4,

}

let actions = {
    freehand: false,
    rect: false,
    circle: false,
    eraser: false,
    line: false,
} 

function toggleMenu(){
    menuSelect.classList.toggle("hide");
}

function onInput(element){
    const newValue = element.value;
    if ( element.name === "strokewidth"){
        selectObject[element.name] = parseInt(newValue);
    }
    else{
        selectObject[element.name] = newValue;
    }
    
}

function onMouseDown(event){
    previousPosition = [event.clientX, event.clientY];
    c.strokeStyle = drawingColor;
    c.lineWidth = 2;
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
}

function onActionClick(element){
    const actionName = element.id;
    element.classList.toggle("active");
    actionButtons.forEach((btn)=>{
        if(btn.classList.contains("active") && btn.id != actionName){
            btn.classList.remove("active");
        }
    })
    
    actionButtons.forEach((btn)=>{
        let isActive = btn.classList.contains("active");
        actions[btn.id] = isActive;
    })

    
}