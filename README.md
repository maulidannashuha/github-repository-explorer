
# GitHub Repositories Explorer

A beautiful React application that allows you to search GitHub users and view their repositories. Built with React, TypeScript, and Tailwind CSS.

## Features
- 🔍 Search GitHub users in real-time
- 👤 View user profiles with avatars
- 📚 Explore user repositories
- ⭐ See repository star counts

## Live Demo
🚀 Try out the application: [GitHub Repositories Explorer](https://maulidannashuha.github.io/github-repository-explorer/)

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Vitest for testing
- Axios for API calls
- Lucide React for icons

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/maulidannashuha/.git
cd github-user-search
```
2. Install dependencies:
```bash
npm install
```

## Running the Application
To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

## Running Tests
To run the test suite:
```bash
npm test
```

To run tests with coverage:
```bash
npm run coverage
```

## Building for Production
To create a production build:
```bash
npm run build
```
The built files will be in the `dist` directory.

To preview the production build:
```bash
npm run preview
```

## Project Structure
```
src/
├── components/ # Reusable UI components
├── services/ # API services
├── tests/ # Test files
├── types/ # TypeScript type definitions
├── App.tsx # Main application component
└── main.tsx # Application entry point
```

## Acknowledgments
- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide React](https://lucide.dev/) for the beautiful icons