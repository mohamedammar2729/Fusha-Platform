"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  CircleButton,
  StyledBox,
  StyledWrapper,
} from "../styledComponent/ReadyPrograms/StyledReadyPrograms";

const ReadyPrograms = ({ initialData }) => {
  const [bookmarked, setBookmarked] = useState({});
  const [items, setItems] = useState(initialData); // استخدام البيانات الأولية من السيرفر

  const handleBookmarkClick = (id) => {
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {items.map((item) => (
        <Box
          sx={{
            fontFamily: "Arial, sans-serif",
            padding: "3rem",
            backgroundColor: "#e1efff",
            mt: "2rem",
            borderRadius: "25px",
            position: "relative",
          }}
          key={item._id}
        >
          <IconButton
            sx={{ position: "absolute", top: "1rem", right: "1rem" }}
            onClick={() => handleBookmarkClick(item._id)}
          >
            {bookmarked[item._id] ? (
              <BookmarkIcon color="primary" />
            ) : (
              <BookmarkBorderIcon color="primary" />
            )}
          </IconButton>
          <Grid
            container
            spacing={2}
            justifyContent="end"
            sx={{ marginBottom: "1rem" }}
          >
            <StyledBox
              sx={{
                flexGrow: 1,
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Rating
                name="rating"
                value={`${item.rate}`}
                precision={0.5}
                readOnly
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              />
              <CircleButton> {`الميزانية :- ${item.budget}`}</CircleButton>
              <CircleButton>{`الموقع :- ${item.location}`} </CircleButton>
              <CircleButton>{`عدد الاشخاص :- ${item.person_num}`}</CircleButton>
              <CircleButton> {` نوع رحلتك :- ${item.type_trip}`} </CircleButton>
            </StyledBox>
          </Grid>
          <StyledBox sx={{ flexGrow: 1, justifyContent: "end" }}>
            <CircleButton>{`  البرنامج :- ${item.program}`} </CircleButton>
          </StyledBox>
          <StyledWrapper>
            <div className="card-container">
              <div className="card">
                <div className="img-content">
                  <img src={item.images.src1} width={200} height={150} />
                </div>
                <div className="content">
                  <p className="heading">{item.images.title1}</p>
                </div>
              </div>
            </div>
            <div className="card-container">
              <div className="card">
                <div className="img-content">
                  <img src={item.images.src2} width={200} height={150} />
                </div>
                <div className="content">
                  <p className="heading">{item.images.title2}</p>
                </div>
              </div>
            </div>
            <div className="card-container">
              <div className="card">
                <div className="img-content">
                  <img src={item.images.src3} width={200} height={150} />
                </div>
                <div className="content">
                  <p className="heading">{item.images.title3}</p>
                </div>
              </div>
            </div>
            <div className="card-container">
              <div className="card">
                <div className="img-content">
                  <img src={item.images.src4} width={200} height={150} />
                </div>
                <div className="content">
                  <p className="heading">{item.images.title4}</p>
                </div>
              </div>
            </div>
          </StyledWrapper>
        </Box>
      ))}
    </>
  );
};

export default ReadyPrograms;
