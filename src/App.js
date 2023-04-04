import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Compnents/Layout/Layout'
import Signup from './Compnents/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </Layout>
    </div>
  );
}

export default App;
