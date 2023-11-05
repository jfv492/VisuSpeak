const express = require ('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express ()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'VisuSpeak'
})

app.get('/', (re, res)=> {
    return res.json("From Backend VisuSpeak");
})

app.get('/users', (req, res)=>{
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})