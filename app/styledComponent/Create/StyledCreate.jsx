import { Box, Typography, Button, Select, Menu } from "@mui/material";
import { styled, keyframes } from "@mui/system";

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

export const FormContainer = styled(Box)({
  backgroundColor: "#f5fafd",
  padding: "30px",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "800px",
  height: "420px",
  margin: "8rem auto",
  direction: "rtl",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
  position: "relative",
  animation: `${fadeIn} 0.5s ease-in-out`,
  fontFamily: "'Cairo', sans-serif", // Enhanced font family
});

export const Label = styled(Typography)({
  fontSize: "20px", // Enhanced font size
  fontWeight: "bold",
  color: "#2D3250",
  flexShrink: 0,
  width: "150px",
  display: "flex",
  alignItems: "center",
  marginRight: "12px",
  marginLeft: "12px",
  animation: `${slideIn} 0.5s ease-in-out`,
  fontFamily: "'Cairo', sans-serif", // Enhanced font family
});

export const NumberCircle = styled(Box)({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "linear-gradient(145deg, #E38E49, #F6B17A)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
  flexShrink: 0,
  animation: `${slideIn} 0.5s ease-in-out`,
  fontFamily: "'Cairo', sans-serif", // Enhanced font family
});

export const InputBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "20px",
  transition: "all 0.3s ease",
  animation: `${slideIn} 0.5s ease-in-out`,
  fontFamily: "'Cairo', sans-serif", // Enhanced font family
});

export const NextButton = styled(Button)`
  background: linear-gradient(90deg, #e38e49 30%, #f6b17a 90%);
  border-radius: 30px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 25px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
  position: absolute;
  bottom: 20px;
  left: 20px;
  box-shadow: 0px 4px 12px rgba(227, 142, 73, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${slideIn} 0.5s ease-in-out;
  font-family: "Cairo", sans-serif; // Enhanced font family

  &:hover {
    background: #ffffff;
    color: #e38e49;
    border: 2px solid #e38e49;
    transform: scale(1.07);
    box-shadow: 0px 6px 20px rgba(227, 142, 73, 0.4);
  }
`;

export const MyOwnSelect = styled(Select)`
  .MuiOutlinedInput-notchedOutline {
    border-radius: 25px;
  }
  animation: ${slideIn} 0.5s ease-in-out;
  font-family: "Cairo", sans-serif;
`;
