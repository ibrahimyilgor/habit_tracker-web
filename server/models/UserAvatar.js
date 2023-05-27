import mongoose, { Schema } from "mongoose";

const UserAvatarSchema = new mongoose.Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    file: {
        type: Buffer,
        required: true 
    }
});

const UserAvatar = mongoose.model('UserAvatar', UserAvatarSchema);
export default UserAvatar