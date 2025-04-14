import { Box, Typography, Button, Select, Menu } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import TextField from "@mui/material/TextField";


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const FormHeader = styled(Box)(({ $darkMode }) => ({
  width: "100%",
  marginBottom: "30px",
  textAlign: "center",
}));

export const FormTitle = styled(Typography)(({ $darkMode }) => ({
  fontSize: "32px",
  fontWeight: "bold",
  color: $darkMode ? "#F6B17A" : "#2D3250",
  animation: `${fadeIn} 0.5s ease-in-out`,
  marginBottom: "10px",

  "@media (max-width: 600px)": {
    fontSize: "24px",
  },
}));

export const FormSubtitle = styled(Typography)(({ $darkMode }) => ({
  fontSize: "16px",
  color: $darkMode ? "#AAB2D5" : "#666",
  animation: `${fadeIn} 0.7s ease-in-out`,

  "@media (max-width: 600px)": {
    fontSize: "14px",
  },
}));

export const StepIndicator = styled(Box)(({ $darkMode }) => ({
  display: "flex",
  alignItems: "center",
  margin: "0 0 20px 0",
  width: "100%",
  padding: "0 30px",

  "@media (max-width: 600px)": {
    padding: "0 15px",
  },
}));

export const StepText = styled(Typography)(({ $darkMode }) => ({
  marginRight: "10px",
  fontSize: "18px",
  fontWeight: "600",
  color: $darkMode ? "#F6B17A" : "#2D3250",

  "@media (max-width: 600px)": {
    fontSize: "16px",
  },
}));

export const FieldContainer = styled(Box)(({ $darkMode }) => ({
  width: "100%",
  marginBottom: "15px",
  position: "relative",
  animation: `${slideIn} 0.5s ease-in-out`,
}));

export const RequiredStar = styled("span")(({ $darkMode }) => ({
  color: $darkMode ? "#F6B17A" : "#e53935",
  marginRight: "4px",
}));

export const InfoTooltip = styled(Box)(({ $darkMode }) => ({
  display: "inline-flex",
  marginRight: "8px",
  color: $darkMode ? "#AAB2D5" : "#9e9e9e",
  cursor: "help",
  "&:hover": {
    color: $darkMode ? "#F6B17A" : "#2D3250",
  },
}));

export const FormContainer = styled(Box)(({ $darkMode }) => ({
  backgroundColor: $darkMode ? "#2D3250" : "#f9fbfd",
  padding: "40px 25px",
  borderRadius: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "800px",
  width: "90%",
  minHeight: "550px",
  margin: "6rem auto",
  direction: "rtl",
  boxShadow: $darkMode
    ? "0px 8px 30px rgba(0, 0, 0, 0.25)"
    : "0px 8px 30px rgba(0, 0, 0, 0.12)",
  position: "relative",
  animation: `${fadeIn} 0.5s ease-in-out`,
  fontFamily: "'Cairo', sans-serif",
  overflow: "hidden",
  border: $darkMode
    ? "1px solid rgba(112, 119, 161, 0.3)"
    : "1px solid rgba(232, 232, 232, 0.8)",

  "@media (max-width: 600px)": {
    padding: "25px 18px",
    margin: "4rem auto 2rem",
    width: "95%",
    borderRadius: "20px",
  },
}));

export const Label = styled(Typography)(({ $darkMode }) => ({
  fontSize: "20px",
  fontWeight: "bold",
  color: $darkMode ? "#FFFFFF" : "#2D3250",
  flexShrink: 0,
  width: "150px",
  display: "flex",
  alignItems: "center",
  marginRight: "12px",
  marginLeft: "12px",
  animation: `${slideIn} 0.5s ease-in-out`,
  fontFamily: "'Cairo', sans-serif",

  "@media (max-width: 600px)": {
    fontSize: "16px",
    width: "100%", // Full width on small screens
    marginBottom: "10px",
    justifyContent: "flex-start",
  },
}));

