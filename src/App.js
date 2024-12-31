import './App.css';
import MarketingPage from './pages/home/MarketingPage';
import SignUp from './pages/singup/SignUp';
import SignIn from './pages/singin/SignIn';
import {Route,Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
