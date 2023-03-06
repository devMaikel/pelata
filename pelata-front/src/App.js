import { Route, Routes } from 'react-router-dom';
import './App.css';
import GeneralProvider from './context/GeneralProvider';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <GeneralProvider>
        <Routes>
          <Route exact path="/" element={ <LoginPage/> } />
          <Route exact path='/home' element={ <HomePage/>} />
        </Routes>
      </GeneralProvider>
    </div>
  );
}

export default App;
