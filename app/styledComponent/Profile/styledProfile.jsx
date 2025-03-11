"use client";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 250px;
  position: relative;
`;
export const BackgroundImage = styled.div`
  width: 100%;
  height: 350px;
  background: url("https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    no-repeat center center/cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  filter: blur(4px);
`;

export const ProfileIcons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  width: ${({ trips }) => (trips === "true" ? "45%" : "33.5%")};
  padding: 15px;
  background: #3b5898;
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: 16.1rem;
  z-index: 100;
  white-space: nowrap;

  @media (max-width: 1550px) {
    width: ${({ trips }) => (trips === "true" ? "63%" : "63%")};
    top: 15rem;
    flex-wrap: wrap;
  }
  @media (max-width: 880px) {
    width: ${({ trips }) => (trips === "true" ? "80%" : "70%")};
    top: 14rem;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 30px;
  padding: 10px;
  border-radius: 35px;
  transition: background 0.3s ease;

  span {
    color: black;
    font-size: 19px;
  }

  &:hover {
    background: rgba(242, 241, 241, 0.683);
  }

  &:active {
    background: rgb(200, 230, 255);
  }
`;

export const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding-top: 50px;
`;

export const ProfileAvatar = styled.div`
  width: 90px;
  height: 90px;
  background: url("./user1.jpeg") no-repeat center center/cover;
  border-radius: 50%;
  margin: 0 auto 10px;
`;

export const ProfileButton = styled.button`
  margin-top: 10px;
  width: 40%;
  padding: 14px;
  background: #4b72ad;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 25px;
  transition: background 0.3s ease;

  &:hover {
    background: #3b5998;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding-bottom: 40px;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  width: 35.1%;
  position: relative;
  z-index: 2;
  margin-top: 96.5px;

  @media (max-width: 1550px) {
    width: 65%;
    margin-top: 70px;
  }
  @media (max-width: 880px) {
    width: 73.5%;
    margin-top: 50px;
    padding-top: 50px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 76%;
  display: flex;
  align-items: center;
`;

export const EyeIcon = styled.div`
  position: absolute;
  left: 10px;
  font-size: 22px;
  color: #555;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
  }
`;
