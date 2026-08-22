const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ajayvaniya54_db_user:<password>@100xapps.0e3gyyb.mongodb.net/trello")

// schemas and models 

const userSchema = mongoose.Schema({
    username: String,
    password: String
})

const organizationSchema = mongoose.Schema({
    title: String,
    description: String,
    admin: mongoose.Types.ObjectId,
    members: [mongoose.Types.ObjectId]
})


const organizationModel = mongoose.model("organization", organizationSchema);
const userModel = mongoose.model("users", userSchema);

module.exports = {
    organizationModel,
    userModel
}