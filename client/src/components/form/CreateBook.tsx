import React, { useEffect, useState } from 'react';
import {
    Button, Card, Container, Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import {
    createBook, editBook, fetchCategories, fetchOneBook,
} from '../../api/bookAPI';
import { BookModel } from '../../models/bookModel';
import { CategoryModel } from '../../models/categoryModel';
import { DASHBOARD_ROUTE } from '../../utils/consts';
import './Styles.scss';

const saveData = async (
    data: Partial<BookModel>,
    id: number,
): Promise<BookModel> => (id ? editBook(id, data) : createBook(data));

const CreateBook: React.FC = () => {
    const { addToast } = useToasts();
    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id');
    const {
        register, handleSubmit, formState: { errors }, setValue,
    } = useForm();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const onSubmit = async (data: Partial<BookModel>): Promise<void> => {
        const body = { ...data, category: Number(data.category) };
        saveData(body, Number(id))
            .then(() => addToast('Saved Successfuly', { appearance: 'success', autoDismiss: true }))
            .catch(() => addToast('Failed to save book data, please contact support =)', {
                appearance: 'error',
                autoDismiss: true,
            }))
            .finally(() => navigate(DASHBOARD_ROUTE));
    };

    const onReset = (): void => {
        setValue('title', '');
        setValue('author', '');
        setValue('isbn', '');
        setValue('category', '');
    };

    useEffect(() => {
        if (id) {
            Promise.all([
                fetchCategories().then(setCategories),
                fetchOneBook(Number(id)).then((bookData) => {
                    const {
                        title, author, isbn, category,
                    } = bookData;
                    setValue('title', title);
                    setValue('author', author);
                    setValue('isbn', isbn);
                    setValue('category', category);
                }).catch(() => addToast('Failed to retrieve the book data', { appearance: 'error', autoDismiss: true })),
            ]);
        }
    }, [id]);

    return (
        <Container
            className='d-flex justify-content-center mt-100 mb-200'
        >
            <Card
                className='p-4 width-600'
            >
                <h2 className='m-auto'>Book:</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    onReset={onReset}
                    className='d-flex flex-column'
                >
                    <div className='mb-3'>
                        <label
                            htmlFor='exampleInputTitle'
                            className='form-label'
                        >
                            Title
                        </label>
                        <input
                            type='text'
                            className={`form-control ${errors.title ? 'invalid' : ''}`}
                            {...register('title', {
                                required: 'Title is required',
                            })}
                            id='exampleInputTitle'
                        ></input>
                        <small className="errorMessage">{errors?.title?.message}</small>
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
                            className={`form-control ${errors.author ? 'invalid' : ''}`}
                            id='exampleInputAuthor'
                            {...register('author', {
                                required: 'Author is required',
                            })}
                        ></input>
                        <small className="errorMessage">{errors?.author?.message}</small>
                    </div>
                    <div className='mb-3'>
                        <label
                            htmlFor="category"
                            className="form-label"
                        >
                            Category
                        </label>
                        <select
                            className={`form-select ${errors.category ? 'invalid' : ''}`}
                            id="category"
                            {...register('category', {
                                required: 'Category is required',
                            })}
                        >
                            <option value="">None</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {/* <Controller */}
                        {/*    control={control} */}
                        {/*    name="options" */}
                        {/*    render={({ field: { onChange, value } }) => ( */}
                        {/*        <Select */}
                        {/*            className={errors.category ? 'invalid' : ''} */}
                        {/*            {...register('category', { */}
                        {/*                required: 'Category is required', */}
                        {/*            })} */}
                        {/*            options={ categoryOptions } */}
                        {/*            value={categoryOptions.find((c) => c.value === value)} */}
                        {/*            onChange={(val: CategoryOption | null) => setValue('category', val?.value)} */}
                        {/*        /> */}
                        {/*    )} */}
                        {/* /> */}
                        <small className="errorMessage">{errors?.category?.message}</small>
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
                            className={`form-control ${errors.isbn ? 'invalid' : ''}`}
                            {...register('isbn', {
                                required: 'ISBN is required',
                            })}
                            id='exampleInputISBN'
                        ></input>
                        <small className="errorMessage">{errors?.isbn?.message}</small>
                    </div>
                    <Row
                        className='d-flex justify-content-around mt-1'
                    >
                        <Button
                            className='w-25'
                            variant={'outline-success'}
                            type="reset"
                        >
                            Reset form
                        </Button>
                        <Button
                            className='w-25'
                            variant={'success'}
                            type="submit"
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
