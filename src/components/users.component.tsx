import React, { FC } from "react";
import { User } from "../domain/models/user.model";

export interface UsersComponentProps {
  users: User[];
  selectedUser: User | null;
  onUserClick: Function;
}
const UsersComponent: FC<UsersComponentProps> = ({ users, selectedUser, onUserClick }) => {

  const isActive = (user: User) => {
    if(!selectedUser){
      return '';
    }
    return user.getHashCode()===selectedUser.getHashCode()?'active':''
  }
  return (
    <ul className="list-group">
        {users.map((user)=><li key={user.getHashCode()} onClick={()=>onUserClick(user)} className={"list-group-item "+ isActive(user)}>{user.name}</li>)}
    </ul>
  );
};

export default UsersComponent;
