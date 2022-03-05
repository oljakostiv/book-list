import axios, { AxiosInstance } from 'axios';
import { BookModel } from '../models/bookModel';
import { CategoryModel } from '../models/categoryModel';

const booksAPI: AxiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

const fetchBooks = async (): Promise<BookModel[]> => {
    const { data } = await booksAPI.get<BookModel[]>('/books');
    return data;
};

const fetchOneBook = async (id: number): Promise<BookModel> => {
    const { data } = await booksAPI.get<BookModel>(`/books/${id}`);
    return data;
};

const createBook = async (book: Partial<BookModel>): Promise<BookModel> => {
    const { data } = await booksAPI.post('/books/', book);
    return data;
};

const editBook = async (id: number, book: Partial<BookModel>): Promise<BookModel> => {
    const { data } = await booksAPI.put(`/books/${id}`, book);
    return data;
};

const deleteBook = async (id: number): Promise<void> => booksAPI.delete(`/books/${id}`);

const fetchCategories = async (): Promise<CategoryModel[]> => {
    const { data } = await booksAPI.get<CategoryModel[]>('/categories');
    return data;
};

export {
    fetchBooks, fetchOneBook, createBook, editBook, deleteBook, fetchCategories,
};
