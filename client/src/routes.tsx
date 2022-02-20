import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddBook from './pages/AddBook';
import Dashboard from './pages/Dashboard';
import { ADD_BOOK_ROUTE, DASHBOARD_ROUTE } from './utils/consts';

const AppRouter: React.FC = () => (
    <Routes>
        <Route path={ ADD_BOOK_ROUTE } element={<AddBook />}/>
        <Route path={ DASHBOARD_ROUTE } element={<Dashboard />}/>

        <Route path='*' element={<Dashboard />}/>
    </Routes>
);

export default AppRouter;
