let colors = [
  "#FF00FF", "#FFFF00", "#00FFFF", "#FF6600",
  "#FF00CC", "#FFCC00", "#00CCFF", "#FF99FF",
  "#FFFF66", "#FF3399", "#FF6600", "#0066FF",
  "#FF3333", "#33CCFF", "#FF3399", "#FF3333",
  "#CC00FF", "#FF3333", "#FF3333", "#CC00FF", 
  "#FF3333", "#FF33CC"
];

function elementWent(deg, how)
{
  deg -= 90;
  let radian = deg * Math.PI / 180;
  let x = Math.cos(radian) * how;
  let y = Math.sin(radian) * how;
  return {x: x, y: y};
};

function Limb(left, top, width, height, src)
{
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.mouseDown = false;
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
  this.dropZone = document.createElement("div");
  document.body.appendChild(this.dropZone);
  $(this.dropZone).css({
    left: this.left - 0.5 + "vw",
    top: this.top - 0.5 + "vw",
    width: this.width + "vw", 
    height: this.height + "vw", 
    border: "0.5vw dashed " + this.color,
    "text-align": "center",
    "line-height": this.height + "vw",
    position: "fixed"
  });  
  this.droppedImage = this.dropZone.appendChild(document.createElement("img"));
  $(this.droppedImage).css({
    left: this.left + "vw",
    top: this.top + "vw",
    width: this.width + "vw", 
    height: this.height + "vw", 
    position: "fixed", 
    display: "none"
  });
  if(src && !(src === "")){
    this.droppedImage.style.display = "block";
    this.droppedImage.src = src;
  }else if(!(src === true) && !(src === undefined) && src === null && !(src === "")){
    limbs.pop();
    this.dropZone.remove();
    alert("Odwołano");
  }

  this.dropZone.addEventListener('dragenter', (event) => {
    event.preventDefault();
  });

  this.dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  this.dropZone.addEventListener('dragleave', (event) => {
    event.preventDefault();
  });

  this.dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if(file && file.type.startsWith("image/")){
      const reader = new FileReader();
      let di = this.droppedImage;
      reader.onload = function(event)
      {
        di.src = event.target.result;
        di.style.display = "block";
      }
      reader.readAsDataURL(file);
    }else{
      let prpt = prompt("Error: Przeciągnięty plik nie jest obrazem!");
      if(prpt.toLowerCase() === "ok"){
        let cnf = confirm("Ok?!");
        if(!cnf){
          alert("Ok");
        }
      }
    }
  });


}

