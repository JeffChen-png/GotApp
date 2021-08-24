import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../error';
import GotService from '../../services/gotService';
import Field from '../field';

export default class HousePage extends Component {

    state = {
        selectedChar: 5,
        error: false
    }

    gotService = new GotService();

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
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
                <Col md='6'>
                    <ItemList 
                    getData={this.gotService.getAllHouses}
                    onCharSelected={this.onCharSelected}
                    renderItem={(item)=> `${item.name} (${item.region})`}/>
                </Col>
                <Col md='6'>
                    <CharDetails charId = {this.state.selectedChar} getDataById={this.gotService.getHouse}>
                        <Field field='region' label='Region'/>
                        <Field field='words' label='Words'/>
                        <Field field='titles' label='Titles'/>
                        <Field field='ancestralWeapons' label='Ancestral weapons'/>
                    </CharDetails>
                </Col>
            </Row>
        )
    }
}