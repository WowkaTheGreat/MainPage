function Limb(left, top, width, height, src)
{
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
  this.dropZone = document.createElement("div");
  document.body.appendChild(this.dropZone);
  $(this.dropZone).css({
    left: this.left + "vw",
    top: this.top + "vw",
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
  }else if(src === ""){
    return;
  }else if(!(src === true) && !(src === undefined) && src === null){
    limbs.pop();
    this.dropZone.remove();
    alert("Odwołano");
  }

  this.dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  this.dropZone.addEventListener(
    "drop", (event) => {
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

    }
  );
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
    if(event.button === 3){
      cords.x = event.clientX / window.innerWidth * 100;
      cords.y = event.clientY / window.innerWidth * 100;
    }else if(buttons > 0){
      document.getElementById("button").remove();
      buttons = 0;
    }
  });
});