# Fasaha Project - Low-Level Design Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Database Design](#database-design)
6. [Authentication and Authorization](#authentication-and-authorization)
7. [Feature Modules](#feature-modules)
8. [UI/UX Design](#uiux-design)
9. [State Management](#state-management)
10. [Third-Party Integrations](#third-party-integrations)
11. [API Endpoints](#api-endpoints)
12. [Future Enhancements](#future-enhancements)

## Introduction

### Project Overview
Fasaha is a comprehensive travel planning platform that serves two primary user types:
- **Regular Users**: Can discover places, create trips, and plan their travel itineraries
- **Sellers**: Can register their places (restaurants, hotels, tourist attractions, etc.) and access analytics about user engagement

The application facilitates trip planning by allowing users to select places to visit and organize them into personalized itineraries. Sellers benefit from increased visibility and access to user engagement data.

### Technology Stack
- **Frontend**: Next.js, React.js, Material-UI, Styled-Components, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context and local state
- **Styling**: CSS-in-JS (Styled Components), Material-UI theming
- **Animations**: Framer Motion for UI animations

## System Architecture

### High-Level Architecture

The system follows a client-server architecture with the following components:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client (Next.js)│<───>│ Server (Express)│<───>│ MongoDB Database│
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

1. **Client (Next.js application)**:
   - Provides the user interface for both regular users and sellers
   - Handles client-side routing and rendering
   - Manages UI state and interactions
   - Different views based on user type (regular vs. seller)

2. **Server (Express.js)**:
   - Processes API requests from the client
   - Handles authentication and authorization
   - Communicates with the database for CRUD operations
   - Implements business logic for trip creation, place registration, etc.

3. **Database (MongoDB)**:
   - Stores user data, places, trips, reviews, etc.
   - Connected via Mongoose ODM for schema validation and querying

## Frontend Architecture

### Component Structure

The frontend follows a modular component-based architecture with the following key categories:

1. **Core Components**:
   - `NavBar.jsx` and `NavBarV2.jsx`: Navigation bars for regular users and sellers respectively
   - `Layout.js`: Main layout component with theme handling and appropriate navigation based on user type
   
2. **User Journey Components**:
   - `Register.jsx`: User registration process with multi-step form
   - `LogIn.jsx`: Authentication component
   - `TripType.jsx`: Trip category selection 
   - `Create.jsx`: Trip creation flow
   - `Program.jsx`: View for building travel programs
   - `FinalProgram.jsx`: Final view of the created trip
   
3. **Seller-specific Components**:
   - `AddPlace.jsx`: Multi-step form for registering a new place
   - `Review.jsx`: Review management and analytics
   - `HomeV2.jsx`: Seller-focused homepage
   
4. **Home Components**:
   - `Home.jsx`: Regular user homepage
   - Various subcomponents in the HomeV2 folder for seller dashboard
   
5. **Shared/Utility Components**:
   - `Card.jsx`: Reusable card component for displaying information
   - `AutoCloseSelect.jsx`: Select component with auto-close behavior
   - `SuccessCard.jsx`: Component for displaying success messages

### Component Hierarchy

```
App
├── ThemeProvider
│   └── Layout
│       ├── NavBar/NavBarV2 (based on user type)
│       └── Page content
│           ├── Home/HomeV2 (based on user type)
│           ├── Register
│           ├── LogIn
│           ├── Create
│           ├── Program
│           ├── FinalProgram
│           ├── AddPlace
│           ├── Review
│           └── ...
```

### Routing Structure

The application uses Next.js routing with the following key routes:

- `/`: Homepage (different view for regular users vs. sellers)
- `/register`: User registration
- `/login`: Authentication
- `/create`: Trip creation flow
- `/program`: Program view
- `/finalprogram`: Final program view
- `/addplace`: Place registration (sellers only)
- `/review`: Review management (sellers only)
- `/profile`: User profile
- `/contact`: Contact page

### Styling Approach

The application uses a combination of styling approaches:

1. **Styled Components**: For complex styled elements with dynamic properties
```jsx
const HeaderTitle = styled.h2`
  color: ${(props) => props.themeColors.text};
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;
```

2. **Material-UI**: For consistent UI components with theme support
```jsx
<Typography 
  variant="h5" 
  sx={{ 
    color: darkMode ? theme.colors.primary : theme.colors.text,
    fontWeight: 600 
  }}
>
  إنشاء حساب جديد
</Typography>
```

3. **Theme Support**: Context-based theming with light and dark modes
```jsx
const { darkMode, theme } = useTheme();
```

## Backend Architecture

### Server Structure

The backend follows an Express.js structure with:

1. **Main Application Entry**: `app.js`
   - Sets up Express server
   - Configures middleware
   - Connects to MongoDB
   - Defines API routes

2. **Routes**:
   - `user.js`: User management
   - `login.js`: Authentication
   - `places.js`: Places management
   - `readyprogram.js`: Pre-defined travel programs
   - `createprogram.js`: User-created travel programs
   - `home.js`: Homepage data
   - `avatar.js`: User profile images

3. **Models**:
   - `userModel.js`: User schema and methods
   - `placesModel.js`: Places schema
   - `createprogramModel.js`: User programs schema
   - `readyprogramModel.js`: Pre-defined programs schema
   - `homeModel.js`: Homepage data schema
   - `avatarModel.js`: Avatar data schema

4. **Middleware**:
   - `createprogramValidatorMW.js`: Validates travel program creation requests
   - `loginValidatorMW.js`: Validates login requests
   - `UserValidatorMW.js`: Validates user registration requests

5. **Utilities**:
   - `loginValidator.js`: Schema validation for login
   - `usersValidator.js`: Schema validation for user registration

### Middleware Chain

```
┌─────────────┐    ┌─────────────┐    ┌───────────────┐    ┌───────────┐
│ Express.json│───>│CORS Handling│───>│Route-specific │───>│ Controller│
│ Middleware  │    │ Middleware  │    │ Middleware    │    │ Functions │
└─────────────┘    └─────────────┘    └───────────────┘    └───────────┘
```

## Database Design

### Data Models

1. **User Model**:
```javascript
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, minlength: 3, maxlength: 20 },
  lastname: { type: String, required: true, minlength: 3, maxlength: 20 },
  city: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: { validator: function (value) {}, message: "email is not valid" }
  },
  password: { type: String, required: true, minlength: 8 },
  userType: { type: String, required: true, enum: ["user", "seller"] },
  profileImage: { type: String },
  refershToken: { type: String }
});
```

2. **Places Model**:
```javascript
const tripPlacesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  rate: { type: Number, required: true },
  image: { src: String },
  category: { type: String, required: true }
});
```

3. **Create Program Model**:
```javascript
const createProgramSchema = new mongoose.Schema({
  numberOfPersons: { type: Number, required: true },
  locate: { type: String, required: true },
  budget: { type: Number, required: true },
  typeOfProgram: { type: String, required: true },
  selectedTripPlaces: { type: Array, required: true },
  images: { type: Array, required: true },
  register_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
```

4. **Ready Program Model**:
```javascript
const readyProgramSchema = new mongoose.Schema({
  type_trip: { type: String, required: true },
  person_num: { type: Number, required: true },
  budget: { type: Number, required: true },
  location: { type: String, required: true },
  images: {
    src1: String,
    src2: String,
    src3: String,
    src4: String
  }
});
```

### Database Relationships

```
User (1) ──────┐
               │
               ▼
       CreateProgram (N)

Seller (1) ────┐
               │
               ▼
        Places (N)
```

- One user can create multiple programs
- One seller can register multiple places
- Programs can include multiple places

## Authentication and Authorization

### Authentication Flow

1. **Registration**:
   - User submits registration form with personal details and user type (user or seller)
   - Backend validates the input data
   - Password is hashed with bcrypt
   - User is saved to the database
   - JWT token is generated and returned to the client
   - A refresh token is also generated and stored

2. **Login**:
   - User submits email and password
   - Backend validates credentials
   - If valid, JWT access token and refresh token are issued
   - Access token is sent in response
   - Refresh token is set as an HTTP-only cookie

3. **Token Refresh**:
   - When access token expires, client requests a new token using the refresh token
   - Server validates the refresh token and issues a new access token
   - The user remains authenticated without re-login

### Authorization

Authorization is implemented using JWT middleware that verifies tokens and extracts user information:

```javascript
const authHeader = req.headers["authorization"];
const token = authHeader && authHeader.split(" ")[1];

if (!token) {
  return res.status(403).json({ error: "Access denied" });
}

try {
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  req.user = verified;
  next();
} catch (err) {
  res.status(400).json({ error: "Invalid token" });
}
```

## Feature Modules

### User Registration and Profile Management

1. **Multi-step Registration Process**:
   - Basic information collection (name, location)
   - Account setup (email, password)
   - User type selection (regular user or seller)
   - Profile image upload (optional)

2. **Profile Management**:
   - View and edit personal details
   - Change profile picture
   - View saved trips (for regular users)
   - View registered places (for sellers)

### Trip Planning (Regular Users)

1. **Trip Creation Flow**:
   - Specify number of people, destination, budget
   - Select trip type (family, adventure, cultural, etc.)
   - Browse and select places to visit
   - Review and finalize trip itinerary

2. **Trip Management**:
   - Save trips to profile
   - Print trip details
   - Share trips with others
   - Edit or delete saved trips

### Place Registration (Sellers)

1. **Place Registration Flow**:
   - Basic information (name, category, description)
   - Location and contact details
   - Operating hours and features
   - Image uploads
   - Pricing information
   - Final review and submission

2. **Place Management**:
   - Review and edit registered places
   - Monitor place performance
   - Respond to user reviews
   - Add promotions or special offers

### Review and Rating System

1. **User Reviews**:
   - Rate and review visited places
   - Upload photos with reviews
   - Like or interact with other reviews

2. **Seller Response**:
   - View reviews for their places
   - Respond to customer feedback
   - Analytics on review sentiment and trends

## UI/UX Design

### Theme System

The application implements a comprehensive theming system with light and dark modes:

```javascript
// Theme Context
export const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
  theme: {
    colors: {
      primary: "#3b5898",
      secondary: "#4b72ad",
      accent: "#fec20f",
      // Additional color definitions
    }
  }
});
```

### Animation System

The application uses Framer Motion for animations:

```jsx
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.5,
    }
  }
};

