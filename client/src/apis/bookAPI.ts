import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BookModel } from '../models/bookModel';

const booksAPI: AxiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

const fetchBooks = async () => {
    const { data } = await booksAPI.get<BookModel[]>('/books');
    return data;
};

const fetchOneBook = async (id: number): Promise<BookModel> => {
    const { data } = await booksAPI.get<BookModel>(`/books/${id}`);
    return data;
};

const createBook = async (book: Partial<BookModel>): Promise<BookModel> => {
    try {
        const { data } = await booksAPI.post('/books/', book);
        return data;
    } catch (e) {
        console.error(e);
        return {} as BookModel;
    }
};

const editBook = async (id: number, book: Partial<BookModel>): Promise<BookModel> => {
    const { data } = await booksAPI.put(`/books/${id}`, book);
    return data;
};

const deleteBook = async (id: number): Promise<AxiosResponse<any>> => {
    const { data } = await booksAPI.delete(`/books/${id}`);
    return data;
};

export {
    fetchBooks, fetchOneBook, createBook, editBook, deleteBook,
};
