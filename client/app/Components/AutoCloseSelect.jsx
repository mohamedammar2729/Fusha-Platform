"use client";

import React from "react";
import { Select, InputLabel, FormHelperText } from "@mui/material";
import { StyledFormControl } from "../styledComponent/Login/styledLogin";
import { useScrollCloseMenu } from "../hooks/useScrollCloseMenu";
import { useTheme } from "../context/ThemeContext";

const AutoCloseSelect = ({
  label,
  labelId,
  name,
  value,
  onChange,
  error,
  helperText,
  children,
  required,
  $darkMode: propDarkMode,
  ...props
}) => {
  const [open, setOpen] = useScrollCloseMenu();
  const { darkMode: contextDarkMode, theme } = useTheme();

  // Use prop darkMode if provided, otherwise use context
  const darkMode = propDarkMode !== undefined ? propDarkMode : contextDarkMode;

  return (
    <StyledFormControl error={error} required={required} $darkMode={darkMode}>
      <InputLabel
        id={labelId}
        sx={{
          transformOrigin: "right top",
          left: "auto",
          right: "1.75rem",
          color: darkMode ? theme?.colors.textSecondary : undefined,
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -6px) scale(0.75)",
            color: darkMode ? theme?.colors.primary : undefined,
          },
          "&.Mui-focused": {
            color: darkMode ? theme?.colors.primary : undefined,
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? theme?.colors.border : undefined,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? theme?.colors.primary : undefined,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? theme?.colors.primary : undefined,
          },
          "& .MuiSvgIcon-root": {
            color: darkMode ? theme?.colors.textSecondary : undefined,
          },
          color: darkMode ? theme?.colors.text : undefined,
          backgroundColor: darkMode
            ? "rgba(255, 255, 255, 0.05)"
            : "transparent",
        }}
        MenuProps={{
          ...props.MenuProps,
          PaperProps: {
            ...props.MenuProps?.PaperProps,
            style: {
              ...(props.MenuProps?.PaperProps?.style || {}),
              backgroundColor: darkMode ? theme?.colors.surface : "#fff",
            },
          },
          sx: {
            "& .MuiMenuItem-root": {
              color: darkMode ? theme?.colors.text : undefined,
              "&:hover": {
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.04)",
              },
              "&.Mui-selected": {
                backgroundColor: darkMode
                  ? "rgba(246, 177, 122, 0.15)"
                  : undefined,
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(246, 177, 122, 0.25)"
                    : undefined,
                },
              },
            },
          },
        }}
        {...props}
      >
        {children}
      </Select>
      {error && helperText && (
        <FormHelperText
          sx={{
            textAlign: "right",
            color: darkMode ? theme?.colors.primary : undefined,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default AutoCloseSelect;
