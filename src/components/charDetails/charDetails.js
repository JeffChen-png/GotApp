import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';
import ErrorMessage from '../error';
import Spinner from '../spinner/';

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateChar() {
        const {charId, getDataById} = this.props;
        if (!charId) {
            return;
        }

        this.setState({
            loading: true
        })

        getDataById(charId)
            .then( this.onCharDetailsLoaded )
            .catch(() => this.onError)
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <span className="select-error">Please select an item</span>
        }

        const {name} = this.state.item;

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const item = this.state.item;
        
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child)=>{
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}