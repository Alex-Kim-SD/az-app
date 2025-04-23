import React from 'react';
import { User } from '../types/User';
import DeleteUserButton from './DeleteUserButton';

interface Props {
  users: User[];
  onUserDeleted: () => void;
}

const UserList: React.FC<Props> = ({ users, onUserDeleted }) => {
  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.name}</strong> ({user.email}) - {user.role}
            <DeleteUserButton userId={user._id} onDeleted={onUserDeleted} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