Limb.prototype.controls = function(controller)
{
  let nrOneButtonDown = false;
  let down = false;
  switch(controller){
    case "sizeController": 
      let nrOne = false;
      let sizeControllerDown = false;
      let sizeControllerButtonDown = false;
      let sizeController = document.createElement("button");
      sizeController.id = "sizeController";
      $(sizeController).css({position: "fixed", left: this.left + "vw", top: this.top - 3 + "vw", width: 4.5 + "vw", height: 2 + "vw", "font-size": "0.8vw"});
      sizeController.textContent = "Size Controller";
      $(sizeController).css({"color": this.color, "background-color": "#000000a7"});
      this.dropZone.appendChild(sizeController);

      sizeController.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(event.button === 1){
          sizeControllerButtonDown = true;
        }
      }); 
      sizeController.addEventListener("mouseup", function(event){
        event.preventDefault();
        sizeControllerButtonDown = false;
      });
      document.addEventListener("mousemove", (event) => {
        if(sizeControllerButtonDown){
          let x = event.clientX / window.innerWidth * 100;
          let y = event.clientY / window.innerWidth * 100;
          $(sizeController).css({position: "fixed", left: x - 2.25 + "vw", top: y - 1 + "vw"});
        }
      });
      sizeController.onclick = () => {
        if(!(sizeController.textContent === "Main menu")){
          sizeController.textContent = "Main menu";
          sizeControllerDown = true;
        }else if(!(sizeController.textContent === "Size Controller")){
          sizeController.textContent = "Size Controller";
          sizeControllerDown = false;
        }
      }
      let downCords = {x: null, y: null};
      this.dropZone.addEventListener("mousedown", (event) => {
        if(event.button === 1){
          downCords.x = event.clientX / window.innerWidth * 100 - this.left;
          downCords.y = event.clientY / window.innerWidth * 100 - this.top;
          nrOne = true;
        }
      });
      document.addEventListener("mouseup", () => {
        nrOne = false;
        down = false;
      });
      document.addEventListener("mousemove", (event) => {
        if(nrOne && !sizeControllerButtonDown && !nrOneButtonDown){
          let x = event.clientX / window.innerWidth * 100 - downCords.x;
          let y = event.clientY / window.innerWidth * 100 - downCords.y;
          this.left += x - this.left;
          this.top += y - this.top;
          $(this.dropZone).css({position: "fixed", left: this.left - 0.5 + "vw", top: this.top - 0.5 + "vw"});
          $(this.droppedImage).css({position: "fixed", left: this.left + "vw", top: this.top + "vw"});
        }
      });
      this.dropZone.addEventListener("mousedown", (event) => {
        event.preventDefault();
        setTimeout(() => {this.mouseDown = true;}, 50);
        let lastMousePoint = {x: this.left + this.width / 2, y: this.top + this.height / 2};
        let x = event.clientX / window.innerWidth * 100;
        let y = event.clientY / window.innerWidth * 100;
        if(x > this.width * 0.70 + this.left && y > this.height * 0.2 + this.top && y < this.height * 0.8 + this.top){
          //console.log("lastMousePoint.y górne: " + Math.floor(lastMousePoint.y * 1.3) + "     lastMousePoint.y dolne: " + Math.floor(lastMousePoint.y * 0.7) + "    y: " + Math.floor(y))
          document.addEventListener("mousemove", (event) => {
            let x = event.clientX / window.innerWidth * 100;
            let y = event.clientY / window.innerWidth * 100;
            //console.log("client x: " + x);
            if(sizeControllerDown && this.mouseDown){
              //let y = event.offsetY / window.innerWidth * 100;
              if(!down && x > this.width * 0.70 + this.left && y > this.height * 0.2 + this.top && y < this.height * 0.8 + this.top && !nrOne){
                this.width = x - this.left;
                this.dropZone.style.width = this.width + "vw";
                this.droppedImage.style.width = this.width + "vw";
                lastMousePoint.x = x;
              }
            }
          });
        }else if(x < this.width * 0.30 + this.left && y > this.height * 0.2 + this.top && y < this.height * 0.8 + this.top){
          document.addEventListener("mousemove", (event) => {
            let x = event.clientX / window.innerWidth * 100;
            let y = event.clientY / window.innerWidth * 100;
            //console.log("client x: " + x);
            if(sizeControllerDown && this.mouseDown){
              //let y = event.offsetY / window.innerWidth * 100;
              if(!down && x < this.width * 0.30 + this.left && y > this.height * 0.2 + this.top && y < this.height * 0.8 + this.top && !nrOne){
                this.width += this.left - x ;
                this.left = x;
                this.dropZone.style.width = this.width + "vw";
                this.droppedImage.style.width = this.width + "vw";
                this.dropZone.style.left = this.left - 0.5 + "vw";
                this.droppedImage.style.left = this.left + "vw";
                lastMousePoint.x = x;
              } 
            }
          });
        }else if(y > this.height * 0.70 + this.top && x > this.width * 0.2 + this.left && x < this.width * 0.8 + this.left){
          //console.log("lastMousePoint.x górne: " + Math.floor(lastMousePoint.x * 1.3) + "     lastMousePoint.x dolne: " + Math.floor(lastMousePoint.x * 0.7) + "    x: " + Math.floor(x))
          document.addEventListener("mousemove", (event) => {
            let x = event.clientX / window.innerWidth * 100;
            let y = event.clientY / window.innerWidth * 100;
            //console.log("client y: " + y);
            if(sizeControllerDown && this.mouseDown){
              //let x = event.offsetY / window.innerWidth * 100;
              if(!down && y > this.height * 0.70 + this.top && x > this.width * 0.2 + this.left && x < this.width * 0.8 + this.left && !nrOne){
                this.height = y - this.top;
                this.dropZone.style.height = this.height + "vw";
                this.droppedImage.style.height = this.height + "vw";
                lastMousePoint.y = y;
              }
            }
          });
        }else if(y < this.height * 0.30 + this.top && x > this.width * 0.2 + this.left && x < this.width * 0.8 + this.left){
          document.addEventListener("mousemove", (event) => {
            let x = event.clientX / window.innerWidth * 100;
            let y = event.clientY / window.innerWidth * 100;
            //console.log("client y: " + y);
            if(sizeControllerDown && this.mouseDown){
              //let x = event.offsetY / window.innerWidth * 100;
              if(!down && y < this.height * 0.30 + this.top && x > this.width * 0.2 + this.left && x < this.width * 0.8 + this.left && !nrOne){
                this.height += this.top - y ;
                this.top = y;
                this.dropZone.style.height = this.height + "vw";
                this.droppedImage.style.height = this.height + "vw";
                this.dropZone.style.top = this.top - 0.5 + "vw";
                this.droppedImage.style.top = this.top + "vw";
                lastMousePoint.y = y;
              } 
            }
          });
        }
      });
      document.addEventListener("mouseup", () => {
        this.mouseDown = false;
      });

      break;
    case "rotateControllerTest": 
      //gzr
      let theButtonDown = false;
      let button = document.createElement("button");
      button.id = "rotateControllerTest";
      $(button).css({position: "fixed", left: this.left + 5 + "vw", top: this.top - 3 + "vw", width: 7.5 + "vw", height: 2 + "vw", "font-size": "0.8vw"});
      button.textContent = "rotateControllerTest";
      this.dropZone.appendChild(button);
      $(button).css({"color": this.color, "background-color": "#000000a7"});
      button.onclick = () => {
        if(!(button.textContent === "RCT: on")){
          button.textContent = "RCT: on";
          theButtonDown = true;
        }else if(!(button.textContent === "RCT: of")){
          button.textContent = "RCT: of";
          theButtonDown = false;
        }
      }
      button.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(event.button === 1){
          nrOneButtonDown = true;
        }
      }); 
      document.addEventListener("mouseup", function(event){
        event.preventDefault();
        nrOneButtonDown = false;
      }); 
      document.addEventListener("mousemove", (event) => {
        if(nrOneButtonDown){
          let x = event.clientX / window.innerWidth * 100;
          let y = event.clientY / window.innerWidth * 100;
          $(button).css({position: "fixed", left: x - 2.25 + "vw", top: y - 1 + "vw"});
        }
      });
      document.addEventListener("click", () => {
        if(theButtonDown){
          let kordynatyty = elementWent(110, 1);
          this.left += kordynatyty.x;
          this.top += kordynatyty.y;
          $(this.dropZone).css({left: this.left - 0.5 + "vw", top: this.top - 0.5 + "vw", position: "fixed"});
          $(this.droppedImage).css({left: this.left + "vw", top: this.top + "vw", position: "fixed"});  
        }
      });
      break;
  }
}

