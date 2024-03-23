var x = document.createElement("AUDIO");
x.setAttribute("src", "sounds/05 - Beating around the Bush.mp3");
//x.setAttribute("controls","controls");
document.body.appendChild(x);
/*function play()
{
    x.play();
}
let odtwarzacz = document.getElementById('player');
let video = document.getElementById('video');
function wlaczOdtwarzacz(){
    odtwarzacz.innerHTML='<iframe src="https://www.youtube.com/embed/sSKR_G3R_b0?si=24Q1U0-s4FXN6Jbc&amp;controls=0;loop=1;showinfo=0;playsinline=0;start=1;autoplay=1" title="YouTube video player"></iframe>';
}*/

let kordyWowiskoinza = {rozmiar: 11, left: 59, top: 2};
let wowiskoinzy ='<img src="Images/Wowiskoinz-2.png" style="position: fixed; width: ' + kordyWowiskoinza.rozmiar + 'vw; height: ' + kordyWowiskoinza.rozmiar + 'vw; left: ' + kordyWowiskoinza.left + '%; top: ' + kordyWowiskoinza.top + 'vw;">'
let wowiskoinz = $(wowiskoinzy);
let animacja = 0;
let szybkosc = 50;
let mouseDown = false;
let wowiskoinzTrue = true;
let mysz = document.getElementById("plotno");
//let kontekst = mysz.getContext("2d");
let pixl;
let celownikImg = "Images/kursory/kursor-snajperskiCelownik9.gif";
//kontekst.lineWidth = 4;
//kontekst.fillStyle = "rgb(0, 255, 3)";
//kontekst.strokeStyle = "rgb(0, 255, 3)";
let games = [];
$("body").append("<style id='kursorA'> a, a:hover {cursor: url(" + celownikImg + ") 17.5 17.5, default;} </style>");
let numerKlatki = -1;
function zmienCelownik(img)
{
    $("#kursorA").remove();
    celownikImg = img;
    $("body").append("<style id='kursorA'> a, a:hover {cursor: url(" + celownikImg + ") 17.5 17.5, default;} </style>");
}
setInterval(
    () => {
        if(numerKlatki >= 55){
            numerKlatki = -1;
        }
        numerKlatki++;
        zmienCelownik("Images/kursory/kursorKońcowy/kaltka" + numerKlatki + ".png");
    }, 
    7
);
function wowiskoinzIf(ifTrueOrIfFalse, speed)
{
    switch(ifTrueOrIfFalse){
        case true:
            if(animacja >= 1){
                wowiskoinzTrue = false;
                wowiskoinz.animate({width: kordyWowiskoinza.rozmiar / 2 + "vw", height: kordyWowiskoinza.rozmiar / 2 + "vw", left: "50%"}, speed);
                $("div1").animate({opacity: 0.9}, speed);
            }
            break;
        case false:
            if(animacja < 1){
                wowiskoinzTrue = true;
                $("div1").animate({opacity: 0}, speed);
                wowiskoinz.animate({width: kordyWowiskoinza.rozmiar + "vw", height: kordyWowiskoinza.rozmiar + "vw", left: kordyWowiskoinza.left + "%"}, speed);
            }
            break;
    } 
}
function updateWoKoInformations()
{    
    let speed = 250;
    let myInterval = setInterval(
        () => {
            if(!wowiskoinzTrue){
                clearInterval(myInterval);
                setTimeout(
                    () => {
                        speed = 500;
                        let myNextInterval = setInterval(
                            () => {
                                if(wowiskoinzTrue){
                                    clearInterval(myNextInterval);
                                    setTimeout(() => {updateWoKoInformations();}, 1);
                                }
                                wowiskoinzIf(false, speed);
                                //console.log("false");
                            }, 
                            1000
                        );
                    }, 
                    speed
                );
            }
            wowiskoinzIf(true, speed);
            //console.log("true");
        }, 
        10
    );
}
/*
function rysujKursor()
{
    mysz = document.getElementById("plotno");
    pixl = (mysz.width + mysz.height) / 70;
    console.log(pixl);
    
    //kontekst.fillRect(0, 0, 35, 35);
    kontekst.clearRect(0, 0, pixl * 35, pixl * 35);
    kontekst.beginPath();
    kontekst.arc(17.5 * pixl, 17.5 * pixl, 13.5 * pixl, 0, Math.PI * 2, false);

    kontekst.moveTo(17.5 * pixl, 0); 
    kontekst.lineTo(17.5 * pixl, 10.5 * pixl);
    kontekst.moveTo(17.5 * pixl, 35 * pixl); 
    kontekst.lineTo(17.5 * pixl, 24.5 * pixl);

    kontekst.moveTo(0, 17.5 * pixl); 
    kontekst.lineTo(10.5 * pixl, 17.5 * pixl);
    kontekst.moveTo(35 * pixl, 17.5 * pixl); 
    kontekst.lineTo(24.5 * pixl, 17.5 * pixl);

    kontekst.moveTo(14.5 * pixl, 17.5 * pixl); 
    kontekst.lineTo(20.5 * pixl, 17.5 * pixl);

    kontekst.moveTo(17.5 * pixl, 14.5 * pixl); 
    kontekst.lineTo(17.5 * pixl, 20.5 * pixl);
    //kontekst.beginPath();

    //kontekst.moveTo(15.5, 0); 
    //kontekst.lineTo(10, 17.5);
    //kontekst.lineTo(25, 17.5);
    //kontekst.lineTo(14.5, 35);

    kontekst.stroke();
}
function rysujMysze()
{
    kontekst.lineWidth = 4;
    pixl = 1;
    kontekst.beginPath();
    kontekst.arc(17.5 * pixl, 17.5 * pixl, 13.5 * pixl, 0, Math.PI * 2, false);

    kontekst.moveTo(17.5 * pixl, 0); 
    kontekst.lineTo(17.5 * pixl, 10.5 * pixl);
    kontekst.moveTo(17.5 * pixl, 35 * pixl); 
    kontekst.lineTo(17.5 * pixl, 24.5 * pixl);

    kontekst.moveTo(0, 17.5 * pixl); 
    kontekst.lineTo(10.5 * pixl, 17.5 * pixl);
    kontekst.moveTo(35 * pixl, 17.5 * pixl); 
    kontekst.lineTo(24.5 * pixl, 17.5 * pixl);

    //kontekst.lineWidth = 0.2;
    kontekst.moveTo(14.5 * pixl, 17.5 * pixl); 
    kontekst.lineTo(20.5 * pixl, 17.5 * pixl);

    kontekst.moveTo(17.5 * pixl, 14.5 * pixl); 
    kontekst.lineTo(17.5 * pixl, 20.5 * pixl);
    kontekst.stroke();
}*/

