import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../components/Login/Login';
import SocketPage from '../pages/SocketPage/SocketPage';
import ForgetPage from '../pages/ForgetPage/ForgetPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AgoraCallPage from '../pages/AgoraCall/AgoraCallPage';
import { ROUTES } from './routes';


function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SOCKET} element={<SocketPage />} />
        <Route path={ROUTES.FORGET_PASSWORD} element={<ForgetPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.CALL} element={<AgoraCallPage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />

      </Route>
    </Routes>
  );
}

export default AppRoutes;
