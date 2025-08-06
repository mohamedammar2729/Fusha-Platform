import { styled } from "@mui/material/styles";
import { keyframes, css } from "styled-components";
import { motion } from "framer-motion";
// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
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

// Main container styling
export const MyMyBox = styled("div")`
  padding: 2rem;
  max-width: 1200px;
  margin: 5rem auto 3rem;
  animation: ${fadeIn} 0.6s ease-in-out;
  position: relative;

  @media (max-width: 1200px) {
    padding: 1.5rem;
    max-width: 95%;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 90%;
    margin: 7rem auto 1.5rem;
  }

  @media (max-width: 568px) {
    padding: 1rem;
    max-width: 95%;
    margin: 6rem auto 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    max-width: 100%;
    margin: 5.5rem auto 0.75rem;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
  }
`;

// Header Section
export const HeaderSection = styled("div")`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(75, 114, 172, 0.2),
      rgba(75, 114, 172, 0.7),
      rgba(75, 114, 172, 0.2)
    );
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;

    &::after {
      bottom: -8px;
    }
  }

  @media (max-width: 360px) {
    gap: 0.75rem;
    margin-bottom: 0.85rem;
  }
`;

export const PageTitle = styled("h1")`
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;
  margin: 0;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }

  @media (max-width: 360px) {
    font-size: 1.35rem;
  }
`;

export const AddTripButton = styled("button")`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(75, 114, 172, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(75, 114, 172, 0.4);
  }

  svg {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 15px;

    svg {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 8px 14px;

    svg {
      font-size: 16px;
    }
  }

  @media (max-width: 360px) {
    padding: 7px 12px;
    font-size: 12px;

    svg {
      font-size: 15px;
    }
  }
`;

// Search and Filter Components
export const TopActionBar = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled("div")`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 0 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  flex: 1;
  min-width: 250px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);

  &:focus-within {
    box-shadow: 0 4px 15px rgba(75, 114, 172, 0.15);
    border-color: rgba(75, 114, 172, 0.3);
  }

  svg {
    color: var(--secondary-color);
    margin-left: 8px;
  }

  input {
    flex: 1;
    border: none;
    padding: 14px 8px;
    font-size: 15px;
    background: transparent;
    outline: none;
    color: var(--text-primary);
    text-align: right;
    direction: rtl;

    &::placeholder {
      color: #a0aec0;
    }
  }

  .clear-search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #e2e8f0;
    color: #4a5568;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #cbd5e0;
    }
  }
`;

export const SortButton = styled("button")`
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: none;
  border-radius: 12px;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  color: var(--text-primary);
  flex-direction: row-reverse;

  &:hover {
    background: #f8fafc;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
  }

  svg {
    color: var(--secondary-color);
    font-size: 18px;
  }
`;

export const FilterContainer = styled("div")`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 5px;
  scrollbar-width: none; /* For Firefox */

  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;

export const FilterButton = styled("button")`
  padding: 10px 16px;
  border-radius: 30px;
  border: none;
  background-color: ${({ active, color }) =>
    active ? color || "#3b5898" : "white"};
  color: ${({ active }) => (active ? "white" : "var(--text-secondary)")};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  box-shadow: ${({ active }) =>
    active
      ? "0 4px 12px rgba(59, 88, 152, 0.2)"
      : "0 2px 8px rgba(0, 0, 0, 0.08)"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Trip List Header
export const TripsListHeader = styled("div")`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 14px;
  color: var(--text-secondary);
  padding: 0 5px;

  span {
    font-weight: 500;
  }
`;

// Trip Grid Layout
export const TripsGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.85rem;
  }

  @media (max-width: 360px) {
    gap: 0.75rem;
  }
