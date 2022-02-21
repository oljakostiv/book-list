import React, { useEffect, useState } from 'react';
import {
    Container, Row, Spinner,
} from 'react-bootstrap';
import { fetchBooks } from '../api/bookAPI';
import DashboardItem from '../components/DashboardItem';
import List from '../components/List';
import { BookModel } from '../models/bookModel';

const Dashboard: React.FC = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBooks().then((value) => {
            setBooks(value);
        }).finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <Spinner animation={'grow'}/>;
    }

    const onUpdateBooks = (): void => {
        fetchBooks()
            .then(setBooks)
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Container
            className='mt-3 d-flex justify-content-center align-items-center'
        >
            <Row>
                <List
                    items={ books }
                    renderItem={
                        (book: BookModel) => <DashboardItem key={ book.id } book={ book } onUpdateBooks={ onUpdateBooks } />
                    }
                />
            </Row>
        </Container>
    );
};

export default Dashboard;
