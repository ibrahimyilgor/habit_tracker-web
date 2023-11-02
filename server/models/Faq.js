import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema({
  question: [
    {
      language: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  answer: [
    {
      language: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

const Faq = mongoose.model("Faq", FaqSchema);
export default Faq;
