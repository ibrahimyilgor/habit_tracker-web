import Faq from "../models/Faq.js";

//GET FAQ

export const getFaq = async (req, res) => {
  try {
    const faqs = await Faq.find();

    if (!faqs || faqs.length === 0) {
      return res.status(404).json({ message: "FAQ not found." });
    }

    // You mentioned sending the FAQ data as a PDF response,
    // but here I'll modify the response to send the faqs as JSON data instead
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve FAQs." });
  }
};
