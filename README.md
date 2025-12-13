<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>BlogPort — Full-Stack MERN Blogging Platform</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 40px auto;
      padding: 0 20px;
      color: #222;
    }
    h1, h2, h3 {
      margin-top: 32px;
    }
    ul {
      margin-left: 20px;
    }
    li {
      margin-bottom: 6px;
    }
    .section {
      margin-top: 28px;
    }
  </style>
</head>

<body>

  <h1>📝 BlogPort — A Full-Stack MERN Blogging Platform</h1>

  <p>
    BlogPort is a full-stack blogging platform built using the MERN stack,
    designed to support real users, real interactions, and scalable backend logic.
  </p>

  <p>
    The platform enables authenticated users to create, publish, and engage
    with content through real-time likes and comments, delivering a responsive
    and interactive reading experience.
  </p>

  <div class="section">
    <h2>✨ Features</h2>

    <h3>🔐 Secure Authentication</h3>
    <p>
      JWT-based authentication with protected routes and securely hashed
      passwords.
    </p>

    <h3>✍️ Create &amp; Manage Blogs</h3>
    <p>
      Authenticated users can create, edit, and publish blogs with persistent
      data storage.
    </p>

    <h3>❤️ Real-Time Likes</h3>
    <p>
      Likes update instantly across the application, enabling interactive
      engagement without page reloads.
    </p>

    <h3>💬 Real-Time Comments</h3>
    <p>
      Users can comment on blogs with immediate database persistence and UI
      updates.
    </p>

    <h3>🌍 Global Feed</h3>
    <p>
      A public feed displaying blogs from all users, fetched and sorted using
      RESTful APIs.
    </p>

    <h3>🧭 User Dashboard</h3>
    <p>
      Personalized dashboard allowing users to manage their own blogs and
      activity.
    </p>
  </div>

  <div class="section">
    <h2>🧠 Tech Stack</h2>

    <h3>Frontend</h3>
    <ul>
      <li>React.js</li>
      <li>React Hooks</li>
      <li>Context API (State Management)</li>
      <li>Responsive UI</li>
    </ul>

    <h3>Backend</h3>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
      <li>RESTful APIs</li>
    </ul>

    <h3>Database</h3>
    <ul>
      <li>MongoDB</li>
      <li>Mongoose (Schemas &amp; Validation)</li>
    </ul>

    <h3>Authentication &amp; Security</h3>
    <ul>
      <li>JSON Web Tokens (JWT)</li>
      <li>Environment Variables</li>
    </ul>

    <h3>Development Tools</h3>
    <ul>
      <li>Git &amp; GitHub</li>
    </ul>
  </div>

  <div class="section">
    <h2>⚙️ Architecture Overview</h2>

    <p>
      The application follows a clean separation of concerns:
    </p>

    <ul>
      <li>
        <strong>Frontend</strong> handles UI rendering, state management, and
        API consumption.
      </li>
      <li>
        <strong>Backend</strong> manages authentication, authorization, and
        core business logic.
      </li>
      <li>
        <strong>Database</strong> ensures persistent and structured data
        storage.
      </li>
    </ul>

    <p>
      All interactions flow through RESTful endpoints, ensuring scalability,
      maintainability, and clarity of data flow.
    </p>
  </div>

</body>
</html>
