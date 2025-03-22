---

# SkillBuddy

SkillBuddy is a web application designed to connect individuals seeking to learn new skills with experts willing to share their knowledge. Whether you're looking to pick up a new hobby or advance your professional capabilities, SkillBuddy facilitates personalized learning experiences by matching learners with skilled mentors.

## Features

- **User Authentication**: Secure sign-up and login functionalities for both learners and mentors.
- **Profile Management**: Personalized profiles where users can showcase their skills, experiences, and learning interests.

## Technologies Used

- **Frontend**: Developed using React and modern libraries for a responsive and intuitive user interface.
- **Backend**: Built with Express.js and robust server-side technologies to ensure scalability and security.
- **Database**: Utilizes MongoDB as a reliable database system to manage user data and application content efficiently.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Oprea-Sava/SkillBuddy.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd SkillBuddy
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Application**:
   ```bash
   npm start
   ```


## Usage

Once the application is running, users can register as either a learner or a mentor. After setting up a profile, learners can search for mentors based on the skills they wish to acquire, and mentors can list the skills they offer. The platform facilitates scheduling and communication to ensure a smooth learning experience.
API Calls

### API Calls

All API calls point to `localhost` since the backend is self-hosted. Ensure that the backend server is running before using the application.

### Environment Variables

A `.env` file must be created in the root directory with the following content:

```
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.



