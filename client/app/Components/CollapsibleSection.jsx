import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row-reverse; /* Reversed to put title on right side */
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;

  h2 {
    margin-bottom: 0 !important; /* Override the margin when in a collapsible section */
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: row-reverse; /* Icon on left, text on right */
`;

const ToggleButton = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) =>
    props.$darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"};

  svg {
    color: ${(props) => props.$colors?.primary || "var(--primary-color)"};
    font-size: 24px;
  }
`;

const SectionContent = styled(motion.div)`
  overflow: hidden;
`;

const CollapsibleSection = ({
  title,
  children,
  colors,
  darkMode,
  defaultExpanded = false,
  icon = null,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <SectionHeader onClick={toggleExpand}>
        <TitleWrapper>
          <h2>{title}</h2>
          {icon && icon}
        </TitleWrapper>
        <ToggleButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          $colors={colors}
          $darkMode={darkMode}
        >
          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ToggleButton>
      </SectionHeader>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <SectionContent
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 },
              },
            }}
          >
            <div style={{ marginTop: "16px" }}>{children}</div>
          </SectionContent>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;
