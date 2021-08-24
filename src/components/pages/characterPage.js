import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../error';
import GotService from '../../services/gotService';
import Field from '../field';


export default class CharacterPage extends Component {

    state = {
        selectedChar: 130,
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
                    getData={this.gotService.getAllCharacters}
                    onCharSelected={this.onCharSelected}
                    renderItem={(item)=> `${item.name} (${item.gender})`}/>
                </Col>
                <Col md='6'>
                    <CharDetails charId = {this.state.selectedChar} getDataById={this.gotService.getCharacter}>
                        <Field field='gender' label='Gender'/>
                        <Field field='born' label='Born'/>
                        <Field field='died' label='Died'/>
                        <Field field='culture' label='Culture'/>
                    </CharDetails>
                </Col>
            </Row>
        )
    }
}