function AddGame(x, y, img, href, textX, textY, text, where)
{    
    this.x = x;
    this.y = y;
    this.img = img;
    this.href = href;
    this.hrefHtml = '<a href="' + this.href + '" target="_blank"></a>';
    this.hrefHtml = $(this.hrefHtml);
    this.where = where;
    this.html = $('<img src="' + this.img + '" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + this.x + '%; top: ' + this.y + 'vw; width: 11vw; height: 11vw;">');
    this.textX = textX;
    this.textY = textY;
    this.text = text;
    this.textHtml = '<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + this.textX + 'vw; top: ' + this.textY + 'vw; width: 11vw; font-size: 2vw;">' + this.text + '</h1>';
    this.textHtml = $(this.textHtml);
    $(this.where).append(this.hrefHtml);
    $(this.hrefHtml).append(this.html);
    $(this.hrefHtml).append(this.textHtml);
}
AddGame.prototype.changePosition = function(howMuchX, howMuchY)
{
    if(howMuchX === null || undefined || ""){
        howMuchX = 0;
    }
    if(howMuchY === null || undefined || ""){
        howMuchY = 0;
    }
    let x = this.x + howMuchX;
    let y = this.y + howMuchY;
    $(this.html).css({left: x + "%", top: y + "vw"});

    let textX = this.textX + howMuchX;
    let textY = this.textY + howMuchY;
    $(this.textHtml).css({left: textX + "vw", top: textY + "vw"});    
};
function wlaczVideo(){
    $("body").append('<iframe width="1" height="1" style="position: fixed; opacity: 0;" src="https://www.youtube.com/embed/sSKR_G3R_b0?si=cDj_ldd5KenVfLwz&amp;controls=0&autoplay=1&mute=0&loop=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
  //  $("body").append('<iframe width="1" height="1" style="position: fixed; opacity: 0;" src="https://www.youtube.com/embed/videoseries?list=OLAK5uy_lwMFv-4tEIiqHk-FfJ4LpmbjPK-ELUyRI&controls=0&autoplay=1&mute=0&shuffle=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
}
function czySlowoZawieraWulgaryzm(slowoDoSprawdzenia)
{
    let listaWulgaryzmow = [
        'cholera',
        'kurewka',
        'kurwa',
        'pieprzyć',
        'jebać',
        'suka',
        'sukinsyn',
        'pierdolić',
        'cipa',
        'chuj',
        'dziwka',
        'cipka',
        'szmata',
        'pojeb',
        'skurwysyn',
        'jebany',
        'pierdolony',
        'dziwko',
        'cholerny',
        'do kurwy nędzy',
        'kurczę',
        'kurdupel',
        'hitler',
        'stalin',
        'putin',
        'russia',
        'rosja'
        // Dodaj więcej wulgaryzmów według potrzeb
    ];

    let gotoweSlowo = slowoDoSprawdzenia.toLowerCase();
    for(let j = 0; j < listaWulgaryzmow.length; j++){

        if(listaWulgaryzmow[i].includes(gotoweSlowo)){
            return true;
        }
        for(var i = 0; i < gotoweSlowo.length; i++){
            
        }
    }
    return false;
}
function wszystkoGotowe(){
    //$("div1").fadeOut(0);
    wowiskoinzy = 7679;
    let nazwaUzytkownika = "Wowisko";//prompt("Twoja nazwa szefie!");
    switch(nazwaUzytkownika){
        case null: 
            nazwaUzytkownika = "???Bezimiennik???"
            break;
        case undefined:
            nazwaUzytkownika = "???Bezimiennik???"
            break;
        case "":
            nazwaUzytkownika = "???Bezimiennik???"
            break;        
    }
    let klatki = {
        x: 150,
        y: 150,
        numerY: 0.875,
        numerX: -0.5
    };
    function element(kierunek)
    {    
        klatki.numerX++;

        switch(kierunek){
            case "x":
                if(klatki.numerX >= 7.5){
                    klatki.numerX = 0.5;
                    klatki.numerY += 1.65;
                }
                kierunek = (klatki.x * klatki.numerX) / 2;
                break;
            case "y":
                kierunek = klatki.y * klatki.numerY;  
                break;

        }
        return kierunek / 10;
    }

    function elementTekstu(kierunek)
    {    
        switch(kierunek){
            case "x":
                kierunek = (klatki.x * klatki.numerX - klatki.x) / 2;
                break;
            case "y":
                kierunek = klatki.y * klatki.numerY + 110; 
                break;
        }
        return kierunek / 10;
    }

    function start()
    {
        $("#start").remove();
        //pokaż listę moich gier/stron
        games.push(new AddGame(element("x"), element("y"), "pozostałe strony/banany/Images/banan.png", "pozostałe strony/banany/Banany.html", elementTekstu("x"), elementTekstu("y"), "Mega wyżerka!", "body"));
        games.push(new AddGame(element("x"), element("y"), "Images/NowaGra.png", "pozostałe strony/EnglishFight/EnglishFight.html", elementTekstu("x"), elementTekstu("y"), "EnglishFight", "body"));
        games.push(new AddGame(element("x"), element("y"), "Images/NowaGra-2.png", "about:blank", elementTekstu("x"), elementTekstu("y"), "Gra jeszcze nie gotowa", "body"));
        games.push(new AddGame(element("x"), element("y"), "Images/NowaGra-2.png", "about:blank", elementTekstu("x"), elementTekstu("y"), "Gra jeszcze nie gotowa", "body"));
        games.push(new AddGame(element("x"), element("y"), "Images/NowaGra-2.png", "about:blank", elementTekstu("x"), elementTekstu("y"), "Gra jeszcze nie gotowa", "body"));
        games.push(new AddGame(element("x"), element("y"), "Images/NowaGra-2.png", "about:blank", elementTekstu("x"), elementTekstu("y"), "Gra jeszcze nie gotowa", "body"));
        games.push(new AddGame(element("x"), element("y"), "Images/NowaGra-2.png", "about:blank", elementTekstu("x"), elementTekstu("y"), "Gra jeszcze nie gotowa", "body"));
        games.push(new AddGame(element("x"), element("y"), "Images/NowaGra-2.png", "about:blank", elementTekstu("x"), elementTekstu("y"), "Gra jeszcze nie gotowa", "body"));
        games.push(new AddGame(element("x"), element("y"), "Images/NowaGra-2.png", "about:blank", elementTekstu("x"), elementTekstu("y"), "Gra jeszcze nie gotowa", "body"));
        games.push(new AddGame(element("x"), element("y"), "Images/NowaGra-2.png", "about:blank", elementTekstu("x"), elementTekstu("y"), "Gra jeszcze nie gotowa", "body"));
        let bodyHeight = elementTekstu("y") + 11;
        $("body").css({height: bodyHeight + "vw"});
        $("body").append('<img id="podkładka" src="Images/podkładkaCzarna.png" style="position: fixed; left: 0vw; top: 0vw; width: 100vw; height: 13.5vw;">');
        $("body").append('<h1 id="welcome" style="z-index: 9999; font-size: 5vw; color: rgb(4, 255, 0); position: fixed; left: 2%; top: 0%;">Witam serdecznie na mojej stronie</h1>');
        $("#welcome").fadeOut(szybkosc * 3).fadeIn(szybkosc * 3);
        setTimeout(
            () => {
                $("#welcome").text(nazwaUzytkownika);
            }, 
            szybkosc * 3
        );
        //sprawdź czy nie kliknięto(jeśli tak to prześlij na stonę)
        $("body").append(wowiskoinz);
        wowiskoinz.mousemove(
            () => {
                animacja = 1.25;
            }
        );
        $("div1").mousemove(
            () => {
                animacja = 1.25;
            }
        );

        $(document).mousedown(
            (dane) => {
                if(dane.which === 1)
                    mouseDown = true;
            }
        );
        $(document).mouseup(
            (dane) => {
                if(dane === 1)
                    mouseDown = false;
            }
        );
        wowiskoinz.mousedown(
            (dane) => {
                if(dane === 1)
                    mouseDown = false;
            }
        );
        window.addEventListener("scroll", 
            () => {
                let scrollY = (window.scrollY / window.innerWidth   ) * 100;
                for(let i = 0; i < games.length; i++){
                    games[i].changePosition(0, -scrollY);
                }
            }
        );

        /*$(document).click(
            () => {
                games.push(new AddGame(element("x"), element("y"), "Images/NowaGra-2.png", "about:blank", elementTekstu("x"), elementTekstu("y"), "Gra jeszcze nie gotowa", "body"));
                let bodyHeight = elementTekstu("y") + 11;
                $("body").css({height: bodyHeight + "vw"});
            }
        );*/
        $(document).mousemove(
            (kordy) => {
                /*$("#plotno").css(
                    {
                        //transform: "rotate(" + (kordy.clientX + kordy.clientY) + "deg)",
                        left: kordy.clientX  - 17.5,
                        top: kordy.clientY - 17.5,
                        width: 35,
                        height: 35
                    }
                );*/
                if(!(animacja < 0.1)){
                    animacja -= 0.1;
                }
            }            
        );

        //poka wowiskoinza
    }

    $("body").append('<img id="WowiskoPrzedstawia" src="Images/Wowisko przedstawia.png" style="position: fixed; left: 20%; top: 11%; width: 56vw; height: 40vw;">');
    setTimeout(
        () => {
            $("#WowiskoPrzedstawia").fadeOut(szybkosc).remove();
            setTimeout(
                () => {
                    $("body").append('<h1 id="start" onclick="wlaczVideo()" style="font-size: 5vw; color: rgb(4, 255, 0); border-style: solid; border-color: rgb(4, 255, 0); position: fixed; left: 46%; top: 40%;">start</h1>');
                    $("#start").fadeOut(0).slideDown(szybkosc * 0.77).click(

                        () => {
                            start();
                            console.log("Witam na Wowisko.pl cheaterze");
                        }
                    );
                }, szybkosc
            );
        }, szybkosc * 5
    );
}

updateWoKoInformations();
