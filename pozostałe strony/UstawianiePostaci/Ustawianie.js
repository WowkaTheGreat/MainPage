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
  this.pacochy = [];
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
      if(prpt === null)
        prpt = "null"
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
  let rotateControllerTestDown = false;
  let sizeControllerDown = false;
  switch(controller){
    case "sizeController": 
      let dropDown = false;
      let sizeControllerOnclick = false;
      let sizeController = document.createElement("button");
      let sizeControllerPosition = {x: this.left, y: this.top - 3};
      sizeController.id = "sizeController";
      $(sizeController).css({position: "fixed", left: sizeControllerPosition.x + "vw", top: sizeControllerPosition.y + "vw", width: 4.5 + "vw", height: 2 + "vw", "font-size": "0.8vw"});
      sizeController.textContent = "Size Controller";
      $(sizeController).css({"color": this.color, "background-color": "#000000a7"});
      document.body.appendChild(sizeController);
      let downCordsSizeController = {x: null, y: null};
      this.dropZone.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(event.button === 1){
          downCordsSizeController.x = event.clientX / window.innerWidth * 100 - sizeControllerPosition.x;
          downCordsSizeController.y = event.clientY / window.innerWidth * 100 - sizeControllerPosition.y;
          sizeControllerDown = true;
        }
      }); 
      sizeController.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(event.button === 1){
          downCordsSizeController.x = event.clientX / window.innerWidth * 100 - sizeControllerPosition.x;
          downCordsSizeController.y = event.clientY / window.innerWidth * 100 - sizeControllerPosition.y;
          sizeControllerDown = true;
        }
      }); 
      document.addEventListener("mouseup", function(event){
        event.preventDefault();
        sizeControllerDown = false;
      });
      document.addEventListener("mousemove", (event) => {
        if(sizeControllerDown){
          let x = event.clientX / window.innerWidth * 100 - downCordsSizeController.x;
          let y = event.clientY / window.innerWidth * 100 - downCordsSizeController.y;
          sizeControllerPosition.x += x - sizeControllerPosition.x;
          sizeControllerPosition.y += y - sizeControllerPosition.y;
          $(sizeController).css({position: "fixed", left: sizeControllerPosition.x + "vw", top: sizeControllerPosition.y + "vw"});
        }
      });
      
      sizeController.onclick = () => {
        if(!(sizeController.textContent === "Main menu")){
          sizeController.textContent = "Main menu";
          sizeControllerOnclick = true;
        }else if(!(sizeController.textContent === "Size Controller")){
          sizeController.textContent = "Size Controller";
          sizeControllerOnclick = false;
        }
      }

      let downCordsDropZone = {x: null, y: null};
      this.dropZone.addEventListener("mousedown", (event) => {///////////////////////////////////////////////////////////////////////////////////////////////////////////
        event.preventDefault();
        if(event.button === 1){
          downCordsDropZone.x = event.clientX / window.innerWidth * 100 - this.left;
          downCordsDropZone.y = event.clientY / window.innerWidth * 100 - this.top;
          dropDown = true;
        }

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
            if(sizeControllerOnclick && this.mouseDown){
              //let y = event.offsetY / window.innerWidth * 100;
              if(x > this.width * 0.70 + this.left && y > this.height * 0.2 + this.top && y < this.height * 0.8 + this.top && !dropDown){
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
            if(sizeControllerOnclick && this.mouseDown){
              //let y = event.offsetY / window.innerWidth * 100;
              if(x < this.width * 0.30 + this.left && y > this.height * 0.2 + this.top && y < this.height * 0.8 + this.top && !dropDown){
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
            if(sizeControllerOnclick && this.mouseDown){
              //let x = event.offsetY / window.innerWidth * 100;
              if(y > this.height * 0.70 + this.top && x > this.width * 0.2 + this.left && x < this.width * 0.8 + this.left && !dropDown){
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
            if(sizeControllerOnclick && this.mouseDown){
              //let x = event.offsetY / window.innerWidth * 100;
              if(y < this.height * 0.30 + this.top && x > this.width * 0.2 + this.left && x < this.width * 0.8 + this.left && !dropDown){
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
      document.addEventListener("mousemove", (event) => {
        if(dropDown){
          let x = event.clientX / window.innerWidth * 100 - downCordsDropZone.x;
          let y = event.clientY / window.innerWidth * 100 - downCordsDropZone.y;
          this.left += x - this.left;
          this.top += y - this.top;
          $(this.dropZone).css({position: "fixed", left: this.left - 0.5 + "vw", top: this.top - 0.5 + "vw"});
          $(this.droppedImage).css({position: "fixed", left: this.left + "vw", top: this.top + "vw"});
          if(this.pacochy.length > 0){
            for(let i = 0; i < this.pacochy.length; i++){
              $(this.pacochy[i].html).css({
                position: "fixed",
                left: this.left + this.pacochy[i].x * this.width + "vw", 
                top: this.top + this.pacochy[i].y * this.height + "vw"
              });
            }
          }
        }
      });
      document.addEventListener("mouseup", () => {
        this.mouseDown = false;
        dropDown = false;//
      });

      break;
    case "rotateControllerTest": 
      //gzr
      let rotateControllerTestOnclick = false;
      let rotateControllerTest = document.createElement("button");
      rotateControllerTest.id = "rotateControllerTest";
      let rotateControllerPosition = {x: this.left + 5, y: this.top - 3};
      $(rotateControllerTest).css({position: "fixed", left: rotateControllerPosition.x + "vw", top: rotateControllerPosition.y + "vw", width: 7.5 + "vw", height: 2 + "vw", "font-size": "0.8vw"});
      rotateControllerTest.textContent = "rotateControllerTest";
      document.body.appendChild(rotateControllerTest);
      $(rotateControllerTest).css({"color": this.color, "background-color": "#000000a7"});
      rotateControllerTest.onclick = () => {
        if(!(rotateControllerTest.textContent === "RCT: on")){
          rotateControllerTest.textContent = "RCT: on";
          rotateControllerTestOnclick = true;
          if(this.pacochy.length > 0){
            for(let i = 0; i < this.pacochy.length; i++){
              this.pacochy[i].html.style.opacity = 1;
            }
          }
        }else if(!(rotateControllerTest.textContent === "RCT: of")){
          rotateControllerTest.textContent = "RCT: of";
          rotateControllerTestOnclick = false;
          if(this.pacochy.length > 0){
            for(let i = 0; i < this.pacochy.length; i++){
              this.pacochy[i].html.style.opacity = 0;
            }
          }
        }
      }
      let downCordsRotateController = {x: null, y: null};
      rotateControllerTest.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(event.button === 1){
          downCordsRotateController.x = event.clientX / window.innerWidth * 100 - rotateControllerPosition.x;
          downCordsRotateController.y = event.clientY / window.innerWidth * 100 - rotateControllerPosition.y;
          rotateControllerTestDown = true;
        }
      });
      this.dropZone.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(event.button === 1){
          downCordsRotateController.x = event.clientX / window.innerWidth * 100 - rotateControllerPosition.x;
          downCordsRotateController.y = event.clientY / window.innerWidth * 100 - rotateControllerPosition.y;
          rotateControllerTestDown = true;
        }
      }); 
      document.addEventListener("mouseup", function(event){
        event.preventDefault();
        rotateControllerTestDown = false;
      }); 
      document.addEventListener("mousemove", (event) => {
        if(rotateControllerTestDown){
          let x = event.clientX / window.innerWidth * 100 - downCordsRotateController.x;
          let y = event.clientY / window.innerWidth * 100 - downCordsRotateController.y;
          rotateControllerPosition.x = x;
          rotateControllerPosition.y = y;
          $(rotateControllerTest).css({position: "fixed", left: rotateControllerPosition.x + "vw", top: rotateControllerPosition.y + "vw"});
        }
      });
      /*
      document.addEventListener("click", () => {
        if(rotateControllerTestOnclick){
          let kordynatyty = elementWent(110, 1);
          this.left += kordynatyty.x;
          this.top += kordynatyty.y;
          $(this.dropZone).css({left: this.left - 0.5 + "vw", top: this.top - 0.5 + "vw", position: "fixed"});
          $(this.droppedImage).css({left: this.left + "vw", top: this.top + "vw", position: "fixed"});  
        }
      });
      */
      this.dropZone.addEventListener("click", (event) => {
        event.preventDefault();
        if(rotateControllerTestOnclick){
          this.pacochy.unshift({html: document.createElement("img"), touch: true, x: (event.clientX / window.innerWidth * 100 - 1.5 - this.left) / this.width, y: (event.clientY / window.innerWidth * 100 - 1.5 - this.top) / this.height});
          this.pacochy[0].html.src = "Images/pacochafrue.png";
          $(this.pacochy[0].html).css({position: "fixed", width: "3vw", height: "3vw", left: this.pacochy[0].x * this.width + this.left + "vw", top: this.pacochy[0].y * this.height + this.top + "vw"});
          document.body.appendChild(this.pacochy[0].html);
        }
      });

      //czas na pacochę >:€

      break;
    case "coś tam ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble": 
      //jeśli kliknięto dodaj pacochę na kordynaty kliknięcia i dodaj obiekt z x y pacochi i nazwą pacochi
     

      break;
  }
}
/*
Limb.prototype.pluginForPacochy = function()
{
  //sprawdzaj czy klikniętio pacochę
  if(this.pacochy.length > 0){
    for(let j = 0; j < this.pacochy.length; j++){
      this.pacochy[j].html.css({position: "fixed", left: this.left + this.pacochy[j].x, this.top: this.top + this.pacochy[j].y});
    }
  }
}*/

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
    if(event.button === 2){
      cords.x = event.clientX / window.innerWidth * 100;
      cords.y = event.clientY / window.innerWidth * 100;
    }else if(buttons > 0){
      document.getElementById("button").remove();
      buttons = 0;
    }
  });
});