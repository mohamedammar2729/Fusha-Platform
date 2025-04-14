"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";
import img1 from "../public/404.png";
import { NextButton } from "./styledComponent/TripType/StyledTripType";
import Link from "next/link";
import { motion } from "framer-motion";

const NotFound = React.memo(() => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        marginTop: "6rem",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <motion.h1
        style={{
          fontSize: "3rem",
          fontWeight: "800",
          fontFamily: "cursive",
          margin: "0",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        إيرور يا سيدي
      </motion.h1>
      <motion.p
        style={{ fontSize: "2rem", fontFamily: "cursive" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        الصفحة مش موجودة يمعلم
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Image
          src={img1}
          alt="404"
          style={{ width: "85%", height: "35rem", objectFit: "contain" }}
        />
      </motion.div>
      <Link href="/">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <NextButton style={{ marginTop: "1rem" }}>إرجع ع البيت</NextButton>
        </motion.div>
      </Link>
    </Container>
  );
});

export default NotFound;
