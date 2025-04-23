import React from 'react';

interface Props {
  userId: string;
  onDeleted: () => void;
}

const DeleteUserButton: React.FC<Props> = ({ userId, onDeleted }) => {
  const handleDelete = async () => {
    await fetch(`http://localhost:4000/users/${userId}`, {
      method: 'DELETE',
    });
    onDeleted();
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteUserButton;
