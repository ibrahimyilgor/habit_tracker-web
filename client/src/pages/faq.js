import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack } from '@mui/system';
import Head from 'next/head';

const FAQItem = ({ question, answer }) => {
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{height: "7vh", display: "flex", alignItems: "center"}}>
                <Typography sx={{fontSize: 18}}>{question}</Typography>
            </Box>
        </AccordionSummary>
        <AccordionDetails >
          <Typography sx={{fontSize: 15}}>{answer}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

const Faq = () => {
  const {t} = useTranslation()

  const faqData = [
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis porta mi sit amet elementum. Mauris et nunc in metus molestie aliquam vel vel lorem. Morbi et dictum diam. Nullam feugiat turpis quis arcu vulputate, nec euismod erat pellentesque. Suspendisse gravida feugiat magna, vel tristique lectus congue sed. Donec accumsan, ipsum sed fermentum imperdiet, nibh massa interdum lorem, vel elementum felis mauris ac erat. Nam luctus sit amet risus sed facilisis. ',
    },
    {
      question: 'Sed mollis porta mi sit amet elementum?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis porta mi sit amet elementum. Mauris et nunc in metus molestie aliquam vel vel lorem. Morbi et dictum diam. Nullam feugiat turpis quis arcu vulputate, nec euismod erat pellentesque. Suspendisse gravida feugiat magna, vel tristique lectus congue sed. Donec accumsan, ipsum sed fermentum imperdiet, nibh massa interdum lorem, vel elementum felis mauris ac erat. Nam luctus sit amet risus sed facilisis. ',
    },
    {
        question: 'Mauris et nunc in metus molestie aliquam vel vel lorem?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis porta mi sit amet elementum. Mauris et nunc in metus molestie aliquam vel vel lorem. Morbi et dictum diam. Nullam feugiat turpis quis arcu vulputate, nec euismod erat pellentesque. Suspendisse gravida feugiat magna, vel tristique lectus congue sed. Donec accumsan, ipsum sed fermentum imperdiet, nibh massa interdum lorem, vel elementum felis mauris ac erat. Nam luctus sit amet risus sed facilisis. ',
      },
      {
        question: 'Nam luctus sit amet risus sed facilisis?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis porta mi sit amet elementum. Mauris et nunc in metus molestie aliquam vel vel lorem. Morbi et dictum diam. Nullam feugiat turpis quis arcu vulputate, nec euismod erat pellentesque. Suspendisse gravida feugiat magna, vel tristique lectus congue sed. Donec accumsan, ipsum sed fermentum imperdiet, nibh massa interdum lorem, vel elementum felis mauris ac erat. Nam luctus sit amet risus sed facilisis. ',
      },
      {
        question: 'Suspendisse gravida feugiat magna, vel tristique lectus congue sed?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis porta mi sit amet elementum. Mauris et nunc in metus molestie aliquam vel vel lorem. Morbi et dictum diam. Nullam feugiat turpis quis arcu vulputate, nec euismod erat pellentesque. Suspendisse gravida feugiat magna, vel tristique lectus congue sed. Donec accumsan, ipsum sed fermentum imperdiet, nibh massa interdum lorem, vel elementum felis mauris ac erat. Nam luctus sit amet risus sed facilisis. ',
      },
      {
        question: 'Sed mollis porta mi sit amet elementum?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis porta mi sit amet elementum. Mauris et nunc in metus molestie aliquam vel vel lorem. Morbi et dictum diam. Nullam feugiat turpis quis arcu vulputate, nec euismod erat pellentesque. Suspendisse gravida feugiat magna, vel tristique lectus congue sed. Donec accumsan, ipsum sed fermentum imperdiet, nibh massa interdum lorem, vel elementum felis mauris ac erat. Nam luctus sit amet risus sed facilisis. ',
      },
      {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis porta mi sit amet elementum. Mauris et nunc in metus molestie aliquam vel vel lorem. Morbi et dictum diam. Nullam feugiat turpis quis arcu vulputate, nec euismod erat pellentesque. Suspendisse gravida feugiat magna, vel tristique lectus congue sed. Donec accumsan, ipsum sed fermentum imperdiet, nibh massa interdum lorem, vel elementum felis mauris ac erat. Nam luctus sit amet risus sed facilisis. ',
      },
    // Add more FAQ items as needed
  ];

  return (
    <>
        <Head>
            <title>
                Menu | Devias Kit
            </title>
        </Head>
        <Box
        component="main"
        sx={{
            flexGrow: 1,
            py: 8
        }}
        >
            <Container maxWidth="lg">
                <Stack spacing={0}>
                    <div style={{flex: 2, display: "flex", alignItems: "center", marginBottom: 20}}>
                        <Typography variant="h4">
                            {t("faq.title")}
                        </Typography>
                    </div>
                    {faqData.map((faqItem, index) => (
                        <FAQItem key={index} question={faqItem.question} answer={faqItem.answer} />
                    ))}
                </Stack>
            </Container>
        </Box>
    </>
  )};

  Faq.getLayout = (faq) => (
  <DashboardLayout>
    {faq}
  </DashboardLayout>
);

export default Faq;
