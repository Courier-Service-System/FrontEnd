# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Courier Service Application

A full-stack courier service application built with the PERN stack (PostgreSQL, Express, React, Node.js) using TypeScript. This application enables users to register, create shipments, and track their deliveries.

## Features

- User Registration and Authentication
- Shipment Creation and Tracking
- User Dashboard
- Admin Dashboard
- Real-time Shipment Status Updates

## Installation

1. Clone the repository:
git clone 
FrontEnd : https://github.com/Courier-Service-System/FrontEnd.git

2. Install frontend dependencies:
•	cd Client
•	npm install

## Running the Application

1. Start the frontend application:
	cd frontend
	npm run dev
	The application will open in your browser at http://localhost:5173/

## Testing
Unit Test and E2E Test

## Project Structure

**Client**
- node_modules  
- public  
- src  
  - assets  
  - Pages  
    - AdminDashboardPage.tsx  
    - AdminSignUpPage.tsx  
    - ForgotPasswordPage.tsx  
    - LoginPage.tsx  
    - ResetPasswordPage.tsx  
    - SignUpPage.tsx  
    - UserDashboardPage.tsx  
    - sharedStyles.tsx  
  - services  
    - authService.tsx  
    - axiosConfig.tsx  
    - orderStatusService.tsx  
  - App.tsx  
  - main.tsx  
- index.css  
- vite-env.d.ts  

**Other Files**
- .gitignore  
- eslint.config.js  
- index.html  
- package.json  
- package-lock.json  
- tsconfig.app.json  
- tsconfig.json  
- vite.config.ts  


## Available Scripts

2.  Frontend:
- npm run dev: Start development server

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

