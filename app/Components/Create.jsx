"use client";

import React, { useState, useCallback, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import {
  FormContainer,
  InputBox,
  Label,
  MyOwnSelect,
  NextButton,
  NumberCircle,
} from "../styledComponent/Create/StyledCreate";
import { Menu, MenuItem } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledTextField } from "../styledComponent/Register/StyledRegister";
import { useRouter } from "next/navigation";
import TripType from "./TripType";

const MemoizedTypography = React.memo(({ children, ...props }) => (
  <Typography {...props}>{children}</Typography>
));

const MemoizedInputBox = React.memo(({ children, ...props }) => (
  <InputBox {...props}>{children}</InputBox>
));

const MemoizedNumberCircle = React.memo(({ children, ...props }) => (
  <NumberCircle {...props}>{children}</NumberCircle>
));

const MemoizedLabel = React.memo(({ children, ...props }) => (
  <Label {...props}>{children}</Label>
));

const MemoizedMyOwnSelect = React.memo(({ children, ...props }) => (
  <MyOwnSelect {...props}>{children}</MyOwnSelect>
));


export default function Create() {
  const [form, setForm] = useState({ people: "", amount: "", destination: "" });
  const [create, setCreate] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter(); 


  const handleSubmit = useCallback(() => {
    localStorage.setItem("formData", JSON.stringify(form));
    setCreate(false);
    router.push("/create?showTripType=true");
  }, [form]);

  useEffect(() => {
    const showProgramm = searchParams.get("showProgram");
    const showCreate = searchParams.get("showCreate");
    if (showProgramm) {
      setCreate(false);
    }

    if (showCreate) {
      setCreate(true);
    }
  }, [searchParams]);

  const handleChange = useCallback(
    (field) => (event) => {
      setForm((prevForm) => ({ ...prevForm, [field]: event.target.value }));
    },
    []
  );

  return (
    <>
      {create && (
        <FormContainer>
          <MemoizedTypography
            variant="h4"
            sx={{ color: "#2D3250", fontWeight: "bold", mb: 3 }}
          >
            فصل رحلتك على مزاجك 🎉
          </MemoizedTypography>

          {/* Field 1 */}
          <MemoizedInputBox>
            <MemoizedNumberCircle>1</MemoizedNumberCircle>
            <MemoizedLabel>عدد الأشخاص 👥</MemoizedLabel>
            <StyledTextField
              type="number"
              fullWidth
              placeholder="اكتب العدد هنا..."
              value={form.people}
              onChange={handleChange("people")}
              required
            />
          </MemoizedInputBox>

          {/* Field 2 */}
          <MemoizedInputBox>
            <MemoizedNumberCircle>2</MemoizedNumberCircle>
            <MemoizedLabel>معاك كام 💰</MemoizedLabel>
            <StyledTextField
              type="number"
              fullWidth
              placeholder="اكتب المبلغ هنا..."
              value={form.amount}
              onChange={handleChange("amount")}
              required
            />
          </MemoizedInputBox>

          {/* Field 3 */}
          <MemoizedInputBox>
            <MemoizedNumberCircle>3</MemoizedNumberCircle>
            <MemoizedLabel>هتسفح فين 🌍</MemoizedLabel>

            <MemoizedMyOwnSelect
              fullWidth
              displayEmpty
              value={form.destination}
              onChange={handleChange("destination")}
              required
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "25px",
                    minWidth: "0 !important",
                  },
                },
                MenuListProps: {
                  sx: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "8px 0",
                  },
                },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right", // Align with right edge (RTL layout)
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right", // Start from right edge
                },
              }}
            >
              <MenuItem value="" disabled>
                <Typography sx={{ color: "gray" }}>اختر المحافظة 🏙</Typography>
              </MenuItem>
              <MenuItem value="القاهرة">القاهرة 🏛</MenuItem>
              <MenuItem value="الإسكندرية">الإسكندرية 🌊</MenuItem>
              <MenuItem value="جنوب سيناء">جنوب سيناء ⛰</MenuItem>
              <MenuItem value="مطروح">مطروح 🏖</MenuItem>
              <MenuItem value="أسوان">أسوان ☀</MenuItem>
            </MemoizedMyOwnSelect>
          </MemoizedInputBox>

          {/* Next Button */}
          <NextButton onClick={handleSubmit}>
            التالي
            <ArrowBackIosIcon fontSize="small" />
          </NextButton>
        </FormContainer>
      )}
      {!create && <TripType />}
    </>
  );
}
