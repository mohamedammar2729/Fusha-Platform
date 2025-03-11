"use client";

import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import axios from "axios";
import {
  CircleButton,
  MyMyBox,
  MYYStyledWrapper,
  StyledBox,
} from "../styledComponent/Trips/StyledTrips";
import { useRouter } from "next/navigation";

const Trips = () => {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const router = useRouter();

  const fetchData = useCallback(async () => {
    if (!token) {
      router.push("/"); // Redirect to login if token is missing
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:4000/api/createprogram",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [token, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/createprogram/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); // Refresh the component after delete process
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <MyMyBox
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      {items.map((item) => {
        const programNames = item.selectedTripPlaces[0].split(" -- ");
        return (
          <Box
            sx={{
              fontFamily: "Arial, sans-serif",
              padding: "3rem",
              backgroundColor: "#e1efff",
              mt: "2rem",
              borderRadius: "0px 0px 25px 25px",
              position: "relative",
              width: "42.8%",
            }}
            key={item._id}
          >
            <BookmarkRemoveOutlinedIcon
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => handleDelete(item._id)}
            />
            <Grid
              container
              spacing={2}
              justifyContent="end"
              sx={{ marginBottom: "1rem" }}
            >
              <StyledBox
                sx={{
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <CircleButton> {`الميزانية :- ${item.budget}`}</CircleButton>
                <CircleButton>{`الموقع :- ${item.locate}`} </CircleButton>
                <CircleButton>{`عدد الاشخاص :- ${item.numberOfPersons}`}</CircleButton>
                <CircleButton>
                  {" "}
                  {` نوع رحلتك :- ${item.typeOfProgram}`}{" "}
                </CircleButton>
              </StyledBox>
            </Grid>
            <StyledBox >
              <CircleButton>
                {`  البرنامج :- ${item.selectedTripPlaces[0]}`}
              </CircleButton>
            </StyledBox>
            <MYYStyledWrapper>
              {item.images.map((image, index) => (
                <div className="card-container" key={index}>
                  <div className="card">
                    <div className="img-content">
                      <img
                        src={image}
                        width={200}
                        height={150}
                        alt={`Trip ${index}`}
                      />
                    </div>
                    <div className="content">
                      <p className="heading">{programNames[index]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </MYYStyledWrapper>
          </Box>
        );
      })}
    </MyMyBox>
  );
};

export default Trips;
