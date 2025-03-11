"use client";

import React from "react";
import {
  FeedbackContainer,
  FormContainer,
  FeedbackTitle,
  InputField,
  TextArea,
  SubmitButton,
  ImageContainer,
} from "../styledComponent/CustomerRatings/styledCustomerRatings";

const Contact = () => {
  return (
    <FeedbackContainer>
      {/* الصورة الجانبية */}
      <ImageContainer />

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
