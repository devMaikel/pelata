import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <LoginPage/> } />
        <Route exact path='/home' element={ <HomePage/>} />
      </Routes>
    </div>
  );
}

export default App;
