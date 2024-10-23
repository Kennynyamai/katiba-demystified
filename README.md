# Katiba Demystified

Katiba Demystified is a web-based platform that simplifies the Kenyan Constitution by breaking down its complex legal language into digestible sections. The platform empowers everyday Kenyan citizens to explore and better understand their constitutional rights, promoting civic engagement and governance participation.

## Features
- **Simplified Constitutional Text**: Users can explore chapters and parts of the Kenyan Constitution, simplified for easier understanding.
- **Search Functionality**: Users can search for relevant sections of the Constitution based on their input.
- **Legal Term Highlighting**: Complex legal terms are highlighted with definitions to improve comprehension.
- **Text Simplification**: Users can simplify constitutional sections for easier interpretation.
- **User Authentication**: Users can sign up and log in to personalize their experience and track progress.
- **Crowdsourced Amendments** (Future): Users will be able to propose amendments they want to see in the Constitution.

## Tech Stack
- **Backend**:
  - Node.js
  - Express
  - PostgreSQL
  - OpenAI API (for text embedding and text simplification)
- **Frontend**:
  - React.js
  - Axios (for making API requests)
  - TailwindCSS (for styling)
- **Database**:
  - PostgreSQL

## Environment Variables

### Backend (`.env`)
- `DB_PORT`: PostgreSQL database port.
- `DB_HOST`: Host for the database (e.g., `localhost`).
- `DB_USER`: Database user.
- `DB_PASS`: Database password.
- `DB_NAME`: Database name (`katiba`).
- `OPEN_AI_KEY`: OpenAI API key (contact the project owners for access).
- `JWT_SECRET`: Secret key for generating JWT tokens for authentication.

```bash
DB_PORT=5432
DB_HOST=localhost
DB_USER=kennedy
DB_PASS=beasty
DB_NAME=katiba
OPEN_AI_KEY=contact_the_project_owner
JWT_SECRET=katiba_secret
```


### Frontend Environment Variables (`.env`)
- `REACT_APP_OPEN_AI_KEY`: OpenAI API key (contact the project owners for access).


## Setup Instructions
### Backend Setup
Clone the Repository:


```bash
git clone https://github.com/your-username/katiba-demystified.git`

cd katiba-demystified/backend
```

Install Dependencies:

```bash
npm install

```
### Setup PostgreSQL:

Ensure PostgreSQL is running on your machine.
Create a database named katiba using the credentials in the .env file.
Migrate the Database: Use the provided SQL schema to create the necessary tables for storing constitutional content.

Run the Backend Server:

```bash
npm start
```
## Frontend Setup

Navigate to the Frontend Directory:

```bash
cd ../frontend
```

Install Dependencies:

```bash
npm install
```

Run the Frontend Development Server:

```bash
npm start
``` 
The frontend will be running at `http://localhost:3000.`

## Running the Project
### Backend 
The backend will be available at `http://localhost:3001.`

### Frontend
 The frontend will be available at `http://localhost:3000.`

Ensure that both servers are running simultaneously to interact with the platform.


## Contributing
We welcome contributions from developers and legal experts to enhance the platform. To contribute:

-Fork the repository.

-Create a new branch with a descriptive name.

-Implement your changes.

-Submit a pull request for review.

## License
This project is licensed under the MIT License.
