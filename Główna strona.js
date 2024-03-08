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

let mouseDown = false;
let mysz = document.getElementById("plotno");
let kontekst = mysz.getContext("2d");
let pixl;
kontekst.lineWidth = 4;
kontekst.fillStyle = "rgb(0, 255, 3)";
kontekst.strokeStyle = "rgb(0, 255, 3)";
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
}
function AddGame(x, y, img, href, where)
{
    this.x = x;
    this.y = y;
    this.img = img;
    this.href = href;
    this.where = where;
    this.html = $('<a href="this.href" target="_blank"><img src="' + this.img + '" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + this.x + '%; top: ' + this.y + 'vw; width: 11vw; height: 11vw;">');
    $(this.where).append(this.html);
}
AddGame.prototype.changePosition = function(howMuchX, howMuchY)
{
    switch(howMuchX){
        case null || undefined || ""
            break;
        case 
    };
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
    let kordyWowiskoinza = {rozmiar: 11, left: 59, top: 2};
    let wowiskoinzy ='<img src="Images/Wowiskoinz-2.png" style="position: fixed; width: ' + kordyWowiskoinza.rozmiar + 'vw; height: ' + kordyWowiskoinza.rozmiar + 'vw; left: ' + kordyWowiskoinza.left + '%; top: ' + kordyWowiskoinza.top + 'vw;">'
    let wowiskoinz = $(wowiskoinzy);
    wowiskoinzy = 7679;
    let animacja = 0;
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
    let szybkosc = 500;
    let klatki = {
        x: 150,
        y: 150,
        numerY: 0.7,
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
        $("body").append('<h1 id="welcome" style="z-index: 9999; font-size: 5vw; color: rgb(4, 255, 0); position: fixed; left: 2%; top: 0%;">Witam serdecznie na mojej stronie</h1>');
        $("#welcome").fadeOut(szybkosc * 3).fadeIn(szybkosc * 3);
        setTimeout(
            () => {
                $("#welcome").text(nazwaUzytkownika);
            }, 
            szybkosc * 3
        );
        //pokaż listę moich gier/stron
        rysujMysze();
        $("body").append('<a id="gry" href="pozostałe strony/banany/Banany.html" target="_blank"><img src="pozostałe strony/banany/images/banan.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: yellow; left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Mega wyżerka!</h1></a>');
        $("body").append('<a id="gry" href="pozostałe strony/EnglishFight/EnglishFight.html" target="_blank"><img src="Images/NowaGra.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">EnglishFight</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").append('<a id="gry" href="about:blank" target="_blank"><img src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + '%; top: ' + element("y") + 'vw; width: 11vw; height: 11vw;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'vw; top: ' + elementTekstu("y") + 'vw; width: 11vw; font-size: 2vw;">Gra jeszcze nie gotowa</h1></a>');
        $("body").css({height: elementTekstu("y") + "vw"});
        //sprawdź czy nie kliknięto(jeśli tak to prześlij na stonę)
        $("body").append(wowiskoinz);
        $(wowiskoinz).mousemove(
            () => {
                animacja = 1.1;
            }
        );
        $("div1").mousemove(
            () => {
                animacja = 1.1;
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
        $(wowiskoinz).mousedown(
            (dane) => {
                if(dane === 1)
                    mouseDown = false;
            }
        );

        let poprzednieKordynatyMyszki = null;
        $(document).mousemove(
            (kordy) => {
                $("#plotno").css(
                    {
                        //transform: "rotate(" + (kordy.pageX + kordy.pageY) + "deg)",
                        left: kordy.clientX  - 17.5,
                        top: kordy.clientY - 17.5,
                        width: 35,
                        height: 35
                    }
                );
                if(!(animacja < 0.1)){
                    animacja -= 0.1;
                }
                //console.log(animacja);
                console.log(mouseDown);
                if(mouseDown){
                    $("#gry").css(
                        {
                            top: "+=10vw"
                        }
                    );
                }
            }            
        );
        setInterval(
            () => {
                //wowiskoinzy++;
                //$("#iloscWowiskoinzow").text(wowiskoinzy);
                if(animacja >= 1){
                    //console.log("true");
                    $(wowiskoinz).animate({width: kordyWowiskoinza.rozmiar / 2 + "vw", height: kordyWowiskoinza.rozmiar / 2 + "vw", left: "50%"}, 500);
                    $("div1").animate({opacity: 0.9}, 500);
                }else{
                    $("div1").animate({opacity: 0}, 500);
                    $(wowiskoinz).animate({width: kordyWowiskoinza.rozmiar + "vw", height: kordyWowiskoinza.rozmiar + "vw", left: kordyWowiskoinza.left + "%"}, 500);
                }
            }, 
            550
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
