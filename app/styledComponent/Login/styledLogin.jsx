import Typography from "@mui/material/Typography";
import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 90%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    height: 45rem;
    border-radius: 25px;
    margin-top: 7rem;
  }
`;

export const LeftSection = styled.div`
  position: relative;
  height: 180px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (min-width: 480px) {
    height: 220px;
  }

  @media (min-width: 768px) {
    flex: 1;
    height: auto;
    border-radius: 25px 0 0 25px;
  }

  .background-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(4px);
    }
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    width: 200px;
    height: auto;

    @media (min-width: 480px) {
      width: 250px;
    }

    @media (min-width: 768px) {
      width: 300px;
    }

    @media (min-width: 992px) {
      width: 400px;
    }
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 0 0 15px 15px;
  margin: 0;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (min-width: 768px) {
    border-radius: 0 25px 25px 0;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 15px 15px;
  text-align: center;
  transition: all 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (min-width: 480px) {
    padding: 25px;
  }

  @media (min-width: 768px) {
    padding: 30px 40px;
    border-radius: 0 25px 25px 0;
  }

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: #333;

    @media (min-width: 480px) {
      font-size: 1.75rem;
    }

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  form {
    width: 100%;
  }
`;

export const StyledTypography = styled(Typography)`
  margin-top: 15px;
  font-size: 0.9rem;

  @media (min-width: 480px) {
    margin-top: 18px;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    margin-top: 20px;
    font-size: 1.1rem;
  }

  ${(props) => props.$sx && css(props.$sx)}
`;
