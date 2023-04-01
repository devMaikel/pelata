import { Route, Routes } from 'react-router-dom';
import './App.css';
import GeneralProvider from './context/GeneralProvider';
import GroupPage from './pages/GroupPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
      <GeneralProvider>
        <Routes>
          <Route exact path="/" element= { <LoginPage/> } />
          <Route exact path='/home' element= { <HomePage/> } />
          <Route exact path='/register' element= { <RegisterPage/> } />
          <Route path='/grupos/:id' element= { <GroupPage/> } />
        </Routes>
      </GeneralProvider>
    </div>
  );
}

export default App;
