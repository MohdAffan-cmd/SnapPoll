# SnapPoll - Anonymous Time-Limited Polls

A modern, full-stack web application for creating anonymous polls that automatically expire after a set time. Built with React, TypeScript, and Vite.

## 🚀 Features

- **Anonymous Polling**: Create polls without requiring user registration
- **Time-Limited**: Polls automatically expire after 1 hour, 12 hours, or 24 hours
- **Real-Time Results**: View poll results in real-time with visual progress bars
- **Hide Results**: Option to hide results until the poll expires
- **Shareable Links**: Each poll gets a unique shareable link
- **Comments System**: Add anonymous comments to polls
- **Light/Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Routing**: React Router DOM v7
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Storage**: LocalStorage for client-side persistence

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header with theme toggle
│   ├── Footer.tsx      # Footer component
│   ├── Hero.tsx        # Landing page hero section
│   ├── Features.tsx    # Feature cards section
│   ├── Home.tsx        # Home page component
│   ├── CreatePoll.tsx  # Poll creation form
│   └── PollView.tsx    # Poll viewing and voting page
├── types.ts            # TypeScript type definitions
├── constants.ts        # Application constants
├── utils.ts            # Utility functions
├── ThemeContext.tsx    # Theme context provider
├── App.tsx             # Main app component with routing
├── App.css             # Global styles
└── main.tsx            # Application entry point
```

## 🎯 Key Components

### 1. **Home Page** (`/`)
- Hero section with call-to-action
- Feature showcase
- Header and Footer

### 2. **Create Poll** (`/create`)
- Form to create new polls
- Dynamic option management (add/delete)
- Duration selection (1h, 12h, 24h)
- Toggle to hide results until expiry

### 3. **Poll View** (`/poll`)
- Voting interface with radio buttons
- Real-time results with progress bars
- Share functionality with copy-to-clipboard
- Comments section with anonymous commenting

## 🔧 Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 💡 Key Features Implementation

### Theme Management
- Context API for global theme state
- LocalStorage persistence
- CSS variables for theme switching
- Smooth transitions between themes

### Poll Management
- UUID-based poll IDs
- LocalStorage for client-side persistence
- Real-time countdown timer
- Automatic expiry handling

### State Management
- React Hooks for local state
- Context API for global theme
- LocalStorage for data persistence
- No external state management library needed

## 🎨 Design Highlights

- **Modern UI**: Clean, minimalist design with glassmorphism effects
- **Responsive**: Mobile-first approach with breakpoints
- **Accessible**: Semantic HTML and ARIA labels
- **Performance**: Optimized with React best practices

## 📝 Code Quality

- **TypeScript**: Full type safety throughout
- **Component-based**: Modular, reusable components
- **Separation of Concerns**: Types, constants, and utils in separate files
- **Clean Code**: Well-organized, readable, and maintainable

## 🚀 Deployment

The app can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🔮 Future Enhancements

- Backend integration for persistent storage
- User authentication (optional)
- Poll analytics and insights
- Email notifications
- Social media sharing
- Poll templates
- Export results as CSV/PDF

## 👨‍💻 Developer

Made with ❤️ by Affan

## 📄 License

© 2025 Affan. All rights reserved.
