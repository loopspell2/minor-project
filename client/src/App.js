
import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import React,{ useState } from 'react';
// components
import Login from './components/accounts/Login';
import DataProvider from './context/DataProvider';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact'


const PrivateRoute = ({ isAuthenticated, ...probs }) => {
  return isAuthenticated ?
    <>
      <Header/>
      <Outlet/>
    </>
    :<><Navigate replace to='/login'></Navigate></>
}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }} >
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/details/:id' element={<DetailView/>} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/update/:id' element={<Update/>} />
            </Route>

            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/about' element={<About/>} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/contact' element={<Contact/>} />
            </Route>
            
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
