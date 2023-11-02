import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

const PdfDropzone = ({ file, setFile }) => {
  const { t } = useTranslation();

  const [pdfPreview, setPdfPreview] = useState("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPdfPreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPdfPreview("");
    }
  }, [file]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0 && acceptedFiles[0].type === "application/pdf") {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf",
    maxFiles: 1,
  });

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          {...getRootProps()}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            color: "text.secondary",
            p: 4,
            borderRadius: 1,
            border: "1px dashed",
            borderColor: "divider",
            cursor: "pointer",
            height: "70%",
            width: "80%",
            "&:hover": {
              opacity: 0.7,
            },
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="h6">
            {file ? t("pdfUploader.changePdf") : t("pdfUploader.dropFile")}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {file && (
            <Button variant="outlined" size="small" sx={{ ml: 2 }} onClick={() => setFile()}>
              {t("common.clear")}
            </Button>
          )}
        </Box>
      </Box>

      {/* <form>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </form> */}
      {file && (
        <iframe
          src={pdfPreview ? pdfPreview + "#toolbar=0&navpanes=0" : pdfPreview}
          title="PDF Preview"
          style={{ width: "100%", height: "900px" }}
        ></iframe>
      )}
    </div>
  );
};

export default PdfDropzone;
