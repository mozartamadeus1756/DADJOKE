
# Dad Joke Application

A web application for discovering, saving, and managing your favorite dad jokes with user authentication.

## Overview

This application provides a platform for users to discover random dad jokes, save their favorites, and manage their personal collection. Built with modern web technologies, it offers a secure and user-friendly experience with a playful design theme.

## Features

### User Management
- Secure registration and login system with hashed credentials
- Password and username encryption using bcrypt
- Email-based authentication with verification
- Unique salted hashes for each user

### Joke System
- Save favorite jokes
- View saved jokes history
- Date tracking for saved jokes
- Interactive joke display with dynamic updates

### User Interface
- Playful design with yellow background theme
- Custom Jersey 15 font family for enhanced readability
- Responsive design with mobile-first approach
- Interactive button animations and hover effects
- Clean and intuitive navigation
- Consistent color scheme (yellow background, red text, white buttons)

### Security
- Secure password and username hashing for enhanced privacy
- Protected API endpoints with authentication middleware
- SQL injection prevention through parameterized queries
- Salted hash implementation for user credentials

## Tech Stack

### Frontend
- HTML5
- CSS3 with modern features (Flexbox, Media Queries)
- JavaScript (ES6+)
- Responsive design breakpoints (768px and 480px)

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
git clone https://github.com/mozartamadeus1756/DADJOKE.git
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

## UI Components

### Buttons
- Main joke button: Large size (40px font) with red text
- Favorite button: Medium size (30px font) with red text
- Navigation buttons: Standard size (20px font) with red text
- All buttons feature:
  - White background
  - Box shadow effects
  - Hover animations
  - Border radius for rounded corners

### Layout
- Centered content with flexbox
- Responsive containers
- Adaptive spacing for different screen sizes
- Fixed position navigation elements

### Typography
- Jersey 15 font family throughout the application
- Varied font sizes for hierarchy:
  - Main buttons: 40px
  - Secondary buttons: 30px
  - Navigation: 20px
  - Content text: Responsive sizing

### Responsive Design
- Desktop-first approach with mobile breakpoints
- Tablet breakpoint: 768px
  - Reduced font sizes
  - Adjusted padding and margins
  - Optimized button sizes
- Mobile breakpoint: 480px
  - Further size reductions
  - Simplified layout
  - Enhanced touch targets

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

3. **Display Issues**
   - Verify Jersey 15 font is properly loaded
   - Check CSS media queries for responsive design
   - Ensure proper CSS class implementation

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the ISC License.


