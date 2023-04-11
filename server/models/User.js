import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        surname: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            min: 2,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 50,
        },
        gender: {
            type: String,
            required: false,
        },
        birth_date: {
            type: Date,
            required: false,
        },
        country: {
            type: String,
            required: false,
        }
    },
    {timestamps: true}
)

const User = mongoose.model("User", UserSchema)
export default User