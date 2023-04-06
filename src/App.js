import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './Compnents/Layout/Layout'
import Signup from './Compnents/Pages/Signup/Signup';
import Home from './Compnents/Pages/Home/Home';
import CompleteProfile from './Compnents/Pages/CompleteProfile/CompleteProfile';
import { useContext } from 'react';
import UserContext from './Context/user-context';

function App() {

  const userctx = useContext(UserContext)
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={userctx.isLogin ? <Navigate to="/Home" /> : <Navigate to="/signup" />} />
          {!userctx.isLogin && <Route path="/signup" element={<Signup />} />}
          {userctx.isLogin && <Route path="/Home" element={<Home />} />}
          {userctx.isLogin && <Route path='/completeprofile' element={<CompleteProfile />} />}
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
