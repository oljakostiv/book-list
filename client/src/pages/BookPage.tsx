import React from 'react';
import CreateBook from '../components/form/CreateBook';

// Added as a separate component, because it uses own route
const BookPage: React.FC = () => (
    <CreateBook/>
);

export default BookPage;
