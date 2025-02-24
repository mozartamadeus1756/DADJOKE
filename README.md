
# Dad Joke Application

A web application for discovering, saving, and managing your favorite dad jokes with user authentication.

## Overview

This application provides a platform for users to discover random dad jokes, save their favorites, and manage their personal collection. Built with modern web technologies, it offers a secure and user-friendly experience.

## Features

### User Management
- Secure registration and login system
- Personal user profiles
- Session-based authentication

### Joke System
- Integration with icanhazdadjoke API
- Random joke generation
- Personal joke collection management

### User Interface
- Clean and responsive design
- Intuitive navigation
- Animated transitions
- Mobile-friendly layout

### Security
- Secure password hashing
- Protected API endpoints
- Data encryption
- SQL injection prevention

## Tech Stack

### Backend
- Node.js runtime environment
- Express.js web framework
- RESTful API architecture
- Session-based authentication

### Database
- MariaDB for data persistence
- Structured query optimization
- Referential integrity

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

4. Initialize the database
```bash
# Run the database initialization script
mysql -u [username] -p [database_name] < config/init.sql
```

5. Start the application
```bash
npm start
```

## Project Structure

```plaintext
dad_joke/
├── index.html          # Main landing page
├── register.html       # User registration page
├── login.html         # User login page
├── favorites.html     # Favorites display page
├── script.js          # Main JavaScript
├── register.js        # Registration page logic
├── login.js          # Login page logic
├── favorites.js       # Favorites page JavaScript
├── style.css         # Main styles
├── register.css      # Registration page styles
├── login.css        # Login page styles
├── favorites.css    # Favorites page styles
├── server.js        # Express server
├── config/          # Configuration files
│   ├── database.js  # Database connection
│   └── init.sql     # Database initialization
└── .env            # Environment variables
```

## API Documentation

### Authentication Endpoints

#### POST /register
- Register a new user
- Required fields: email, password

#### POST /login
- Authenticate user
- Required fields: email, password

### Joke Management Endpoints

#### POST /favorite
- Save a joke to favorites
- Required fields: joke, date

#### GET /see-favorites
- Retrieve user's favorite jokes
- Returns: Array of jokes with IDs and dates

## Security Features

- Secure password hashing
- Session-based authentication
- Database encryption for stored jokes
- Environment variable configuration
- SQL injection prevention
- Error handling for API and database operations

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify MariaDB is running
   - Check credentials in .env file
   - Ensure database and tables exist

2. **API Rate Limiting**
   - Implement proper error handling
   - Add request caching
   - Use appropriate delay between requests

3. **Authentication Issues**
   - Clear browser cookies
   - Check session configuration
   - Verify user credentials

## Future Roadmap

### Planned Features
- Joke rating system
- Advanced search functionality
- Dark mode theme
- Mobile application
- Social sharing integration
- User statistics dashboard

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the ISC License.


