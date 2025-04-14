import styled from "styled-components";
import { motion } from "framer-motion";

// Page Structure
export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.background : "#f8fafc"};
  padding: 40px 20px;
  direction: rtl;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageHeading = styled.h1`
  font-size: 2.5rem;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.text : props.theme.colors.primary};
  margin-bottom: 8px;
  margin-top: 3rem;
  text-align: center;
  position: relative;
  display: inline-block;
  font-weight: 700;
  transition: color 0.3s ease;
`;

export const HeadingAccent = styled.span`
  display: block;
  height: 4px;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.accent}
  );
  width: 60%;
  margin: 8px auto 0;
  border-radius: 2px;
`;

export const PageSubheading = styled.p`
  font-size: 1.1rem;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.textSecondary : "#546e7a"};
  margin-bottom: 40px;
  text-align: center;
  transition: color 0.3s ease;
`;

// Contact Section Layout
export const ContactSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

// Contact Info Panel Styles
export const ContactInfoPanel = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) =>
      props.darkMode
        ? props.theme.colors.primary + "90"
        : props.theme.colors.primary + "DD"},
    ${(props) =>
      props.darkMode
        ? props.theme.colors.accent + "90"
        : props.theme.colors.accent + "DD"}
  );
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 25px
    rgba(0, 0, 0, ${(props) => (props.darkMode ? 0.3 : 0.1)});
  position: relative;
  height: 100%;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  @media (max-width: 992px) {
    display: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: ${(props) => (props.darkMode ? 0.05 : 0.1)};
    pointer-events: none;
  }
`;

export const InfoPanelContent = styled.div`
  padding: 40px;
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const InfoHeader = styled.h2`
  font-size: 1.75rem;
  color: white;
  margin-bottom: 10px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const InfoSubheader = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
`;

export const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 40px;
`;

export const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 24px;
    color: white;
  }
`;

export const InfoLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3px;
`;

export const InfoValue = styled.div`
  font-size: 1rem;
  color: white;
  font-weight: 500;
`;

export const SocialMediaLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`;

export const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  svg {
    font-size: 20px;
  }
`;

export const IllustrationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

// Form Panel Styles
export const FormPanel = styled.div`
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : "white"};
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 25px
    rgba(0, 0, 0, ${(props) => (props.darkMode ? 0.25 : 0.05)});
  transition: background 0.3s ease, box-shadow 0.3s ease;
`;

// Tabs Styles
export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid
    ${(props) => (props.darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")};
`;

export const Tab = styled.button`
  padding: 12px 20px;
  background: transparent;
  border: none;
  color: ${(props) =>
    props.active
      ? props.darkMode
        ? props.theme.colors.primary
        : props.theme.colors.primary
      : props.darkMode
      ? props.theme.colors.textSecondary
      : "#78909c"};
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) =>
      props.darkMode ? props.theme.colors.accent : props.theme.colors.primary};
  }
`;

export const TabIndicator = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: ${(props) =>
    `linear-gradient(to right, ${props.theme.colors.primary}, ${props.theme.colors.accent})`};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

// Form Styles
export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label`
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: ${(props) => (props.darkMode ? props.theme.colors.text : "#455a64")};
  font-weight: 500;
  transition: color 0.3s ease;
`;

export const StyledInput = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid
    ${(props) =>
      props.error
        ? "#f44336"
        : props.darkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.1)"};
  background: ${(props) =>
    props.darkMode ? "rgba(255,255,255,0.05)" : "white"};
  color: ${(props) => (props.darkMode ? props.theme.colors.text : "#263238")};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${(props) =>
      props.error ? "#f44336" : props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.error
          ? "rgba(244, 67, 54, 0.2)"
          : `${props.theme.colors.primary}33`};
  }

  &::placeholder {
    color: ${(props) =>
      props.darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StyledTextarea = styled.textarea`
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid
    ${(props) =>
      props.error
        ? "#f44336"
        : props.darkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.1)"};
  background: ${(props) =>
    props.darkMode ? "rgba(255,255,255,0.05)" : "white"};
  color: ${(props) => (props.darkMode ? props.theme.colors.text : "#263238")};
  font-size: 1rem;
  transition: all 0.3s ease;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: ${(props) =>
      props.error ? "#f44336" : props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.error
          ? "rgba(244, 67, 54, 0.2)"
          : `${props.theme.colors.primary}33`};
  }

  &::placeholder {
    color: ${(props) =>
      props.darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: #f44336;
  font-size: 0.8rem;
  margin-top: 6px;
`;

export const SubmitButtonContainer = styled.div`
  margin-top: 10px;
`;

export const StyledSubmitButton = styled(motion.button)`
  padding: 14px 30px;
  background: ${(props) =>
    `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})`};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ButtonSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Notification Styles
export const NotificationCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: ${(props) =>
    props.darkMode ? props.theme.colors.card : "white"};
  border-radius: 12px;
  box-shadow: 0 8px 25px
    rgba(0, 0, 0, ${(props) => (props.darkMode ? 0.3 : 0.15)});
  border-right: 4px solid
    ${(props) => (props.status === "success" ? "#4CAF50" : "#F44336")};
  color: ${(props) => (props.darkMode ? props.theme.colors.text : "#263238")};
  min-width: 300px;
  max-width: 500px;
  backdrop-filter: blur(10px);
`;

// FAQ Styles
export const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FAQItem = styled.div`
  border-radius: 12px;
  background: ${(props) =>
    props.darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"};
  padding: 20px;
  transition: background 0.3s ease;
`;

export const FAQQuestion = styled.h3`
  font-size: 1.1rem;
  color: ${(props) => (props.darkMode ? props.theme.colors.text : "#263238")};
  margin-bottom: 10px;
  font-weight: 600;
`;

export const FAQAnswer = styled.p`
  font-size: 0.95rem;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.textSecondary : "#546e7a"};
  line-height: 1.6;
`;

// Location Styles
export const MapContainer = styled.div``;

export const LocationDetails = styled.div`
  margin-top: 20px;
`;

export const LocationTitle = styled.h3`
  font-size: 1.1rem;
  color: ${(props) => (props.darkMode ? props.theme.colors.text : "#263238")};
  margin-bottom: 10px;
  font-weight: 600;
`;

export const LocationAddress = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.textSecondary : "#546e7a"};
  margin-bottom: 10px;
`;

export const LocationHours = styled.div`
  font-size: 0.95rem;
  color: ${(props) =>
    props.darkMode ? props.theme.colors.textSecondary : "#546e7a"};
`;

// Export all styled components
