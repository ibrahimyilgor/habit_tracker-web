import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { Box, Container, Stack } from "@mui/system";
import Head from "next/head";
import { useAuthContext } from "src/contexts/auth-context";
import i18n from "src/i18n";

const FAQItem = ({ question, answer }) => {
  return (
    <Accordion
      sx={{ boxShadow: "0px 5px 22px rgba(0, 0, 0, 0.04),0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)" }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ height: "7vh", display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: 18 }}>{question?.text}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ fontSize: 15 }}>{answer?.text}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const Faq = () => {
  const { t } = useTranslation();
  const state = useAuthContext();

  const lang = i18n.languages[0];

  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_SERVER + `/faq/list`, {
          method: "GET",
          headers: { Authorization: "Bearer " + state?.user?.token },
        });

        const tempFaqData = await response.json();

        setFaqData(tempFaqData);

        return tempFaqData;
      } catch (error) {
        return null;
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <>
      <Head>
        <title>{t("titles.faq")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={0}>
            <div style={{ flex: 2, display: "flex", alignItems: "center", marginBottom: 20 }}>
              <Typography variant="h4">{t("faq.title")}</Typography>
            </div>
            {faqData.map((faqItem, index) => (
              <FAQItem
                key={index}
                question={faqItem.question.filter((f) => f.language === lang)[0]}
                answer={faqItem.answer.filter((f) => f.language === lang)[0]}
              />
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Faq.getLayout = (faq) => <DashboardLayout>{faq}</DashboardLayout>;

export default Faq;
