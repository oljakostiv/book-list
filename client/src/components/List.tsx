import React from 'react';
import { Container } from 'react-bootstrap';

// generic:
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export default function List<T>(props: ListProps<T>) {
    return (
        <Container>
            <table>
                <tr
                    style={{ color: 'grey', fontWeight: 'bold', fontSize: '18px' }}
                >
                    <th className='p-4'>Title:</th>
                    <th className='p-4'>Author:</th>
                    <th className='p-4'>Category:</th>
                    <th className='p-4'>ISBN:</th>
                    <th className='p-4'>Actions:</th>
                </tr>
                {
                    props.items.map(props.renderItem)
                }
            </table>
        </Container>
    );
}
