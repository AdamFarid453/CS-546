const mongoCollections = require("../config/mongoCollections");
const books = mongoCollections.books;
const ObjectId = require('mongodb').ObjectId
var moment = require("moment")


module.exports = {
    
    async create(title, author, genre, datePublished, summary, reviews)
    {
        if(!title ||  !author || !genre || !datePublished || !summary || !reviews) throw "All fields need to have valid values"
        if(title == " " ||  author == " "  || genre == " "  ||datePublished == " "  || summary == " "  || reviews == " ") throw "All fields need to have valid values"
        if (typeof title != "string" || title == "") throw "Error: title must be a string and must not be empty";
        if(typeof author !== "object") throw "Error: Author is not an object"
        if(typeof author.authorFirstName !== "string" || typeof author.authorLastName !== "string" || author.authorFirstName == "" || author.authorLastName == "" || !author.authorFirstName || !author.authorLastName)
         throw "Error: The Author object is of proper type/does not exist"
        if (!Array.isArray(genre)) throw "Error: genre is not an array / does not exist"
        if(genre.length < 1) throw "Error: Genre length should be greater than 1"
        for(let i = 0; i < genre.length; i++)
            if(typeof genre[i] !== "string") throw "Error: Element of Genre at index " + i + " is not of type string."
        var m = moment(datePublished.date, 'MM-DD-YYYY');

        if (!(m.isValid)()) throw "Date is of incorrect type"
        if (typeof summary != "string" || summary == "") throw "Error: summary type must be a string and must not be empty";
        if (!Array.isArray(reviews)) throw "Error: reviews is not an array / does not exist"

        const bookCollection = await books();
        let newBook = {
            title: title,
            author: author,
            genre: genre,
            datePublished: datePublished,
            summary: summary,
            reviews: reviews
        };
        const insertInfo = await bookCollection.insertOne(newBook);
        const newId = insertInfo.insertedId;
        newIdString=newId.toString();
        const book = await this.get(newIdString);
        return book;
    },

    async getAll() {
        const bookCollection = await books();
    
        const book = await bookCollection.find({}).toArray();
        return book;
      },

    async get(id){
        if (!id) throw "You must provide an id to search for";
        if (typeof id != "string" || id == "") throw "Error: ID must be a string and must not be empty";
        if(!id || !ObjectId.isValid(id)) throw "Error: must provide a valid ID to search for"

        const bookCollection = await books();
        let parsedId = ObjectId(id);
        const book = await bookCollection.findOne({_id: parsedId});
        if(book===null) throw "Error: No movie exists with that ID";
        book._id= `${book._id}`

        return book;
    },

    async remove(id){
        if(!id) throw "Error: no ID provided"
        if (typeof id != "string" || id == "") throw "Error: ID must be a string and must not be empty";
        if(!id || !ObjectId.isValid(id)) throw "Error: must provide a valid ID to search for"

        const bookCollection = await books();
        let parsedId = ObjectId(id);
        const book = await bookCollection.findOne({_id: parsedId});
        const deletionInfo = await bookCollection.removeOne({ _id: parsedId });
        if (deletionInfo.deletedCount === 0) throw `Could not find/delete book with id of ${id}`;
        return `${book.title} has been successfully deleted`
    },
//title, author, genre, datePublished, summary, reviews
async updateBook(id, title, author, genre, datePublished, summary, reviews){
    if(!id) throw `You must provide an id to search for`;
    if(!title) throw `You must provide a band name`
    if(!Array.isArray(genre) || !Array.isArray(reviews)) throw `Error: must be an array`
    if(typeof author !== "object") throw "Error: Author is not an object"
    if(typeof summary !== "string") throw "Error: Summary field is not a string"
    if(typeof author.authorFirstName !== "string" || typeof author.authorLastName !== "string" || author.authorFirstName == "" || author.authorLastName == "" || !author.authorFirstName || !author.authorLastName)
     throw "Error: The Author object is of proper type/does not exist"
    const bookCollection = await books();
    const objId = ObjectId.createFromHexString(id)
    const updatedBooks = {
        title: title,
        author: author,
        genre: genre,
        datePublished: datePublished,
        summary: summary,
        reviews: reviews
    }
    const updateinfo = await bookCollection.updateOne({_id: objId}, {$set:updatedBooks});
    if(updateinfo.modifiedCount===0) throw `Error: could not update book correctly`
    return await this.get(id);
},

async updatePatch(id, updatedBook){
    if(!id) throw "Error: no ID provided"
    if (typeof id != "string" || id == "") throw "Error: ID must be a string and must not be empty";
    const bookCollection = await books();
    const updatedBookData = {};
    if (updatedBook.title) {
        updatedBookData.title = updatedBook.title;
      }
      if (updatedBook.author) {
        updatedBookData.author = updatedBook.author;
      }
  
      if (updatedBook.genre) {
        updatedBookData.genre = updatedBook.genre;
      }
      if (updatedBook.datePublished) {
        updatedBookData.datePublished = updatedBook.datePublished;
      }
  
      if (updatedBook.summary) {
        updatedBookData.summary = updatedBook.summary;
      }
  
      if (updatedBook.reviews) {
        updatedBookData.reviews = updatedBook.reviews;
      }
      const objId = ObjectId.createFromHexString(id)
      await bookCollection.updateOne({ _id: objId }, { $set: updatedBookData });
      return await this.get(id);
}



}

