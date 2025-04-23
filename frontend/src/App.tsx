import React, { useEffect, useState } from 'react';
import './App.css';
import { User } from './types/User';
import UserList from './components/UserList';
import CreateUserForm from './components/CreateUserForm';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from backend
  const fetchUsers = async () => {
    const res = await fetch('http://localhost:4000/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>User Dashboard</h1>
      <CreateUserForm onUserCreated={fetchUsers} />
      <UserList users={users} onUserDeleted={fetchUsers} />
    </div>
  );
}

export default App;
