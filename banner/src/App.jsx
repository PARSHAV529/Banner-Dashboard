
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
 

  return (
   <>
         <ToastContainer />

  <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Banner/>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>

   </>
  );
}

export default App
