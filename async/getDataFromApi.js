const fetch = require("node-fetch")

//f-ja koja vraca promise (prima path url koji prosledim i cekam da vrati response)
const getDataFromApi = async (path) => {
    try {
        let response = await fetch(`http://localhost:8080` + path)
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};


//f-ja koja vraca Promise.all = odjednom posalje reqestove na sve url-ove koje prosledim
// i saceka da se svaki request zavrsi, zatim sa dobijenim podacima kreiram novu funkciju koja filtrira niz
//na osnovu zadatog uslova

const readData = async (ids) => {
    try {

        let data = Promise.all(ids.map(async (id) => await getDataFromApi('/cats/' + id)));
        //console.log( await data);

        return (await data).filter((cat) => cat.imageUrl !== 'http://images.somecdn.com/cat-33.jpg');

    } catch (err) {

        console.log(err);

    }

};

// kada pozovem f-ju prosledim niz parametara (url-ova npr ili id-eva u ovom slucaju) i nakon toga logujem rezultat funkcije
readData([21, 33, 45]).then((cats) => {
     console.log(cats);
});

