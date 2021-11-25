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
        const cats = user.cats.map(async (catId) => {
            let cat = await fetch(`http://localhost:8080/cats/${catId}`);
            let mac =  await cat.json();
            return mac.imageUrl;
            
        });
        return Promise.all(cats);
    } catch (err) {
        console.log(err);
    }
}



// console.log(getUser(123));

const readData = async () => {
    let data = await getCats(await getUser(123));
    console.log(data);
};
readData();