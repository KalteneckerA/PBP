

var felh = []
var felhsz = 0
var csekk = []
var csekksz = 0
var adminjel = "19450430"

var i = 0
var j = 0
var bejeli = false
var bejelifel = ""
var bkezd = ('<button id="bk" onclick="kezd()">Kezdőlap</button>')
var btarca = ('<button id ="bt" onclick="tarca()">Tárca</button>')
var bnev = ('<button id="bnev" onclick="bnev()">PBP</button>')
var bvar = ('<button id="bvar" onclick="bvarf()">Várhatóak</button>')
var talca = ('<div id="talca"><button id="bk" onclick="kezd()">Kezdőlap</button><button id ="bt" onclick="tarca()">Tárca</button><button id="bnev" onclick="bnev()">PBP</button><button id="bvar" onclick="bvarf()">Várhatóak</button></div><button onclick="download(felh,"felh")"">letölt</button>')
var kvar = ('<button id="kvar" onclick="kijel()">KIJELENTKEZÉS</button>')
var epveletlen = ""
var eppenutalando = 0
var eppnem = 0




// A GitHub API elérési útvonala
const GITHUB_API_URL = 'https://api.github.com/repos/kalteneckera/PBP/contents/save.json';
const TOKEN = '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'; // GitHub Token

// Változók, amiket menteni szeretnél