// Implementation
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {children}
</motion.div>
```

### Responsive Design

The application implements responsive design with Material-UI breakpoints:

```jsx
const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

// Conditional rendering based on screen size
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      lg: "repeat(4, 1fr)"
    },
    gap: 4
  }}
>
  {content}
</Box>
```

## State Management

### Local State

Component-level state management using React's `useState` hook:

```jsx
const [formData, setFormData] = useState({
  name: "",
  description: "",
  category: "",
  // Additional fields
});
```

### Context API

Global state management with React Context:

```jsx
// Theme context provider
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", !darkMode ? "dark" : "light");
  };
  
  // Define the theme object based on dark mode state
  const theme = {
    colors: darkMode ? darkTheme : lightTheme
  };
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Persisted State

State persistence using `localStorage`:

```javascript
// Save user data to localStorage
localStorage.setItem(
  "user",
  JSON.stringify({
    ...response.data.user,
    userType: userType.isSeller ? "seller" : "user",
  })
);

// Retrieve data from localStorage
const userData = localStorage.getItem("user");
if (userData) {
  try {
    const parsedUser = JSON.parse(userData);
    setUserType(parsedUser.userType || "user");
  } catch (error) {
    console.error("Error parsing user data:", error);
    setUserType("user");
  }
}
```

