let lewoDown = false;
let prawoDown = false;
let goraDown = false;
let dolDown = false;
let shiftDown = false;
let szybkosc = 0.1;
let iloscJedzenia = 5;
let rozmiar = 10;
let brokoly = [];
let banany = [];
let eliksir = [];
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
$("body").append('<h1 id="instrukcja" style="font-size: 3vw; color: rgb(4, 255, 0); border-style: solid; border-radius: 5px; left: 30%; width: 99vw">INSTRUKCAJA: Pewien wieprzyk o imieniu Cycek <em>UWIELBIA</em> jeść wszystko, oprócz <em>zielonych rzeczy</em> oraz bomb. Twoje zadanie jest proste. Nakarmij ukochanego wieprzyka Cycka, tak mocno jak tylko się da! Miłej gry<button onclick="poczatek()">start</button></h1>');    
function poczatek(){
    $("#instrukcja").remove();
    $("body").append('<h1 id="dane" style="position: fixed; font-size: 1.9vw; color: rgb(0, 0, 0); left: 4%; top: 3%; width: 3.40vw;">rozmiar: 100kg</h1>');

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
        $("body").append('<h1 id="gameOver" style="font-size: 6.6vw; color: rgb(4, 255, 0); border-style: solid; border-radius: 5vw; left: 30%">GAME OVER</h1>');    
        $("#gameOver").css({position: "fixed", left: 30 + '%', top: 30 + '%'}).fadeOut(0);
        setTimeout(
            () => {
                $("body").append('<h1 id="podGameOver" style="position: fixed; font-size: 4vw; color: rgb(4, 255, 0); border-style: solid; border-height: 30%; left: 0%; top: 20%">Wieprzyk o imienu Cycek nie chce już jeść nic zielonego do tego stopnia że aż go pokiełbasiło na schab. By zagrać ponownie wystarczy tylko <a href="javascript:location.reload()" style="color: rgb(4, 255, 0);">odświeżyć stronę</a></h1>');
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
                                "font-size": 5.6 + "vw",
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
        this.y = y / 2 - rozmiar;
        this.width = width;
        this.height = height;

        this.cycekHtml = '<img src="' + this.img + '" style="width:' + this.width + 'vw; height:' + this.height + 'vw">';
        this.cycekImg = $(this.cycekHtml);
        this.cycekImg.css({position:"fixed", left: this.x + "vw", top: this.y + "vw"}); 
        $("div1").append(this.cycekImg);
    }

    Cycek.prototype.przesun = function(x, y)
    {
        this.x = x;
        this.y = y / 2 - rozmiar;
        this.cycekImg.animate({left: this.x + "vw", top: this.y + "vw"}, 50);
    }

    Cycek.prototype.zmienRozmiar = function(width, height)
    {
        this.x -= (width - this.width) / 2;
        this.y = 100 / 2 - this.height;
        this.width = width;
        this.height = height;
        $(this.cycekImg).remove();
        this.cycekHtml = '<img src="' + this.img + '" style="width:' + this.width + 'vw; height:' + this.height + 'vw">';
        this.cycekImg = $(this.cycekHtml);
        this.cycekImg.css({position:"fixed", left: this.x + "vw", top: this.y + "vw"}); 
        $("div1").append(this.cycekImg);
    }

    Cycek.prototype.steruj = function(szybkosc)
    {
        if(shiftDown){
            szybkosc = rozmiar * 0.1;
        }
        if(lewoDown){
            this.x -= szybkosc;
            //console.log("przesunięto w lewo o: " + szybkosc);
            //console.log("pozycja x: " + this.x)
        }
        if(goraDown){
            //this.y -= szybkosc;
        }
        if(prawoDown){
            this.x += szybkosc;
        }
        if(dolDown){
            //this.y += szybkosc;
        }
        if(this.y > 100)
            this.y = -this.height;
        else if((this.y + this.height) < 0)
            this.y = 100;

        if(this.x > 100)
            this.x = -this.width;
        else if((this.x + this.width) < 0)
            this.x = 100;        
    }

    function Brokoly()
    {   
        setTimeout(
            () => {
                if(jedzenieDelite)
                    return;

                this.rozmiar = losuj(2, 6);
                this.y = -this.rozmiar * 2;
                this.x = losuj(this.rozmiar, 100) - this.rozmiar
                this.brokolyHtml = '<img src="images/brokuł2.png" style="width:' + this.rozmiar + 'vw; height:' + this.rozmiar + 'vw;">'
                this.brokolyImg = $(this.brokolyHtml);
                this.brokolyImg.css({position: "fixed", left: this.x + "vw", top: this.y + "vw"});
                $("div1").append(this.brokolyImg);
                this.spadanie = setInterval(
                    () => {
                        this.y += this.rozmiar * szybkosc;
                        $(this.brokolyImg).css({top: this.y + "vw"});
                        
                        if((this.x > cycek.x && this.x < cycek.x + cycek.width && this.y > cycek.y && this.y < cycek.y + cycek.height) || (this.x + this.rozmiar > cycek.x && this.x + this.rozmiar < cycek.x + cycek.width && this.y + this.rozmiar > cycek.y && this.y + this.rozmiar < cycek.y + cycek.height) || this.x < cycek.x && this.x + this.rozmiar > cycek.x + cycek.width && this.y < cycek.y && this.y + this.rozmiar > cycek.y + cycek.height){
                            $(this.brokolyImg).remove();
                            clearInterval(this.spadanie);
                            brokoly.pop();
                            rozmiar -= this.rozmiar * 0.3;
                            if(rozmiar >= 40){
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar * 10) + "kg     shift = sprint   strzałka w góre lub dół = fajne rzeczy");
                            }else if(rozmiar >= 20){
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar * 10) + "kg     shift = sprint");
                            }else{ 
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar * 10) + "kg");
                            }
                        }

                        if(this.y > 100){
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
                
                this.rozmiar = losuj(2, 6);
                this.y = -this.rozmiar;
                this.x = losuj(this.rozmiar, 100) - this.rozmiar
                this.bananyHtml = '<img src="images/banan2.png" style="width:' + this.rozmiar + 'vw; height:' + this.rozmiar + 'vw;">'
                this.bananyImg = $(this.bananyHtml);
                this.bananyImg.css({position: "fixed", left: this.x + "vw", top: this.y + "vw"});
                $("div1").append(this.bananyImg);
                this.spadanie = setInterval(
                    () => {
                        this.y += this.rozmiar * szybkosc;
                        $(this.bananyImg).css({top: this.y + "vw"});
                        
                        if((this.x > cycek.x && this.x < cycek.x + cycek.width && this.y > cycek.y && this.y < cycek.y + cycek.height) || (this.x + this.rozmiar > cycek.x && this.x + this.rozmiar < cycek.x + cycek.width && this.y + this.rozmiar > cycek.y && this.y + this.rozmiar < cycek.y + cycek.height) || this.x < cycek.x && this.x + this.rozmiar > cycek.x + cycek.width && this.y < cycek.y && this.y + this.rozmiar > cycek.y + cycek.height){
                            $(this.bananyImg).remove();
                            clearInterval(this.spadanie);
                            banany.pop();
                            rozmiar += this.rozmiar * 0.3;
                            if(rozmiar >= 40){
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar * 10) + "kg     shift = sprint   strzałka w góre lub dół = fajne rzeczy");
                            }else if(rozmiar >= 20){
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar * 10) + "kg     shift = sprint");
                            }else{ 
                                $("#dane").text("rozmiar: " + Math.floor(rozmiar * 10) + "kg");
                            }
                        }

                        if(this.y > 100){
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

    function Eliksir()
    {   
        setTimeout(
            () => {
                if(jedzenieDelite)
                    return;
                
                this.rozmiar = losuj(4, 6);
                this.y = -this.rozmiar;
                this.x = losuj(this.rozmiar, 100) - this.rozmiar
                this.numer = Math.floor(Math.random() * 2);
                this.ileDodac = 1;
                this.eliksirHtml = '';
                if(this.numer === 1){
                    this.ileDodac = 1;
                    this.eliksirHtml = '<img src="images/Butelka1.png" style="width:' + this.rozmiar + 'vw; height:' + this.rozmiar + 'vw;">';
                }else{
                    this.ileDodac = -1;
                    this.eliksirHtml = '<img src="images/Butelka0.png" style="width:' + this.rozmiar + 'vw; height:' + this.rozmiar + 'vw;">';
                }
                this.eliksirImg = $(this.eliksirHtml);
                this.eliksirImg.css({position: "fixed", left: this.x + "vw", top: this.y + "vw"});
                $("div1").append(this.eliksirImg);
                this.spadanie = setInterval(
                    () => {
                        this.y += this.rozmiar * szybkosc;
                        $(this.eliksirImg).css({top: this.y + "vw"});
                        
                        if((this.x > cycek.x && this.x < cycek.x + cycek.width && this.y > cycek.y && this.y < cycek.y + cycek.height) || (this.x + this.rozmiar > cycek.x && this.x + this.rozmiar < cycek.x + cycek.width && this.y + this.rozmiar > cycek.y && this.y + this.rozmiar < cycek.y + cycek.height) || this.x < cycek.x && this.x + this.rozmiar > cycek.x + cycek.width && this.y < cycek.y && this.y + this.rozmiar > cycek.y + cycek.height){
                            $(this.eliksirImg).remove();
                            clearInterval(this.spadanie);
                            this.timer = 0;
                            let newInterval = setInterval(
                                () => {
                                    this.timer++;
                                    rozmiar += this.ileDodac / 10;
                                    if(rozmiar >= 40){
                                        $("#dane").text("rozmiar: " + Math.floor(rozmiar * 10) + "kg     shift = sprint   strzałka w góre lub dół = fajne rzeczy");
                                    }else if(rozmiar >= 20){
                                        $("#dane").text("rozmiar: " + Math.floor(rozmiar * 10) + "kg     shift = sprint");
                                    }else{ 
                                        $("#dane").text("rozmiar: " + Math.floor(rozmiar * 10) + "kg");
                                    }
                                    if(this.timer > 100){
                                        clearInterval(newInterval);
                                        eliksir.pop();
                                    }
                                },
                                20
                            );
                                
                        }

                        if(this.y > 100){
                            $(this.eliksirImg).remove();
                            clearInterval(this.spadanie);
                            eliksir.pop();
                        }
                        
                        if(jedzenieDelite)
                            clearInterval(this.spadanie);
                    }, 20
                );
            }, 
            losuj(20000, 60000)
        );
    }

    $("div2").fadeIn(150);
    let cycek = new Cycek("Images/cycek2.png", 50, 100, rozmiar, rozmiar);
    let gra = setInterval(
        () => {
            if(shiftDown && (lewoDown || prawoDown)){
                cycek.zmienRozmiar(rozmiar * 1.6, rozmiar * 0.5);    
            }else if(goraDown && !lewoDown && !prawoDown && !dolDown && (rozmiar >= 40)){
                cycek.zmienRozmiar(rozmiar * 0.355, rozmiar * 1.5);      
            }else if(dolDown && !prawoDown && !lewoDown && (rozmiar >= 40)){
                cycek.zmienRozmiar(rozmiar * 1.955, rozmiar * 0.35)
            }else{
                cycek.zmienRozmiar(rozmiar, rozmiar);
            }
            cycek.steruj((100 / (rozmiar / 15)) / 300);
            
            while(brokoly.length < iloscJedzenia * 1.5){
                brokoly.unshift(new Brokoly());
            }
            
            while(banany.length < iloscJedzenia){
                banany.unshift(new Banany());
            }

            while(eliksir.length < 1){
                eliksir.unshift(new Eliksir());
            }

            if(rozmiar < 4.5){
                clearInterval(gra);
                jedzenieDelite = true;
                $("div1").fadeOut(3000);
                $("#dane").fadeOut(3000);
                setTimeout(
                    () => {
                        $("#dane").remove();
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
                    if(rozmiar >= 20)
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






