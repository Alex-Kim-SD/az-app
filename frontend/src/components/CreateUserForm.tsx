import React, { useState } from 'react';

interface Props {
  onUserCreated: () => void;
}

const CreateUserForm: React.FC<Props> = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role }),
    });

    setName('');
    setEmail('');
    setRole('viewer');
    onUserCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New User</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">admin</option>
        <option value="editor">editor</option>
        <option value="viewer">viewer</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateUserForm;