## Third-Party Integrations

### Material-UI

The application extensively uses Material-UI components:

```jsx
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="اسم المكان"
      name="name"
      value={formData.name}
      onChange={handleChange}
      error={!!errors.name}
      helperText={errors.name}
      required
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <FormControl fullWidth error={!!errors.category} required>
      <InputLabel>الفئة</InputLabel>
      <Select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        {placeCategories.map((category) => (
          <MenuItem key={category.id} value={category.value}>
            {category.label}
          </MenuItem>
        ))}
      </Select>
      {errors.category && (
        <FormHelperText>{errors.category}</FormHelperText>
      )}
    </FormControl>
  </Grid>
</Grid>
```

### Styled Components

Used for advanced styling with dynamic properties:

```jsx
const ProgramHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  background: ${(props) =>
    props.darkMode
      ? `linear-gradient(135deg, ${props.theme.colors.surface}, ${props.theme.colors.primary})`
      : `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.primary})`};
  padding: 30px;
  border-radius: 20px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0 10px 30px rgba(0, 0, 0, 0.3)"
      : "0 10px 30px rgba(59, 88, 152, 0.2)"};
  transition: background 0.3s ease, box-shadow 0.3s ease;

  h1 {
    font-size: 2.4rem;
    margin: 0;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    padding: 24px;
    margin-bottom: 30px;
    border-radius: 16px;

    h1 {
      font-size: 1.8rem;
    }
  }
`;
```

### Framer Motion

Used for animations throughout the application:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
>
  <Typography
    variant="body1"
    sx={{
      fontSize: { xs: "1.1rem", md: "1.25rem" },
      color: theme.colors.textSecondary,
      textAlign: "center",
      maxWidth: 800,
      mx: "auto",
      mb: 8
    }}
  >
    {contentText}
  </Typography>
</motion.div>
```

## API Endpoints

### User Management

- `POST /api/user`: Register a new user
- `GET /api/user/:id`: Get user by ID
- `PUT /api/user/:id`: Update user information

### Authentication

- `POST /api/login`: User login
- `GET /api/refereshtoken`: Refresh JWT token

### Trip Management

- `POST /api/createprogram`: Create a new trip program
- `GET /api/createprogram`: Get all trip programs for the authenticated user
- `GET /api/createprogram/:id`: Get a specific trip program
- `DELETE /api/createprogram/:id`: Delete a trip program

### Places Management

- `GET /api/places`: Get all places
- `GET /api/readyprogram`: Get all ready-made trip programs
- `GET /api/home`: Get homepage data
- `POST /api/home`: Create homepage data

## Future Enhancements

Potential improvements for the Fasaha application:

1. **Real-time notifications**: Implement WebSockets for instant notifications about new reviews, bookings, etc.

2. **Advanced analytics for sellers**: Enhance the dashboard with more detailed analytics about visitor demographics, peak times, etc.

3. **Social features**: Allow users to follow each other, share trips, and comment on shared trips.

4. **Mobile application**: Develop mobile versions of the platform for both Android and iOS.

5. **AI-powered recommendations**: Implement AI algorithms to suggest places based on user preferences and past activities.

6. **Multi-language support**: Add support for additional languages beyond Arabic to reach a broader audience.

7. **Booking integration**: Allow direct booking of hotels, restaurants, and activities through the platform.

8. **Payment gateway**: Integrate payment solutions for premium seller accounts and possibly commission-based bookings.

The Fasaha application demonstrates a comprehensive architecture that effectively serves both regular users and sellers with a rich feature set, responsive design, and seamless user experience.
