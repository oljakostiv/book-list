export interface BookModel {
    id: number;
    title: string;
    author: string;
    category: number;
    isbn: string;
}

export type BookListItem = Omit<BookModel, 'category'> & {category: string}