Limb.prototype.delite = function()
{
  //ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble 
  //ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble 
}

let limbs = [];
let buttons = 0;
function button(x, y)
{
  if(buttons > 0){
    document.getElementById("button").remove();
  }
  buttons++;
  let button = document.createElement("button");
  button.id = "button";
  $(button).css({position: "fixed", left: x + "vw", top: y + "vw"});
  button.textContent = "hot potato";
  document.body.appendChild(button);
  button.onclick = () => {
    button.remove();
    buttons = 0;
    let src = prompt("Src please!");
    limbs.push(new Limb(cords.x - 5, cords.y - 5, 10, 10, src));
    limbs[limbs.length - 1].controls("sizeController");
    limbs[limbs.length - 1].controls("rotateControllerTest");
  }
}

//limbs[limbs.length].controls("sizeController");

let cords = {x: null, y: null};
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    cords.x = event.clientX / window.innerWidth * 100;
    cords.y = event.clientY / window.innerWidth * 100;
    button(cords.x, cords.y);
    //limbs.push(new Limb(cords.x - 5, cords.y - 5, 10, 10));
  });
  document.addEventListener("click", (event) => {
    if(event.button === 3){
      cords.x = event.clientX / window.innerWidth * 100;
      cords.y = event.clientY / window.innerWidth * 100;
    }else if(buttons > 0){
      document.getElementById("button").remove();
      buttons = 0;
    }
  });
});