// Adatok mentése a GitHub-ra
function bnev() {
const data = {
    felh,
    felhsz,
    csekk,
    csekksz,
    adminjel
};

// Base64 kódolás az adatokhoz
const content = btoa(JSON.stringify(data));

const body = {
    message: 'Mentés',
    content: content,
    sha: 'f4fb4a9fc56e8b7398dabd550db52693cc759217e07bd570ba9e822ee08eebb7', // Ezt a fájl SHA-ját add meg, ha létezik
};

fetch(GITHUB_API_URL, {
    method: 'PUT',
    headers: {
        'Authorization': `token ${TOKEN}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
})
.then(response => {
    if (response.ok) {
        console.log('Sikeres mentés!');
    } else {
        console.error('Hiba a mentés során:', response.statusText);
    }
})
.catch(error => console.error('Hálózati hiba:', error));
}

// Adatok betöltése a GitHub-ról
function loadData() {
fetch(GITHUB_API_URL, {
    headers: {
        'Authorization': `token ${TOKEN}`
    }
})
.then(response => response.json())
.then(data => {
    const content = atob(data.content);
    const parsedData = JSON.parse(content);
    // Itt tárold el a változókat
    felh = parsedData.felh;
    felhsz = parsedData.felhsz;
    csekk = parsedData.csekk;
    csekksz = parsedData.csekksz;
    adminjel = parsedData.adminjel;
    console.log('Adatok betöltve:', parsedData);
})
.catch(error => console.error('Hiba az adatok betöltése során:', error));
}

// A weboldal megnyitásakor hívja meg a loadData() funkciót
//window.onload = loadData;
loadData()




function veletlen(max) {
    return Math.ceil(Math.random() * max)
}
function kezd() {
    var p1 = ('<p class="cim">Online PB!</p>')
    var p2 = ('<p class="sor1">Jelentkezz be és az PBP-n keresztűl vidd át a bankóidat a telefonodra. Utalj a barátaidnak és ha akarod itt kapod a fizetésed.</p>')
    var p3 = ('<p class="cim2">Fontos</p>')
    var p4 = ('<p class="sor2">Ahoz, hogy elmentsük a módosításainkat el kell menteni a weblapot. Ezt úgy tehetjük meg, hogy a bal felső sarokban a PBP gombra kattintunk. Ha sikerrel jártunk, jelezni fog. Illetve aki most regisztrál annak 3Pb kezdés jár.</p>')
    document.getElementById("body").innerHTML = talca+p1+p2+p3+p4
}
function bvarf() {
    var t1 = ('<p class="cim">Várhatóak!</p>')
    var t2 = ('<p class="sor1">Jelenleg az egész fejlesztés alatt van.</p>')
    document.getElementById("body").innerHTML = talca+t1+t2
}
function tarca() {
    if(bejeli == false) {
        var p3 = ('<p class="cim">Jelentkezz be!</p>')
        var b1 = ('<button id="bejel" onclick="bejel()">BEJELENTKEZÉS</button>')
        var p4 = ('<p id="kerp">Nincs fiókod? Készits egy újjat!:</p>')
        var b2 = ('<button id="ujfi" onclick="keszit()">Új fiók készítése.</button>')
        document.getElementById("body").innerHTML = talca+p3+b1+p4+b2
    }
    else{
        if(bejeli == true && bejelifel == "admin") {beadmin()}
        else{
            betarca()
        }
    }
   
}
function kijel() {
    bejeli = false
    bejelifel = ""
    tarca()
}

//bejelentkezés
function bejel() {
    var pa1 = ('<p class="p1">Név / Kártya kód</p>')
    var ip6 = ('<input class="nevi" id="bejelnev"></input>')
    var pa2 = ('<p class="p2">Jelszó</p>')
    var ip7 = ('<input id="bejelje" type="password"></input>')
    var b4 = ('<button id="kove" onclick="kove()">Következő</button>')
    var b5 = ('<button id="admin" onclick="adminbl()">Admin belépés</button>')
    document.getElementById("body").innerHTML = talca+pa1+ip6+pa2+ip7+b4+b5
}
function kove() {
    var nev = document.getElementById("bejelnev").value
    var szojel = parseFloat(document.getElementById("bejelje").value)
    const isNumeric = /^[a-zA-Z]+$/;
    i = 0
    if(isNumeric.test(nev)) {
        while(nev != felh[i].name) {
            i++
        }
        if(nev == felh[i].name) {
            if(szojel == felh[i].password/felh[i].psc) {
                bejeli = true
                bejelifel = felh[i].name
                betarca()
            }
            else{alert("Hibás jelszó!")}
        }
    }
    else {
        i = 0
        while(parseFloat(nev) != felh[i].code && i < felhsz) {
            i++
        }
        if(parseFloat(nev) == felh[i].code) {
            if(szojel == felh[i].password/felh[i].psc) {
                    bejeli = true
                    bejelifel = felh[i].name
                    betarca()
            }
            else{alert("Hibás jelszó!")}
        }
    }
        

}
function adminbl() {
    var t = ('<p id="t1">Add meg a PBP admin kódot!</p><input id="t2" type="password"></input><button id="t3" onclick="knbadmin()">Következő</button>')
    document.getElementById("body").innerHTML = talca+t
}

//bejelentkezett
function betarca() {
    i = 0
    while(bejelifel != felh[i].name) {
        i++
    }
    if(bejelifel == felh[i].name) {
        var k1 = ('<p class="nevi">A kártya kódod: '+felh[i].code+'</p>')
        var k2 = ('<p id="kp2">A pénz összeged: '+felh[i].money+'PB'+'</p>')
        var k6 = ('<p id="kp4">A pénz összeged: '+felh[i].money*2+'JG'+'</p>')
        var k3 = ('<button id="felv" onclick="felv()">Pénz felvétel</button>')
        var k4 = ('<button id="utal" onclick="utal()">Utalás</button>')
        var k5 = ('<p id="kp3">Tranzakciók:   '+felh[i].transactions+'</p>')
        document.getElementById("body").innerHTML = talca+k1+k2+k6+k3+k4+k5+kvar
    }
}
function knbadmin() {
    var hjk = parseFloat(document.getElementById("t2").value)
    if(hjk == adminjel) {
        beadmin()
    }
    else{alert("A román szörös talpú néger cigány anyád")}
}
function beadmin() {
    bejeli = true
    bejelifel = "admin"
    var o1 = ('<button id="jelval" onclick="jelval()">Jelszó megváltoztatása</button><button id="utbk" onclick="utala()">Utalás</button><button id="mtk" onclick="mtk()">Megtekintés</button><button id="szke" onclick="szke()">Szerkesztés</button><button id="cskkb" onclick="cskkb()">Csekkek</button>')
    document.getElementById("body").innerHTML = talca+o1+kvar
}
function jelval() {
    var jelval = ('<p class="p1">Új jelszó</p><input type="password" class="nevi" id="nj123"></input><p class="p2">Jelszó megerősítése</p><input id="nj223" type="password"></input><button id="kove123" onclick="next123()">Következő</button>')
    document.getElementById("body").innerHTML = talca+jelval
}
function next123() {
    var jel1 = document.getElementById("nj123").value
    var jel2 = document.getElementById("nj223").value
    if(jel1 == jel2) {
        adminjel = jel1
        alert("Sikeres jelszóváltoztatás!")
        beadmin()
    }
    else(alert("A két jelszó nem egyezik meg egymással!"))
}
function utala() {
    var p = ""
    i = 0
    while(felhsz > i) {
        p += i+1+": "+felh[i].name+" | "+felh[i].code+"\n"
        i++
    }
    var pop = Number(prompt(p))
    var popsz = parseFloat(Number(prompt("Mennyit?")))
    felh[pop-1].money += popsz
    falh[pop-1].transactions += "      "+"Bank"+">"+popsz+">"+felh[pop-1].name
    alert(popsz+" PB sikeresen utalva "+felh[pop-1].name+"-nek/-nak!")
}
function mtk() {
    var p = ""
    i = 0
    while(felhsz > i) {
        p += i+1+": "+felh[i].name+" | "+felh[i].code+"\n"
        i++
    }
    var df = Number(prompt(p))
    alert("név: "+felh[df-1].name+"\nkártya kód: "+felh[df-1].code+"\nemail: "+felh[df-1].email+"\njelszó: "+felh[df-1].password/felh[df-1].psc+"\npénz: "+felh[df-1].money+"PB\nIdentitás: "+felh[df-1].szelsobal+"\nfelh.felt.sz.: "+felh[df-1].nemsz+"\nTranzakciók"+felh[df-1].transactions)
}
function szke() {
    var w = ""
    i = 0
    while(felhsz > i) {
        w += i+1+": "+felh[i].name+" | "+felh[i].code+"\n"
        i++
    }
    var ktm = Number(prompt(w))
    felh[ktm-1].name = prompt("Név: "+felh[ktm-1].name)
    felh[ktm-1].email = prompt("Email: "+felh[ktm-1].email)
    felh[ktm-1].code = Number(prompt("Kártya kód: "+felh[ktm-1].code))
    felh[ktm-1].password = Number(prompt("Jelszó: "+felh[ktm-1].password/felh[ktm-1].psc))*felh[ktm-1].psc
    felh[ktm-1].money = parseFloat(Number(prompt("Pénz: "+felh[ktm-1].money)))
    felh[ktm-1].transactions = prompt("Tranzakciók: "+felh[ktm-1].transactions)
}
function cskkb() {
    i = 0
    while(csekksz > i) {
        if(csekk[i].name != "none") {
            var op = prompt("Név: "+csekk[i].name+"\nKártya kód: "+csekk[i].cc+"\nDátum: "+csekk[i].date+"\nHatáridő: "+csekk[i].datee+"\nPénz összeg: "+csekk[i].money+"PB\nKitől: "+csekk[i].from)
            if(op == "igen") {
                felh[csekk[i].cc].money += csekk[i].money
                felh[csekk[i].cc].transactions += "      "+"Készpénz"+">"+csekk[i].money+">"+felh[csekk[i].cc].name
                csekk[i].name = "none"
                alert("Csekk elfogadva!")
                i++
            }
            else if(op == "nem") {
                csekk[i].name = "none"
                alert("Csekk elutasítva!")
                i++
            }
            else if(op == "vár") {
                i++
                alert("Csekk várakoztatása!")
            }
            else{alert("Elírtál valamit!")}
        }
        else{i++}
    }
}

//pénz felvétel
function felv() {
    var f1 = ('<p class="nevi">Pénz összege</p>')
    var f2 = ('<input id="f2" type="number"></input>')
    var f3 = ('<button id="f3" onclick="vaknb()">Várakozás a PBP visszaigazolására</button>')
    var f4 = ('<button id="f4" onclick="cskk()">Csekk kérése</button>')
    document.getElementById("body").innerHTML = talca+f1+f2+f3+f4
}

// nem csekk
function vaknb() {
    i = 0
    while(bejelifel != felh[i].name) {
        i++
    }
    if(bejelifel == felh[i].name) {
        var g = parseFloat(document.getElementById("f2").value)
        var y = {name: felh[i].name,
                cc: felh[i].code,
                date: "none",
                datee: "none",
                money: g,
                from: "Bank(auto)"}
        csekk.push(y)
        csekksz++
        alert("Sikeres pénz kérés.\nVárakozzon amíg a PBP visszaigazol.\n(Mentse el és kiléphet)")
        betarca()
    }
}

//csekk
function cskk() {
    eppenutalando = parseFloat(document.getElementById("f2").value)
    var r1 = ('<p id="r1">Csekk</p>')
    var r2 = ('<p id="r2">Név: '+felh[i].name+'</p>')
    var r3 = ('<p id="r3">Kártya kód: #'+felh[i].code+'</p>')
    var r4 = ('<p id="r4">Dátum: </p>')
    var r5 = ('<input id="r5"></input>')
    var r6 = ('<p id="r6">Határidő: </p>')
    var r7 = ('<input id="r7"></input>')
    var r8 = ('<p id="r8">Pénz összeg: '+eppenutalando+'PB</p>')
    var r9 = ('<p id="r9">Kitől: </p>')
    var r10 = ('<input id="r10"></input>')
    var r11 = ('<button id="r11" onclick="csekkku()">Küldés</button>')
    var r = r1+r2+r3+r4+r5+r6+r7+r8+r9+r10+r11
    document.getElementById("body").innerHTML = talca+r
}
function csekkku() {
    i = 0
    while(bejelifel != felh[i].name) {
        i++
    }
    if(bejelifel == felh[i].name) {
        var g2 = document.getElementById("r5").value
        var g3 = document.getElementById("r7").value
        var g4 = document.getElementById("r10").value
        var y2 = {name: felh[i].name,
                cc: felh[i].code,
                date: g2,
                datee: g3,
                money: eppenutalando,
                from: g4}
        csekk.push(y2)
        csekksz++
        alert("Sikeres csekk kérés.\nVárakozzon amíg a PBP visszaigazol.\n(Mentse el és kiléphet)")
        betarca()
    }
}

//utalás
function utal() {
    var b1 = ('<p class="nevi">Kinek utalom (kártya kód)</p>')
    var b2 = ('<input id="b2" type="number"></input>')
    var b3 = ('<p id="b3">Utalandó összeg (PB)</p>')
    var b4 = ('<input id="b4" type="number"></input>')
    var b5 = ('<p id="b5">Jelszó</p>')
    var b6 = ('<input id="b6" type="password"></input>')
    var b7 = ('<button id="utalg" onclick="utalg()">Utalás</button>')
    document.getElementById("body").innerHTML = talca+b1+b2+b3
    document.getElementById("body").innerHTML += b4+b5+b6+b7
}
function utalg() {
    var kiun = parseFloat(document.getElementById("b2").value)
    var upo = parseFloat(document.getElementById("b4").value)
    var ujk = parseFloat(document.getElementById("b6").value)
    var a = 0
    while(kiun != felh[a].code) {
        a++
    }
    var b = 0
    while(bejelifel != felh[b].name) {
        b++
    }
    if(ujk == felh[b].password/felh[b].psc) {
        if(felh[b].money >= upo) {
            felh[b].money -= upo
            felh[a].money += upo
            felh[b].transactions += "      "+felh[b].name+">"+upo+">"+felh[a].name
            felh[a].transactions += "      "+felh[a].name+">"+upo+">"+felh[b].name
            alert("Sikeres utalás!")
            betarca()
        }
        else{alert("Nincs annyi pénzed!")} 
    }
    else(alert("Hibás jelszó!"))
}

//fiókkészítés
function keszit() {
    var p5 = ('<p class="p1">Név (csak betű)</p>')
    var ip1 = ('<input class="nevi" id="nevi"></input>')
    var p6 = ('<p class="pbh">Email (értesítések a tranzakciókról)</p>')
    var ip2 = ('<input class="mail" id="mail"></input>')
    var p7 = ('<p id="p3">Email megerősítés</p>')
    var ip3 = ('<input id="mail2"></input>')
    var p8 = ('<p id="p4">Jelszó (ezzel használhatod a kártyád, csak szám lehet)')
    var ip4 = ('<input id="kod" type="password"></input>')
    var p9 = ('<p id="p5">Jelszó megerősítés')
    var ip5 = ('<input id="kod2" type="password"></input>')
    var p10 = ('<p id="p6">Pályista vagy?</p><input type="checkbox" id="inp"></input><p id="r100">Igen</p><p id="kir">Elfogadod a felhasználási feltételeket?</p><input type="checkbox" id="inp2"></input><p id="kir2">Igen</p>')
    var b3 = ('<button id="tolt" onclick="tolt()">Adatok bevitele</button>')
    var a = talca+p5+ip1+p6+ip2+p7+ip3+p8+ip4+p9+ip5+p10+b3
    document.getElementById("body").innerHTML = a
}
function tolt() {
    var nev = document.getElementById("nevi").value
    var email = document.getElementById("mail").value
    var email2 = document.getElementById("mail2").value
    var jelszo = parseFloat(document.getElementById("kod").value)
    var jelszo2 = parseFloat(document.getElementById("kod2").value)
    var bszelso
    var belf
    const szelso = document.getElementById("inp")
    const elf = document.getElementById("inp2")
    if(szelso.checked) {bszelso = true} else{bszelso = false}
    if(elf.checked) {belf = true} else{belf = false}
    if(belf) {
        if(email == email2 && jelszo == jelszo2) {
        epveletlen = veletlen(100)
        var x = {name: nev,
            email: email,
            code: felhsz,
            password: jelszo*epveletlen,
            psc: epveletlen,
            money: 3,
            transactions: "",
            szelsobal: bszelso,
            nemsz: eppnem,}
        felhsz++
        felh.push(x)
        bejeli = true
        bejelifel = x.name
        eppnem = 0
        alert("Új fiók sikeresen létrehozva.\nA te kártya kódod: "+x.code)
        betarca()
    }
    else{alert("Elírtál valamit!")}
    }
    else{alert("Fiók készítéshez elkell fogadnod a felhasználási feltételeket.");eppnem++}
}

kezd()
