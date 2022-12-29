const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')

require('colors')
require('dotenv').config()


const app = express()
const port = process.env.PORT || 5000;

//middlewares
app.use(cors())
app.use(express.json())

//uri & client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.preca8g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//db connection function
async function run() {
    try {
        client.connect()
        console.log('Database connected succesfully'.yellow.bold);
    }
    catch (error) {
        console.log(error.message.red.bold);
    }
}
run().catch(err => console.log(err.message.red.bold))

//collections
const usersCollection = client.db('TaskGoal').collection('users')
const TasksCollection = client.db('TaskGoal').collection('Task')

//api's / endspoints

//root api
app.get('/', (req, res) => {
    res.send('task-goal-server is running')
})



//api for adding products
app.post('/addproduct', async (req, res) => {
    try {
        const product = req.body
        const result = await ProductsCollection.insertOne(product)
        res.send(result)
    }
    catch (error) {
        res.send(error.message)
    }
})

//api for deleting products
app.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: ObjectId(id) }
        const result = await ProductsCollection.deleteOne(query)
        res.send(result)
    }
    catch (error) {
        res.send(error.message)
    }
})

app.listen(port, () => {
    console.log(`This server is running on ${port}`);
})
