import styled, { keyframes } from "styled-components";
import { Button, MenuItem, Select } from "@mui/material";

// Enhanced animations
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
  50% { transform: scale(1.02); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); }
  100% { transform: scale(1); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Container improvements
export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 24px 20px;
  border-radius: 20px;
  text-align: right;
  margin-top: 5rem;
  background: linear-gradient(
    to bottom,
    #f0f8ff,
    #f5faff 15%,
    #f9fcff 40%,
    #ffffff
  );
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.6s ease-out;
  direction: rtl;

  @media (max-width: 1024px) {
    padding: 25px 20px 50px;
    margin-top: 4rem;
  }

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
    margin-top: 3.5rem;
    border-radius: 16px;
  }

  @media (max-width: 576px) {
    padding: 16px 12px 30px;
    margin-top: 3rem;
    border-radius: 14px;
  }
`;

// Enhanced filter section
export const CategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  margin: 20px 0 30px;
  border-radius: 16px;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--primary-color),
      var(--secondary-color) 50%,
      var(--accent-color)
    );
    border-radius: 0 0 16px 16px;
  }

  @media (max-width: 768px) {
    padding: 12px;
    gap: 10px;
    margin: 15px 0 25px;
    border-radius: 14px;
  }

  @media (max-width: 576px) {
    padding: 10px;
    gap: 8px;
    margin: 10px 0 20px;
  }
`;

export const CategoryItem = styled.div`
  flex: 1;
  min-width: 220px;
  max-width: 280px;
  background: #f9fafc;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    min-width: 180px;
    border-radius: 10px;
  }

  @media (max-width: 576px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

// Enhanced Select component
export const ProgramSelect = styled(Select)`
  && {
    width: 100%;
    border-radius: 12px;
    font-family: "Amiri", serif;
    font-size: 16px;

    .MuiSelect-select {
      padding: 14px 16px;
      text-align: right;
      background-color: transparent;
      transition: all 0.3s ease;
    }

    .MuiOutlinedInput-notchedOutline {
      border: none;
    }

    .MuiSelect-icon {
      right: auto;
      left: 12px;
      color: var(--primary-color);
      transition: all 0.3s ease;
    }

    &:hover {
      .MuiSelect-icon {
        transform: scale(1.2);
      }
    }

    @media (max-width: 768px) {
      font-size: 15px;

      .MuiSelect-select {
        padding: 12px 14px;
      }
    }

    @media (max-width: 576px) {
      font-size: 14px;

      .MuiSelect-select {
        padding: 10px 12px;
      }
    }
  }
`;

// Enhanced MenuItem component
export const MyMenuItem = styled(MenuItem)`
  && {
    padding: 12px 16px;
    font-family: "Amiri", serif;
    font-size: 15px;
    transition: all 0.25s ease;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: rgba(75, 114, 173, 0.08);
    }

    &.Mui-selected {
      background: rgba(75, 114, 173, 0.15);
      font-weight: 600;

      &:hover {
        background: rgba(75, 114, 173, 0.2);
      }
    }

    @media (max-width: 768px) {
      padding: 10px 14px;
      font-size: 14px;
    }

    @media (max-width: 576px) {
      padding: 8px 12px;
      font-size: 13px;
    }
  }
`;

// Places grid container
export const PlacesContainer = styled.div`
  height: calc(100vh - 350px);
  min-height: 400px;
  overflow-y: auto;
  padding: 5px;
  margin: 0 -5px;
  position: relative;

  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(75, 114, 173, 0.5) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(75, 114, 173, 0.5);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(75, 114, 173, 0.7);
  }

  @media (max-width: 768px) {
    height: calc(100vh - 300px);
    min-height: 350px;
  }

  @media (max-width: 576px) {
    height: calc(100vh - 250px);
    min-height: 300px;
  }
`;

// Places grid layout
export const PlaceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  width: 100%;
  padding: 10px 5px;
  align-items: stretch; // Add this

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    padding: 8px 3px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 5px 0;
  }
`;

// Card wrapper
export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  perspective: 1500px;
`;

// Enhanced program card
export const ProgramCard = styled.div`
  position: relative;
  height: 100%; // Change from auto to 100%
  min-height: 450px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: #fff;
  transform-style: preserve-3d;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Add this

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      var(--primary-color),
      var(--secondary-color)
    );
    z-index: 2;
  }

  @media (max-width: 1024px) {
    min-height: 420px;
  }

  @media (max-width: 768px) {
    min-height: 380px;
    border-radius: 14px;
  }

  @media (max-width: 576px) {
    min-height: 360px;
    max-width: 340px;
    margin: 0 auto;
  }
`;

// Enhanced card image
export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  transition: all 0.5s ease;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.4)
    );
  }

  ${ProgramCard}:hover & {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 576px) {
    height: 160px;
  }
`;

// Enhanced descriptions section
export const Descriptions = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Add this

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 576px) {
    padding: 14px;
  }
`;

// Card title
export const CardTitle = styled.h3`
  color: var(--primary-color);
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 10px;
  }

  @media (max-width: 576px) {
    font-size: 17px;
    margin-bottom: 8px;
  }
