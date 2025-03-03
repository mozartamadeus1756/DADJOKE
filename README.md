
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
git clone [repository-url]
cd dad_joke
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials and other configurations
```

4. Start the application
```bash
npm start
```

## Project Structure

```plaintext
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


