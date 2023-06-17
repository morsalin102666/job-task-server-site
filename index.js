const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;



const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(express.json())

// chake server site ranning
app.get('/', (req, res) => {
    res.send('supper herro server site is ranning')
})




const uri = "mongodb+srv://job-task:mKCYTxozg4PfaAgc@cluster0.mewurzb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)

        // user collection
        const jobTask = client.db("job-task").collection("supperHero");

        // supper hero data post 
        app.post('/supperHero', async (req, res) => {
            const query = req.body;
            query.heroId = parseInt(req.body.heroId)
            query.strength = parseInt(req.body.strength)
            query.invisibility = parseInt(req.body.invisibility)
            query.healing = parseInt(req.body.healing)
            query.shape = parseInt(req.body.shape)
            query.telekinesis = parseInt(req.body.telekinesis)
            const result = await jobTask.insertOne(query)
            res.send(result)
        })

        // specific data get 
        app.get('/supperHero', async (req, res) => {
            let query = {}
            if(req.query?.heroId){
                query = {heroId: req.query.heroId}
            }
            const result = await jobTask.findOne(query)
            res.send(result)
        })

        // all herro data get 
        app.get('/supperHeroAllData', async (req, res) => {
            const result = await jobTask.find().toArray()
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`to server site ranning is ${port}`)
})