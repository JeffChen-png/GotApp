import React from 'react';
import GotService from '../../services/gotService';
import CharDetails from '../charDetails';
import Field from '../field';

export default class BooksItem extends React.Component {
    gotService = new GotService();

    render() {
        return (
            <CharDetails charId={this.props.bookId} getDataById={this.gotService.getBook}>
                <Field field='numberOfPages' label='Number of pages' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </CharDetails>
        )
    }
}