`;

// Trip Card Components
export const TripCard = styled("div")`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${(props) =>
    props.deleting &&
    css`
      opacity: 0;
      transform: translateX(-100%);
    `}

  &:hover {
    transform: ${(props) =>
      props.deleting ? "translateX(-100%)" : "translateY(-7px)"};
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 480px) {
    border-radius: 16px;
    width: 100%;
    margin: 0 auto;
  }

  @media (max-width: 360px) {
    border-radius: 14px;
  }
`;

export const TripHeader = styled("div")`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
`;

export const TripTitle = styled("h2")`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
`;

export const TripDate = styled("div")`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 13px;
  background-color: rgba(75, 114, 172, 0.1);
  padding: 6px 10px;
  border-radius: 20px;

  svg {
    color: var(--secondary-color);
  }
`;

// Trip Feature Components
export const TripFeature = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-direction: row-reverse;

  span {
    font-size: 14px;
    color: var(--text-primary);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    margin-bottom: 6px;

    span {
      font-size: 12px;
    }
  }

  @media (max-width: 360px) {
    gap: 5px;
    margin-bottom: 5px;

    span {
      font-size: 11px;
    }
  }
`;

export const FeatureIcon = styled("div")`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ primary, secondary, success }) =>
    primary
      ? "rgba(59, 88, 152, 0.15)"
      : secondary
      ? "rgba(75, 114, 173, 0.15)"
      : success
      ? "rgba(76, 175, 80, 0.15)"
      : "rgba(0, 0, 0, 0.1)"};

  svg {
    font-size: 18px;
    color: ${({ primary, secondary, success }) =>
      primary
        ? "var(--primary-color)"
        : secondary
        ? "var(--secondary-color)"
        : success
        ? "var(--success-color)"
        : "var(--text-primary)"};
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;

    svg {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;

    svg {
      font-size: 14px;
    }
  }

  @media (max-width: 360px) {
    width: 24px;
    height: 24px;

    svg {
      font-size: 12px;
    }
  }
`;

// Trip Card Skeleton (Loading State)
export const TripCardSkeleton = styled("div")`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
  height: 400px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(240, 240, 240, 0.6) 0%,
      rgba(250, 250, 250, 0.8) 50%,
      rgba(240, 240, 240, 0.6) 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  }

  @media (max-width: 768px) {
    height: 350px;
  }
`;

// Empty States
export const EmptyTripsState = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  img {
    width: 180px;
    height: auto;
    margin-bottom: 2rem;
    opacity: 0.8;
  }

  h3 {
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    font-size: 22px;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 400px;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;

    img {
      width: 150px;
      margin-bottom: 1.5rem;
    }

    h3 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
      margin-bottom: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 0.75rem;

    img {
      width: 120px;
      margin-bottom: 1.25rem;
    }

    h3 {
      font-size: 18px;
    }

    p {
      font-size: 13px;
      margin-bottom: 1.25rem;
      padding: 0 0.5rem;
    }
  }
`;

export const NoResultsFound = styled(EmptyTripsState)`
  padding: 3rem 1rem;
  background-color: ${(props) =>
    props?.theme?.darkMode
      ? "rgba(45, 50, 80, 0.3)"
      : "rgba(245, 247, 250, 0.5)"};
  img {
    width: 120px;
    animation: ${float} 3s ease-in-out infinite;
    opacity: ${(props) => (props?.theme?.darkMode ? 0.8 : 1)};
  }

  button.primary-button {
    color: ${(props) => (props?.theme?.darkMode ? "#000000" : "#FFFFFF")};
    background: ${(props) => props?.theme?.colors?.primary || "#4a72ac"};
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 15px;
    box-shadow: 0 4px 8px
      ${(props) =>
        props?.theme?.darkMode
          ? `${props?.theme?.colors?.primary}40`
          : "rgba(0, 0, 0, 0.1)"};

    &:hover {
      background: ${(props) =>
        props?.theme?.colors?.accent ||
        props?.theme?.colors?.primary ||
        "#4a72ac"};
      transform: translateY(-2px);
      box-shadow: 0 6px 12px
        ${(props) =>
          props?.theme?.darkMode
            ? `${props?.theme?.colors?.primary}60`
            : "rgba(0, 0, 0, 0.15)"};
    }
  }

  &.dark-theme {
    background-color: rgba(45, 50, 80, 0.3);
  }

  &.light-theme {
    background-color: rgba(245, 247, 250, 0.5);
  }
