const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const ObjectId = require('mongodb').ObjectId



module.exports = {
    
    async create(title, plot, rating, runtime, genre, cast, info)
    {
        if(!title ||  !plot || !rating || !runtime || !genre || !cast || !info) throw "All fields need to have valid values"
        if(title == " " ||  plot == " "  || rating == " "  ||runtime == " "  || genre == " "  || cast == " "  || info == " " )
         throw "All fields need to have valid values"
        if (typeof title != "string" || title == "") throw "Error: title must be a string and must not be empty";
        if (typeof plot != "string" || plot == "") throw "Error: plot type must be a string and must not be empty";
        if (typeof rating != "string" || rating == "") throw "Error: rating must be a string and must not be empty";
        if (typeof runtime != "string" || runtime == "") throw "Error: runtime type must be a string and must not be empty";
        if (typeof genre != "string" || genre == "") throw "Error: genre must be a string and must not be empty";
        if (!cast || !Array.isArray(cast)) throw "Error: cast is not an array / contains elements that are not strings"
        for(let i = 0; i < cast.length; i++)
          if(typeof cast[i] !== "string")
            throw "Error: Element of cast at index " + i + " is not of type string."
        if(typeof info !== "object") throw "Error: info is not an object"
        if(typeof info.director !== "string" || info.director == "" || !info.director) throw "Error: The director info is of proper type/does not exist"
        if((""+info.yearReleased).length != 4 || !info.yearReleased) throw `Error: Released info is not provided/ is not of proper length length`
        if(info.yearReleased < 1930 || info.yearReleased > new Date().getFullYear() +5) throw `Error: year index out of bounds from 1930 - ${new Date().getFullYear()}`
        const movieCollection = await movies();
        let newMovie = {
            title: title,
            plot: plot,
            rating: rating,
            runtime: runtime,
            genre: genre,
            cast: cast,
            info: info
          };
        
        const insertInfo = await movieCollection.insertOne(newMovie);
        const newId = insertInfo.insertedId;
        newIdString=newId.toString();
        const movie = await this.get(newIdString);
        return movie;

    },

    async getAll() {
        const movieCollection = await movies();
    
        const movie = await movieCollection.find({}).toArray();
    
        return movie;
      },

    async get(id){
        if (!id) throw "You must provide an id to search for";
        if (typeof id != "string" || id == "") throw "Error: ID must be a string and must not be empty";
        if(!id || !ObjectId.isValid(id)) throw "Error: must provide a valid ID to search for"

        const movieCollection = await movies();
        let parsedId = ObjectId(id);
        const movie = await movieCollection.findOne({_id: parsedId});
        if(movie===null) throw "Error: No movie exists with that ID";
        movie._id= `${movie._id}`

        return movie;
    },

    async remove(id){
        if(!id) throw "Error: no ID provided"
        if (typeof id != "string" || id == "") throw "Error: ID must be a string and must not be empty";
        if(!id || !ObjectId.isValid(id)) throw "Error: must provide a valid ID to search for"

        const movieCollection = await movies();
        let parsedId = ObjectId(id);
        const movie = await movieCollection.findOne({_id: parsedId});
        const deletionInfo = await movieCollection.removeOne({ _id: parsedId });
        if (deletionInfo.deletedCount === 0) throw `Could not find/delete movie with id of ${id}`;
        return `${movie.title} has been successfully deleted`
    },

    async rename(id, newTitle){

      if(!id) throw "Error: no ID provided"
      if (typeof id != "string" || id == "") throw "Error: ID must be a string and must not be empty";
      if(!id || !ObjectId.isValid(id)) throw "Error: must provide a valid ID to search for"
      if(!newTitle) throw "Error: newTitle not provided"
      if (typeof newTitle != "string" || newTitle == "") throw "Error: New Title must be a string and must not be empty";
      const movieCollection = await movies();
      const renameMovie={
      title: newTitle
      };
      let parsedId = ObjectId(id);
      const updatedInfo = await movieCollection.updateOne({ _id: parsedId }, {$set: renameMovie});
      if (updatedInfo.modifiedCount === 0) throw "Could not update movie successfully";
      return await this.get(id)


    }
}