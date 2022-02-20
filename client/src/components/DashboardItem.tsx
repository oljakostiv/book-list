import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AddToast, useToasts } from 'react-toast-notifications';
import { BookModel } from '../models/bookModel';
import { ADD_BOOK_ROUTE } from '../utils/consts';
import { deleteBook } from '../apis/bookAPI';

interface BookItemProps {
    book: BookModel;
}

const removeBook = async (id: number, addToast: AddToast) => {
    try {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Do you really want to delete this book?')) {
            await deleteBook(id);
            addToast('Deleted Successfully', { appearance: 'success', autoDismiss: true });
        }
    } catch (e: any) {
        addToast(e.response.data.message, { appearance: 'error', autoDismiss: true });
    }
};

const DashboardItem: React.FC<BookItemProps> = ({ book }) => {
    const { addToast } = useToasts();
    const navigate = useNavigate();

    return (
        <tr>
            <td>{ book.title }</td>
            <td>{ book.author }</td>
            <td>{ book.category }</td>
            <td>{ book.isbn }</td>
            <td>
                <Button
                    className='btn-sm'
                    style={{ marginRight: 15 }}
                    onClick={ () => navigate(`${ADD_BOOK_ROUTE}?id=${book.id}`) }
                    variant={ 'success' }
                >
                        Edit
                </Button>
                <Button
                    className='btn-sm'
                    onClick={ () => removeBook(book.id, addToast) }
                    variant={ 'danger' }
                >
                        Delete
                </Button>
            </td>
        </tr>
    );
};

export default DashboardItem;
