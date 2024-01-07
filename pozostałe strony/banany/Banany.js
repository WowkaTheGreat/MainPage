let lewoDown = false;
let prawoDown = false;
let goraDown = false;
let dolDown = false;
let shiftDown = false;
let szybkosc = 1;
let iloscJedzenia = 5;
let rozmiar = 100;
let brokoly = [];
let banany = [];
let jedzenieDelite = false;
let tloHtml = '<img id="tło" src="https://wally.com.pl/galerie/f/fototapeta-na-sciane-zielona-trawa-fp-6421_57381.jpg" width="101%" height="101%" style="left: -1%; top: -1%; position: fixed;">'
let tlo = $(tloHtml);
let antyZbadajNaTlo = setInterval(
    () => {
        $("#tło").remove();
        $("div2").append(tlo);
    }, 
    10
);
$("div2").fadeOut(0);
$("body").append('<h1 id="instrukcja" style="font-size: 300%; color: rgb(4, 255, 0); border-style: solid; border-radius: 5px; left: 30%; width: 30%">INSTRUKCAJA: Pewien wieprzyk o imieniu Cycek <em>UWIELBIA</em> jeść wszystko, oprucz <em>zielonych rzeczy</em> oraz bomb. Twoje zadanie jest proste. Nakarmij ukochanego wieprzyka Cycka, tak mocno jak tylko się da! Miłej gry<button onclick="poczatek()">start</button></h1>');    
function poczatek(){
    $("#instrukcja").remove();
    $("div1").append('<h1 id="dane" style="position: fixed; font-size: 100; color: rgb(0, 0, 0); left: 4%; top: 3%; width: 200px;">rozmiar: </h1>');

    let klawisze = {
        37: "lewo",
        38: "góra",
        39: "prawo",
        40: "dół",
        65: "lewo",
        87: "góra",
        68: "prawo",
        83: "dół",
        16: "shift"     
    };

    function przegrana()
    {
        clearInterval(antyZbadajNaTlo);
        jedzenieDelite = true;
        $("div1").remove();
        $("body").append('<h1 id="gameOver" style="font-size: 660%; color: rgb(4, 255, 0); border-style: solid; border-radius: 500px; left: 30%">GAME OVER</h1>');    
        $("#gameOver").css({position: "fixed", left: 30 + '%', top: 30 + '%'}).fadeOut(0);
        setTimeout(
            () => {
                $("body").append('<h1 id="podGameOver" style="position: fixed; font-size: 400%; color: rgb(4, 255, 0); border-style: solid; border-height: 30%; left: 0%; top: 20%">Wieprzyk o imienu Cycek nie chce już jeść nic zielonego, ma dość ale nadal możesz się poprawić. Wystarczy tylko <a href="javascript:location.reload()" style="color: rgb(4, 255, 0);">odświeżyć stronę</a></h1>');
                $("#podGameOver").fadeOut(0);
                $("#gameOver").slideDown(1500);
                $("div2").fadeOut(1500);
                setTimeout(
                    () => {
                        $("#gameOver").animate(
                            {
                                top: 3 + "%",
                            },
                            1350
                        );
                        $("#gameOver").animate(
                            {
                                "font-size": 560 + "%",
                            }, 
                            750
                        );
                        setTimeout(
                            () => {
                                $("#podGameOver").fadeIn(3000);
                            }, 
                            2100
                        );
                    }, 
                    2000
                );
            /* setInterval(
                    () => {
                        $("#odswiez").animate({color: 'rgb' + (4, 55, 0)}, 500);
                        $("#odswiez").animate({color: 'rgb' + (4, 255, 0)}, 500);
                    }, 
                    1000
                );*/
            },
            1000
        );
    }

    function losuj(odIlu, doIlu)
    {   doIlu++;
        let los = Math.floor(Math.random() * doIlu);
        while(los < odIlu){
            los++;
        }
        return los;
    }

    function Cycek(img, x, y, width, height)
    {
        this.img = img;
        this.x = x;
        this.y = y - rozmiar;
        this.width = width;
        this.height = height;

        this.cycekHtml = '<img src="' + this.img + '" width="' + this.width + '" height="' + this.height + '">';
        this.cycekImg = $(this.cycekHtml);
        this.cycekImg.css({position:"fixed", left: this.x, top: this.y}); 
        $("div1").append(this.cycekImg);
    }

    Cycek.prototype.przesun = function(x, y)
    {
        this.x = x;
        this.y = y;
        this.cycekImg.animate({left: this.x, top: this.y}, 50);
    }

    Cycek.prototype.zmienRozmiar = function(width, height)
    {
        this.x -= (width - this.width) / 2;
        this.y -= (height - this.height) / 1.0785;
        this.width = width;
        this.height = height;
        $(this.cycekImg).remove();
        this.cycekHtml = '<img src="' + this.img + '" width="' + this.width + '" height="' + this.height + '">';
        this.cycekImg = $(this.cycekHtml);
        this.cycekImg.css({position:"fixed", left: this.x, top: this.y}); 
        $("div1").append(this.cycekImg);
    }

    Cycek.prototype.steruj = function(szybkosc)
    {
        if(shiftDown)
            szybkosc = rozmiar * 0.1;
        if(lewoDown)
            this.x -= szybkosc;
        if(goraDown){
            //this.y -= szybkosc;
        }
        if(prawoDown)
            this.x += szybkosc;
        if(dolDown){
            //this.y += szybkosc;
        }
        if(this.y > 950){
            this.y = -this.height;
        }else if(this.y < -this.height){
            this.y = 950;
        }

        if(this.x > 2000)
            this.x = -this.width;
        else if(this.x < -this.width)
            this.x = 2000;        
    }

    function Brokoly()
    {   
        setTimeout(
            () => {
                if(jedzenieDelite)
                    return;

                this.rozmiar = losuj(40, 120);
                this.y = -this.rozmiar;
                this.x = losuj(0, 1800) - 5;
                this.brokolyHtml = '<img src="images/brokuł2.png" width="' + this.rozmiar + '" height="' + this.rozmiar + '">'
                this.brokolyImg = $(this.brokolyHtml);
                this.brokolyImg.css({position: "fixed", left: this.x, top: this.y});
                $("div1").append(this.brokolyImg);
                this.spadanie = setInterval(
                    () => {
                        this.y += this.rozmiar * szybkosc / 15;
                        $(this.brokolyImg).css({top: this.y});
                        
                        if((this.x > cycek.x && this.x < cycek.x + cycek.width && this.y > cycek.y && this.y < cycek.y + cycek.height) || (this.x + this.rozmiar > cycek.x && this.x + this.rozmiar < cycek.x + cycek.width && this.y + this.rozmiar > cycek.y && this.y + this.rozmiar < cycek.y + cycek.height) || this.x < cycek.x && this.x + this.rozmiar > cycek.x + cycek.width && this.y < cycek.y && this.y + this.rozmiar > cycek.y + cycek.height){
                            $(this.brokolyImg).remove();
                            clearInterval(this.spadanie);
                            brokoly.pop();
                            rozmiar -= this.rozmiar * 0.2;
                            if(rozmiar >= 200)
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar) + "kg    zaciśnij shift, a będzie sprint");
                            else
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar) + "kg");
                        }

                        if(this.y > 950){
                            $(this.brokolyImg).remove();
                            clearInterval(this.spadanie);
                            brokoly.pop();
                        }

                        if(jedzenieDelite)
                            clearInterval(this.spadanie); 
                    }, 20
                );
            }, 
            losuj(0, 9000)
        );
    }

    function Banany()
    {   
        setTimeout(
            () => {
                if(jedzenieDelite)
                    return;
                
                this.rozmiar = losuj(40, 120);
                this.y = -this.rozmiar;
                this.x = losuj(0, 1800) - 5;
                this.bananyHtml = '<img src="images/banan2.png" width="' + this.rozmiar + '" height="' + this.rozmiar + '">'
                this.bananyImg = $(this.bananyHtml);
                this.bananyImg.css({position: "fixed", left: this.x, top: this.y});
                $("div1").append(this.bananyImg);
                this.spadanie = setInterval(
                    () => {
                        this.y += this.rozmiar * szybkosc / 15;
                        $(this.bananyImg).css({top: this.y});
                        
                        if((this.x > cycek.x && this.x < cycek.x + cycek.width && this.y > cycek.y && this.y < cycek.y + cycek.height) || (this.x + this.rozmiar > cycek.x && this.x + this.rozmiar < cycek.x + cycek.width && this.y + this.rozmiar > cycek.y && this.y + this.rozmiar < cycek.y + cycek.height) || this.x < cycek.x && this.x + this.rozmiar > cycek.x + cycek.width && this.y < cycek.y && this.y + this.rozmiar > cycek.y + cycek.height){
                            $(this.bananyImg).remove();
                            clearInterval(this.spadanie);
                            banany.pop();
                            rozmiar += this.rozmiar * 0.17;
                            if(rozmiar >= 200)
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar) + "kg    zaciśnij shift, a będzie sprint");
                            else
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar) + "kg");
                        }

                        if(this.y > 950){
                            $(this.bananyImg).remove();
                            clearInterval(this.spadanie);
                            banany.pop();
                        }
                        
                        if(jedzenieDelite)
                            clearInterval(this.spadanie);
                    }, 20
                );
            }, 
            losuj(0, 9000)
        );
    }

    $("div2").fadeIn(150);
    let cycek = new Cycek("Images/cycek2.png", 500, 940, rozmiar, rozmiar);
    let gra = setInterval(
        () => {
            rozmiar = Math.floor(rozmiar);
            if(shiftDown && (lewoDown || prawoDown)){
                cycek.zmienRozmiar(rozmiar * 1.5, rozmiar * 0.5);    
            }else if(shiftDown && (goraDown || dolDown)){
                cycek.zmienRozmiar(rozmiar * 0.5, rozmiar * 1.5);      
            }else{
                cycek.zmienRozmiar(rozmiar, rozmiar);
            }
            cycek.steruj(100 / (rozmiar / 15));
            
            while(brokoly.length < iloscJedzenia * 1.5){
                brokoly.unshift(new Brokoly());
            }
            
            while(banany.length < iloscJedzenia){
                banany.unshift(new Banany());
            }

            if(rozmiar < 45){
                clearInterval(gra);
                jedzenieDelite = true;
                $("div1").fadeOut(3000);
                setTimeout(
                    () => {
                        przegrana();
                    }, 
                    3000
                );
            }

        }, 30
    );

$("body").keydown(
    (klawisz) => {
        //console.log(klawisz.keyCode);
        let wcisnietyKlawisz = klawisze[klawisz.keyCode];
        switch(wcisnietyKlawisz){
            case "lewo":
                lewoDown = true;
                break;
            case "góra":
                goraDown = true;
                break;
            case "prawo":
                prawoDown = true;
                break;
            case "dół":
                dolDown = true;
                break;
            case "shift":
                if(rozmiar >= 200)
                    shiftDown = true;
                break;
        }
    }
);

$("body").keyup(
    (klawisz) => {
        let odcisnietyKlawisz = klawisze[klawisz.keyCode];
        switch(odcisnietyKlawisz){
            case "lewo":
                lewoDown = false;
                break;
            case "góra":
                goraDown = false;
                break;
            case "prawo":
                prawoDown = false;
                break;
            case "dół":
                dolDown = false;
                break;
            case "shift":
                shiftDown = false;
                break;
        }
    }
);

}