export const NumberCircle = styled(Box)(({ $active, $darkMode }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: $active
    ? "linear-gradient(145deg, #E38E49, #F6B17A)"
    : $darkMode
    ? "linear-gradient(145deg, #424769, #545b7d)"
    : "linear-gradient(145deg, #e0e0e0, #f5f5f5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: $active ? "white" : $darkMode ? "#AAB2D5" : "#666",
  fontSize: "18px",
  fontWeight: "bold",
  boxShadow: $darkMode
    ? "0px 3px 8px rgba(0, 0, 0, 0.3)"
    : "0px 3px 8px rgba(0, 0, 0, 0.2)",
  flexShrink: 0,
  animation: `${slideIn} 0.5s ease-in-out`,
  fontFamily: "'Cairo', sans-serif",

  "@media (max-width: 600px)": {
    width: "35px",
    height: "35px",
    fontSize: "16px",
  },
}));

export const InputBox = styled(Box)(({ $hasError, $darkMode }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "16px 20px",
  transition: "all 0.3s ease",
  animation: `${slideIn} 0.5s ease-in-out`,
  fontFamily: "'Cairo', sans-serif",
  borderRadius: "12px",
  backgroundColor: $darkMode
    ? $hasError
      ? "rgba(246, 177, 122, 0.08)"
      : "rgba(66, 71, 105, 0.6)"
    : $hasError
    ? "rgba(255, 0, 0, 0.03)"
    : "white",
  boxShadow: $darkMode
    ? $hasError
      ? "0 2px 10px rgba(246, 177, 122, 0.15)"
      : "0 2px 10px rgba(0, 0, 0, 0.15)"
    : $hasError
    ? "0 2px 10px rgba(255, 0, 0, 0.1)"
    : "0 2px 10px rgba(0, 0, 0, 0.03)",
  border: $darkMode
    ? $hasError
      ? "1px solid rgba(246, 177, 122, 0.3)"
      : "1px solid rgba(112, 119, 161, 0.3)"
    : $hasError
    ? "1px solid rgba(255, 0, 0, 0.2)"
    : "1px solid rgba(232, 232, 232, 0.8)",

  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "15px 15px",
  },

  "@media (max-width: 600px)": {
    padding: "12px 12px",
  },
}));

export const NextButton = styled(Button)(({ $darkMode }) => ({
  background: $darkMode
    ? "linear-gradient(90deg, #F6B17A 30%, #E38E49 90%)"
    : "linear-gradient(90deg, #e38e49 30%, #f6b17a 90%)",
  borderRadius: "30px",
  border: "none",
  color: $darkMode ? "#2D3250" : "#fff",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px 30px",
  marginTop: "30px",
  transition: "all 0.3s ease-in-out",
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  animation: `${slideIn} 0.5s ease-in-out`,
  fontFamily: "'Cairo', sans-serif",
  boxShadow: $darkMode
    ? "0px 4px 15px rgba(246, 177, 122, 0.4)"
    : "0px 4px 15px rgba(227, 142, 73, 0.3)",

  "&:hover": {
    background: $darkMode ? "#2D3250" : "#ffffff",
    color: $darkMode ? "#F6B17A" : "#e38e49",
    border: $darkMode ? "2px solid #F6B17A" : "2px solid #e38e49",
    transform: "scale(1.05)",
    boxShadow: $darkMode
      ? "0px 6px 20px rgba(246, 177, 122, 0.5)"
      : "0px 6px 20px rgba(227, 142, 73, 0.4)",
  },

  "@media (max-width: 600px)": {
    fontSize: "16px",
    padding: "10px 24px",
    marginTop: "20px",
  },
}));


// export const MyOwnSelect = styled(Select)(({ $darkMode }) => ({
//   height: "50px",
//   borderRadius: "10px",
//   ".MuiOutlinedInput-notchedOutline": {
//     borderRadius: "10px",
//     borderColor: $darkMode ? "rgba(112, 119, 161, 0.5)" : "rgba(0, 0, 0, 0.23)",
//   },
//   animation: `${slideIn} 0.5s ease-in-out`,
//   fontFamily: "'Cairo', sans-serif",
//   width: "100%",

//   "&:hover .MuiOutlinedInput-notchedOutline": {
//     borderColor: $darkMode ? "#F6B17A" : "#e38e49",
//   },

//   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//     borderColor: $darkMode ? "#F6B17A" : "#e38e49",
//   },

//   "& .MuiSelect-icon": {
//     color: $darkMode ? "#AAB2D5" : "rgba(0, 0, 0, 0.54)",
//   },

