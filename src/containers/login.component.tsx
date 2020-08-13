import { FC, ChangeEvent } from "react";

import React from "react";

export interface ChatContainerProps {
    onLogin: Function;
}
const LoginComponent: FC<ChatContainerProps> = ({onLogin}) => {
  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const user = {
          name: formData.get('name'),
          username: formData.get('username'),
      }
      onLogin(user);
  };
  return (
    <div className="jumbotron text-left">
      <h1>Please Log in</h1>
      <div className="col-md-6 col-sm-12">
        <form id="setUserForm" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              required
              autoFocus
              pattern="[A-Za-z\d]{3,10}"
              title="Username, enter letters only!"
              className="form-control"
              id="txtUserName"
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              required
              title="Enter your name"
              className="form-control"
              id="txtName"
              name="name"
              placeholder="Enter your name"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
