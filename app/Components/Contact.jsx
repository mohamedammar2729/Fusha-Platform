"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext.jsx";
import {
  PageContainer,
  ContentWrapper,
  PageHeading,
  HeadingAccent,
  PageSubheading,
  ContactSection,
  ContactInfoPanel,
  InfoPanelContent,
  InfoHeader,
  InfoSubheader,
  ContactInfoList,
  ContactInfoItem,
  IconWrapper,
  InfoLabel,
  InfoValue,
  SocialMediaLinks,
  SocialLink,
  IllustrationContainer,
  FormPanel,
  TabsContainer,
  Tab,
  TabIndicator,
  ContactForm,
  FormRow,
  FormGroup,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  ErrorText,
  SubmitButtonContainer,
  StyledSubmitButton,
  ButtonSpinner,
  NotificationCard,
  FAQContainer,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  MapContainer,
  LocationDetails,
  LocationTitle,
  LocationAddress,
  LocationHours,
} from "../styledComponent/Contact/StyledContact.jsx";
import {
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  SendOutlined,
  CheckCircleOutline,
  ErrorOutline,
  WhatsApp as WhatsAppIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";

const Contact = () => {
  const { darkMode, theme } = useTheme();
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error
  const [activeTab, setActiveTab] = useState("message"); // message, faq, location
  const [svgContent, setSvgContent] = useState(null);

  // Generate SVG content on client-side only
  useEffect(() => {
    // Dark mode SVG
    const darkModeSvg = `<svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="200" fill="none"/>
    
    <g class="pyramids">
      <path d="M50 150L100 50L150 150H50Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" stroke-width="2">
        <animate attributeName="fill-opacity" values="0.15;0.2;0.15" dur="8s" repeatCount="indefinite"/>
      </path>
      <path d="M100 150L150 80L200 150H100Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" stroke-width="2">
        <animate attributeName="fill-opacity" values="0.15;0.2;0.15" dur="6s" repeatCount="indefinite"/>
      </path>
      <path d="M160 150L210 90L260 150H160Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" stroke-width="2">
        <animate attributeName="fill-opacity" values="0.15;0.2;0.15" dur="7s" repeatCount="indefinite"/>
      </path>
    </g>

    <g transform="translate(210,50)">
      <defs>
        <clipPath id="moonClip">
          <circle cx="0" cy="0" r="20" />
        </clipPath>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="2" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="0" cy="0" r="20" fill="rgba(220,220,255,0.9)" filter="url(#moonGlow)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="12" cy="-5" r="18" fill="rgba(75, 75, 109, 0.85)" clip-path="url(#moonClip)">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="60s" repeatCount="indefinite"/>
      </circle>
    </g>

    <g class="stars">
      ${Array.from({ length: 20 })
        .map((_, i) => {
          const cx = Math.floor(Math.random() * 280);
          const cy = Math.floor(Math.random() * 80);
          const r = (Math.random() * 1.2 + 0.5).toFixed(2);
          const opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
          const duration1 = (Math.random() * 3 + 2).toFixed(2);
          const duration2 = (Math.random() * 4 + 3).toFixed(2);

          return `<circle cx="${cx}" cy="${cy}" 
          r="${r}" fill="rgba(255,255,255,${opacity})">
          <animate attributeName="opacity" values="0;1;0" dur="${duration1}s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="${duration2}s" repeatCount="indefinite"/>
        </circle>`;
        })
        .join("")}
    </g>

    <g class="palm-tree" transform="translate(30,150)">
      <path d="M0 0V-40" stroke="rgba(255,255,255,0.7)" stroke-width="3"/>
      ${Array.from({ length: 4 })
        .map((_, i) => {
          return `
        <path d="M0 ${-40 + i * 10}C${-10 + i * 2} ${-50 - i * 5} ${
            -20 + i * 4
          } ${-45 - i * 5} ${-5 + i * 2} ${-35 - i * 5}" 
          stroke="rgba(255,255,255,0.7)" stroke-width="2">
          <animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="${
            3 + i
          }s" repeatCount="indefinite"/>
        </path>
        <path d="M0 ${-40 + i * 10}C${10 - i * 2} ${-50 - i * 5} ${
            20 - i * 4
          } ${-45 - i * 5} ${5 - i * 2} ${-35 - i * 5}" 
          stroke="rgba(255,255,255,0.7)" stroke-width="2">
          <animateTransform attributeName="transform" type="rotate" values="3;-3;3" dur="${
            4 - i
          }s" repeatCount="indefinite"/>
        </path>
      `;
        })
        .join("")}
    </g>

    <path class="nile" d="M10 160C40 155 80 165 120 158C160 151 200 160 240 155C260 153 270 155 280 153" 
      stroke="rgba(255,255,255,0.8)" stroke-width="2" fill="none">
      <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="30s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0.8;0.6" dur="5s" repeatCount="indefinite"/>
    </path>

    <g class="boat" transform="translate(225,158)">
      <path d="M-5 0L5 0L0-5L-5 0Z" fill="rgba(255,255,255,0.8)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-2; 0,0" dur="2s" repeatCount="indefinite"/>
      </path>
      <path d="M0-5V-13" stroke="rgba(255,255,255,0.8)" stroke-width="1">
        <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite"/>
      </path>
    </g>

    <text x="140" y="190" font-family="Arial" font-size="14" fill="rgba(255,255,255,0.9)" text-anchor="middle" opacity="0">
      <animate attributeName="opacity" values="0;1" dur="1s" fill="freeze" begin="1s"/>
      <animateTransform attributeName="transform" type="translate" from="0 10" to="0 0" dur="1s" fill="freeze" begin="1s"/>
      مرحباً بك في مصر
    </text>
  </svg>`;

    // Light mode SVG
    const lightModeSvg = `<svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="200" fill="none"/>
    
    <g class="pyramids">
      <path d="M50 150L100 50L150 150H50Z" fill="rgba(100,70,40,0.1)" stroke="rgba(255,255,255,0.9)" stroke-width="2">
        <animate attributeName="fill-opacity" values="0.1;0.15;0.1" dur="8s" repeatCount="indefinite"/>
      </path>
      <path d="M100 150L150 80L200 150H100Z" fill="rgba(100,70,40,0.1)" stroke="rgba(255,255,255,0.9)" stroke-width="2">
        <animate attributeName="fill-opacity" values="0.1;0.15;0.1" dur="6s" repeatCount="indefinite"/>
      </path>
      <path d="M160 150L210 90L260 150H160Z" fill="rgba(100,70,40,0.1)" stroke="rgba(255,255,255,0.9)" stroke-width="2">
        <animate attributeName="fill-opacity" values="0.1;0.15;0.1" dur="7s" repeatCount="indefinite"/>
      </path>
    </g>

    <g transform="translate(210,50)">
      <defs>
        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,245,180,0.9)"/>
          <stop offset="100%" stop-color="rgba(255,220,120,0.9)"/>
        </linearGradient>
        <filter id="sunGlow">
          <feGaussianBlur stdDeviation="4" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <circle cx="0" cy="0" r="22" fill="url(#sunGradient)" filter="url(#sunGlow)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="6s" repeatCount="indefinite"/>
      </circle>
      
      <g transform="rotate(-30)">
        <path d="M0-25L0-35" stroke="rgba(255,245,180,0.8)" stroke-width="3">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite"/>
        </path>
        ${Array.from({ length: 8 })
          .map((_, i) => {
            return `
          <path d="M0-25L0-35" stroke="rgba(255,245,180,0.8)" stroke-width="3" transform="rotate(${
            i * 45
          })">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="${
              2 + i / 2
            }s" repeatCount="indefinite"/>
          </path>
        `;
          })
          .join("")}
      </g>
    </g>

    <g class="clouds">
      ${Array.from({ length: 3 })
        .map((_, i) => {
          const translateX = i * 80 + 30;
          const translateY = 40 + Math.floor(Math.random() * 20);
          const direction = i % 2 ? "-" : "";
          const duration = 15 + i * 3;

          return `
        <g transform="translate(${translateX},${translateY})">
          <path d="M0 0Q10-5 20 0T40 0Q30 5 20 0T0 0" fill="rgba(255,255,255,0.9)">
            <animate attributeName="transform" type="translate" values="0,0; ${direction}20,2; 0,0" dur="${duration}s" repeatCount="indefinite"/>
          </path>
        </g>
      `;
        })
        .join("")}
    </g>

    <g class="palm-tree" transform="translate(30,150)">
      <path d="M0 0V-40" stroke="rgba(255,255,255,0.9)" stroke-width="3"/>
      ${Array.from({ length: 4 })
        .map((_, i) => {
          return `
        <path d="M0 ${-40 + i * 10}C${-10 + i * 2} ${-50 - i * 5} ${
            -20 + i * 4
          } ${-45 - i * 5} ${-5 + i * 2} ${-35 - i * 5}" 
          stroke="rgba(255,255,255,0.9)" stroke-width="2">
          <animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="${
            3 + i
          }s" repeatCount="indefinite"/>
        </path>
        <path d="M0 ${-40 + i * 10}C${10 - i * 2} ${-50 - i * 5} ${
            20 - i * 4
          } ${-45 - i * 5} ${5 - i * 2} ${-35 - i * 5}" 
          stroke="rgba(255,255,255,0.9)" stroke-width="2">
          <animateTransform attributeName="transform" type="rotate" values="3;-3;3" dur="${
            4 - i
          }s" repeatCount="indefinite"/>
        </path>
      `;
        })
        .join("")}
    </g>

    <path class="nile" d="M10 160C40 155 80 165 120 158C160 151 200 160 240 155C260 153 270 155 280 153" 
      stroke="rgba(80,120,200,0.8)" stroke-width="2" fill="none">
      <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="25s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite"/>
    </path>

    <g class="boat" transform="translate(225,158)">
      <path d="M-5 0L5 0L0-5L-5 0Z" fill="rgba(255,255,255,0.9)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-2; 0,0" dur="1.8s" repeatCount="indefinite"/>
      </path>
      <path d="M0-5V-13" stroke="rgba(255,255,255,0.9)" stroke-width="1">
        <animate attributeName="opacity" values="1;0.7;1" dur="1.2s" repeatCount="indefinite"/>
      </path>
    </g>

    <g class="sand-particles">
      ${Array.from({ length: 15 })
        .map((_, i) => {
          const cx1 = Math.floor(Math.random() * 280);
          const cx2 = Math.floor(Math.random() * 280);
          const cy1 = 150 + Math.floor(Math.random() * 50);
          const cy2 = 150 + Math.floor(Math.random() * 50);
          const r = Math.random() * 1.5;
          const dur1 = 10 + Math.random() * 10;
          const dur2 = 8 + Math.random() * 8;

          return `
        <circle cx="${cx1}" cy="${cy1}" r="${r}" fill="rgba(255,255,255,0.9)">
          <animate attributeName="cx" values="${cx1};${cx2}" dur="${dur1}s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="${cy1};${cy2}" dur="${dur2}s" repeatCount="indefinite"/>
        </circle>
      `;
        })
        .join("")}
    </g>

    <text x="140" y="190" font-family="Arial" font-size="14" fill="rgba(255,255,255,0.9)" text-anchor="middle" opacity="0">
      <animate attributeName="opacity" values="0;1" dur="1s" fill="freeze" begin="1s"/>
      <animateTransform attributeName="transform" type="translate" from="0 10" to="0 0" dur="1s" fill="freeze" begin="1s"/>
      مرحباً بك في مصر
    </text>
  </svg>`;

    setSvgContent(darkMode ? darkModeSvg : lightModeSvg);
  }, [darkMode]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formState.fullName.trim()) newErrors.fullName = "الرجاء إدخال الاسم";
    if (!formState.email.trim()) {
      newErrors.email = "الرجاء إدخال البريد الإلكتروني";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }
    if (!formState.message.trim()) newErrors.message = "الرجاء إدخال رسالتك";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormStatus("submitting");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success
      setFormStatus("success");

      // Reset form after success
      setTimeout(() => {
        setFormState({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
        setFormStatus("idle");
      }, 3000);
    } catch (error) {
      setFormStatus("error");

      // Reset error status after a while
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }
  };

  return (
    <PageContainer darkMode={darkMode} theme={theme}>
      <ContentWrapper>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PageHeading darkMode={darkMode} theme={theme}>
            تواصل معنا
            <HeadingAccent darkMode={darkMode} theme={theme} />
          </PageHeading>
          <PageSubheading darkMode={darkMode} theme={theme}>
            يسعدنا تلقي استفساراتك واقتراحاتك في أي وقت
          </PageSubheading>
        </motion.div>

        <ContactSection>
          {/* Contact Info Panel */}
          <ContactInfoPanel darkMode={darkMode} theme={theme}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <InfoPanelContent>
                <InfoHeader darkMode={darkMode} theme={theme}>
                  معلومات التواصل
                </InfoHeader>
                <InfoSubheader darkMode={darkMode} theme={theme}>
                  يمكنك التواصل معنا بأي من الطرق التالية
                </InfoSubheader>

                <ContactInfoList>
                  <ContactInfoItem darkMode={darkMode} theme={theme}>
                    <IconWrapper darkMode={darkMode} theme={theme}>
                      <EmailOutlined />
                    </IconWrapper>
                    <div>
                      <InfoLabel darkMode={darkMode} theme={theme}>
                        البريد الإلكتروني
                      </InfoLabel>
                      <InfoValue darkMode={darkMode} theme={theme}>
                        info@egypttravelguide.com
                      </InfoValue>
                    </div>
                  </ContactInfoItem>

                  {/* Rest of contact items */}
                  <ContactInfoItem darkMode={darkMode} theme={theme}>
                    <IconWrapper darkMode={darkMode} theme={theme}>
                      <PhoneOutlined />
                    </IconWrapper>
                    <div>
                      <InfoLabel darkMode={darkMode} theme={theme}>
                        رقم الهاتف
                      </InfoLabel>
                      <InfoValue darkMode={darkMode} theme={theme}>
                        +20 2 1234 5678
                      </InfoValue>
                    </div>
                  </ContactInfoItem>

                  <ContactInfoItem darkMode={darkMode} theme={theme}>
                    <IconWrapper darkMode={darkMode} theme={theme}>
                      <LocationOnOutlined />
                    </IconWrapper>
                    <div>
                      <InfoLabel darkMode={darkMode} theme={theme}>
                        العنوان
                      </InfoLabel>
                      <InfoValue darkMode={darkMode} theme={theme}>
                        القاهرة، جمهورية مصر العربية
                      </InfoValue>
                    </div>
                  </ContactInfoItem>
                </ContactInfoList>

                <SocialMediaLinks>
                  {/* Social media links */}
                  <SocialLink
                    href="#"
                    darkMode={darkMode}
                    theme={theme}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </SocialLink>
                  <SocialLink
                    href="#"
                    darkMode={darkMode}
                    theme={theme}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </SocialLink>
                  <SocialLink
                    href="#"
                    darkMode={darkMode}
                    theme={theme}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </SocialLink>
                  <SocialLink
                    href="#"
                    darkMode={darkMode}
                    theme={theme}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Twitter"
                  >
                    <TwitterIcon />
                  </SocialLink>
                </SocialMediaLinks>

                <IllustrationContainer>
                  {/* Client-side rendered SVG */}
                  {svgContent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 1.2,
                        ease: "easeOut",
                      }}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                      }}
                      dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                  )}
                </IllustrationContainer>
              </InfoPanelContent>
            </motion.div>
          </ContactInfoPanel>

          {/* Rest of your component remains the same */}
          {/* Form Panel */}
          <FormPanel darkMode={darkMode} theme={theme}>
            {/* Your existing form panel code */}
            {/* ... */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Tabs Navigation */}
              <TabsContainer darkMode={darkMode} theme={theme}>
                <Tab
                  active={activeTab === "message"}
                  onClick={() => setActiveTab("message")}
                  darkMode={darkMode}
                  theme={theme}
                >
                  <motion.span
                    initial={false}
                    animate={
                      activeTab === "message" ? { scale: 1 } : { scale: 0.9 }
                    }
                  >
                    أرسل رسالة
                  </motion.span>
                  {activeTab === "message" && (
                    <TabIndicator
                      layoutId="activeTab"
                      darkMode={darkMode}
                      theme={theme}
                    />
                  )}
                </Tab>
                <Tab
                  active={activeTab === "faq"}
                  onClick={() => setActiveTab("faq")}
                  darkMode={darkMode}
                  theme={theme}
                >
                  <motion.span
                    initial={false}
                    animate={
                      activeTab === "faq" ? { scale: 1 } : { scale: 0.9 }
                    }
                  >
                    أسئلة شائعة
                  </motion.span>
                  {activeTab === "faq" && (
                    <TabIndicator
                      layoutId="activeTab"
                      darkMode={darkMode}
                      theme={theme}
                    />
                  )}
                </Tab>
                <Tab
                  active={activeTab === "location"}
                  onClick={() => setActiveTab("location")}
                  darkMode={darkMode}
                  theme={theme}
                >
                  <motion.span
                    initial={false}
                    animate={
                      activeTab === "location" ? { scale: 1 } : { scale: 0.9 }
                    }
                  >
                    موقعنا
                  </motion.span>
                  {activeTab === "location" && (
                    <TabIndicator
                      layoutId="activeTab"
                      darkMode={darkMode}
                      theme={theme}
                    />
                  )}
                </Tab>
              </TabsContainer>

              {/* Tab Content - Keep your existing tab content */}
              <AnimatePresence mode="wait">
                {activeTab === "message" && (
                  <motion.div
                    key="message-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ContactForm onSubmit={handleSubmit}>
                      <FormRow>
                        <FormGroup>
                          <StyledLabel
                            htmlFor="fullName"
                            darkMode={darkMode}
                            theme={theme}
                          >
                            الاسم بالكامل{" "}
                            <span style={{ color: "#f44336" }}>*</span>
                          </StyledLabel>
                          <StyledInput
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formState.fullName}
                            onChange={handleChange}
                            placeholder="أدخل اسمك الكامل"
                            error={!!errors.fullName}
                            darkMode={darkMode}
                            theme={theme}
                            disabled={formStatus === "submitting"}
                          />
                          {errors.fullName && (
                            <ErrorText darkMode={darkMode} theme={theme}>
                              {errors.fullName}
                            </ErrorText>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <StyledLabel
                            htmlFor="email"
                            darkMode={darkMode}
                            theme={theme}
                          >
                            البريد الإلكتروني{" "}
                            <span style={{ color: "#f44336" }}>*</span>
                          </StyledLabel>
                          <StyledInput
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            error={!!errors.email}
                            darkMode={darkMode}
                            theme={theme}
                            disabled={formStatus === "submitting"}
                          />
                          {errors.email && (
                            <ErrorText darkMode={darkMode} theme={theme}>
                              {errors.email}
                            </ErrorText>
                          )}
                        </FormGroup>
                      </FormRow>

                      <FormGroup>
                        <StyledLabel
                          htmlFor="subject"
                          darkMode={darkMode}
                          theme={theme}
                        >
                          الموضوع
                        </StyledLabel>
                        <StyledInput
                          id="subject"
                          name="subject"
                          type="text"
                          value={formState.subject}
                          onChange={handleChange}
                          placeholder="عنوان الرسالة"
                          darkMode={darkMode}
                          theme={theme}
                          disabled={formStatus === "submitting"}
                        />
                      </FormGroup>

                      <FormGroup>
                        <StyledLabel
                          htmlFor="message"
                          darkMode={darkMode}
                          theme={theme}
                        >
                          الرسالة <span style={{ color: "#f44336" }}>*</span>
                        </StyledLabel>
                        <StyledTextarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="اكتب رسالتك هنا..."
                          error={!!errors.message}
                          darkMode={darkMode}
                          theme={theme}
                          disabled={formStatus === "submitting"}
                          rows={5}
                        />
                        {errors.message && (
                          <ErrorText darkMode={darkMode} theme={theme}>
                            {errors.message}
                          </ErrorText>
                        )}
                      </FormGroup>

                      <SubmitButtonContainer>
                        <StyledSubmitButton
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          darkMode={darkMode}
                          theme={theme}
                          disabled={
                            formStatus === "submitting" ||
                            formStatus === "success"
                          }
                        >
                          {formStatus === "submitting" ? (
                            <ButtonSpinner />
                          ) : formStatus === "success" ? (
                            <>
                              <CheckCircleOutline
                                style={{ marginLeft: "8px" }}
                              />{" "}
                              تم الإرسال
                            </>
                          ) : (
                            <>
                              <SendOutlined style={{ marginLeft: "8px" }} />{" "}
                              إرسال الرسالة
                            </>
                          )}
                        </StyledSubmitButton>
                      </SubmitButtonContainer>
                    </ContactForm>
                  </motion.div>
                )}

                {activeTab === "faq" && (
                  <motion.div
                    key="faq-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FAQContainer>
                      <FAQItem darkMode={darkMode} theme={theme}>
                        <FAQQuestion darkMode={darkMode} theme={theme}>
                          كيف يمكنني حجز رحلة؟
                        </FAQQuestion>
                        <FAQAnswer darkMode={darkMode} theme={theme}>
                          يمكنك حجز رحلة من خلال موقعنا مباشرة عن طريق اختيار
                          الوجهة والتاريخ المناسب، ثم اتباع خطوات الدفع.
                        </FAQAnswer>
                      </FAQItem>

                      <FAQItem darkMode={darkMode} theme={theme}>
                        <FAQQuestion darkMode={darkMode} theme={theme}>
                          ما هي سياسة إلغاء الحجز؟
                        </FAQQuestion>
                        <FAQAnswer darkMode={darkMode} theme={theme}>
                          يمكنك إلغاء الحجز قبل 48 ساعة من موعد الرحلة مع
                          استرداد كامل المبلغ. الإلغاء قبل 24 ساعة يستحق استرداد
                          50% فقط.
                        </FAQAnswer>
                      </FAQItem>

                      <FAQItem darkMode={darkMode} theme={theme}>
                        <FAQQuestion darkMode={darkMode} theme={theme}>
                          هل تقدمون خدمات إرشاد سياحي؟
                        </FAQQuestion>
                        <FAQAnswer darkMode={darkMode} theme={theme}>
                          نعم، نوفر مرشدين سياحيين محترفين يتحدثون عدة لغات
                          لمساعدتك في استكشاف الوجهات بشكل أفضل.
                        </FAQAnswer>
                      </FAQItem>

                      <FAQItem darkMode={darkMode} theme={theme}>
                        <FAQQuestion darkMode={darkMode} theme={theme}>
                          كم تستغرق مدة الرد على استفسارات العملاء؟
                        </FAQQuestion>
                        <FAQAnswer darkMode={darkMode} theme={theme}>
                          عادة ما نرد على الاستفسارات خلال 24 ساعة من استلامها.
                          في حالات الطوارئ، يمكنك التواصل مباشرة عبر رقم هاتفنا.
                        </FAQAnswer>
                      </FAQItem>

                      <FAQItem darkMode={darkMode} theme={theme}>
                        <FAQQuestion darkMode={darkMode} theme={theme}>
                          ما هي أفضل الأوقات لزيارة مصر؟
                        </FAQQuestion>
                        <FAQAnswer darkMode={darkMode} theme={theme}>
                          أفضل وقت لزيارة مصر هو خلال فصل الخريف (سبتمبر إلى
                          نوفمبر) والربيع (مارس إلى مايو) حيث تكون درجات الحرارة
                          معتدلة وأكثر ملائمة للاستكشاف.
                        </FAQAnswer>
                      </FAQItem>

                      <FAQItem darkMode={darkMode} theme={theme}>
                        <FAQQuestion darkMode={darkMode} theme={theme}>
                          كم المدة المثالية للرحلة السياحية في مصر؟
                        </FAQQuestion>
                        <FAQAnswer darkMode={darkMode} theme={theme}>
                          نوصي بتخصيص ما لا يقل عن 7-10 أيام لاستكشاف المعالم
                          الرئيسية في مصر بما في ذلك القاهرة، الأقصر، أسوان
                          والمناطق الساحلية إذا كنت ترغب في ذلك.
                        </FAQAnswer>
                      </FAQItem>
                    </FAQContainer>
                  </motion.div>
                )}

                {activeTab === "location" && (
                  <motion.div
                    key="location-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MapContainer>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6759532433505!2d31.22244491511581!3d30.045915981884904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79f8877e9ba4f9f2!2sCairo%20Tower!5e0!3m2!1sen!2seg!4v1616745219889!5m2!1sen!2seg"
                        width="100%"
                        height="350"
                        style={{ border: 0, borderRadius: "10px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="خريطة الموقع"
                      />
                      <LocationDetails darkMode={darkMode} theme={theme}>
                        <LocationTitle darkMode={darkMode} theme={theme}>
                          زورنا في مقرنا
                        </LocationTitle>
                        <LocationAddress darkMode={darkMode} theme={theme}>
                          <LocationOnOutlined
                            style={{
                              marginLeft: "5px",
                              fontSize: "18px",
                              color: theme.colors.primary,
                            }}
                          />
                          برج القاهرة، حديقة الأزهر، القاهرة، مصر
                        </LocationAddress>
                        <LocationHours darkMode={darkMode} theme={theme}>
                          <strong>ساعات العمل:</strong> من الأحد إلى الخميس،
                          9:00 صباحًا - 5:00 مساءً
                        </LocationHours>
                      </LocationDetails>
                    </MapContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </FormPanel>
        </ContactSection>
      </ContentWrapper>

      {/* Success/Error Notification */}
      <AnimatePresence>
        {(formStatus === "success" || formStatus === "error") && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
            }}
          >
            <NotificationCard
              status={formStatus}
              darkMode={darkMode}
              theme={theme}
            >
              {formStatus === "success" ? (
                <>
                  <CheckCircleOutline
                    style={{
                      color: "#4CAF50",
                      marginLeft: "10px",
                      fontSize: "24px",
                    }}
                  />
                  <span>تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا!</span>
                </>
              ) : (
                <>
                  <ErrorOutline
                    style={{
                      color: "#F44336",
                      marginLeft: "10px",
                      fontSize: "24px",
                    }}
                  />
                  <span>
                    حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.
                  </span>
                </>
              )}
            </NotificationCard>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Contact;
