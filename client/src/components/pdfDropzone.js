import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDropzone } from "react-dropzone";
import { useTranslation } from 'react-i18next';

export const PdfDropzone = ({  }) => {
    const {t} = useTranslation()

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          setSelectedFile(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ".pdf",
        maxFiles: 1,
    });

    return (
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
            "&:hover": {
                opacity: 0.7,
            },
            }}
        >
            <input {...getInputProps()} />
            <Typography variant="h6">{t("pdfUploader.dropFile")}</Typography>
        </Box>
    );
}