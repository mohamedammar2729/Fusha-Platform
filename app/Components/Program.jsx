"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  Container,
  CategoriesContainer,
  CategoryItem,
  PlacesContainer,
  PlaceList,
  ProgramSelect,
  Wrapper,
  ProgramCard,
  CardImage,
  Descriptions,
  CardTitle,
  CardText,
  PlayButton,
  MyMenuItem,
} from "../styledComponent/Program/StyledProgram";
import axios from "axios";
import Link from "next/link";
import { BackButton, ShareButton } from "../styledComponent/TripType/StyledTripType";

const defaultCategories = [{ selectedType: "" }];

const Program = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [savedProgram, setSavedProgram] = useState([]);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

    const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/places");
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const userOption = useMemo(() => {
    if (places.length > 0) {
      const storedData = JSON.parse(localStorage.getItem("formData")) || {};
      const filteredByPlaces = places.filter(
        (place) => place.city === storedData.destination
      );

      return filteredByPlaces.filter((place) =>
        place.cate.includes(storedData.selectedTitle)
      );
    }
    return [];
  }, [places]);

  const uniqueTypes = useMemo(
    () => [...new Set(userOption.map((option) => option.type))],
    [userOption]
  );

  const handleTypeChange = useCallback((index, newType) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === index ? { ...cat, selectedType: newType } : cat
      )
    );
  }, []);

  const handleSave = useCallback((place) => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || {};
    if (!storedData.savedProgram) {
      storedData.savedProgram = [];
    }
    const exists = storedData.savedProgram.some(
      (item) => item.name === place.name
    );
    if (!exists) {
      storedData.savedProgram.push({
        name: place.name,
        image: place.image,
      });
      localStorage.setItem("formData", JSON.stringify(storedData));
      setSavedProgram(storedData.savedProgram);
    }
    setShowSuccessCard(true);
    setTimeout(() => {
      setShowSuccessCard(false);
    }, 1000);
  }, []);

  return (
    <>
      <Container>
        <h2 style={{ marginRight: "5rem", fontSize: "2rem" }}>
          {" "}
          إختار الأماكن علي مزاجك{" "}
        </h2>
        <CategoriesContainer>
          {categories.map((category, index) => (
            <CategoryItem key={index}>
              <ProgramSelect
                value={category.selectedType}
                onChange={(e) => handleTypeChange(index, e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      borderRadius: "20px",
                      background: "#f2f9fc",
                      boxShadow: "none",
                      width: "100px",
                    },
                  },
                }}
              >
                <MyMenuItem value="">الكل</MyMenuItem>
                {uniqueTypes.map((type) => (
                  <MyMenuItem key={type} value={type}>
                    {type}
                  </MyMenuItem>
                ))}
              </ProgramSelect>
            </CategoryItem>
          ))}
        </CategoriesContainer>
        <PlacesContainer>
          {categories.map((category, index) => (
            <PlaceList key={index}>
              <PlacesContainer>
                {userOption
                  .filter((option) =>
                    category.selectedType
                      ? option.type === category.selectedType
                      : true
                  )
                  .map((option) => (
                    <Wrapper key={option._id}>
                      <ProgramCard>
                        <CardImage src={option.image} alt={option.name} />
                        <Descriptions>
                          <CardTitle>{option.name}</CardTitle>
                          <CardText>
                            {option.description}
                            <div style={{ marginTop: "10px" }}>
                              السعر: {option.price}
                            </div>
                            <div style={{ marginTop: "10px" }}>
                              الموقع: {option.location}
                            </div>
                            <Rating
                              style={{ marginTop: "10px" }}
                              value={option.rate}
                              precision={0.1}
                              readOnly
                            />
                            <PlayButton
                              onClick={() => handleSave(option)}
                              style={{ marginTop: "auto" }}
                            >
                              حفظ
                            </PlayButton>
                            {showSuccessCard && (
                              <div
                                style={{
                                  width: "100%",
                                  zIndex: 1000,
                                  fontWeight: "bolder",
                                  fontSize: "1.2rem",
                                  color: "green",
                                }}
                              >
                                تمت إلاضافه إلي رحلتك بنجاح
                              </div>
                            )}
                          </CardText>
                        </Descriptions>
                      </ProgramCard>
                    </Wrapper>
                  ))}
              </PlacesContainer>
            </PlaceList>
          ))}
        </PlacesContainer>
        <div style={{ display: "flex" }}>
          <Link href="/create/final">
            <ShareButton
              style={{
                marginTop: "2rem",
                fontSize: "1.5rem",
                display: "ruby-text",
                marginLeft: "4rem",
              }}
            >
              إنهاء
            </ShareButton>
          </Link>
          <BackButton
            onClick={() => router.push("/create?showTripType=true")}
            style={{
              marginTop: "2rem",
              fontSize: "1.5rem",
            }}
          >
            رجوع
          </BackButton>
        </div>
      </Container>
    </>
  );
};

export default Program;
