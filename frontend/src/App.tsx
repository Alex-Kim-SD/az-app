import React, { useEffect, useState } from 'react';
import './App.css';

// TypeScript interface for user data
import { User } from './types/User';

// Components
import UserList from './components/user/UserList';
import CreateUserForm from './components/user/CreateUserForm';
import ApiTester from './components/api/ApiTester';

function App() {
  // State to store list of users
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from backend API
  const fetchUsers = async () => {
    const res = await fetch('http://localhost:4000/users');
    const data = await res.json();
    setUsers(data);
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>User Dashboard</h1>
      <ApiTester /> {/* JSX funcitonal component for API tester */}
      {/* Form to create a new user */}
      <CreateUserForm onUserCreated={fetchUsers} />

      {/* Display list of users */}
      <UserList users={users} onUserDeleted={fetchUsers} />
    </div>
  );
}

export default App;
