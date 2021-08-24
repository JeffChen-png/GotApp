import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import ErrorMessage from '../error';
import GotService from '../../services/gotService';
import { withRouter } from 'react-router';


class BookPage extends Component {

    state = {
        error: false
    }

    gotService = new GotService();

    onCharSelected = (id) => {

    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Row>
                <Col >
                    <ItemList 
                        getData={this.gotService.getAllBooks}
                        onCharSelected={(itemId) => {
                            this.props.history.push(itemId)
                        }}
                        renderItem={(item)=> `${item.name} (${item.publisher})`}/>
                </Col>
            </Row>
        )
    }
}

export default withRouter(BookPage);