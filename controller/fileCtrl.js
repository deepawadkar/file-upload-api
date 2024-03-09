const { StatusCodes } = require('http-status-codes')
const File = require('../model/file')
const fs = require('fs')

//upload File - post
const uploadFile =async (req,res) => {
    try {
        //to read file data -> req.files
        //let data = req.file
        let data = req.file      //if multipal files req.files

        // to validate file already exists or not
        let extFile = await File.findOne({ originalname: data.originalname})
        if(extFile)
            return res.status(StatusCodes.CONFLICT).json({msg:'File already exists.'})

            //file data upload to db
            let newFile = await File.create(data)

        res.status(StatusCodes.CREATED).json({ status: true, msg: "File uploaded ", file:newFile})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg : err})
      
    }
}
//read all files - get
const readAllFiles =async (req,res) => {
    try {
        // file is exists in dsb or not
        let data = await File.find({})
        
        //final response
        res.status(StatusCodes.ACCEPTED).json({ status:true, length: data.length, files:data})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg : err})
        
    }
}

//read single files - get(id)
const readSingleFile =async (req,res) => {
    try {
        //reading file id from router parameter
        let id = req.params.id

        // file is exists in dsb or not
        let extFile = await File.findById(id)

        //if file not exists -> throw err
        if(!extFile) 
        return res.status(StatusCodes.NOT_FOUND).json({status : false, msg: 'requested id not found'})

        //final response
        res.status(StatusCodes.ACCEPTED).json({ status: true , file:extFile })
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg : err})
        
    }
}

//read delete files - delete(id)
const deleteFile =async (req,res) => {
    try {
        //reading file id from router parameter
        let id = req.params.id

        // file is exists in dsb or not
        let extFile = await File.findById(id)

        //if file not exists -> throw err
        if(!extFile)
        return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg :'requested id not found'})
        
        //delete the physical file from the server
        fs.unlinkSync(extFile.path) 

        //deleting db connect
        await File.findByIdAndDelete(id)

        //final response
        return res.status(StatusCodes.ACCEPTED).json({ status: true , msg : ' file Deleted successfully'})
    } catch (err) {

        //locical error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg : err})
        
    }
}

module.exports = {uploadFile , readAllFiles, readSingleFile, deleteFile}