import React from 'react';
import { Container, Table } from 'react-bootstrap';

interface ListProps<T> {
    items: T[];
    // eslint-disable-next-line no-unused-vars
    renderItem: (item: T) => React.ReactNode;
}

export default function List<T>(props: ListProps<T>): React.ReactElement {
    return (
        <Container>
            <Table
                striped bordered hover
                className='mt-3'
                style={{ width: '75vw' }}
            >
                <thead>
                    <tr>
                        <th>Title:</th>
                        <th>Author:</th>
                        <th>Category:</th>
                        <th>ISBN:</th>
                        <th>Actions:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.items.map(props.renderItem)
                    }
                </tbody>
            </Table>
        </Container>
    );
}
