import React, { useEffect, useState } from 'react';
import {
    Container, Row, Spinner,
} from 'react-bootstrap';
import { fetchBooks, fetchCategories } from '../api/bookAPI';
import DashboardItem from '../components/DashboardItem';
import List from '../components/List';
import { BookListItem, BookModel } from '../models/bookModel';
import { CategoryModel } from '../models/categoryModel';

const Dashboard: React.FC = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
    const booksList: BookListItem[] = books.map((b) => ({ ...b, category: categoryMap.get(b.category) ?? '' }));

    useEffect(() => {
        Promise.all([
            fetchBooks().then(setBooks),
            fetchCategories().then(setCategories),
        ]).finally(() => setIsLoading(false));
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
                    items={booksList}
                    renderItem={
                        (book: BookListItem) => <DashboardItem key={book.id} book={book} onUpdateBooks={onUpdateBooks}/>
                    }
                />
            </Row>
        </Container>
    );
};

export default Dashboard;
