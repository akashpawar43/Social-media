import { useState, useEffect } from 'react';
import Navbar from './components/Navabr';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ForgotPassword from './components/ForgetPassword';
import Post from './components/Post';
import AddPost from './components/AddPost';

function App() {
  // const [data, setData] = useState('');

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/data');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch data from the backend when the component mounts
  //   fetchData();
  // }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          {/* <Route exact path="/" component={Home} /> */}
          {/* <Route exact path={`/post/${id}`} element={<Post/>} /> */}
          <Route exact path='/' element={<Post/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/addpost" element={<AddPost />} />
        </Routes>


        {/* <Post /> */}
      </div>
    </Router>
  );
}
export default App
