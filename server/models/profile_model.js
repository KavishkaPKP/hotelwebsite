import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    bio: {
        type: "String",
        default: ""
    },
    phone: {
        type: "String",
         default: ""
    },
    gender: {
        type: "String",
         default: ""
    },
    avatar: {
        type: "String",
         default: ""
    },
    location: {
        type: "String",
         default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;