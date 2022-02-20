import React, { useState } from 'react';
import {
    Button, Card, Container, Dropdown, Form, Row,
} from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { createBook } from '../../apis/bookAPI';
import { BookModel } from '../../models/bookModel';

const CreateBook: React.FC = () => {
    const { addToast } = useToasts();
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [isbn, setIsbn] = useState<string>('');

    const newBook: Partial<BookModel> = {
        title,
        author,
        category,
        ISBN: isbn,
    };

    const addBook = () => {
        createBook(newBook).then(() => {
            addToast('Created Successfully', { appearance: 'success', autoDismiss: true });
        }).catch((e) => addToast(e.response.data.message, { appearance: 'error', autoDismiss: true }));
    };

    return (
        <Container
            className='d-flex justify-content-center'
            style={{ marginTop: 100, marginBottom: 200 }}
        >
            <Card
                className='p-4'
                style={{ width: 600 }}
            >
                <h2 className='m-auto'>Book:</h2>
                <Form className='d-flex flex-column'>
                    <div className='mb-3'>
                        <label
                            htmlFor='exampleInputTitle'
                            className='form-label'
                        >
                            Title
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            id='exampleInputTitle'
                            value={ title }
                            onChange={ (e) => setTitle(e.target.value) }
                        ></input>
                    </div>
                    <div className='mb-3'>
                        <label
                            htmlFor='exampleInputAuthor'
                            className='form-label'
                        >
                            Author
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            id='exampleInputAuthor'
                            value={ author }
                            onChange={ (e) => setAuthor(e.target.value) }
                        ></input>
                    </div>
                    <Dropdown
                        onSelect={(value) => setCategory(value ?? '') }
                    >
                        Category
                        <Dropdown.Toggle
                            variant={ 'outline-dark' }
                            style={{ marginLeft: 10 }}
                        >
                            { category }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='Fantasy'>Fantasy</Dropdown.Item>
                            <Dropdown.Item eventKey='Romance'>Romance</Dropdown.Item>
                            <Dropdown.Item eventKey='Thriller'>Thriller</Dropdown.Item>
                            <Dropdown.Item eventKey='Sci-Fi'>Sci-Fi</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className='mb-3'>
                        <label
                            htmlFor='exampleInputISBN'
                            className='form-label'
                        >
                            ISBN
                        </label>
                        <input
                            type='number'
                            className='form-control'
                            id='exampleInputISBN'
                            value={ isbn }
                            onChange={ (e) => setIsbn(e.target.value) }
                        ></input>
                    </div>
                    <Row
                        className='d-flex justify-content-around mt-1'
                    >
                        <Button
                            className='w-25'
                            variant={ 'outline-success' }
                            onClick={ addBook }
                        >
                            Save
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default CreateBook;
