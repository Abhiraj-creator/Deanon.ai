import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import './App.css';

import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ActorProfile from '../pages/ActorProfile';
import RelationshipGraph from '../pages/RelationshipGraph';
import Infrastructure from '../pages/Infrastructure';
import Sources from '../pages/Sources';
import Evidence from '../pages/Evidence';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Analysis from '../pages/Analysis';
import UserProfile from '../pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Authenticated Routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/actors" element={<ActorProfile />} />
          <Route path="/relationships" element={<RelationshipGraph />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
