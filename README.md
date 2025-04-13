# Fusha Platform (فسحة)

<p align="center">
  <img width="297" alt="logo" src="https://github.com/user-attachments/assets/ef6b9564-6dcc-45fd-9e53-0cdccfdbbeb4" />
  <br>
  <em>Making travel planning simple and enjoyable</em>
</p>

## 🌟 Overview

Fusha Platform (فسحة) is a comprehensive trip planning application designed to simplify the process of creating personalized travel experiences. Users can easily design their perfect outing by selecting locations, setting budgets, defining the number of travelers, and choosing from various activity types - all in a user-friendly Arabic interface.

<p align="center">
  <a href="https://fusha-platform.vercel.app">🔗 Live Demo</a> •
  <a href="#installation">⚙️ Installation</a> •
  <a href="#features">✨ Features</a> •
  <a href="#technical-architecture">🏗️ Architecture</a>
</p>

## ✨ Features

### For Travelers
- **Personalized Trip Creation**: Build your own trip with customizable parameters
- **Trip Type Selection**: Choose from various trip types (cultural, recreational, family, romantic, marine, touristic, adventure, religious)
- **Budget Management**: Plan trips according to your specific budget
- **Location-based Planning**: Explore options in different Egyptian destinations
- **Place Selection**: Add specific attractions and activities to your itinerary
- **Ready-made Programs**: Browse curated trip suggestions
- **Trip History**: View and manage your past and upcoming trips
- **Bookmarking**: Save favorite destinations and programs for later
- **Rating System**: Rate and review places you've visited

### For Sellers/Service Providers
- **Place Listing**: Add your services or attraction to the platform
- **Customer Engagement**: Connect with potential customers
- **Analytics Dashboard**: Track visitor interest and engagement

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router for server components
- **React 19**: UI library for building component-based interfaces
- **Material UI 6**: Modern React UI framework with customized theming
- **Styled Components**: CSS-in-JS styling with animations and responsive design
- **Framer Motion**: Animation library for smooth transitions
- **Axios**: HTTP client for API requests with interceptors for token handling
- **React Slick/Swiper**: Carousel components for image galleries
- **JWT Decode**: Client-side token validation

### Backend
- **Node.js**: JavaScript runtime for server-side code
- **Express**: Web application framework for Node.js with route handling
- **MongoDB**: NoSQL database for data storage with Atlas cloud hosting
- **Mongoose**: MongoDB object modeling with schema validation
- **JWT**: Authentication using JSON Web Tokens with refresh token rotation
- **bcrypt**: Password hashing library for secure credential storage
- **AJV**: JSON schema validation for request payloads
- **dotenv**: Environment variable management

## 🏗️ Technical Architecture

```
┌─────────────────┐       ┌─────────────────┐      ┌─────────────────┐
│                 │       │                 │      │                 │
│  Next.js Client │◄─────►│  Express Server │◄────►│  MongoDB Atlas  │
│  (React App)    │  API  │  (Node.js)      │  ODM │  (Database)     │
│                 │       │                 │      │                 │
└─────────────────┘       └─────────────────┘      └─────────────────┘
```

### Authentication Flow
```
1. User Login → 2. Server validates credentials → 3. JWT issued (access + refresh)
4. Client stores tokens → 5. Access token used for requests → 6. Token refresh when expired
```

## 📁 Project Structure

```
fusha-platform/
├── app/                    # Next.js application directory
│   ├── Components/         # React components (NavBar, Cards, etc.)
│   ├── styledComponent/    # Styled components organized by feature
│   │   ├── Home/           # Home page styles
│   │   ├── NavBar/         # Navigation styles
│   │   ├── Program/        # Trip program styles
│   │   └── ...             # Other component styles
│   ├── contact/            # Contact page
│   ├── create/             # Trip creation pages
│   ├── home/               # Home page
│   ├── login/              # Authentication pages
│   ├── profile/            # User profile pages
│   ├── program/            # Program selection pages
│   ├── register/           # User registration page
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout with providers
│   └── page.js             # Main entry point
├── public/                 # Static assets
│   ├── images/             # Image assets
│   └── icons/              # Icon assets
└── server/                 # Backend Node.js server
    ├── models/             # Mongoose data models
    │   ├── userModel.js    # User schema and model
    │   ├── placesModel.js  # Places schema and model
    │   └── ...             # Other data models
    ├── routes/             # API route handlers
    │   ├── user.js         # User registration endpoints
    │   ├── login.js        # Authentication endpoints
    │   └── ...             # Other route handlers
    ├── middlewares/        # Express middlewares
    │   ├── UserValidatorMW.js   # Request validation
    │   └── ...             # Other middlewares
    ├── util/               # Utility functions
    │   ├── usersValidator.js    # Schema validation
    │   └── ...             # Other utilities
    ├── helpers/            # Helper functions
    │   └── generate_Keys.js      # Security key generation
    ├── app.js              # Express application setup
    └── package.json        # Backend dependencies
```

