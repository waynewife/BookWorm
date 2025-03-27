# BookWorm

A book reading and management application built with React (frontend) and Express (backend). This project allows users to browse books, manage their reading lists, and customize their reading experience with features like dark/light mode and font preferences.

## Project Structure

- **`backend/`**: Contains the Express server that provides API endpoints for the application.
  - `server.js`: The main backend file that sets up the Express server.
  - `package.json`: Backend dependencies and scripts.
- **`frontend/`**: Contains the React application for the user interface.
  - `src/`: Source code for the React app.
    - `components/`: Reusable UI components (e.g., `Button`, `Toggle`, `DropdownMenu`).
    - `pages/`: Page components (e.g., `Home.js`, `Browse.js`, `Library.js`, `Login.js`, `Profile.js`, `Read.js`).
    - `ThemeProvider.js`: Context for managing light/dark mode.
  - `public/`: Static assets like fonts and images.
  - `package.json`: Frontend dependencies and scripts.
- **`.gitignore`**: Excludes files like `node_modules`, `.env`, and build artifacts from being tracked by Git.

## Features

- **Browse Books**: Search and browse books using the Google Books API.
- **Reading List**: Add books to a personal reading list.
- **User Preferences**: Customize reading level and font (e.g., OpenDyslexic for accessibility).
- **Dark/Light Mode**: Toggle between dark and light themes.
- **Responsive Design**: Works on both desktop and mobile devices.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v14 or later): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/downloads)
- **A GitHub account**: To clone and contribute to the repository.

## Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/wayneWife/BookWorm.git
   cd BookWorm
