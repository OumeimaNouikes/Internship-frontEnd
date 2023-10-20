
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';
import  { useState } from 'react'
import SideBar from './Components/SideBar';
import Configurator from './Components/Configurator';
import ConnectedSystems from './Components/ConnectedSystems';
import Licenses from './Components/Licenses';
import TroubleShooting from './Components/TroubleShooting';
import DataExplorer from './Components/DataExplorer';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Profile from './Components/Profile';
import GeneralSettings from './Components/GeneralSettings';
import SettingsList from './Components/SettingsList';
import WebConsole from './Components/WebConsole';
import PlatformSettings from './Components/PlatformSettings';
import ListenerSettings from './Components/ListenerSettings';
import Integration from './Components/Integration';
import ConnectedSystemInstance from './Components/ConnectedSystemInstance';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    
      <BrowserRouter>
      <Routes>
      <Route
              exact
              path="/login"
              element={!isAuthenticated ? <SignIn setAuth={setAuth} /> : <Navigate to="/dashboard" />}
              
            />
       <Route path="/"
       element={!isAuthenticated ? <SignIn setAuth={setAuth} /> : <Navigate to="/dashboard" />}
       /> 
       <Route
               exact
               path="/dashboard"
               element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
            />
             <Route
               exact
               path="/profile"
               element={isAuthenticated ? <Profile setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
               exact
               path="/settings"
               element={isAuthenticated ? <GeneralSettings setAuth={setAuth} /> : <Navigate to="/login" />}
            />
        
        <Route path="/sidebar"  
              element={isAuthenticated ? <SideBar setAuth={setAuth} /> : <Navigate to="/login" />}/>
        <Route path="/settingslist"
               element={isAuthenticated ? <SettingsList setAuth={setAuth} /> : <Navigate to="/login" />}/>
        <Route path="/webconsole" 
               element={isAuthenticated ? <WebConsole setAuth={setAuth} /> : <Navigate to="/login" />}/>
        <Route path="/platformsettings" 
               element={isAuthenticated ? <PlatformSettings setAuth={setAuth} /> : <Navigate to="/login" />}/>
        <Route path="/listenersettings" 
              element={isAuthenticated ? <ListenerSettings setAuth={setAuth} /> : <Navigate to="/login" />}/>
        <Route path="/configurator" 
              element={isAuthenticated ? <Configurator setAuth={setAuth} /> : <Navigate to="/login" />}/>
        <Route path="/integration/:id/:connected_system_id_1/:connected_system_id_2" 
               element={isAuthenticated ? <Integration setAuth={setAuth} /> : <Navigate to="/login" />}/>
        <Route path="/instance/:systemId" 
              element={isAuthenticated ? <ConnectedSystemInstance setAuth={setAuth} /> : <Navigate to="/login" />}/>
       
        <Route path="/connectedsystems" 
               element={isAuthenticated ? <ConnectedSystems setAuth={setAuth} /> : <Navigate to="/login" />}/>



        <Route path="/licenses" element={<Licenses/>}/>
        <Route path="/troubleshooting" element={<TroubleShooting/>}/>
        <Route path="/dataexplorer" element={<DataExplorer/>}/>
        
       
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
