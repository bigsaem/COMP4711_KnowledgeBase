const profileData = require("../models/profileData");
const messageRepliesData = require("../models/messageRepliesData");

exports.getHomeInfo = (req, res, next) => {
    //not sure what to include yet..will do later
}

exports.viewMessagesPage = (req, res, next) => {
    let userID = req.params.userid;
    let data = {
        to: userID
    }

    let messages = await messageRepliesData.getAllConversation(data);

    //for now until we have a view to render
    console.log(messages);
}

exports.getMessageHistory = (req, res, next) => {
    let userID = req.params.userid;
    let recipientID = req.params.recipientid;

    let data = {
        to: userID,
        from: recipientID
    }

    let messages = await messageRepliesData.getConversation(data);

    console.log(messages);
}