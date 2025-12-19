# 🚀 ClubSphere - Club Management Platform

A modern, full-stack web application for managing clubs, events, and memberships with a vibrant coral-turquoise-yellow color scheme designed to stand out.

## 🌐 Live URL

**Frontend:** [https://club-sphere-psi.vercel.app](https://club-sphere-psi.vercel.app)

---

## 📌 Project Purpose

ClubSphere is designed to streamline club and event management for universities, communities, and organizations. It provides:

- **For Members:** Easy discovery and joining of clubs, event registration, and activity tracking
- **For Club Managers:** Tools to create clubs, manage events, and track membership
- **For Administrators:** Complete platform oversight with user role management, club approvals, and payment tracking

---

## ✨ Key Features

### 🎯 Core Functionality

1. **User Authentication & Authorization**

   - Email/Password registration with validation
   - Google Sign-In integration
   - Role-based access control (Admin, Club Manager, Member)
   - Firebase Authentication with MongoDB sync

2. **Club Management**

   - Browse clubs by category with search and filters
   - Detailed club pages with member counts and fees
   - Admin approval system for new clubs
   - Club manager dashboard with statistics

3. **Event Management**

   - Create and manage events with date, location, and fee details
   - Event registration with capacity limits
   - Upcoming events showcase on homepage
   - Event details with spots remaining indicator

4. **Dashboard System**

   - **Admin Dashboard:** Platform-wide statistics, user management, club approvals, payment tracking
   - **Manager Dashboard:** Club performance metrics, member analytics, event management
   - **Member Dashboard:** Personal activity summary, clubs joined, events registered

5. **Payment Tracking**
   - Membership fee collection
   - Event registration payments
   - Complete payment history
   - Revenue analytics by type

### 🎨 Design Highlights

- **Vibrant Color Palette:** Coral Red (#ff6b6b), Turquoise (#4ecdc4), Sunshine Yellow (#ffe66d)
- **Smooth Animations:** Framer Motion animations throughout
- **Modern UI:** DaisyUI components with custom styling
- **Responsive Design:** Mobile-first approach with adaptive layouts
- **Glassmorphism Effects:** Modern translucent cards and overlays
- **Custom Scrollbar:** Gradient-styled scrollbar for enhanced UX

---

## 🛠️ Technologies Used

### Frontend Core

- **React 19.0.0** - UI library
- **React Router v7** - Client-side routing
- **Vite 6.0.5** - Build tool and dev server

### State Management & Data Fetching

- **TanStack Query (React Query) 5.62.7** - Server state management
- **Axios 1.7.9** - HTTP client

### Form Handling & Validation

- **React Hook Form 7.54.2** - Form state management
- **Email validation** with regex patterns
- **Password strength validation**

### Authentication

- **Firebase 11.1.0** - Authentication provider
- **Firebase Admin SDK** (Backend) - Token verification

### UI & Styling

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **DaisyUI 4.12.14** - Tailwind CSS component library
- **Framer Motion 11.15.0** - Animation library
- **React Icons 5.4.0** - Icon library

### Additional Packages

- **React Hot Toast 2.4.1** - Notification system
- **LocalForage 1.10.0** - Client-side storage
- **Match Sorter 8.0.0** - Filtering and sorting
- **Sort By 1.2.0** - Array sorting utilities

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Firebase project

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_project.firebaseapp.com
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_project.appspot.com
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=your_app_id

# Backend API
VITE_API_URL=http://localhost:5000/api
```

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/devTechware/club-sphere.git
cd club-sphere

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🗂️ Project Structure

```
club-sphere/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PrivateRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Clubs.jsx
│   │   ├── ClubDetails.jsx
│   │   ├── Events.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ErrorPage.jsx
│   │   └── dashboard/       # Dashboard pages
│   │       ├── AdminDashboard.jsx
│   │       ├── ManagerDashboard.jsx
│   │       ├── MemberDashboard.jsx
│   │       ├── ManageUsers.jsx
│   │       ├── ManageClubs.jsx
│   │       └── ManagePayments.jsx
│   ├── layouts/             # Layout components
│   │   ├── MainLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── providers/           # Context providers
│   │   ├── AuthProvider.jsx
│   │   └── QueryProvider.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useClubs.js
│   │   ├── useEvents.js
│   │   └── useDashboard.js
│   ├── routes/              # Route configuration
│   │   └── Routes.jsx
│   ├── utils/               # Utility functions
│   │   └── api.js
│   ├── firebase/            # Firebase configuration
│   │   └── firebase.config.js
│   ├── index.css           # Global styles and theme
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── .env.local             # Environment variables (not in git)
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🎨 Design Philosophy

### Color Palette

- **Primary (Coral Red):** `#ff6b6b` - Energy and excitement
- **Secondary (Turquoise):** `#4ecdc4` - Freshness and trust
- **Accent (Sunshine Yellow):** `#ffe66d` - Warmth and optimism
- **Success:** `#26de81` - Positive actions
- **Base Colors:** White, Warm White, Cream for backgrounds

### Design Principles

1. **Visual Hierarchy:** Bold typography and strategic use of color
2. **Consistent Spacing:** 4/8/12/16/24px spacing system
3. **Smooth Animations:** Subtle motion for better UX
4. **Accessibility:** High contrast ratios and keyboard navigation
5. **Mobile-First:** Responsive design for all screen sizes

---

## 🔐 Security Features

- ✅ Firebase Authentication with token-based authorization
- ✅ Environment variables for sensitive data
- ✅ Backend token verification on all protected routes
- ✅ Role-based access control
- ✅ XSS protection through React's built-in escaping
- ✅ CORS configuration for API security

---

## 🚀 Deployment

### Frontend (Firebase Hosting)

```bash
npm run build
firebase login
firebase init
firebase deploy
```

## 📊 Performance Optimizations

- **Code Splitting:** React lazy loading for routes
- **Image Optimization:** Compressed images and lazy loading
- **Caching:** TanStack Query with 5-minute stale time
- **Minification:** Production builds optimized with Vite
- **Tree Shaking:** Unused code eliminated in production

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@devTechware](https://github.com/devTechware)
- Portfolio: [rabin-khandakar.vercel.app](https://rabin-khandakar.vercel.app)

---

## 🙏 Acknowledgments

- Firebase for authentication services
- MongoDB for database hosting
- Unsplash for placeholder images
- DaisyUI for component library
- React community for amazing tools and libraries

---

## 📧 Contact

For questions or support, please email: rabinbd22@gmail.com

---

**⭐ If you found this project helpful, please give it a star!**
