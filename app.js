const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()

// initialize fileupload
app.use(fileUpload())

//upload endpoint
app.post('/upload', (req, res) => {
    // check if something coming 

    if (req.files === null) {
        // send a bad request with error message
        return res.status(400).json({msg:'No file was uploaded'})
    }
// if there is something uploaded ,then we pull it out from req object
    // file will define what is this on react we call it file
    // this file object has an mv (move) method that accept a path to where we want put the result
    const file = req.files.file
    file.mv(`${__dirname}/client/public/upload/${file.name}`, err => {
        // if the path doesnt exist the erro will run
        if (err) {
            console.log(err)
            // we also send a server error with status code of 500
            return res.status(500).send(err)
        }
        res.json({fileName:file.name,filePath:`/upload/${file.name}`})
    })
})

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server up and running on port ${PORT}`))