const express = require('express')
const path = require ('path')
const multer = require('multer')

//storage location and filename
const myStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "documents/")
    },
    filename : (req, file, cb) =>{
        //cb(null,file.originalname) //originalname
        cb(null, `doc-${ new Date().getTime().toString()}${path.extname(file.originalname)}`) //doc-1634529709  
    }
});

//multer config
const fileConfig = multer ({
    storage: myStorage,
    limits:{
        fileSize: 10* 1024 * 1024 //10MB
    }
}).single('myfile')

//.single('myfile') -> for single file
//.array('myfile) -> for uploading multipal files

module.exports =fileConfig