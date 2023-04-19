import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './Compnents/Layout/Layout'
import Signup from './Compnents/Pages/Signup/Signup';
import Home from './Compnents/Pages/Home/Home';
import CompleteProfile from './Compnents/Pages/CompleteProfile/CompleteProfile';
import { useSelector } from 'react-redux';

function App() {
  const isLogin = useSelector(state => state.user.isLogin)
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={isLogin ? <Navigate to="/Home" /> : <Navigate to="/signup" />} />
          {!isLogin && <Route path="/signup" element={<Signup />} />}
          {isLogin && <Route path="/Home" element={<Home />} />}
          {isLogin && <Route path='/completeprofile' element={<CompleteProfile />} />}
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
