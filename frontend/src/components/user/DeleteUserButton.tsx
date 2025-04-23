// Import React so we can create a component
import React from 'react';

// Define the props that this component expects
interface Props {
  userId: string;          // The ID of the user to delete
  onDeleted: () => void;   // A callback function to trigger after deletion (e.g., refresh the list)
}

// Define a functional React component that receives props
const DeleteUserButton: React.FC<Props> = ({ userId, onDeleted }) => {

  // This function runs when the button is clicked
  const handleDelete = async () => {
    // Make a DELETE request to the backend to remove the user with the given ID
    await fetch(`http://localhost:4000/users/${userId}`, {
      method: 'DELETE',
    });

    // After the request succeeds, call the onDeleted callback
    // This will likely re-fetch the user list in the parent component
    onDeleted();
  };

  // Render a simple button that triggers handleDelete when clicked
  return <button onClick={handleDelete}>Delete</button>;
};

// Export this component so it can be used in other files
export default DeleteUserButton;
