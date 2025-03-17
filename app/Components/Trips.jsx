"use client";
import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MyMyBox,
  MYYStyledWrapper,
  StatusBadge,
  DetailItemWrapper,
  TimelineDot,
  TimelineLine,
  TripCard,
  CarouselContainer,
  GradientOverlay,
  DetailsContainer,
  DetailRow,
  DetailItem,
  TimelineSection,
  TimelineItem,
  CarouselImage,
} from "../styledComponent/Trips/StyledTrips";
import {
  Place as PlaceIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

const Trips = () => {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const router = useRouter();

  const fetchData = useCallback(async () => {
    if (!token) {
      router.push("/");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:4000/api/createprogram",
        { headers: { Authorization: `Bearer ${token}` } }
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
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <MyMyBox>
      {items.map((item) => {
        const places = item.selectedTripPlaces[0]?.split(" -- ") || [];
        const statusConfig = {
          completed: {
            color: "#4CAF50",
            text: "مكتملة",
            icon: <ScheduleIcon />,
          },
          upcoming: { color: "#2196F3", text: "قادمة", icon: <ScheduleIcon /> },
          cancelled: {
            color: "#F44336",
            text: "ملغاة",
            icon: <ScheduleIcon />,
          },
        };

        return (
          <TripCard key={item._id}>
            {/* Image Carousel */}
            <CarouselContainer>
              <Slider {...carouselSettings}>
                {item.images.map((image, index) => (
                  <CarouselImage key={index}>
                    <img src={image} alt={`Trip ${index}`} />
                  </CarouselImage>
                ))}
              </Slider>

              {/* Gradient Overlay */}
              <GradientOverlay>
                <DeleteIcon
                  sx={{ color: "white", cursor: "pointer" }}
                  onClick={() => handleDelete(item._id)}
                />
                <StatusBadge status={item.status || "upcoming"}>
                  {statusConfig[item.status]?.icon}
                  <span>{statusConfig[item.status]?.text}</span>
                </StatusBadge>
              </GradientOverlay>
            </CarouselContainer>

            {/* Details Section */}
            <DetailsContainer>
              <DetailRow>
                <DetailItem>
                  <AttachMoneyIcon sx={{ color: "#f1c40f" }} />
                  <span>{item.budget.toLocaleString()} جنيه</span>
                </DetailItem>
                <DetailItem>
                  <PlaceIcon sx={{ color: "#e74c3c" }} />
                  <span>{item.locate}</span>
                </DetailItem>
              </DetailRow>

              <DetailRow>
                <DetailItem>
                  <PeopleIcon sx={{ color: "#4a72ac" }} />
                  <span>{item.numberOfPersons} أشخاص</span>
                </DetailItem>
                <DetailItem>
                  <CategoryIcon sx={{ color: "#2ecc71" }} />
                  <span>{item.typeOfProgram}</span>
                </DetailItem>
              </DetailRow>

              {/* Timeline */}
              <TimelineSection>
                <h3>خط سير الرحلة</h3>
                {places.map((place, index) => (
                  <TimelineItem
                    key={index}
                    isLast={index === places.length - 1}
                  >
                    <TimelineDot />
                    {index !== places.length - 1 && <TimelineLine />}{" "}
                    {/* Fix the condition */}
                    <span>{place}</span>
                  </TimelineItem>
                ))}
              </TimelineSection>
            </DetailsContainer>
          </TripCard>
        );
      })}
    </MyMyBox>
  );
};

export default Trips;
