const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const ObjectId = require('mongodb').ObjectId
var moment = require("moment")

module.exports = {
    
    async create(title, reviewer, bookBeingReviewed, rating, dateOfReview, review)
    {
        if(!title ||  !reviewer || !bookBeingReviewed || !rating || !dateOfReview || !review) throw "All fields need to have valid values"
        if(title == " " ||  reviewer == " "  || bookBeingReviewed == " "  ||rating == " "  || dateOfReview == " "  || review == " ") throw "All fields need to have valid values"
        if (typeof title != "string" || title == "") throw "Error: title must be a string and must not be empty";
        if(typeof reviewer !== "string") throw "Error: reviewer is not a string"
        if(typeof bookBeingReviewed !== "string") throw "Error: bookbeingReviewed is not a string"
        if(!(Number.isInteger(rating))) throw "Error: rating is not an integer"
        if(rating < 0 || rating > 5) throw "Error: rating must be between 0-5"
        var m = moment(dateOfReview, 'MM-DD-YYYY');
        if ((m.isValid() == false)) throw "Date is of incorrect type"
        if (typeof review != "string" || review == "") throw "Error: review type must be a string and must not be empty";
        const reviewCollection = await reviews();
        let newBook = {
            title: title,
            reviewer: reviewer,
            bookBeingReviewed: bookBeingReviewed,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review
        };
        const insertInfo = await reviewCollection.insertOne(newBook);
        const newId = insertInfo.insertedId;
        newIdString=newId.toString();
        const book = await this.get(newIdString);
        return book;
    },

    async getAll() {
        const reviewCollection = await reviews();
    
        const book = await reviewCollection.find({}).toArray();
    
        return book;
      },

    async get(id){
        if (!id) throw "You must provide an id to search for";
        if (typeof id != "string" || id == "") throw "Error: ID must be a string and must not be empty";
        if(!id || !ObjectId.isValid(id)) throw "Error: must provide a valid ID to search for"

        const reviewCollection = await reviews();
        let parsedId = ObjectId(id);
        const book = await reviewCollection.findOne({_id: parsedId});
        if(book===null) throw "Error: No review exists with that ID";
        book._id= `${book._id}`

        return book;
    },

    async remove(id){
        if(!id) throw "Error: no ID provided"
        if (typeof id != "string" || id == "") throw "Error: ID must be a string and must not be empty";
        if(!id || !ObjectId.isValid(id)) throw "Error: must provide a valid ID to search for"

        const reviewCollection = await reviews();
        let parsedId = ObjectId(id);
        const book = await reviewCollection.findOne({_id: parsedId});
        const deletionInfo = await reviewCollection.removeOne({ _id: parsedId });
        if (deletionInfo.deletedCount === 0) throw `Could not find/delete book with id of ${id}`;
        return `${book.title} has been successfully deleted`
    },
}