import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import NavBar from './components/NavBar';
import AppRouter from './routes';
import './styles/App.scss';

function App(): React.ReactElement {
    return (
        <ToastProvider>
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
        </ToastProvider>
    );
}

export default App;
