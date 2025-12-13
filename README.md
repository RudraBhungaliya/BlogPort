📝 BlogPort — A Full-Stack MERN Blogging Platform

BlogPort is a full-stack blogging platform built using the MERN stack, designed to support real users, real interactions, and scalable backend logic.

The platform allows authenticated users to create, publish, and engage with content through real-time likes and comments, providing a responsive and interactive reading experience.

✨ Features

🔐 Secure Authentication
JWT-based authentication with protected routes and securely hashed passwords.

✍️ Create & Manage Blogs
Authenticated users can create, edit, and publish blogs with persistent data storage.

❤️ Real-Time Likes
Likes update instantly across the application without requiring page reloads.

💬 Real-Time Comments
Users can comment on blogs with immediate database persistence and UI updates.

🌍 Global Feed
A public feed displays blogs from all users, fetched and sorted using RESTful APIs.

🧭 User Dashboard
A personalized dashboard allows users to manage their own blogs and activity.

🧠 Tech Stack

🎨 Frontend
React.js, React Hooks, Context API, Responsive UI

⚙️ Backend
Node.js, Express.js, RESTful APIs

🗄️ Database
MongoDB, Mongoose (schemas and validation)

🔒 Authentication & Security
JSON Web Tokens (JWT), environment variables

🛠️ Development Tools
Git and GitHub

🏗️ Architecture Overview

The application follows a clean separation of concerns.
🎯 The frontend handles UI rendering, state management, and API consumption.
🧠 The backend manages authentication, authorization, and core business logic.
💾 The database ensures persistent and structured data storage.

All interactions flow through RESTful endpoints, ensuring scalability, maintainability, and clear data flow.
