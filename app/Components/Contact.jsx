"use client";

import React from "react";
import {
  FeedbackContainer,
  FormContainer,
  FeedbackTitle,
  InputField,
  TextArea,
  SubmitButton,
} from "../styledComponent/CustomerRatings/styledCustomerRatings";
import Box from "@mui/material/Box";
import Image from "next/image";

// contact component
const Contact = () => {
  return (
    <FeedbackContainer>
      {/* الصورة الجانبية */}
      <Box
        style={{ width: "40%", height: "455px", borderRadius: "10px 0 0 10px" }}
      >
        <Image
          src="/ConnectUs.png"
          width={500}
          height={500}
          alt="ConnectUs"
          sx={{
            objectFit: "cover",
            borderRadius: "10px 0 0 10px",
          }}
        />
      </Box>

      {/* النموذج */}
      <FormContainer>
        <FeedbackTitle>تواصل معنا</FeedbackTitle>
        <InputField type="text" placeholder="الاسم الثلاثي" />
        <InputField type="email" placeholder="بريدك الإلكتروني" />
        <TextArea placeholder="تفاصيل . . ." />
        <SubmitButton>إرسال</SubmitButton>
      </FormContainer>
    </FeedbackContainer>
  );
};

export default Contact;