## 🚀 Key Workflow

1. **User Registration**: Users create an account with personal details
2. **Trip Creation**:
   - Set number of people
   - Define budget
   - Select location
   - Choose trip type (cultural, adventure, etc.)
   - Select places and activities
3. **Program Customization**: Add specific attractions to the itinerary
4. **Review & Save**: Review the complete trip plan and save it
5. **Trip Management**: View past trips, upcoming trips, and share trips with others

## 📱 User Interface

The application features a responsive, mobile-friendly interface with:
- RTL (Right-to-Left) layout for Arabic language support
- Intuitive navigation system with hamburger menu on mobile
- Interactive elements with smooth animations and transitions
- Modern card-based design for trip and place selection
- Step-by-step trip creation process with progress indicators
- Skeleton loading states for improved perceived performance
- Toast notifications for user feedback

<p align="center">
  <img src="https://i.ibb.co/placeholder-image/fusha-mobile.png" alt="Mobile Interface" width="300"/>
</p>

## 🔒 Authentication System

- JWT-based authentication with refresh token mechanism
- HTTP-only cookies for secure token storage
- Protected routes requiring authentication
- User profile management with secure password updates
- Secure password handling with bcrypt and salt rounds
- Token expiration and automatic refresh
- Session timeout handling

## 🔌 API Endpoints

The platform's backend provides the following key API endpoints:

```
# Authentication
POST   /api/user             # User registration
POST   /api/login            # User authentication
GET    /api/refresh-token    # Refresh access token
POST   /api/logout           # User logout

# Programs
GET    /api/readyprogram     # List pre-made trip programs
POST   /api/createprogram    # Save custom trip programs
GET    /api/trips            # Get user's saved trips
DELETE /api/trips/:id        # Delete a saved trip

# Places
GET    /api/places           # Get available places and attractions
POST   /api/places           # Add a new place (for sellers)

# User
GET    /api/profile          # Get user profile
PUT    /api/profile          # Update user profile

# Content
GET    /api/home             # Get homepage categories
GET    /api/avatar           # Get user testimonials
```

## ⚡ Performance Optimizations

- **Server Components**: Utilizing Next.js App Router for improved initial load time
- **Image Optimization**: Next.js built-in image optimization for faster loading
- **Code Splitting**: Automatic code splitting for smaller bundles
- **Lazy Loading**: Components loaded only when needed
- **Memoization**: React.memo for preventing unnecessary re-renders
- **Skeleton Loading**: UI placeholders during data fetching
- **Tree Shaking**: Elimination of unused code in production builds

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB instance (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fusha-platform.git
   cd fusha-platform
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../iti-server
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the server directory with:
   ```
   # Database Connection
   MONGO_URI=your_mongodb_connection_string
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key
   JWT_REFERSH_SECRET=your_jwt_refresh_secret
   JWT_EXPIRY=1h
   JWT_REFRESH_EXPIRY=7d
   
   # Server Configuration
   PORT=4000
   NODE_ENV=development
   
   # Additional Settings
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start the development servers**
   
   Frontend:
   ```bash
   npm run dev
   ```
   
   Backend:
   ```bash
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 🌐 Deployment

### Frontend Deployment
The Next.js frontend is optimized for deployment on Vercel:
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with a single click

### Backend Deployment
The Express backend can be deployed to:
- **Railway**: Easy deployment with GitHub integration
- **Heroku**: Set up with Procfile and environment variables
- **Digital Ocean**: Using App Platform or Droplets
- **AWS**: Using Elastic Beanstalk or EC2

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd ../iti-server
npm test
```

## 💡 Key Features Implementation

### Trip Creation Flow
The trip creation process is implemented with a multi-step form using state management:
1. Initial details (people, budget, location)
2. Trip type selection with visual indicators
3. Activity/place selection with filtering
4. Review and save with summary view

### Dynamic Place Selection
Places are filtered based on location and trip type selection, using MongoDB aggregation pipelines to deliver relevant results to users.

### Responsive Design
The application uses CSS Grid, Flexbox and Media Queries to provide an optimal experience on:
- Mobile phones (portrait and landscape)
- Tablets
- Desktops and large screens

## 🔮 Roadmap

- [ ] **Mobile App**: Native mobile application using React Native
- [ ] **AI Trip Suggestions**: Machine learning for personalized recommendations
- [ ] **Social Features**: Share trips with friends and family
- [ ] **Payment Integration**: Book and pay for activities directly
- [ ] **Offline Support**: PWA capabilities for offline access
- [ ] **Multi-language Support**: Add English language option

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Updates

<p align="center">
 Version 2.0 comming soon with big features and improvements
</p>

## 🙏 Acknowledgements

- Material UI for the component library
- Next.js team for the React framework
- MongoDB Atlas for database services
- All contributors and testers of the Fusha Platform

## 📄 License

<p align="center">
  Made with ❤️ by the Fusha Platform Team
</p>
