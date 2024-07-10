import React, {useContext, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Sign from './pages/Sign/Sign';
import SignIn from './pages/Sign/SignIn';
import SignUp from './pages/Sign/SignUp';
import Main from './pages/Main/Main';
import Promotion from './pages/Promotion/Promotion';
import Logout from "./pages/Logout/Logout";
import AiSearch from "./pages/Search/AiSearch";
import AiSimpleSearch from "./pages/Search/AiSimpleSearch";
import FindId from './pages/Sign/FindId';
import FindPw from './pages/Sign/FindPw';
import Inven from './pages/Inven/Inven';
import Excel from './pages/Inven/Excel';
import Profile from "./pages/Profile/Profile";
import Demo from "./pages/Demo";
import Navigation from "./components/Nav/Navigation";
import MyPage from "./pages/MyPage/MyPage";
import AiDetailSearch from "./pages/Search/AiDetailSearch";
import HistoryList from './pages/History/HistoryList';
import HistoryDetail from './pages/History/HistoryDetail';
import LikeList from './pages/Like/LikeList';
import LikeDetail from './pages/Like/LikeDetail';
import ManagementLogin from './pages/Management/ManagementLogin';
import ManagementNav from "./pages/Management/ManagementNav";
import ManagementDashboard from "./pages/Management/ManagementDashboard";
import ManagementLayout from "./pages/Management/ManagementLayout";
// import index from '../src/styles/index.css'


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log("this is app");



  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path="/nav" element={<Navigation/>}/>
          <Route path="/Sign" element={<Sign />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Promotion" element={<Promotion />} />
          <Route path="/Logout" element={<Logout/>}/>
          <Route path="/AiSearch" element={<AiSearch/>} />
          <Route path="/AiSimpleSearch" element={<AiSimpleSearch/>} />
          <Route path="/AiDetailSearch" element={<AiDetailSearch/>}/>
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPw" element={<FindPw />} />
          <Route path="/Inven" element={<Inven />} />
          <Route path="/Excel" element={<Excel />} />
          <Route path="/ProFile" element={<Profile/>}/>
          <Route path="/MyPage" element={<MyPage/>}/>
          <Route path="/HistoryList" element={<HistoryList/>}/>
          <Route path="/HistoryDetail" element={<HistoryDetail/>}/>
          <Route path="/LikeList" element={<LikeList/>}/>
          <Route path="/LikeDetail" element={<LikeDetail/>}/>


          {/* Management Pages*/}
          <Route path="/Management" element={<ManagementLogin/>}/>
         <Route path="/Management/Dashboard" element={<ManagementLayout><ManagementDashboard /></ManagementLayout>} />

          <Route path="/Demo" element={<Demo/>}/>

        </Routes>
      </Router>
      
    </div>

  );
}

export default App;
