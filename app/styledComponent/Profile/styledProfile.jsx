"use client";
import styled from "styled-components";
import { StyledTextField } from "../Register/StyledRegister";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

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
  @media (max-width: 414px) {
    height: 250px;
  }
`;

export const ProfileIcons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  padding: 15px;
  background: #3b5898;
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: 16.1rem;
  z-index: 100;
  white-space: nowrap;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
  @media (max-width: 414px) {
    // خاص بشاشات iPhone
    top: 12rem;
    padding: 10px;
    gap: 8px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 30px;
  padding: 10px 29px;
  border-radius: 35px;
  transition: background 0.3s ease;

  span {
    color: #ffffff;
    font-size: 19px;
    @media (max-width: 768px) {
      font-size: 16px;
    }
    @media (max-width: 568px) {
      font-size: 14px;
    }
  }

  &:hover {
    background: rgba(242, 241, 241, 0.683);
  }

  &:active {
    background: rgb(200, 230, 255);
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 5px 10px;
  }
  @media (max-width: 568px) {
    font-size: 14px;
    padding: 2px 5px;
  }
  @media (max-width: 414px) {
    padding: 5px 15px;
    gap: 8px;

    span {
      font-size: 14px;
    }
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
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 20px;
  }

  @media (max-width: 414px) {
    width: 80%;
    padding: 10px;
    font-size: 18px;
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
  padding-right: 14.2rem;
  padding-left: 14.2rem;
  z-index: 2;
  margin-top: 96.5px;

  @media (max-width: 768px) {
    padding-right: 6.7rem;
    padding-left: 6.7rem;
    margin-top: 75px;
  }
  @media (max-width: 568px) {
    padding-right: 3.7rem;
    padding-left: 3.7rem;
    margin-top: 60px;
  }

  @media (max-width: 414px) {
    padding-right: 1rem;
    padding-left: 1rem;
    margin-top: 50px;
    width: 90%;
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

export const ProfileTextField = styled(StyledTextField)`
  width: 180%;
  @media (max-width: 768px) {
    width: 150%;
  }
  @media (max-width: 568px) {
    width: 120%;
  }

  @media (max-width: 414px) {
    width: 100%;
    margin: 8px 0;
  }
`;

export const StyledNotificationIcon = styled(NotificationsTwoToneIcon)`
  color: #fec20f;
  font-size: 38px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
  @media (max-width: 568px) {
    font-size: 20px;
  }
`;

export const StyledLogoutIcon = styled(LogoutOutlinedIcon)`
  color: lightblue;
  font-size: 38px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
  @media (max-width: 568px) {
    font-size: 20px;
  }
`;
