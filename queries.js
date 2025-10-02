// importing mongodb
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/';
const dbName = 'plp_bookstore';
const collectionName = 'books';

// connect to the database
async function queryDatabase(){
    const client = new MongoClient(uri);
    
    try{
        await client.connect();
        console.log('connected to mongodb');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // find book in specific genre
        const fictionBooks = await collection.find(
            {genre: "Fiction"},
            {projection: {_id: 0, title: 1, author: 1, price: 1}}
        ).toArray();

        if(fictionBooks.length > 0){
            fictionBooks.forEach((book, index)=>{
                console.log(`${index + 1}. ${book.title} by ${book.author} retailing at $${book.price}`);
            });
        }else{
            console.log('This is a non-fiction collection');
        }

        // find book published after a certain year
        const nineteenHundredBooks = await collection.find(
            {published_year: {$gt: 1900}},
            {projection: {_id: 0, title: 1, author: 1, price: 1, published_year:1}}
        ).toArray();

        if(nineteenHundredBooks.length > 0){
            nineteenHundredBooks.forEach((book)=>{
                console.log(`${book.published_year}: ${book.title} by ${book.author} retailing at $${book.price}`);
            });
        }else{
            console.log('No book published after 1900');
        }

        // Find books by a specific author
        const jrrCatalogue = await db.collection('books').find(
            {author: 'J.R.R. Tolkien'},
            {projection: {title: 1, author: 1, price:1, _id: 0}}
        ).toArray();

        jrrCatalogue.forEach((book, index)=>{
            console.log(`${book.title} by ${book.author}: retailing at $${book.price}`);
        });

        // Update the price of a specific book
        await db.collection('books').updateOne(
            {title: 'Pride and Prejudice'}, {$set: {price: 17.99}}
        );
        console.log('updated pride and prejudice price');

        // Delete a book by its title
        await db.collection('books').deleteOne(
            {title: '1984'}
        );
        console.log('1984 no more');

         // ADVANCED QUERIES
        // find books that are both in stock and published after 2010
        const alphaBooks = await db.collection('books').find({
            in_stock: true,
            published_year: {$gt: 2010}
            },
            {projection: {title: 1, _id:0}}
        ).toArray();

        if(alphaBooks.length > 0){
            alphaBooks.forEach((book)=>{
                console.log(`${book.title}`);
            });            
        }else{
            console.log('Alpha books out of stock');
        }

        // Aggregation Pipeline
        const page = 1;
        const avgPriceByGenre = await db.collection('books').aggregate([
            {$group:{
                _id: "$genre",
                avgPrice: {$avg: "$price"}
            }},
            {$sort: {avgPrice: 1}},
            {$skip: (page -1)*5},
            {$limit: 5}
        ]).toArray();

        avgPriceByGenre.forEach((genre, index)=>{
            console.log(`${index + 1}. ${genre._id} : ${genre.avgPrice}`);
        });

        // find the author with the most books in the collection
        const famousAuthor = await db.collection('books').aggregate([
            {$group:{
                _id: "$author",
                totalBooks: {$sum: 1} /*count each document in the group*/
            }},
            {$sort: { totalBooks: -1}}, /*order in desc*/
            {$limit: 1}
        ]).toArray();
        console.log(`${famousAuthor[0]._id} has ${famousAuthor[0].totalBooks} books in the collection`);

        // groups books by publication decade and counts them

        // defining boundaries
        const min = 1800;
        const max = 1990;
        const step = 10;
        const boundaries = [];
        for(let year= min; year<= max; year+=step){
            boundaries.push(year);
        }
        // console.log(boundaries);

        const decadeCount = await db.collection('books').aggregate([
            {$bucket:{
                groupBy: "$published_year",
                boundaries:boundaries,
                default: "unknown",
                output: {
                    count: {$sum: 1}
                    // books: {$push: "$title"}
                }
            }}
        ]).toArray();

        decadeCount.forEach((bucket, index)=>{
            console.log(`${bucket._id}: ${bucket.count} book(s) published`);
        });

        // Create an index on the `title` field for faster searches
        await db.collection('books').createIndex({ title: 1});
        const index = await db.collection('books').indexes();
        console.log(index);

        // Create a compound index on `author` and `published_year`
        await db.collection('books').createIndex({author: 1, published_year: 1});
        const compoundIndex = await db.collection('books').indexes();
        console.log(compoundIndex);

        // Use the `explain()` method to demonstrate the performance improvement with your indexes
         console.log(await db.collection('books').find({ title: "The Hobbit" }).explain("executionStats"));
         
         console.log(await db.collection('books').find({ author: "J.K. Rowling", published_year: { $gt: 1990 } }).explain("executionStats"));

    }catch(err){
        console.log("error", err)
    }finally{
        await client.close();
        console.log("diconnected");
    }

}
queryDatabase();
