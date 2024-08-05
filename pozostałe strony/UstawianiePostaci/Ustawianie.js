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
  this.deg = 45;
  this.statusReady = false;
  this.status = true;
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
    "transform": "rotate(" + this.deg + "deg)", 
    border: "0.5vw dashed " + this.color,
    "text-align": "center",
    "line-height": this.height + "vw",
    position: "fixed"
  });  
  this.droppedImage = this.dropZone.appendChild(document.createElement("img"));
  $(this.droppedImage).css({
    //left: this.left + "vw",
    //top: this.top + "vw",
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
    this.status = false;
  }
  this.statusReady = true;

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
      let prpt = prompt("Error404: Przeciągnięty plik nie jest obrazem!");
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
  let deliteDown = false;
  let testDown = false;
  switch(controller){
    case "sizeController": 
      let dropDown = false;
      let sizeControllerOnclick = false;
      this.sizeController = document.createElement("button");
      let sizeControllerPosition = {x: this.left, y: this.top - 3};
      this.sizeController.id = "sizeController";
      $(this.sizeController).css({position: "fixed", left: sizeControllerPosition.x + "vw", top: sizeControllerPosition.y + "vw", width: 4.5 + "vw", height: 2 + "vw", "font-size": "0.8vw"});
      this.sizeController.textContent = "Size Controller";
      $(this.sizeController).css({"color": this.color, "background-color": "#000000a7"});
      document.body.appendChild(this.sizeController);
      let downCordsSizeController = {x: null, y: null};
      this.dropZone.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(event.button === 1){
          downCordsSizeController.x = event.clientX / window.innerWidth * 100 - sizeControllerPosition.x;
          downCordsSizeController.y = event.clientY / window.innerWidth * 100 - sizeControllerPosition.y;
          sizeControllerDown = true;
        }
      }); 
      this.sizeController.addEventListener("mousedown", function(event){
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
          $(this.sizeController).css({position: "fixed", left: sizeControllerPosition.x + "vw", top: sizeControllerPosition.y + "vw"});
        }
      });
      
      this.sizeController.onclick = () => {
        if(!(this.sizeController.textContent === "Main menu")){
          this.sizeController.textContent = "Main menu";
          sizeControllerOnclick = true;
        }else if(!(this.sizeController.textContent === "Size Controller")){
          this.sizeController.textContent = "Size Controller";
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
                //this.droppedImage.style.left = this.left + "vw";
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
                //this.droppedImage.style.top = this.top + "vw";
                lastMousePoint.y = y;
              } 
            }
          });
        }
      });
      document.addEventListener("mousemove", (event) => {
        if(dropDown){
          let x = (event.clientX / window.innerWidth * 100 - this.left) - downCordsDropZone.x;
          let y = (event.clientY / window.innerWidth * 100 - this.top) - downCordsDropZone.y;
          this.left += x;
          this.top += y;
          $(this.dropZone).css({position: "fixed", left: this.left - 0.5 + "vw", top: this.top - 0.5 + "vw"});
          //$(this.droppedImage).css({position: "fixed", left: this.left + "vw", top: this.top + "vw"});
          if(this.pacochy.length > 0){
            for(let i = 0; i < this.pacochy.length; i++){
              this.pacochy[i].x += x;
              this.pacochy[i].y += y;
              $(this.pacochy[i].html).css({
                position: "fixed",
                left: this.pacochy[i].x + "vw", 
                top: this.pacochy[i].y + "vw"
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
      let rotateControllerTestOnclick = false;
      this.rotateControllerTest = document.createElement("button");
      this.rotateControllerTest.id = "rotateControllerTest";
      let rotateControllerPosition = {x: this.left + 5, y: this.top - 3};
      $(this.rotateControllerTest).css({position: "fixed", left: rotateControllerPosition.x + "vw", top: rotateControllerPosition.y + "vw", width: 7.5 + "vw", height: 2 + "vw", "font-size": "0.8vw"});
      this.rotateControllerTest.textContent = "rotateControllerTest";
      document.body.appendChild(this.rotateControllerTest);
      $(this.rotateControllerTest).css({"color": this.color, "background-color": "#000000a7"});
      this.rotateControllerTest.onclick = () => {
        if(!(this.rotateControllerTest.textContent === "RCT: on")){
          this.rotateControllerTest.textContent = "RCT: on";
          rotateControllerTestOnclick = true;
          if(this.pacochy.length > 0){
            for(let i = 0; i < this.pacochy.length; i++){
              this.pacochy[i].html.style.display = "block";
            }
          }
        }else if(!(this.rotateControllerTest.textContent === "RCT: of")){
          this.rotateControllerTest.textContent = "RCT: of";
          rotateControllerTestOnclick = false;
          if(this.pacochy.length > 0){
            for(let i = 0; i < this.pacochy.length; i++){
              this.pacochy[i].html.style.display = "none";
            }
          }
        }
      }
      let downCordsRotateController = {x: null, y: null};
      this.rotateControllerTest.addEventListener("mousedown", function(event){
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
          $(this.rotateControllerTest).css({position: "fixed", left: rotateControllerPosition.x + "vw", top: rotateControllerPosition.y + "vw"});
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
      this.dropZone.addEventListener("mousedown", (event) => {
        event.preventDefault();
        let dropZoneUp = false;
        document.addEventListener("mouseup", () => {
          dropZoneUp = true;
        });
        setTimeout(
          () => {
            if(rotateControllerTestOnclick && event.button === 0 && dropZoneUp){
              this.pacochy.unshift({html: document.createElement("img"), touch: true, x: event.clientX / window.innerWidth * 100 - 1.5, y: event.clientY / window.innerWidth * 100 - 1.5, firstPosition: {x: this.width, y: this.height, left: this.left, top: this.top}});
              this.pacochy[0].html.src = "Images/pacochafrue.png";
              $(this.pacochy[0].html).css({position: "fixed", width: "3vw", height: "3vw", left: this.pacochy[0].x + "vw", top: this.pacochy[0].y + "vw"});
              document.body.appendChild(this.pacochy[0].html);
            }
          },
          144
        );
      });

      //czas na pacochę >:€

      break;
    case "delite": 
      this.delite = document.createElement("button");
      this.delite.id = "delite";
      let delitePosition = {x: this.left + 13, y: this.top - 3};
      $(this.delite).css({position: "fixed", left: delitePosition.x + "vw", top: delitePosition.y + "vw", width: 9 + "vw", height: 5.8 + "vw", "font-size": "1.6vw"});
      this.delite.textContent = "DO NOT TOUCH";
      document.body.appendChild(this.delite);
      $(this.delite).css({"color": this.color, "background-color": "#db0000"});
      this.delite.onclick = () => {
        let msg = confirm("do not…");
        if(msg){
          msg = confirm("NOOOO TOUCH!!!! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          if(msg){
            limbs.pop();
            this.dropZone.remove();
            if(this.sizeController)
              this.sizeController.remove();
            if(this.rotateControllerTest)
              this.rotateControllerTest.remove();
            if(this.delite)
              this.delite.remove();
            if(this.test)
              this.test.remove();
          }else{
            alert("E®†ī^ó…Ļ^ó    ERROR 404   Ļĺóķ∆∂śń©ķ®ł    ERROR 404   ę∑^Ľ§^§¶ī…Ľ¶į¶•įĽī÷©ńī≥ł    ERROR 404   †ó®ę®¶•ó^¨ī∂†∆ß¨∑ęį®§†¶†¨     ERROR 404    ĘŚśťÁťū¶Ť§ś£Ęį§¶••¶§    ERROR 404   įĘŤÔ§¶śŤÁžÁĘ¶§ŤśÁū¶śŤ§    ERROR 404   ū¶įŚūį§Ś≤ťś¶ť¶śū∂®†ī");
          }
        }
      }
      let downCordsDelite = {x: null, y: null};
      this.delite.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(event.button === 1){
          downCordsDelite.x = event.clientX / window.innerWidth * 100 - delitePosition.x;
          downCordsDelite.y = event.clientY / window.innerWidth * 100 - delitePosition.y;
          deliteDown = true;
        }
      });
      this.dropZone.addEventListener("mousedown", function(event){
        event.preventDefault();
        if(event.button === 1){
          downCordsDelite.x = event.clientX / window.innerWidth * 100 - delitePosition.x;
          downCordsDelite.y = event.clientY / window.innerWidth * 100 - delitePosition.y;
          deliteDown = true;
        }
      }); 
      document.addEventListener("mouseup", function(event){
        event.preventDefault();
        deliteDown = false;
      }); 
      document.addEventListener("mousemove", (event) => {
        if(deliteDown){
          let x = event.clientX / window.innerWidth * 100 - downCordsDelite.x;
          let y = event.clientY / window.innerWidth * 100 - downCordsDelite.y;
          delitePosition.x = x;
          delitePosition.y = y;
          $(this.delite).css({position: "fixed", left: delitePosition.x + "vw", top: delitePosition.y + "vw"});
        }
      });
      break;
    case "test":
      this.test = document.createElement("button");
      this.test.id = "test";
      let testPosition = {x: this.left - 6, y: this.top - 3};
      $(this.test).css({position: "fixed", left: testPosition.x + "vw", top: testPosition.y + "vw", width: 5.5 + "vw", height: 2 + "vw", "font-size": "0.8vw", "font-family": "Luminari, fantasy", "color": this.color, "background-color": "#000000a7"});
      this.test.textContent = "TEST 😼 of"
      document.body.appendChild(this.test);
      let testOnclick = false;
      this.test.onclick = () => {
        if(!(this.test.textContent === "TEST 😼 of")){
          this.test.textContent = "TEST 😼 of";
          testOnclick = false;
        }else if(!(this.test.textContent === "TEST 😼 on")){
          this.test.textContent = "TEST 😼 on";
          testOnclick = true;
        }
      }
      let downCordsTest = {x: null, y: null};
      this.test.addEventListener("mousedown", (event) => {
        event.preventDefault();
        if(event.button === 1){
          downCordsTest.x = event.clientX / window.innerWidth * 100 - testPosition.x;
          downCordsTest.y = event.clientY / window.innerWidth * 100 - testPosition.y;
          testDown = true;
        }
      });
      this.dropZone.addEventListener("mousedown", (event) => {
        event.preventDefault();
        if(event.button === 1){
          downCordsTest.x = event.clientX / window.innerWidth * 100 - testPosition.x;
          downCordsTest.y = event.clientY / window.innerWidth * 100 - testPosition.y;
          testDown = true;
        }
      });
      document.addEventListener("mouseup", (event) => {
        event.preventDefault();
        testDown = false;
      });
      document.addEventListener("mousemove", (event) => {
        if(testDown){
          let x = event.clientX / window.innerWidth * 100 - downCordsTest.x;
          let y = event.clientY / window.innerWidth * 100 - downCordsTest.y;
          testPosition.x = x;
          testPosition.y = y;
          $(this.test).css({position: "fixed", left: testPosition.x + "vw", top: testPosition.y + "vw"});
        }
      });

      if(testOnclick){

      }

      break;
  }
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
    if(limbs[limbs.length - 1].status && limbs[limbs.length - 1].statusReady){  
      limbs[limbs.length - 1].controls("sizeController");
      limbs[limbs.length - 1].controls("rotateControllerTest");
      limbs[limbs.length - 1].controls("delite");
      limbs[limbs.length - 1].controls("test");
    }
  }
}

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