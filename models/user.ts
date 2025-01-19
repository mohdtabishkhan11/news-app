import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        age: String,
        // country: String,
        // interests: Array(String),
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model("User", User);
