# Courier Service Application Frontend

A React-based frontend for the courier service application, built with Vite and TypeScript. This application provides a user-friendly interface for managing shipments, user authentication, and tracking deliveries.

## Features

- User Registration and Authentication
- Shipment Creation and Tracking
- User Dashboard
- Admin Dashboard
- Real-time Shipment Status Updates

## Tech Stack

- React 18
- TypeScript
- Vite
- ESLint
- SWC (for Fast Refresh)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (latest LTS version)
- npm (latest version)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Courier-Service-System/FrontEnd.git
```

2. Install dependencies:
```bash
cd Client
npm install
```

## Development

To start the development server:
```bash
npm run dev
```
The application will open in your browser at http://localhost:5173/

## Project Structure

```
Client/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── Pages/
│   │   ├── AdminDashboardPage.tsx
│   │   ├── AdminSignUpPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ResetPasswordPage.tsx
│   │   ├── SignUpPage.tsx
│   │   ├── UserDashboardPage.tsx
│   │   └── sharedStyles.tsx
│   ├── services/
│   │   ├── authService.tsx
│   │   ├── axiosConfig.tsx
│   │   └── orderStatusService.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.css
├── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev` - Start development server


## Testing

The application includes both Unit Tests and E2E Tests. To run the tests:

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

## Vite Configuration

This project uses Vite as the build tool and development server. Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Uses Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Uses SWC for Fast Refresh

## Pages

- **Admin Dashboard** - Management interface for administrators
- **Admin Sign Up** - Registration page for admin users
- **Forgot Password** - Password recovery workflow
- **Login** - User authentication
- **Reset Password** - Password reset workflow
- **Sign Up** - New user registration
- **User Dashboard** - Main interface for regular users

## Services

- **authService** - Handles authentication-related API calls
- **axiosConfig** - Axios instance configuration and interceptors
- **orderStatusService** - Manages shipment status updates

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Related Projects

- [Backend Repository](https://github.com/Courier-Service-System/BackEnd)
