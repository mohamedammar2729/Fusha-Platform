import styled from "styled-components";
import { motion } from "framer-motion";

export const DialogOverlay = styled(motion.div)`
  position: fixed;
  top: 10;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.$darkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)"};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow-y: auto;
`;

export const TitleSection = styled.div`
  text-align: right;
  flex: 1;

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--primary-color);

    @media (max-width: 768px) {
      font-size: 26px;
    }

    @media (max-width: 480px) {
      font-size: 22px;
    }
  }

  .trip-dates {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    color: var(--text-secondary);
    font-size: 15px;

    @media (max-width: 480px) {
      font-size: 13px;
    }
  }
`;

export const FavoriteButtonWrapper = styled(motion.button)`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  svg {
    font-size: 32px;

    @media (max-width: 480px) {
      font-size: 28px;
    }
  }
`;
export const ActionButtonsBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: flex-end;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &.primary {
    background: var(--primary-color);
    color: white;
  }

  &.secondary {
    background: rgba(59, 88, 152, 0.1);
    color: var(--primary-color);
  }

  &.danger {
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
  }

  svg {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;

    svg {
      font-size: 16px;
    }
  }
`;

export const DialogContent = styled(motion.div)`
  background-color: ${(props) => props.$colors?.background || "#ffffff"};
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 10px 30px
    ${(props) =>
      props.$darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"};

  /* Custom scrollbar for the dialog */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.$darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)"};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) =>
      props.$darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.25)"};
  }

  @media (max-width: 768px) {
    max-height: 85vh;
    padding: 1rem;
  }
`;

export const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${(props) =>
    props.$darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"};
  color: ${(props) => props.$colors?.text || "#333"};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;

export const SectionCard = styled.div`
  background: ${(props) => props.$colors?.surface || "#ffffff"};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px
    ${(props) =>
      props.$darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.08)"};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 16px
      ${(props) =>
        props.$darkMode ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.1)"};
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${(props) =>
      props.$colors?.accent || props.$colors?.primary || "#3b5898"};
    text-align: right;
    position: relative;
    padding-right: 16px;

    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 20px;
      background-color: ${(props) => props.$colors?.primary || "#3b5898"};
      border-radius: 2px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
    border-radius: 12px;
  }
`;

export const CarouselImage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f9fc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DetailBoxes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  direction: rtl;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailBox = styled.div`
  background: ${(props) => props.$color || "rgba(59, 88, 152, 0.05)"};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.$iconBg || "rgba(59, 88, 152, 0.1)"};

    svg {
      color: ${(props) => props.$iconColor || "var(--primary-color)"};
      font-size: 20px;
    }
  }

  .content {
    flex: 1;

    .label {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }
  }

  @media (max-width: 480px) {
    padding: 14px;

    .icon {
      width: 36px;
      height: 36px;

      svg {
        font-size: 18px;
      }
    }

    .content {
      .label {
        font-size: 12px;
      }

      .value {
        font-size: 15px;
      }
    }
  }
`;

export const Timeline = styled.div`
  padding-right: 24px;
  position: relative;
  margin-top: 20px;
  direction: rtl;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 10px;
    width: 2px;
    background-color: rgba(59, 88, 152, 0.2);
  }
`;

export const TimelineItem = styled.div`
  position: relative;
  padding-bottom: ${(props) => (props.$isLast ? "0" : "24px")};
  padding-right: 20px;

  &::before {
    content: "";
    position: absolute;
    right: 1px;
    top: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--primary-color);
    z-index: 1;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--text-primary);
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
  }

  @media (max-width: 480px) {
    padding-bottom: ${(props) => (props.$isLast ? "0" : "20px")};

    &::before {
      width: 16px;
      height: 16px;
      top: 5px;
    }

    h3 {
      font-size: 15px;
    }

    p {
      font-size: 13px;
    }
  }
