import { Route, Routes } from 'react-router-dom';
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          {userctx.isLogin && <Route path='/completeprofile' element={<CompleteProfile />} />}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
