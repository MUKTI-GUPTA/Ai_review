const express = require('express');
const aiRoutes = require("./routes/ai.routes")
const cors = require("cors")

const app = express();


app.use(express.json());

app.use(cors());

app.get('/', (req,res)=>{
    res.send('Hello World!')
})

app.use('/ai', aiRoutes)

// app.use((req,res)=>{
//     res.status(404).send({message: "Gateway Not found"})
// })

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});



module.exports = app