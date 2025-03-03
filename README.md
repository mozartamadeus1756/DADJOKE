
# Dad Joke Application

A web application for discovering, saving, and managing your favorite dad jokes with user authentication.

## Overview

This application provides a platform for users to discover random dad jokes, save their favorites, and manage their personal collection. Built with modern web technologies, it offers a secure and user-friendly experience.

## Features

### User Management
- Secure registration and login system
- Password encryption with bcrypt
- Email-based authentication

### Joke System
- Save favorite jokes
- View saved jokes history
- Date tracking for saved jokes

### User Interface
- Clean and responsive design
- Intuitive navigation
- Mobile-friendly layout

### Security
- Secure password hashing
- Protected API endpoints
- SQL injection prevention through parameterized queries

## Tech Stack

### Backend
- Node.js runtime environment
- Express.js web framework
- RESTful API architecture
- MariaDB for data persistence

## Installation & Configuration

### Prerequisites
- Node.js (>= 14.0.0)
- MariaDB (>= 10.5)
- npm (>= 6.0.0)

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/mozartamadeus1756/Dada-Joke.git
cd dad_joke
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
DB_HOST='localhost'
DB_USER='your-user'
DB_PASSWORD='your-password'
DB_NAME='your-database-name'
DB_CONN_LIMIT=5

```

4. Start the application
```bash
npm start
```

## Project Structure

```
dad_joke/
├── public/
│   ├── css/
│   │   ├── favorites.css
│   │   ├── login.css
│   │   ├── register.css
│   │   └── style.css
│   ├── js/
│   │   ├── favorites.js
│   │   ├── login.js
│   │   ├── register.js
│   │   └── script.js
│   ├── favorites.html
│   ├── joke.html
│   ├── login.html
│   └── register.html
├── src/
│   └── server.js
├── package.json
└── .env
```

## API Documentation

### Authentication Endpoints

#### POST /register
- Register a new user
- Required fields: username, email, password
- Returns: Success message

#### POST /login
- Authenticate user
- Required fields: username, email, password
- Returns: Success/failure message

### Joke Management Endpoints

#### POST /favorite
- Save a joke to favorites
- Required fields: joke, date
- Returns: Success status

#### GET /see-favorites
- Retrieve user's favorite jokes
- Returns: Array of jokes with IDs and formatted dates

## Security Features

- Password hashing with bcrypt
- SQL injection prevention through parameterized queries
- Error handling for API and database operations

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify MariaDB is running
   - Check credentials in .env file
   - Ensure database and tables exist

2. **Authentication Issues**
   - Verify all required fields are provided
   - Check email and password combination
   - Ensure proper error handling

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the ISC License.



## Accessibility & Compliance

### Web Accessibility (WCAG 2.1)
- Screen reader compatibility with ARIA labels
- High contrast color schemes
- Keyboard navigation support
- Resizable text without loss of functionality
- Alternative text for all images
- Clear heading hierarchy

### Privacy & Data Protection
- GDPR compliant user data handling
- Clear privacy policy
- User data export functionality
- Right to be forgotten implementation
- Secure data storage with encryption
- Transparent data usage policies

### Assistive Technology Support
- Compatible with major screen readers (NVDA, JAWS, VoiceOver)
- Support for browser zoom up to 200%
- Focus indicators for keyboard navigation
- No time-limited functions
- Error identification and suggestions

### Universal Design Principles
- Simple and intuitive interface
- Perceptible information
- Tolerance for error
- Low physical effort
- Size and space for approach and use


