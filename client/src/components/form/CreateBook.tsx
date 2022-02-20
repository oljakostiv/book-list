import React, {useEffect, useState } from 'react';
import {
    Button, Card, Container, Dropdown, Form, Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {useLocation, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { createBook, editBook, fetchOneBook } from '../../apis/bookAPI';
import { BookModel } from '../../models/bookModel';
import './Modals.scss';

const saveData = async (data: Partial<BookModel>, id: number): Promise<BookModel> =>
  (id ? editBook(id, data) : createBook(data));

const CreateBook: React.FC = () => {
    const { addToast } = useToasts();
    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id');
    const {
        getValues, register, handleSubmit, formState: { errors }, setValue,
    } = useForm();

    const onSubmit = async (data: Partial<BookModel>): Promise<void> => {
        saveData(data, Number(id)).then(() => {
            addToast('Saved Successfuly', { appearance: 'success', autoDismiss: true });
        }).catch((e) => addToast(e.response.data.message, { appearance: 'error', autoDismiss: true }));
    };

    useEffect(() => {
        if (id) {
            fetchOneBook(Number(id)).then(bookData => {
                const { title, author, isbn, category } = bookData;
                setValue('title', title);
                setValue('author', author);
                setValue('isbn', isbn);
                setValue('category', category);
            });
        };
    }, [id]);

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
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
                    <div className='mb-3'>
                        <label
                            htmlFor='exampleInputTitle'
                            className='form-label'
                        >
                            Title
                        </label>
                        <input
                            type='text'
                            className={`form-control ${ errors.title ? 'invalid' : '' }`}
                            {...register('title', {
                                required: 'Title is required'
                            })}
                            id='exampleInputTitle'
                        ></input>
                        {errors?.title?.message}
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
                            className={`form-control ${ errors.author ? 'invalid' : '' }`}
                            id='exampleInputAuthor'
                            {...register('author', {
                                required: 'Author is required'
                            })}
                        ></input>
                        {errors?.author?.message}
                    </div>
                    <div className='mb-3'>
                        <label
                            htmlFor="category"
                            className="form-label"
                        >
                            Category
                        </label>
                        <select
                            className={`form-select ${ errors.category ? 'invalid' : '' }`}
                            id="category"
                            {...register('category',{
                                required: 'Category is required'
                            } )}
                        >
                            <option value="">None</option>
                            <option value='Fantasy'>Fantasy</option>
                            <option value='Romance'>Romance</option>
                            <option value='Thriller'>Thriller</option>
                            <option value='Sci-Fi'>Sci-Fi</option>
                        </select>
                        {errors?.category?.message}
                    </div>
                    <div className='mb-3'>
                        <label
                            htmlFor='exampleInputISBN'
                            className='form-label'
                        >
                            ISBN
                        </label>
                        <input
                            type='number'
                            className={`form-control ${ errors.isbn ? 'invalid' : '' }`}
                            {...register('isbn', {
                                required: 'ISBN is required'
                            })}
                            id='exampleInputISBN'
                        ></input>
                        <span className="errorMessage">{errors?.isbn?.message}</span>
                    </div>
                    <Row
                        className='d-flex justify-content-around mt-1'
                    >
                        <Button
                            className='w-25'
                            variant={ 'outline-light' }
                            type="reset"
                        >
                            Reset form
                        </Button>
                        <Button
                            className='w-25'
                            variant={ 'outline-success' }
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                        >
                            Save
                        </Button>
                    </Row>
                </form>
            </Card>
        </Container>
    );
};

export default CreateBook;
