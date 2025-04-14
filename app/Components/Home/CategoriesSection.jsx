import React, { useMemo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import { motion } from "framer-motion";

import {
  CategoriesContainer,
  CategoriesTitle,
  CardsGrid,
  StyledCard,
  CardTitle,
} from "../../styledComponent/home/styledHome";

import axios from "axios";

const CategoriesSection = ({ theme, darkMode }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://iti-server-production.up.railway.app/api/home"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategories = useMemo(
    () =>
      categories.map((category, index) => (
        <StyledCard
          className="card"
          key={index}
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <CardTitle>{category.title}</CardTitle>
        </StyledCard>
      )),
    [categories]
  );

  return (
    <>
      <CategoriesContainer
        style={{
          backgroundColor: darkMode ? theme.colors.background : undefined,
          padding: "80px 20px",
        }}
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <CategoriesTitle
          style={{
            color: theme.colors.primary,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            marginBottom: "60px",
          }}
          as={motion.h2}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span
            style={{
              WebkitBackgroundClip: "text",
              display: "inline-block",
            }}
          >
            أماكن هتفرحك وعمرك ما تنساها
          </span>
        </CategoriesTitle>

        {/* Add category filter options */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          {["الكل", "مطاعم", "سياحة", "ترفيه", "تسوق", "شواطئ"].map(
            (category) => (
              <Chip
                key={category}
                label={category}
                sx={{
                  background:
                    category === "الكل" ? theme.colors.primary : "transparent",
                  color: category === "الكل" ? "#fff" : theme.colors.text,
                  border: `1px solid ${theme.colors.primary}`,
                  fontSize: "0.95rem",
                  py: 2.5,
                  px: 1,
                  "&:hover": {
                    background: theme.colors.primary,
                    color: "#fff",
                  },
                }}
                clickable
              />
            )
          )}
        </Box>

        <CardsGrid
          as={motion.div}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {renderCategories}
        </CardsGrid>

        {/* View all places button */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="outlined"
            sx={{
              color: theme.colors.primary,
              borderColor: theme.colors.primary,
              fontSize: "1.1rem",
              py: 1.2,
              px: 4,
              borderRadius: "50px",
              "&:hover": {
                borderColor: theme.colors.primary,
                backgroundColor: "rgba(74, 114, 172, 0.1)",
              },
            }}
          >
            عرض جميع الأماكن
          </Button>
        </Box>
      </CategoriesContainer>
    </>
  );
};

export default CategoriesSection;