//   "& .MuiInputBase-input": {
//     color: $darkMode ? "#FFFFFF" : "inherit",
//   },

//   "@media (max-width: 768px)": {
//     marginTop: "10px",
//   },
// }));

export const MyOwnSelect = styled(Select)`
  width: 100%;
  transition: all 0.3s ease;

  & .MuiSelect-select {
    text-align: right;
    font-size: 0.95rem;
    color: ${(props) => (props.$darkMode ? "#FFFFFF" : "#000000")};
    padding: 14px 16px;
  }

  & .MuiOutlinedInput-root {
    border-radius: 10px;
    transition: all 0.3s ease;
    background-color: ${(props) =>
      props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "#f7f9fc"};
    
    /* Configure layout direction for proper RTL display */
    flex-direction: row-reverse;
    padding-right: 16px;

    &:hover {
      background-color: ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.08)" : "#f0f4f8"};
    }

    &.Mui-focused {
      background-color: ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.1)" : "#e8f0fe"};
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) =>
      props.$darkMode ? "#7077A1" : "rgba(0, 0, 0, 0.23)"};
    border-radius: 10px;
    text-align: right;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
  }

  & .MuiSelect-icon {
    color: ${(props) => (props.$darkMode ? "#AAB2D5" : "#555")};
    right: auto;
    left: 14px;
  }
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  transition: all 0.3s ease;

  & .MuiInputBase-input {
    text-align: right;
    font-size: 0.95rem;
    color: ${(props) => (props.$darkMode ? "#FFFFFF" : "#000000")};
    padding: 14px 16px;

    /* Style number input spinners */
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      opacity: 1;
      filter: ${(props) =>
        props.$darkMode ? "invert(0.7) brightness(1.2) saturate(1)" : "none"};
      color: ${(props) => (props.$darkMode ? "#AAB2D5" : "#555")};
      background-color: ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "#f7f9fc"};
    }

    /* Target autofill state */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-internal-autofill-selected {
      -webkit-text-fill-color: ${(props) =>
        props.$darkMode ? "#FFFFFF" : "#000000"};
      -webkit-box-shadow: 0 0 0px 1000px
        ${(props) =>
          props.$darkMode ? "rgba(66, 71, 105, 0)" : "rgba(247, 249, 252, 0)"}
        inset;
      transition: background-color 5000s ease-in-out 0s;
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }
  }

  /* Remove duplicate input props */
  & .MuiOutlinedInput-root {
    border-radius: 10px;
    transition: all 0.3s ease;
    background-color: ${(props) =>
      props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "#f7f9fc"};

    /* Configure layout direction for proper RTL display */
    flex-direction: row-reverse;
    padding-right: 16px;
    &:hover {
      background-color: ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.08)" : "#f0f4f8"};
    }

    &.Mui-focused {
      background-color: ${(props) =>
        props.$darkMode ? "rgba(255, 255, 255, 0.1)" : "#e8f0fe"};
    }

    /* Ensure fieldset border spacing works with RTL */
    & .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) =>
        props.$darkMode ? "#7077A1" : "rgba(0, 0, 0, 0.23)"};
      text-align: right;
      border-radius: 10px;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }
  }

  /* Rest of the existing styling */
  & .MuiInputLabel-root {
    color: ${(props) => (props.$darkMode ? "#AAB2D5" : "#555")};
    font-size: 0.95rem;
    transform-origin: right top;
    transform: translate(0, 16px) scale(1);
    right: 16px;
    left: auto;

    &.Mui-focused {
      color: ${(props) => (props.$darkMode ? "#F6B17A" : "#3b5998")};
    }
  }

  & .MuiInputLabel-shrink {
    transform: translate(0, -6px) scale(0.75);
    transform-origin: right top;
  }

  & .MuiFormHelperText-root {
    margin-top: 4px;
    text-align: right;
    color: ${(props) => (props.$darkMode ? "#f6b17a" : "#d32f2f")};
  }

  & .MuiInputAdornment-root {
    margin-left: 8px;
    margin-right: 0;
  }

  & .MuiInputAdornment-positionStart,
  & .MuiInputAdornment-positionEnd {
    margin-left: 8px;
    margin-right: 0;
  }

  & .MuiOutlinedInput-input {
    padding-right: 0;
    padding-left: 14px;
  }
`;