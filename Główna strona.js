/*let mysz = document.getElementById("epickiWskaznikMyski");
let kontekst = mysz.getContext("2d");
kontekst.lineWidth = 4;
kontekst.fillStyle = "rgb(0, 255, 3)";
//kontekst.clearRect(0, 0, 35, 35);
kontekst.fillRect(0, 0, 35, 35);*/

function wszystkoGotowe(){
    //$("div1").fadeOut(0);
    let kordyWowiskoinza = {rozmiar: 210, left: 59, top: 70};
    let wowiskoinzy ='<img src="Images/Wowiskoinz-2.png" style="position: fixed; width: ' + kordyWowiskoinza.rozmiar + 'px; height: ' + kordyWowiskoinza.rozmiar + 'px; left: ' + kordyWowiskoinza.left + '%; top: ' + kordyWowiskoinza.top + 'px;">'
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
        numerY: 1.5,
        numerX: -0.5
    };
    function element(kierunek)
    {    
        klatki.numerX++;

        switch(kierunek){
            case "x":
                if(klatki.numerX >= 11.5){
                    klatki.numerX = 0.5;
                    klatki.numerY += 1.65;
                }
                kierunek = klatki.x * klatki.numerX;
                break;
            case "y":
                kierunek = klatki.y * klatki.numerY;  
                break;

        }
        return kierunek;
    }

    function elementTekstu(kierunek)
    {    
        switch(kierunek){
            case "x":
                kierunek = klatki.x * klatki.numerX - klatki.x;
                break;
            case "y":
                kierunek = klatki.y * klatki.numerY + klatki.y - 10;  
                break;
        }
        return kierunek;
    }

    function start()
    {
        $("#start").remove();
        $("body").append('<h1 id="welcome" style="font-size: 450%; color: rgb(4, 255, 0); position: relative; left: 2%; top: 0%;">Witam serdecznie na mojej stronie</h1>');
        $("#welcome").fadeOut(szybkosc * 3).fadeIn(szybkosc * 3);
        setTimeout(
            () => {
                $("#welcome").text(nazwaUzytkownika);
            }, 
            szybkosc * 3
        );
        //pokaż listę moich gier/stron
        $("body").append('<a href="file:///Users/wowa/Desktop/work/MainPage/pozosta%C5%82e%20strony/banany/Banany.html"><img id="strona1" src="pozostałe strony/banany/images/banan.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + 'px; top: ' + element("y") + 'px; width: 150px; height: 150px;">').append('<h1 style="position: fixed; color: yellow; left: ' + elementTekstu("x") + 'px; top: ' + elementTekstu("y") + 'px; width: 180px;">Mega wyżerka!</h1></a>');
        $("body").append('<a href="about:blank"><img id="strona1" src="Images/NowaGra-2.png" style="position: fixed; border-style: solid; border-color: rgb(0, 255, 17); left: ' + element("x") + 'px; top: ' + element("y") + 'px; width: 150px; height: 150px;">').append('<h1 style="position: fixed; color: rgb(4, 255, 0); left: ' + elementTekstu("x") + 'px; top: ' + elementTekstu("y") + 'px; width: 180px;">Gra jeszcze nie gotowa</h1></a>');
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

        $(document).mousemove(
            (kordy) => {
                if(!(animacja < 0.1)){
                    animacja -= 0.1;
                    animacja = Math.floor(animacja * 10);
                    animacja = animacja / 10;
                }
                //$("#epickiWskaznikMyski").css({left: kordy.offsetX, top: kordy.offsetY});
                //console.log(animacja);
            }            
        );
        setInterval(
            () => {
                //wowiskoinzy++;
                //$("#iloscWowiskoinzow").text(wowiskoinzy);
                if(animacja >= 1){
                    //console.log("true");
                    $(wowiskoinz).animate({width: kordyWowiskoinza.rozmiar / 2, height: kordyWowiskoinza.rozmiar / 2, left: "50%"}, 500);
                    $("div1").animate({opacity: 0.9}, 500);
                }else{
                    $("div1").animate({opacity: 0}, 500);
                    $(wowiskoinz).animate({width: kordyWowiskoinza.rozmiar, height: kordyWowiskoinza.rozmiar, left: kordyWowiskoinza.left + "%"}, 500);
                }
            }, 
            500
        );
        //poka wowiskoinza
    }

    $("body").append('<img id="WowiskoPrzedstawia" src="Images/Wowisko przedstawia.png" style="position: fixed; left: 20%; top: 11%; width: 60%; height: 80%;">');
    setTimeout(
        () => {
            $("#WowiskoPrzedstawia").fadeOut(szybkosc).remove();
            setTimeout(
                () => {
                    $("body").append('<h1 id="start" style="font-size: 500%; color: rgb(4, 255, 0); border-style: solid; border-color: rgb(4, 255, 0); position: fixed; left: 46%; top: 40%;">start</h1>');
                    $("#start").fadeOut(0).slideDown(szybkosc * 0.77).click(

                        () => {
                            start();
                            console.log("Witam na konsoli JavaScript");
                        }
                    );
                }, szybkosc
            );
        }, szybkosc * 5
    );
}