`;

// Card text content
export const CardText = styled.div`
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.5;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Add this

  .details {
    margin: 12px 0;

    > div {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;

    .details {
      margin: 10px 0;

      > div {
        margin-bottom: 6px;
      }
    }
  }

  @media (max-width: 576px) {
    font-size: 13px;

    .details {
      margin: 8px 0;
    }
  }
`;

// Enhanced save button
export const PlayButton = styled.button`
  width: 100%;
  padding: 12px 0;
  border-radius: 30px;
  border: none;
  font-family: "Amiri", serif;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${(props) =>
    props.disabled
      ? "linear-gradient(135deg, #4CAF50, #66BB6A)"
      : "linear-gradient(135deg, var(--primary-color), var(--secondary-color))"};
  color: white;
  box-shadow: 0 4px 12px
    ${(props) =>
      props.disabled ? "rgba(76, 175, 80, 0.3)" : "rgba(75, 114, 173, 0.3)"};
  margin-top: 12px;
  min-height: 44px;
  direction: rtl;
  overflow: visible;
  text-align: center;

  span {
    display: inline-block;
    white-space: nowrap;
    font-size: 16px;
  }

  svg {
    font-size: 20px;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px
      ${(props) =>
        props.disabled ? "rgba(76, 175, 80, 0.4)" : "rgba(75, 114, 173, 0.4)"};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: default;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 10px 0;
    font-size: 15px;
    margin-top: 10px;
    min-height: 40px;

    span {
      font-size: 15px;
    }

    svg {
      font-size: 18px;
    }
  }

  @media (max-width: 576px) {
    padding: 10px 0;
    font-size: 14px;
    min-height: 38px;

    span {
      font-size: 14px;
    }

    svg {
      font-size: 16px;
    }
  }
`;

// Empty state container
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin: 30px 0;
  min-height: 400px;

  .empty-illustration {
    width: 200px;
    height: 200px;
    margin-bottom: 24px;
    animation: ${float} 3s ease-in-out infinite;

    img {
      width: 100%;
      height: auto;
    }
  }

  h3 {
    color: var(--primary-color);
    font-size: 24px;
    margin: 0 0 12px;
  }

  p {
    color: var(--text-secondary);
    font-size: 16px;
    margin: 0 0 24px;
    max-width: 400px;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 40px 16px;
    min-height: 350px;

    .empty-illustration {
      width: 160px;
      height: 160px;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 22px;
      margin: 0 0 10px;
    }

    p {
      font-size: 15px;
      margin: 0 0 20px;
    }
  }

  @media (max-width: 576px) {
    padding: 30px 14px;
    min-height: 300px;

    .empty-illustration {
      width: 140px;
      height: 140px;
      margin-bottom: 16px;
    }

    h3 {
      font-size: 20px;
      margin: 0 0 8px;
    }

    p {
      font-size: 14px;
      margin: 0 0 16px;
    }
  }
`;

// Loading overlay with enhanced styling
export const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #f5faff 0%, #ffffff 100%);
  z-index: 1000;
  padding: 20px;

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    text-align: center;
  }

  h3 {
    margin: 24px 0 8px;
    color: var(--primary-color);
    font-size: 26px;
  }

  p {
    color: var(--text-secondary);
    font-size: 16px;
    margin: 0;
    line-height: 1.6;
  }

  .loading-animation {
    position: relative;
    width: 240px;
    height: 160px;
    margin-top: 30px;
  }

  .loading-plane {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .cloud {
    position: absolute;
    opacity: 0.8;
    z-index: 1;
  }

  .cloud1 {
    top: 20px;
    left: 20px;
    width: 60px;
    height: 60px;
  }

  .cloud2 {
    bottom: 30px;
    right: 40px;
    width: 50px;
    height: 50px;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 22px;
      margin: 20px 0 6px;
    }

    p {
      font-size: 15px;
    }

    .loading-animation {
      width: 200px;
      height: 140px;
      margin-top: 24px;
    }

    .loading-plane {
      width: 70px;
      height: 70px;
    }
  }

  @media (max-width: 576px) {
    padding: 16px;

    h3 {
      font-size: 20px;
      margin: 16px 0 5px;
    }

    p {
      font-size: 14px;
    }

    .loading-animation {
      width: 180px;
      height: 120px;
      margin-top: 20px;
    }

    .loading-plane {
      width: 60px;
      height: 60px;
    }
  }
`;

// Enhanced text truncation
export const TruncatedText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => lines || 3};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: ${({ lines }) => `${lines * 1.5}em` || "4.5em"};
`;

// Enhanced success card notification
export const SaveSuccessCard = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: var(--success-color);
  padding: 14px 24px;
  border-radius: 50px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  border-right: 4px solid var(--success-color);
  font-size: 16px;
  min-width: 200px;
  justify-content: center;
  animation: ${fadeIn} 0.4s ease-out;

  svg {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 15px;
    min-width: 180px;
    bottom: 25px;

    svg {
      font-size: 20px;
    }
  }

  @media (max-width: 576px) {
    padding: 10px 18px;
    font-size: 14px;
    min-width: 160px;
    bottom: 20px;

    svg {
      font-size: 18px;
    }
  }
`;
