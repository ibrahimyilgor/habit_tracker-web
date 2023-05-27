/*SAVE PDFMENU*/

import MenuPdf from "../models/MenuPdf.js";

export const savePdf = async (req, res) => {
    try {
      const { restaurant_id, fileName } = req.body;
      const file = req.file.buffer;
  
      // Check if a document with the restaurant_id already exists
      const existingPdf = await MenuPdf.findOne({ restaurant_id });
  
      if (existingPdf) {
        // Update the existing document
        existingPdf.file = file;
        await existingPdf.save();
      } else {
        // Create a new PDF document
        const newPdf = new MenuPdf({
          restaurant_id,
          file,
          fileName
        });
  
        // Save the new PDF document to the database
        await newPdf.save();
      }
  
      res.status(201).json({ message: 'PDF uploaded successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to upload PDF.' });
    }
  };

 /*READ PDFMENU*/

export const getPdf = async (req, res) => {
    try {
      const { restaurant_id } = req.params;
  
      // Find the PDF document based on the restaurant_id
      const pdf = await MenuPdf.findOne({ restaurant_id });
  
      if (!pdf) {
        return res.status(404).json({ message: 'PDF not found.' });
      }
  
      // Send the PDF file as a response
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdf.file);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve PDF.' });
    }
  };