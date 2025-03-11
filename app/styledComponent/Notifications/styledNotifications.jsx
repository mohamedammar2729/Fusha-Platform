
"use client";
import styled from "styled-components";


export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #fff;
  padding-bottom: 40px;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  width: 35.1%;
  z-index: 2;
  margin-top: 96.5px;

  @media (max-width: 1550px) {
    width: 62%;
    margin-top: 70px;
  }
  @media (max-width: 880px) {
    width: 73.5%;
    margin-top: 50px;
    padding-top: 50px;
  }
`;