`;

// Button Components
export const CreateTripButton = styled("button")`
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(75, 114, 172, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(75, 114, 172, 0.4);
  }

  svg {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 15px;
  }
`;

// Carousel Components
export const CarouselContainer = styled("div")`
  background: #f0f0f0;
  overflow: hidden;
  position: relative;
  height: 200px;

  .slick-dots {
    bottom: 5px;
    z-index: 5;

    li button:before {
      color: white;
      opacity: 0.7;
    }

    li.slick-active button:before {
      opacity: 1;
    }
  }

  .slick-arrow {
    z-index: 5;
  }

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 480px) {
    height: 150px;

    .slick-arrow {
      width: 30px !important;
      height: 30px !important;

      &:before {
        font-size: 20px;
      }
    }

    .slick-dots {
      bottom: 0;

      li {
        margin: 0 2px;

        button:before {
          font-size: 8px;
        }
      }
    }

    .custom-prev-arrow,
    .custom-next-arrow {
      width: 30px !important;
      height: 30px !important;
    }
  }

  @media (max-width: 360px) {
    height: 140px;

    .slick-arrow {
      width: 28px !important;
      height: 28px !important;

      &:before {
        font-size: 18px;
      }
    }
  }
`;

export const CarouselImage = styled("div")`
  height: 200px;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 480px) {
    height: 150px;
  }

  @media (max-width: 360px) {
    height: 140px;
  }
`;

export const ImageCounter = styled("div")`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  z-index: 5;

  @media (max-width: 568px) {
    font-size: 10px;
    padding: 3px 6px;
  }
`;

export const GradientOverlay = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  z-index: 2;

  @media (max-width: 568px) {
    height: 50px;
    padding: 8px 12px;
  }
`;

export const StatusBadge = styled("div")`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${({ status }) =>
    status === "completed"
      ? "rgba(76, 175, 80, 0.9)"
      : status === "cancelled"
      ? "rgba(244, 67, 54, 0.9)"
      : "rgba(33, 150, 243, 0.9)"};
  border-radius: 30px;
  padding: 5px 12px;
  color: white;
  backdrop-filter: blur(4px);

  span {
    font-size: 12px;
    font-weight: 600;
    margin-right: 3px;

    @media (max-width: 568px) {
      font-size: 10px;
    }
  }

  svg {
    font-size: 14px;

    @media (max-width: 568px) {
      font-size: 12px;
    }
  }

  @media (max-width: 568px) {
    padding: 4px 10px;
  }
`;

// Trip Details Components
export const DetailsContainer = styled("div")`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .trip-features {
    margin-bottom: 16px;
  }

  .more-places {
    font-size: 12px;
    color: var(--text-secondary);
    padding-right: 24px;
    font-style: italic;
    margin-top: -5px;
    text-align: right;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    padding: 14px;

    .trip-features {
      margin-bottom: 14px;
    }
  }

  @media (max-width: 480px) {
    padding: 12px 10px;

    .trip-features {
      margin-bottom: 10px;
    }

    .more-places {
      font-size: 11px;
      padding-right: 18px;
    }
  }
`;

export const DetailRow = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }

  @media (max-width: 568px) {
    margin-bottom: 10px;
  }
