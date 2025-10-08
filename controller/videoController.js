import { video } from "../models/chartSchema.js";

const createVideoUpload =async(req,res) =>{

const{FileName,Base64File} = req.body;
const data = new video({
    FileName,
    Base64File,

});
try {
    await data.save();
    console.log("New File save");

    res.status(201).json({
        success:true,
        message:"Successfully VideoFile Uploaded",
    })
    
} catch (error) {

    console.error("Error in Uploading Video-File",error.message);
    res.status(500).json({
        success:false,
        message:"Failed to Upload Video-File ,request Entity too large",
        error:error.message,
});
    
}
}


const getVideoUploadedFile = async(req,res) =>{
    try {
            const data = await video.find({});
            
            res.status(200).json({
                sucess:true,
                message:"Found All video Files",
                data,
            })
            console.log("Found all videos file",data);
        
    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:"Error in Fetching Video Files",
            error:error.message,
        })
        console.log(error.message);
    }
}

export {createVideoUpload,getVideoUploadedFile};