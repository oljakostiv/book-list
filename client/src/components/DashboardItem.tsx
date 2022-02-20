import React from 'react';
import { Button } from 'react-bootstrap';
import { AddToast, useToasts } from 'react-toast-notifications';
import { deleteBook } from '../apis/bookAPI';
import { BookModel } from '../models/bookModel';

interface BookItemProps {
    book: BookModel;
}

const removeBook = async (id: number, addToast: AddToast) => {
    try {
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

    return (
        <tr>
            <td className='p-4'>{ book.title }</td>
            <td className='p-4'>{ book.author }</td>
            <td className='p-4'>{ book.category }</td>
            <td className='p-4'>{ book.ISBN }</td>
            <td>
                <Button
                    className='btn-sm'
                    style={{ marginRight: 15 }}
                    onClick={ () => {} }
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
