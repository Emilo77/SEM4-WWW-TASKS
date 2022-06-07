const {database, Wycieczka, Zgloszenie} = require("./models.mjs");


async function init_database() {

    await database.sync({force: true});

    await Wycieczka.create({
        nazwa: "Wysokie góry",
        krotki_opis: "Krótka wycieczka na ten właśnie szczyt. Niezwykle  ciekawe atrakcje.",
        obrazek: "gory.jpg",
        cena: 15002900,
        data_poczatku: "2022-09-01",
        data_konca: "2022-09-05",
        liczba_dostepnych_miejsc: 0,
        promocja: 0,
        opis: "Po kawce w Gościńcu Równica mieliśmy znów sporo energii aby pokonywać kolejne kilometry." +
            " Szlak dalej był już dość łagodny, z delikatnymi zejściami i podejściami. " +
            "Taka wędrówka w spokojnym tempie sprzyjała towarzyskim rozmowom ze znajomymi, " +
            "których zabraliśmy na tą wycieczkę. Jeśli nie lubicie zalesionych szczytów – spokojnie. " +
            "To przejście idealnie łączy ze sobą komfort, jaki daje las w upalny, letni dzień, " +
            "oraz możliwość cieszenia się widokami. Dość regularnie na całej trasie pojawiają się prześwity, " +
            "z któych roztaczały się przepiękne panoramy na zielony Beskid Śląski. " +
            "W trakcie wejścia na Kazbek, już od pierwszego dnia towarzyszyło nam kilku przewodników, " +
            "którzy dobierali tempo. Zdziwiło mnie, że jest ono bardzo spokojne. To jednak dobrze. " +
            "Po co tracić siły na szybki marsz, skoro plecaki są ciężkie, a czasu mamy sporo. " +
            "Po drodze mogliśmy spokojnie podziwiać gruzińskie góry, " +
            "które wciąż wydają się dzikie i niedostępne. Pełen turystów jest tutaj tylko jeden szlak. " +
            "Mowa oczywiście o tym prowadzącym na Kazbek. Po około 4 godzinach spokojnego marszu naszym oczom " +
            "ukazał się lodowiec Gergeti oraz nowo wybudowane schronisko Alti Hut. " +
            "Niestety ceny noclegu w schronisku są bardzo wysokie. Znacznie tańsze jest spanie w namiotach, " +
            "które do obozu dostarczyły nam konie. Naszym zadaniem było tylko rozbicie namiotu " +
            "i przygotowanie wody oraz posiłku.",
    });

    await Wycieczka.create({
        nazwa: 'Dalekie morza',
        krotki_opis: 'Mórz jest wiele, więc i opis może być nieco dłuższy niż poprzednio. Atrakcji może być więcej.',
        obrazek: 'morza.jpg',
        cena: 17,
        data_poczatku: '2022-10-01',
        data_konca: '2023-08-05',
        liczba_dostepnych_miejsc: 23,
        promocja: 25,
        opis: 'Basowy huk fal, stada rozkrzyczanych mew szybujących nad wypływającym w morze statkiem, ' +
            'tętniące życiem porty … Puste plaże bezlitośnie smagane ostrym, północno-zachodnim wiatrem, ' +
            'ukryte w pachnąco-sosnowych lasach latarnie morskie, niepowtarzalność ' +
            'i piękno każdego morskiego dnia… Unikalny klimat, kameralna atmosfera nadmorskich, ' +
            'niewielkich miejscowości uśpionych morską kołysanką, zdanych na łaskę kapryśnego morza, ' +
            'w których rytm życia wyznaczają wypływające w morze kutry i jesienno-zimowe sztormy… ' +
            'Postaram się na łamach witryny przedstawić choć część tego, ' +
            'co od urodzenia jest mi bardzo bliskie. ' +
            'Być może uda mi się przy pomocy tego serwisu przekonać Was, ' +
            'że warto jest mieszkać blisko Wielkiej Wody, że nadmorskie miejscowości i porty emanują ' +
            'niespotykaną atmosferą, która uzależnia jak narkotyk kolejne pokolenia. ' +
            'Chciałbym też przybliżyć Wam szeroko pojętą Sprawę Morską, życie na morzu, ' +
            'kulisy ciężkiego zawodu marynarza. Tradycję i Kulturę Morza tworzyli od podstaw wielcy ludzie, ' +
            'kontynuują ją każdego dnia kolejne pokolenia Żeglarzy, Marynarzy, Oficerów, Kapitanów. ' +
            'Okazujmy im zasłużony szacunek.',
    });

    await Wycieczka.create({
        nazwa: 'Miasto Mediolan',
        krotki_opis: 'Ciuszki i super exclusive rzeczy w przystępnych cenach. Raj dla fanów mody.',
        obrazek: 'mediolan.jpg',
        cena: 2193123,
        data_poczatku: '2022-07-01',
        data_konca: '2022-07-11',
        liczba_dostepnych_miejsc: 37,
        opis: 'Weekend w Mediolanie? W czasie pandemii? To mocno przewrotne i zdecydowanie w naszym stylu. ' +
            'Gdy rzucamy hasło by gdzieś polecieć po pandemii to najczęściej słyszymy, ' +
            'że Włochy są opcją ostatniego wyboru. A naszym zdaniem to teraz idealny i bezpieczny ' +
            'kierunek bo właśnie Włosi, którzy zostali tak ciężko doświadczeni przez los i pandemię, ' +
            'wzbili się na wyżyny dbałości o przestrzeganie reżimu sanitarnego czego doświadczyliśmy ' +
            'na własnej skórze i byliśmy pozytywnie zaskoczeni.' +
            'Lot samolotem odbywa się w klasycznym reżimie, gdzie obowiązuje ograniczenie połowy zajętości miejsc. ' +
            'Słowem w samolocie co drugie miejsce jest wolne. Obowiązkowo w trakcie całego lotu należy mieć ' +
            'założoną maseczkę. Obsługa przestrzega by nie tworzyć kolejek do toalet i czekać na swoją kolej na miejscu. ' +
            'Biegiem można zobaczyć dużo ale też ominąć smaczki. Dlatego wychodzimy z założenia ' +
            'lepiej mniej a dobrze. Chociaż nam udało się w trakcie weekendu zobaczyć całkiem sporo.'
    });

    await Zgloszenie.create({
        imie: 'Jan',
        nazwisko: 'Kowalski',
        email: 'essa@gmail.com',
        liczba_miejsc: 2,
    });

    await Zgloszenie.create({
        imie: 'Adam',
        nazwisko: 'Nowak',
        email: 'essa2@gmail.com',
        liczba_miejsc: 3,
    });
}

function get_future_trips() {
    return Wycieczka.findAll({
        // where: {
        //     data_poczatku: {
        //         $gte: moment().toDate()
        //     }
        // }
    })
        .then((wycieczki) => {
            return wycieczki.sort((a, b) => {
                return a.data_poczatku - b.data_poczatku;
            })
        }, (err) => {
            console.log(err);
        });
}

async function get_trip(number) {
    const project = await Wycieczka.findByPk(number);
    if (project === null) {
        return undefined;
    } else {
        return project;
    }
}

module.exports = {init_database, get_future_trips, get_trip};


