import { file } from "../models/chartSchema.js"

const createfileUpload =async(req,res) =>{

const{FileName,Base64File} = req.body;
const data = new file({
    FileName,
    Base64File,

});
try {
    await data.save();
    console.log("New File save");

    res.status(201).json({
        success:true,
        message:"Successfully File Uploaded",
    })
    
} catch (error) {

    console.error("Error in Uploading File",error.message);
    res.status(500).json({
        success:false,
        message:"Failed to Upload File ,request Entity too large",
        error:error.message,
});
    
}
}



//for sendind Uploaded files to frontEnd

const sendUploadedFile = async(req,res) =>{
    try {
         const data = await file.find({});
         console.log(data);

    res.status(200).json({
        success:true,
        message:"Found All Files",
        data,

    });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in Fetching file",
            error:error.message,
        })
        console.log(error.message);
    }

   
}


//For Delete Files

const deleteFiles = async(req,res) => {
    
    try {
        const id = req.params.id;
        await file.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"File Deleted Successfully",
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error in Deleting file",
            error:error.message,
        })
       console.log(error.message); 
    }
}

export {createfileUpload,sendUploadedFile,deleteFiles};