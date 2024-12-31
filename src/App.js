import './App.css';
import MarketingPage from './pages/home/MarketingPage';
import SignUp from './pages/singup/SignUp';
import {Route,Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
