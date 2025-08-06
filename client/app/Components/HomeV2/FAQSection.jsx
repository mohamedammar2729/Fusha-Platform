import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link as MuiLink,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const FAQSection = ({ theme, darkMode }) => {
  // FAQ data
  const faqs = [
    {
      question: "كيف يمكنني تسجيل مكاني على منصة فسحة؟",
      answer:
        "يمكنك التسجيل كبائع أولاً ثم إضافة مكانك عبر لوحة التحكم. ستمر بياناتك بعملية مراجعة قصيرة قبل أن يظهر مكانك للمستخدمين.",
    },
    {
      question: "ما هي تكلفة التسجيل في المنصة؟",
      answer:
        "التسجيل مجاني تماماً في الوقت الحالي، ونعمل على توفير باقات مدفوعة مستقبلاً لتعزيز ظهور مكانك وزيادة الحجوزات.",
    },
    {
      question: "كم من الوقت تستغرق مراجعة معلومات مكاني؟",
      answer:
        "تستغرق عملية المراجعة من 24 إلى 48 ساعة عمل. نحرص على التأكد من جودة المعلومات والصور قبل الموافقة على نشرها.",
    },
    {
      question: "هل يمكنني تعديل معلومات مكاني بعد نشرها؟",
      answer:
        "نعم، يمكنك تعديل معلومات وصور مكانك في أي وقت من خلال لوحة التحكم الخاصة بك. التعديلات الجوهرية قد تتطلب مراجعة إضافية.",
    },
  ];

  const QuestionIcon = (props) => {
    return <HelpOutlineIcon {...props} />;
  };

  return (
    <>
      <Box
        id="faqs"
        sx={{
          padding: { xs: "40px 20px", md: "80px 40px" },
          backgroundColor: darkMode ? theme.colors.background : "#fff",
        }}
      >
        <Box sx={{ maxWidth: "1000px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: "bold",
                marginBottom: "3rem",
                color: theme.colors.primary,
                textAlign: "center",
              }}
            >
              الأسئلة الشائعة
            </Typography>
          </motion.div>

          <Box sx={{ direction: "rtl" }}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Accordion
                  sx={{
                    marginBottom: 2,
                    backgroundColor: darkMode ? theme.colors.surface : "#fff",
                    borderRadius: "10px !important",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    border: "1px solid",
                    borderColor: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: theme.colors.primary }} />
                    }
                    sx={{ padding: "16px 24px" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: theme.colors.text,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <QuestionIcon
                        sx={{
                          marginLeft: 1,
                          color: theme.colors.primary,
                          minWidth: 24,
                        }}
                      />
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: "0 24px 20px" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.colors.textSecondary,
                        lineHeight: 1.8,
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FAQSection;
