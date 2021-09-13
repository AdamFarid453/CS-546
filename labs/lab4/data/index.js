const movies = require("./movies");
const connection = require("../config/mongoConnections");

async function main() {
    
    try {
        var billAndTed = await movies.create("Def not Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["David Lee","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020});
        console.log(billAndTed)
    } catch (error) {
        console.log(error)
    }
    try {
        var frozen = await movies.create("Frozen","Girl on acid freezes her entire world because she is 12.","PG-13", "1hr 31min","Horror",["Elsa","the snowman dude"],{director: "Lebron james", yearReleased: 2020});
    } catch (error) {
        console.log(error)
    }
    try {
        var allMovies = await movies.getAll()
        console.log(allMovies)
    } catch (error) {
        console.log(error)
    }
    try {
        var spaceJam = await movies.create("SpaceJam","Who needs a description, it has MJ in it","PG-13", "1hr 2min","Comedy",["Michael Jordan","bugs bunny"],{director: "no clue", yearReleased: 2000});
        console.log(spaceJam)
    } catch (error) {
        console.log(error)
    }
    try {
        var renameMovie = await movies.rename(allMovies[0]._id.toString(), "Jk it is Bill and Ted Face the Music")
        console.log(renameMovie)
    } catch (error) {
        console.log(error)
    }
    try {
        const removeSecond = await movies.remove(allMovies[1]._id.toString())
    } catch (error) {
        console.log(error)
    }
    try {
        var queryAll = await movies.getAll()
        console.log(queryAll)
    } catch (error) {
        console.log(error)
    }
    try {
        var createBadMovie = await movies.create(1,1,1,1,1,1,1)
    } catch (error) {
        console.log(error)
    }
    try {
        var removeBadMovie = await movies.remove("6f76903ed4d32c809c9834c4")
    } catch (error) {
        console.log(error)
    }
    try {
        var renameError = await movies.rename("6f76903ed4d32c809c9834c4", "This movie definately exists")
    } catch (error) {
        console.log(error)
    }
    try {
        var finalRenameError = await movies.rename(allMovies[1]._id.toString())
    } catch (error) {
        console.log(error)
    }
    try {
        var getInvalidID = await movies.get("6f76903ed4d32c809c9834c4")
    } catch (error) {
        console.log(error)
    }
    const db = await connection();
    await db.serverConfig.close();
  
    console.log("Done!");
}


main();