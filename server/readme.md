# Classroom Application (MERN Stack)

**A no-frills, fully functional classroom management system**—because education shouldn’t be rocket science.

## Tech Stack

- **MongoDB** – for the gritty, unstructured data: courses, assignments, grades.
- **Express.js** & **Node.js** – because backend without drama.
- **React.js** – front end that actually works (and looks decent).

## Features

- **Course Management** – Teachers can **create**, **update**, or **delete** courses.  
- **Assignment Handling** – Assign, submit, evaluate. Because grades don’t assign themselves.
- **User Roles** – Sign on as a **Teacher** or **Student**. Different powers, same app.

## Directory Layout

/
├── client/ # React front-end
│ ├── src/
│ └── public/
├── server/ # Express/Node.js backend
│ ├── models/
│ ├── routes/
│ └── controllers/
├── README.md # You are reading it. Stay focused.
└── .env.example # Environment variables template

bash
Copy code

## Getting Started

1. **Clone it**  
   ```bash
   git clone https://github.com/sushanthacharya2003/Classroom-Application-using-MERNSTACK.git
   cd Classroom-Application-using-MERNSTACK
Backend Setup

bash
Copy code
cd server
npm install
cp .env.example .env
# Then edit .env with your MongoDB URI and PORT settings
npm run dev
Frontend Setup

bash
Copy code
cd ../client
npm install
npm start
Open Browser
Head to http://localhost:3000 and do your thing.

Prerequisites
Node.js v14+ (we don’t need your 2048-bit-old version)

MongoDB running locally (or remote, up to you)

Basic understand of how .env works—Google it if you’re lost.

Environment Variables (.env)
ini
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=5000
Usage
Sign up / Log in as Teacher or Student.

Teacher flows: Create course, Create assignment, Grade submissions.

Student flows: View courses, Submit assignments, Check grades.

Future Work
 Auth & Security – implement JWT-based security; no one likes a hack.

 Role-Based Access Control – because we aren’t a democracy.

 File Uploads – for real-world assignment attachments.

 Notifications – "Your assignment got graded!" (laser friendly).

 UI Polish – style upgrades, because looks matter—even in education.

Contributing
Found a bug? Please fix.

Want a new feature? Open an issue before you code. Don’t be that person.

License
MIT — meaning: Use it, break it, share it, tweak it, and don’t sue me.

