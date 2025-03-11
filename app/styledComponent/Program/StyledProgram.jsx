import styled, { keyframes } from "styled-components";
import { Button, MenuItem, Select } from "@mui/material";

const buttonPress = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

export const Container = styled.div`
  background: #f2f9fc;
  padding: 20px;
  border-radius: 10px;
  text-align: right;
  margin-top: 4rem;
`;

export const CategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: end;
  flex-direction: row;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 25px;
`;

export const MyMenuItem = styled(MenuItem)`
  border-radius: 20px;
  font-size: 22px;
  padding: 8px 35px;

  &:hover {
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
    transform: scale(1.2);
    background-color: #e3f0ff;
  }
`;

export const PlacesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const PlaceList = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  background: #e1eefe;
  padding: 10px;
  border-radius: 20px;
  width: 79%;
  margin-left: 7rem;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 10px;
`;

export const ProgramCard = styled.div`
  flex: 1;
  flex-basis: 300px;
  height: 400px;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4);
  overflow: hidden;
  position: relative;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
    transform: scale(0.97);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4);

  ${ProgramCard}:hover & {
    transform: scale(1.6) rotate(20deg);
    filter: blur(3px);
  }
`;

export const Descriptions = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 100%;
  transition: all 0.7s ease-in-out;
  padding: 20px;
  box-sizing: border-box;
  clip-path: circle(0% at 100% 100%);

  ${ProgramCard}:hover & {
    clip-path: circle(75%);
  }
`;

export const CardTitle = styled.h1`
  color: #ff3838;
  letter-spacing: 1px;
  margin: 0;
`;

export const CardText = styled.div`
  line-height: 24px;
  height: 70%;
`;

export const PlayButton = styled.button`
  width: fit-content;
  height: 40px;
  cursor: pointer;
  border: none;
  background-color: #ff3838;
  color: #fff;
  font-size: 15px;
  outline: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 5px;

  &:hover {
    animation: ${buttonPress} 0.3s ease-in-out;
    background: #d63131;
  }

  i {
    font-size: 18px;
  }
`;

export const ProgramSelect = styled(Select)`
  border-radius: 25px;
  font-size: 1.7rem;
  margin-left: 15px;


  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  ${({ value }) =>
    !value &&
    `
    &::before {
      content: "إختر المكان";
      white-space: nowrap;
      font-size: 1.7rem;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    }
  `}
`;

export const FinishButton = styled(Button)`
  && {
    display: flex;
    margin-top: 20px;
    background: #4a90e2;
    color: white;
    font-size: 24px;
    padding: 8px 20px;
    border-radius: 20px;
    align-self: flex-start;
  }
`;
