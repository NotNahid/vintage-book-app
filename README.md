<div align="center">
  <h1>
    Personal Portfolio & Digital Bookshelf
  </h1>
  <p>
    A personal portfolio website designed as a virtual bookshelf, built with React and a Node.js backend for the contact form.
  </p>
  
  <p>
    <a href="https://github.com/NotNahid/Nahid/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
    </a>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  </p>
</div>

---

This is a personal portfolio website designed as a virtual bookshelf. It showcases projects, writings, and other creative works in a unique and engaging way. The site is built with React and features a Node.js backend that integrates with Google Sheets to capture contact form submissions.

## ✨ Features

- **Interactive Bookshelf UI:** Projects are displayed as books on a shelf, with unique designs and hover effects.
- **Project Modal:** Clicking a book opens a modal with detailed information about the project.
- **Functional Contact Form:** A contact form that saves submissions directly to a Google Sheet.
- **Responsive Design:** The site is designed to work well on all screen sizes, from mobile to desktop.
- **Backend API:** A simple Node.js/Express backend to handle the Google Sheets integration.

---

## 🛠️ Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - React Router

- **Backend:**
  - Node.js
  - Express.js
  - Google Sheets API (`googleapis`)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Set up the Frontend:**
    - Navigate to the root directory.
    - Install the necessary npm packages:
      ```sh
      npm install
      ```

3.  **Set up the Backend:**
    - Navigate to the `api` directory:
      ```sh
      cd api
      ```
    - Install the necessary npm packages:
      ```sh
      npm install
      ```
    - **Google Sheets API Credentials:**
      - You will need to set up a Google Cloud Platform project and a service account to use the Google Sheets API. Follow the official Google Cloud documentation to create a service account and download its JSON credentials file.
      - Place the downloaded credentials file in the `api` directory and rename it to `credentials.json`.
      - **Important:** The `api/.gitignore` file is configured to ignore `credentials.json`, so your credentials will not be committed to Git.
    - **Share your Google Sheet:**
      - Create a new Google Sheet. The first row should have the headers: `Timestamp`, `FirstName`, `LastName`, `Email`, `Message`.
      - Share this sheet with the `client_email` found inside your `credentials.json` file, giving it "Editor" access.
    - **Update the Sheet ID:**
      - Open `api/index.js` and replace the placeholder `SPREADSHEET_ID` with your actual Google Sheet ID.

### Running the Application

To run the application, you need to have both the frontend and backend servers running concurrently.

1.  **Start the Backend Server:**
    - Open a terminal and navigate to the `api` directory.
    - Run the following command:
      ```sh
      node index.js
      ```
    - The backend server should now be running on `http://localhost:3001`.

2.  **Start the Frontend Server:**
    - Open a **new** terminal and navigate to the root directory of the project.
    - Run the following command:
      ```sh
      npm run dev
      ```
    - The frontend development server will start, typically on `http://localhost:5173` (or another port if 5173 is busy).

The application should now be running in your browser. The contact form will send data to your local backend, which will then update your Google Sheet.

---

## ☁️ Deployment

To deploy this project, you need to host the frontend and the backend separately.

- **Frontend (Vite/React):**
  - Build the static files by running `npm run build` in the root directory.
  - Deploy the contents of the generated `dist` folder to a static hosting service like [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [GitHub Pages](https://pages.github.com/).

- **Backend (Node.js/Express):**
  - Deploy the `api` directory to a Node.js hosting provider like [Heroku](https://www.heroku.com/), [Render](https://render.com/), or as a serverless function on Vercel/Netlify.
  - **Important:** When deploying the backend, you cannot use the `credentials.json` file directly. You must copy the contents of the file and set them as an environment variable (e.g., `GOOGLE_CREDENTIALS`) on your hosting platform. The backend code would then need to be updated to parse this environment variable instead of reading the file.
