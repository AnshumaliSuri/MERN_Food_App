const dotenv =require('dotenv');
const path = require('path');
const mongoose=require ('mongoose');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const mongoURI=process.env.MONGO_URI;
if (!mongoURI) {
    console.error('Mongo URI is not defined in environment variables');
    process.exit(1); // Exit the application if URI is not defined
}

const mongoDB= async ()=>{
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(mongoURI) 
        console.log('Mongo connected')
        
        const fetched_data = mongoose.connection.db.collection('food_items');
        console.log('Accessed food_items collection');

        
        const data = await fetched_data.find({}).toArray();
        global.food_items = data;
        const foodCategory= mongoose.connection.db.collection('foodCategory');
        const catdata=await foodCategory.find({}).toArray();
        global.catData=catdata;
        
        // console.log('Fetched data:', global.food_items);
        // console.log('Fetched data:', fetched_data);

        // await mongoose.connection.close();
        // console.log('Mongo connection closed');
    }
    catch(err){
        console.log(err);
    }
};

module.exports = mongoDB;