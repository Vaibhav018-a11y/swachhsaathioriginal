# Swachh Saathi - Waste Management App

A modern React TypeScript application for waste management and disposal guidance, built with Vite and Firebase.

## Features

- 🧠 AI-powered waste disposal tips using Gemini AI
- 🔐 User authentication with Firebase
- 📱 Responsive design for mobile and desktop
- 🗺️ Interactive route mapping for garbage collection
- ⏰ Real-time timing schedules
- 🏛️ Municipality and citizen portals
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd project
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Push your code to GitHub/GitLab
2. Go to [Netlify](https://netlify.com) and sign up/login
3. Click "New site from Git"
4. Connect your repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

2. Build your project
```bash
npm run build
```

3. Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

### Environment Variables

If you need to add environment variables for production:

1. Go to your Netlify site dashboard
2. Navigate to Site settings > Environment variables
3. Add any required environment variables

## Project Structure

```
src/
├── components/          # React components
│   ├── AITipsModal.tsx
│   ├── FeaturesSection.tsx
│   ├── FloatingAIButton.tsx
│   ├── HeroSection.tsx
│   ├── LoginPage.tsx
│   ├── Navigation.tsx
│   ├── RouteMap.tsx
│   ├── SignupPage.tsx
│   └── ...
├── firebase/           # Firebase configuration
│   ├── auth.ts
│   └── config.ts
├── utils/              # Utility functions
│   └── errorHandler.ts
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## Firebase Configuration

The app uses Firebase for authentication and data storage. Make sure your Firebase project is properly configured with:

- Authentication enabled
- Firestore database created
- Proper security rules set

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Notes

- The build includes a warning about large chunks (>500KB)
- Consider implementing code splitting for better performance
- Images are optimized for web delivery

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License. 