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
        if (data) {
            await data.save();
            console.log("New record Created");
        }
        res.send(data);
    } catch (error) {
        console.log(error.message)
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