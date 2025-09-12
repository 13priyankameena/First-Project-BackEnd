import { form } from "../models/chartSchema.js";

const createFormTRecord = async (req, res) => {
    const { Name, Email, Age, DescribeYou, RecommendToFriend,Languages, Comment } = req.body;
    const data = new form({
  Name,
  Email,
  Age,
  DescribeYou,
  RecommendToFriend,
  Languages: Array.isArray(Languages) ? Languages : [Languages],
  Comment,
});


    try {
    await data.save();
    console.log("New record Created");

    // send success response
    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data,
    });
  } catch (error) {
    console.error("Error saving record:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create record",
      error: error.message,
    });
  }
};

const getFormrecords = async (req, res) => {
    try {
        const data = await form.find({});
        res.send(data);
    } catch (error) {
        console.log(error.message);
    }
};
export { createFormTRecord, getFormrecords };