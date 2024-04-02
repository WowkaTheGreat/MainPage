function Limb(left, top, width, height, src)
{
  this.sizeController = false;
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
    border: "0.5vw dashed #000000",
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
  switch(controller){
    case "sizeController": 
      let sizeController = document.createElement("button");
      sizeController.id = "sizeController";
      $(sizeController).css({position: "fixed", left: this.left + "vw", top: this.top - 5 + "vw", width: this.width / 2 + "vw", height: this.height / 5 + "vw"});
      sizeController.textContent = "Size Controller";
      this.dropZone.appendChild(sizeController);
      sizeController.onclick = () => {
        if(!(sizeController.textContent === "Main menu")){
          sizeController.textContent = "Main menu";
          this.sizeController = true;
          $(sizeController).css({position: "fixed", left: this.left + "vw", top: this.top - 5 + "vw", width: this.width / 2 + "vw", height: this.height / 5 + "vw"});
        }else if(!(sizeController.textContent === "Size Controller")){
          sizeController.textContent = "Size Controller";
          this.sizeController = false;
          $(sizeController).css({position: "fixed", left: this.left + "vw", top: this.top - 5 + "vw", width: this.width / 2 + "vw", height: this.height / 5 + "vw"});
        }
      }
      this.dropZone.addEventListener("mousedown", (event) => {
        this.mouseDown = true;
        let lastMousePoint = {x: this.left + this.width / 2, y: this.top + this.height / 2};

        let x = event.clientX / window.innerWidth * 100;
        if(x > lastMousePoint.x){
          document.addEventListener("mousemove", (event) => {
            let x = event.clientX / window.innerWidth * 100;
            console.log("client x: " + x);
            if(this.sizeController && this.mouseDown){
              //let y = event.offsetY / window.innerWidth * 100;
              if(x > this.width / 2 + this.left){
                this.width = x - this.left;
                this.dropZone.style.width = this.width + "vw";
                this.droppedImage.style.width = this.width + "vw";
                lastMousePoint.x = x;
              }
            }
          });
        }else if(x < lastMousePoint.x){
          document.addEventListener("mousemove", (event) => {
            let x = event.clientX / window.innerWidth * 100;
            console.log("client x: " + x);
            if(this.sizeController && this.mouseDown){
              //let y = event.offsetY / window.innerWidth * 100;
              if(x < this.width / 2 + this.left){
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
        }
      });

      document.addEventListener("mouseup", () => {
        this.mouseDown = false;
      });

      break;
    case "coś tam": 
      //ble ble ble
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