import mongoose, { Schema } from "mongoose";

const MenuPdfSchema = new mongoose.Schema({
    restaurant_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Restaurant' 
    },
    file: {
        type: Buffer,
        required: true 
    },
    fileName: {
        type: String,
        required: true 
    },
});

const MenuPdf = mongoose.model('MenuPdf', MenuPdfSchema);
export default MenuPdf