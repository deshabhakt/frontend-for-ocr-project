const express = require('express')

const app = express()

const { urlencoded } = require("body-parser")

app.use(urlencoded({ extended: true }));

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname+'/about.html')
})

app.get('/contact', (req, res) => {
    res.sendFile(__dirname+'/contact.html')
})





const portNumber = process.env.PORT || 8080

app.listen(portNumber, () => {
    console.log("server started on http://localhost:"+portNumber)
})