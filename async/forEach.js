const fetch = require("node-fetch")

const getUser = async (userId) => {
    try {
        let user = await fetch(`http://localhost:8080/users/${userId}`)
        return await user.json();
    } catch (err) {
        console.log(err);
    }
};

const getCats = async (user) => {
    try {
        const cats = [];
        user.cats.forEach(async (catId) => {
            let cat = await fetch(`http://localhost:8080/cats/${catId}`);
            cats.push(await cat.json());
             console.log(cats);
        });
        return Promise.all(cats);
    } catch (err) {
        console.log(err);
    }
}

const readData = async () => {
    let data = await getCats(await getUser(123));
    console.log(data);
};
readData();


// drugi nacin, hvala id-eve macaka pa onda treba da dohvati svaku macku pojedinacno

// const getCats = async (userId) => {
//     return fetch(`http://localhost:8080/users/${userId}`)
//         .then((response) => {
//             return response.json();
//         })
//         .then((user) => {
//             const cats = user.cats;
//             const url =[];
//             user.cats.forEach((catId) => {
//                 return fetch(`http://localhost:8080/cats/${catId}`).then((response) => {
//                     return response.json();
//                 });
//             });
//             return Promise.all(cats);
//         })
// };

// const readData = async () => {
//   let data = await getCats(123);
//   console.log(data);
// };

// readData();

// console.log(getUser(123));