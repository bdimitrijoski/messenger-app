import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ChatContainer from './containers/chat-container.component';
import LoginComponent from './containers/login.component';
import { AuthService } from './domain/services/auth.service';
import { UserDTO } from './domain/models/types';
import { RootState } from './store';
import { setCurrentUser } from './store/actions';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);
 
  const authenticate = (user: UserDTO) => {

    AuthService.getInstance().authenticate(user).then((res)=> {
      const user = AuthService.getInstance().getCurrentUser();
      if(user)
      dispatch(setCurrentUser(user));
    })
  }
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container"><span className="navbar-brand mb-0 h1">Messenger App</span></div>
      </nav>
      <br/>

      <div className="container">
      { isLoggedIn ? <ChatContainer /> : <LoginComponent onLogin={authenticate} />}
      </div>

     
    </div>
  );
}

export default App;
