import React, { useEffect, useState } from 'react';
import {
    Container, Row, Spinner,
} from 'react-bootstrap';
import { fetchBooks } from '../apis/bookAPI';
import DashboardItem from '../components/DashboardItem';
import List from '../components/List';
import { BookModel } from '../models/bookModel';

const Dashboard: React.FC = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks().then((value) => {
            setBooks(value);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation={'grow'}/>;
    }

    return (
        <Container
            className='mt-3 d-flex justify-content-center align-items-center'
        >
            <Row >
                <List
                    items={ books }
                    renderItem={
                        (book: BookModel) => <DashboardItem key={ book.id } book={ book }/>
                    }
                />
            </Row>
        </Container>
    );
};

export default Dashboard;
