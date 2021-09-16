const dbConnection = require('../config/mongoConnections');
const data = require('../data/');
// const users = data.users;
// const posts = data.posts;
const books = data.books;
const reviews = data.reviews;

const main = async () => {

    const db = await dbConnection();
    await db.dropDatabase();
    var d = new Date(2018, 11, 24, 10, 33, 30);
    const firstMovie = await books.create(
        "Furst Movie",
        {authorFirstName: "Adam", authorLastName: "Farid"},
        ["Fantasy,","Horror"],d, "Summary here lol", [])
    const id = firstMovie._id;
    var diff = new Date(2019, 11, 24, 10, 33, 30);
    const firstReview = await reviews.create(
        'pretty decent!',
        'mydog123',
        id,
        4,
        diff,
        "honestly was pretty good but was expecting more"
    );

    const secondMovie = await books.create(
        "Second Movie",
        {authorFirstName: "Adam", authorLastName: "Farid"},
        ["Fantasy,","Horror"],d, "Summary here lol", [])
    const idTwo = secondMovie._id;
    var dif = new Date(2020, 11, 24, 10, 33, 30);
    const secondReview = await reviews.create(
        'i liked it !',
        'hiiii123',
        idTwo,
        3,
        dif,
        "honestly was pretty good but was expecting more"
    );

    const thirdMovie = await books.create(
        "Third Movie",
        {authorFirstName: "Adam", authorLastName: "Farid"},
        ["Fantasy,","Horror"],d, "Summary here lol", [])
    const idthree = thirdMovie._id;
    var di = new Date(2021, 11, 24, 10, 33, 30);
    const thirdReview = await reviews.create(
        'it was good :P',
        'jellyfam123',
        idthree,
        4,
        di,
        "chicken wing"
    );
    console.log('Done seeding database');
    await db.serverConfig.close();
};

main().catch(console.log);