`;

export const DetailItem = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  background: rgba(75, 114, 173, 0.08);
  padding: 10px 15px;
  border-radius: 12px;
  min-width: 45%;
  transition: all 0.3s ease;

  span {
    font-size: 14px;
    color: var(--text-primary);
    margin-right: 10px;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 568px) {
      font-size: 12px;
    }
  }

  svg {
    font-size: 20px;
    color: var(--secondary-color);

    @media (max-width: 768px) {
      font-size: 18px;
    }

    @media (max-width: 568px) {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
  }

  @media (max-width: 568px) {
    padding: 6px 10px;
  }
`;

// Trip Timeline Components
export const TimelineSection = styled("div")`
  border-top: 1px solid #f0f0f0;
  padding: 16px 0;
  margin-bottom: 16px;
  flex: 1;

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 14px;
    text-align: right;

    @media (max-width: 768px) {
      font-size: 15px;
      margin-bottom: 12px;
    }

    @media (max-width: 568px) {
      font-size: 14px;
      margin-bottom: 10px;
    }

    @media (max-width: 480px) {
      font-size: 13px;
    }
  }

  .timeline-container {
    position: relative;
  }

  .more-places {
    @media (max-width: 480px) {
      font-size: 10px !important;
      padding-right: 18px !important;
    }
  }

  @media (max-width: 768px) {
    padding: 14px 0;
    margin-bottom: 14px;
  }

  @media (max-width: 568px) {
    padding: 12px 0;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px 0;
    margin-bottom: 10px;
  }
`;

export const TimelineItem = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => (props.isLast ? "0" : "22px")};
  padding-right: 24px;
  flex-direction: row-reverse; /* Reverse the flex direction */

  span {
    font-size: 13px;
    color: var(--text-primary);
    font-weight: 500;
    text-align: right;
    flex-grow: 1;

    @media (max-width: 768px) {
      font-size: 12px;
    }

    @media (max-width: 568px) {
      font-size: 11px;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: ${(props) => (props.isLast ? "0" : "18px")};
    padding-right: 20px;
  }

  @media (max-width: 568px) {
    margin-bottom: ${(props) => (props.isLast ? "0" : "16px")};
    padding-right: 18px;
  }
`;

export const TimelineDot = styled("div")`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  margin-left: 10px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;

  @media (max-width: 568px) {
    width: 10px;
    height: 10px;
    margin-left: 8px;
  }
`;

export const TimelineLine = styled("div")`
  position: absolute;
  right: 30px;
  top: 12px;
  width: 2px;
  height: calc(100% + 10px);
  background-color: var(--secondary-color);
  opacity: 0.3;

  @media (max-width: 768px) {
    right: 26px;
  }

  @media (max-width: 568px) {
    right: 22px;
    top: 10px;
  }
`;

// Card Actions Section
export const CardActions = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 568px) {
    padding-top: 12px;
  }

  @media (max-width: 480px) {
    padding-top: 10px;
    flex-wrap: wrap;
    gap: 8px;
  }

  @media (max-width: 360px) {
    flex-direction: column;
    align-items: stretch;

    > button:first-of-type {
      margin-bottom: 8px;
    }
  }
`;

export const ActionButtons = styled("div")`
  display: flex;
  gap: 8px;

  @media (max-width: 568px) {
    gap: 6px;
  }

  @media (max-width: 360px) {
    justify-content: center;
    margin-top: 6px;
  }
`;

export const ActionButton = styled(motion.button)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ edit, delete: isDelete }) =>
    edit
      ? "rgba(33, 150, 243, 0.1)"
      : isDelete
      ? "rgba(244, 67, 54, 0.1)"
      : "rgba(0, 0, 0, 0.05)"};

  svg {
    font-size: 18px;
    color: ${({ edit, delete: isDelete }) =>
      edit ? "#2196F3" : isDelete ? "#F44336" : "var(--text-secondary)"};
  }

  &:hover {
    background-color: ${({ edit, delete: isDelete }) =>
      edit
        ? "rgba(33, 150, 243, 0.2)"
        : isDelete
        ? "rgba(244, 67, 54, 0.2)"
        : "rgba(0, 0, 0, 0.1)"};
    transform: translateY(-2px);
  }

  @media (max-width: 568px) {
    width: 32px;
    height: 32px;

    svg {
      font-size: 16px;
    }
  }
