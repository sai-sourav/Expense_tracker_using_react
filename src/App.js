import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Compnents/Layout/Layout'
import Signup from './Compnents/Pages/Signup/Signup';
import Home from './Compnents/Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
