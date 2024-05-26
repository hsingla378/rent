# Rentify

Rentify is a web application that simplifies the process of renting and leasing properties. It allows property owners to list their properties and prospective tenants to search for and apply to rent them. Rentify provides a user-friendly interface for both property owners and tenants to interact and manage property listings and applications.

## Demo

- Frontend Live Link: [Rentify Frontend](https://rentify-himanshu.vercel.app/)
- Backend Link: [Rentify Backend](https://rentify-ls9s.onrender.com)

## Features

- **User Authentication**: Users can register and log in securely to access the platform.
- **Property Listings**: Property owners can list their properties with details such as location, size, amenities, etc.
- **Property Search and Filtering**: Tenants can search for properties based on location, size, amenities, etc.
- **Property Applications**: Tenants can apply for properties they are interested in, and property owners can manage applications.
- **Like Button**: Users can like properties, and the like count is updated in real-time.
- **Pagination**: Property listings are paginated for easier navigation.
- **Email Notifications**: Property owners receive email notifications when tenants express interest in their properties.
- **Authorization**: Access to sensitive information, such as seller details, is restricted to authenticated users only.

## Tech Stack

- **Frontend**: React, Redux, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **Deployment**: Vercel (Frontend), Render (Backend)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/hsingla378/rentify.git
   ```

2. Navigate to the project directory:

   ```bash
   cd rentify
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```plaintext
   # For Backend
   PORT:port_number
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=your_jwt_expire_time
   ```

   ```plaintext
   # For Frontend
   VITE_BACKEND_URL=backend_url
   ```

5. Run the backend server:

   ```bash
   cd backend
   npm start
   ```

6. Run the frontend development server:

   ```bash
   npm start
   ```

7. Access the application in your web browser:

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.