`;

export const NotesSection = styled.div`
  white-space: pre-line;
  direction: rtl;
  text-align: right;
  line-height: 1.6;
  color: var(--text-primary);
  font-size: 15px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
export const StatusBadge = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: ${(props) => {
    switch (props.$status) {
      case "completed":
        return "rgba(76, 175, 80, 0.9)";
      case "cancelled":
        return "rgba(244, 67, 54, 0.9)";
      default:
        return "rgba(33, 150, 243, 0.9)";
    }
  }};
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    bottom: 15px;
    right: 15px;
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 20px;

    svg {
      font-size: 16px;
    }
  }
`;

export const ScheduleSection = styled.div`
  margin-top: 20px;
  direction: rtl;
`;

export const DayCard = styled.div`
  background: ${(props) => props.$colors?.surface || "#ffffff"};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px
    ${(props) =>
      props.$darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.08)"};
  transition: all 0.3s ease;
  direction: rtl; /* Ensure RTL direction */

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 10px;
  }
`;

export const DayHeader = styled.div`
  display: flex;
  flex-direction: row; /* Change to row-reverse for RTL */
  align-items: center;
  justify-content: flex-start; /* Align to the right in RTL context */
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid
    ${(props) =>
      props.$darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)"};
  text-align: right;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: ${(props) => props.$colors?.primary || "#3b5898"};
  }
`;

export const ActivityItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${(props) =>
    props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(59, 88, 152, 0.05)"};
  transition: all 0.3s ease;
  text-align: right;
  direction: rtl;

  &:last-child {
    margin-bottom: 0;
  }

  .time {
    font-weight: 600;
    margin-bottom: 4px;
    color: ${(props) => props.$colors?.primary || "#3b5898"};
  }

  .activity {
    color: ${(props) => props.$colors?.text || "#333333"};
  }

  .place {
    font-size: 13px;
    margin-top: 4px;
    color: ${(props) =>
      props.$colors?.textSecondary || props.$colors?.text || "#666666"};
    opacity: ${(props) => (props.$darkMode ? 0.7 : 0.6)};
  }
`;

export const TipsList = styled.ul`
  padding-right: 20px;
  padding-left: 0;
  direction: rtl;

  li {
    margin-bottom: 10px;
    position: relative;
    color: ${(props) => props.$colors?.text || "#333333"};

    &::marker {
      color: ${(props) => props.$colors?.primary || "#3b5898"};
    }
  }
`;

export const PlacesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const PlaceCard = styled.div`
  background: ${(props) => props.$colors?.surface || "#ffffff"};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px
    ${(props) =>
      props.$darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.08)"};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px
      ${(props) =>
        props.$darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.12)"};
  }
`;

export const PlaceImage = styled.div`
  height: 150px;
  background: ${(props) => (props.$darkMode ? "#1a1a1a" : "#f7f9fc")};
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PlaceDetails = styled.div`
  padding: 12px;
  transition: all 0.3s ease;

  h4 {
    margin: 0 0 8px;
    color: ${(props) => props.$colors?.text || "#333333"};
    font-size: 16px;
  }

  .description {
    font-size: 13px;
    color: ${(props) =>
      props.$colors?.textSecondary || props.$colors?.text || "#666666"};
    opacity: ${(props) => (props.$darkMode ? 0.7 : 0.6)};
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }

  .price {
    font-weight: 600;
    color: ${(props) => props.$colors?.primary || "#3b5898"};
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const AIGeneratedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${(props) =>
    props.$darkMode
      ? `linear-gradient(135deg, ${props.$colors?.primary || "#3b5898"}, ${
          props.$colors?.accent || props.$colors?.primary || "#3b5898"
        })`
      : `linear-gradient(135deg, ${props.$colors?.primary || "#3b5898"}, ${
          props.$colors?.accent || props.$colors?.primary || "#3b5898"
        })`};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px
    ${(props) =>
      props.$darkMode ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.15)"};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px
      ${(props) =>
        props.$darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)"};
  }

  svg {
    font-size: 16px;
  }
`;
