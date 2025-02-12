
# Dad Joke Application

A fun and interactive web application that delivers laughter through random dad jokes! Built with Express.js, MariaDB, and vanilla JavaScript, this application offers a seamless experience for users to discover, save, and manage their favorite dad jokes. With features like user authentication, personal joke collections, and a responsive design, it's the perfect platform for joke enthusiasts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-%5E4.17.1-blue.svg)](https://expressjs.com/)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mozartamadeus1756/dad_joke.git

# Install dependencies
cd dad_joke
npm install

# Set up environment variables (see Configuration section)

# Start the server
node server.js
```

Visit `http://localhost:5502` to start enjoying dad jokes!

## ✨ Features

- **User Management**
  - Secure registration and login system
  - Personal user profiles
  - Session-based authentication

- **Joke System**
  - Integration with icanhazdadjoke API
  - Random joke generation
  - Personal joke collection management

- **User Interface**
  - Clean and responsive design
  - Intuitive navigation
  - Animated transitions
  - Mobile-friendly layout

- **Security**
  - Secure password hashing
  - Protected API endpoints
  - Data encryption
  - SQL injection prevention

## 🛠 Tech Stack

### Frontend
- HTML5 & CSS3 for structure and styling
- Vanilla JavaScript for dynamic interactions
- Responsive design principles
- Modern CSS animations

### Backend
- Node.js runtime environment
- Express.js web framework
- RESTful API architecture
- Session-based authentication

### Database
- MariaDB for data persistence
- Structured query optimization
- Referential integrity

### External Services
- icanhazdadjoke API for joke content
- Environment variable management
- Error logging and monitoring

## 🔧 Installation & Configuration

### Prerequisites
- Node.js (>= 14.0.0)
- MariaDB (>= 10.5)
- npm (>= 6.0.0)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/dad_joke.git
   cd dad_joke
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST='localhost'
   DB_USER='your_username'
   DB_PASSWORD='your_password'
   DB_NAME='dada_joke'
   DB_CONN_LIMIT=5
   PORT=5502
   SESSION_SECRET='your_session_secret'
   ```

4. **Database Setup**
```sql
CREATE DATABASE dada_joke;
USE dada_joke;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE jokes (
    joke_id INT AUTO_INCREMENT PRIMARY KEY,
    joke TEXT NOT NULL,
    date DATE NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
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

## 🚀 Development

### Running the Application

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:5502`

### Development Guidelines

1. **Code Style**
   - Follow ESLint configuration
   - Use meaningful variable names
   - Comment complex logic

2. **Git Workflow**
   - Create feature branches
   - Write descriptive commit messages
   - Submit PRs for review

3. **Testing**
   - Write unit tests for new features
   - Ensure all tests pass before committing
   - Test across different browsers

## Features in Detail

### 1. User Authentication
- Secure user registration with email validation
- Password hashing for security
- Session-based authentication
- Protected routes for authenticated users

### 2. Random Joke Generation
- Click the "GET DADAJOKE" button to fetch a random joke
- Jokes are fetched from the icanhazdadjoke API
- Clean presentation with animated transitions

### 3. Favorite System
- Save jokes to your personal collection
- View all saved jokes in the favorites page
- Delete jokes from your favorites
- Jokes are associated with user accounts

### 4. Responsive Design
- Mobile-friendly interface
- Clean, readable joke cards
- Playful yellow theme with Jersey font
- Smooth animations and transitions

## Security Features

- Secure password hashing
- Session-based authentication
- Database encryption for stored jokes
- Environment variable configuration
- SQL injection prevention
- Error handling for API and database operations

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/logout` - User logout

### Jokes
- `GET /api/joke` - Get a random joke
- `POST /api/favorites` - Save a joke to favorites
- `GET /api/favorites` - Get user's favorite jokes
- `DELETE /api/favorites/:id` - Remove a joke from favorites

## 🔄 Troubleshooting

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

## 🎯 Future Roadmap

### Planned Features
- ⭐ Joke rating system
- 🔍 Advanced search functionality
- 🌓 Dark mode theme
- 📱 Mobile application
- 🔄 Social sharing integration
- 📊 User statistics dashboard

### Technical Improvements
- 🚀 Performance optimization
- 🎨 Enhanced UI/UX with Canvas
- 🔐 OAuth integration
- 📦 Docker containerization
- 🤖 API rate limiting
- 📈 Analytics integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.



## ❓ Frequently Asked Questions (FAQ)

### Getting Started
**Q: How do I install and run the application?**
A: Clone the repository, run `npm install` to install dependencies, and use `npm start` to launch the application. Make sure you have Node.js installed.

**Q: What are the system requirements?**
A: You need Node.js (v12 or higher) and a modern web browser. The application works on Windows, macOS, and Linux.

### User Authentication
**Q: Do I need to create an account to use the application?**
A: Yes, you need to register an account to save favorite jokes and access personalized features.

**Q: How secure is my account information?**
A: We use secure password hashing, session-based authentication, and database encryption to protect your information.

### Joke Features
**Q: Where do the jokes come from?**
A: Jokes are sourced from the icanhazdadjoke API, ensuring a large and regularly updated collection.

**Q: Can I save my favorite jokes?**
A: Yes! Once logged in, you can save jokes to your favorites and access them anytime from the favorites page.

**Q: How many jokes can I save?**
A: There's no limit to the number of jokes you can save to your favorites.

### Technical Support
**Q: What should I do if I can't load any jokes?**
A: Check your internet connection, ensure you're logged in, and try refreshing the page. If issues persist, clear your browser cache.

**Q: How can I report a bug or suggest a feature?**
A: You can submit issues through our GitHub repository or contact the development team.

**Q: Is the application mobile-friendly?**
A: Yes, the application is responsive and works well on both desktop and mobile devices.


