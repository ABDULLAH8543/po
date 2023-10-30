import './App.css';
import Code from './components/code'
import Cart from './components/cart'
import Sign from './components/signup'
import Login from './components/login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Code />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Sign-up' element={<Sign />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