`;

export const ViewDetailsButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 16px;
  }

  &:hover {
    background: var(--secondary-color);
  }

  @media (max-width: 568px) {
    padding: 8px 14px;
    font-size: 12px;

    svg {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    padding: 7px 12px;
    font-size: 11px;
    width: 100%;
    justify-content: center;

    svg {
      font-size: 13px;
    }
  }

  @media (max-width: 360px) {
    padding: 6px 10px;
  }
`;

// Delete Confirmation Dialog
export const DeleteConfirmOverlay = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
  padding: 0 20px;
`;

export const DeleteConfirmDialog = styled("div")`
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 450px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  direction: rtl;

  h3 {
    margin-bottom: 16px;
    color: #d32f2f;
    font-size: 20px;
    font-weight: 700;
  }

  p {
    margin-bottom: 24px;
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.5;
  }

  @media (max-width: 568px) {
    padding: 20px;

    h3 {
      font-size: 18px;
      margin-bottom: 14px;
    }

    p {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 16px;
    width: 95%;

    h3 {
      font-size: 16px;
      margin-bottom: 12px;
    }

    p {
      font-size: 13px;
      margin-bottom: 16px;
    }
  }
`;

export const DeleteConfirmButtons = styled("div")`
  display: flex;
  justify-content: center;
  gap: 16px;

  .confirm-btn {
    background: linear-gradient(135deg, #f44336, #d32f2f);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
    font-size: 15px;

    &:hover {
      box-shadow: 0 6px 16px rgba(244, 67, 54, 0.4);
    }
  }

  .cancel-btn {
    background: #f0f0f0;
    color: #424242;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
    font-size: 15px;

    &:hover {
      background: #e0e0e0;
    }
  }

  @media (max-width: 568px) {
    gap: 12px;

    .confirm-btn,
    .cancel-btn {
      padding: 10px 20px;
      font-size: 14px;
    }
  }
`;

// Success Message
export const SuccessMessage = styled("div")`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--success-color);
  color: white;
  padding: 14px 24px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  z-index: 1000;
  font-size: 15px;
  direction: rtl;

  svg {
    font-size: 20px;
  }

  @media (max-width: 568px) {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 8px;
    bottom: 20px;

    svg {
      font-size: 18px;
    }
  }
`;

// Favorite Button Animation
export const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const FavoriteButton = styled(motion.div)`
  cursor: pointer;
  transition: all 0.3s ease;

  &.favorite {
    animation: ${pulseAnimation} 0.4s ease;
  }
`;

// Enhanced Trip Grid
export const EnhancedTripGrid = styled(TripsGrid)`
  margin-top: 20px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Pagination Controls
export const PaginationControls = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
`;

export const PageButton = styled("button")`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.active ? "var(--primary-color)" : "white")};
  color: ${(props) => (props.active ? "white" : "var(--text-primary)")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active ? "var(--primary-color)" : "#f0f0f0"};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 568px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
`;

// Category Badges
export const CategoryBadge = styled("span")`
  display: inline-block;
  background: rgba(75, 114, 173, 0.1);
  color: var(--secondary-color);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 8px;

  @media (max-width: 568px) {
    font-size: 11px;
    padding: 4px 10px;
  }
`;

// Trip Stats Row
export const TripStatsRow = styled("div")`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background: #f8fafd;
  border-radius: 12px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 12px;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const StatItem = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 5px;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  .stat-label {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 11px;
    }
  }
`;

// Floating Action Button
export const FloatingActionButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(59, 88, 152, 0.4);
  z-index: 100;

  svg {
    font-size: 28px;
  }

  @media (max-width: 568px) {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;

    svg {
      font-size: 24px;
    }
  }
`;
