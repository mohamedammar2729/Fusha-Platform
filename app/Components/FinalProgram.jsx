"use client";
import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import SuccsessCard from "./SuccsessCard";
import {
  CircleButton,
  StyledBox,
  StyledWrapper,
} from "../styledComponent/ReadyPrograms/StyledReadyPrograms";
import {
  SaveButton,
  CancelButton,
  BackButton,
  ShareButton,
} from "../styledComponent/TripType/StyledTripType";

export default function FinalProgram() {
  const [hasMounted, setHasMounted] = useState(false); // Tracks if the client is mounted
  const [userprogram, setUserProgram] = useState([]);
  const [userPeople, setUserPeople] = useState("");
  const [userAmount, setUserAmount] = useState("");
  const [userTripType, setUserTripType] = useState("");
  const [userDestination, setUserDestination] = useState("");
  const [userTripProgram, setUserTripProgram] = useState("");
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setHasMounted(true); // Marks that we are on the client now
  }, []);

  useEffect(() => {
    if (!hasMounted) return; // Prevent running logic on the server

    const storedData = JSON.parse(localStorage.getItem("formData")) || {};
    const { people, amount, destination, savedProgram, selectedTitle } =
      storedData;
    setUserPeople(people || "");
    setUserAmount(amount || "");
    setUserDestination(destination || "");
    setUserProgram(savedProgram || []);
    setUserTripType(selectedTitle || "");

    if (savedProgram?.length > 0) {

      const programNames = savedProgram.map((p) => p.name).join(" -- ");
      setUserTripProgram(programNames);
    }
  }, [hasMounted]);

  const handleSubmit = useCallback(() => {
    const payload = {
      numberOfPersons: userPeople,
      locate: userDestination,
      budget: userAmount,
      typeOfProgram: userTripType,
      selectedTripPlaces: userTripProgram,
      images: userprogram.map((p) => p.image),
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:4000/api/createprogram", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setShowSuccessCard(true); // Show the success card
        setTimeout(() => {
          setShowSuccessCard(false);
          router.push("/"); // Redirect to the home page
        }, 2000); // Adjust the delay as needed
      })
      .catch((error) => {
        console.error(error);
      });

  }, [
    userPeople,
    userDestination,
    userAmount,
    userTripType,
    userTripProgram,
    userprogram,
  ]);

  if (!hasMounted) return null;

  return (
    <>
      {showSuccessCard && (
        <div
          style={{
            position: "fixed",
            top: "100px",
            left: "10px",
            width: "100%",
            zIndex: 1000,
          }}
        >
          <SuccsessCard />
        </div>
      )}
      <Box
        sx={{
          width: "fit-content",
          fontFamily: "Arial, sans-serif",
          padding: "2rem",
          backgroundColor: "#e1efff",
          mt: "3rem",
          borderRadius: "25px",
          position: "relative",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="end"
          sx={{ marginBottom: "1rem" }}
        >
          <StyledBox
            sx={{
              flexGrow: 1,
              justifyContent: "end",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <CircleButton>{`الميزانية :- ${userAmount}`}</CircleButton>
            <CircleButton>{`الموقع :- ${userDestination}`} </CircleButton>
            <CircleButton>{`عدد الاشخاص :- ${userPeople}`}</CircleButton>
            <CircleButton>{`نوع رحلتك :- ${userTripType}`} </CircleButton>
          </StyledBox>
        </Grid>
        <StyledBox sx={{ flexGrow: 1, justifyContent: "end" }}>
          <CircleButton>{`البرنامج :- ${userTripProgram}`}</CircleButton>
        </StyledBox>
        <StyledWrapper style={{ justifyContent: "center" }}>
          {userprogram.map((item, index) => (
            <div className="card-container" key={index}>
              <div className="card">
                <div className="img-content">
                  <img src={item.image} width={300} height={150} />
                </div>
                <div className="content">
                  <p className="heading">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </StyledWrapper>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          fontFamily: "Arial, sans-serif",
          borderRadius: "25px",
          position: "relative",
        }}
      >
        <CancelButton>إلغاء</CancelButton>
        <SaveButton onClick={handleSubmit}>حفظ</SaveButton>
        <BackButton onClick={() => router.push("/create?showProgram=true")}>
          رجوع
        </BackButton>
        <ShareButton>مشاركة</ShareButton>
      </Box>
    </>
  );
}
