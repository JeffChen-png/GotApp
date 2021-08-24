import React, {useState, useEffect} from 'react';
import './itemList.css';
import ErrorMessage from '../error';
import Spinner from '../spinner/';


function ItemList(props) {

    const [itemList, updateList] = useState([]);
    const [error, updateError] = useState(false);

    // state = {
    //     itemList: null,
    //     error: false
    // }

    useEffect(() => {
        const {getData} = props;

        getData()
            .then((itemList) => {
                updateList(itemList);
            })
            .catch(() => {
                updateError(true);
            });
    }, [])
    

    // componentDidMount() {
    //     const {getData} = props;

    //     getData()
    //         .then((itemList) => {
    //             this.setState({
    //                 itemList: itemList,
    //                 error: false
    //             });
    //         })
    //         .catch(() => {this.onError()});
    // }

    // componentDidCatch() {
    //     return this.onError
    // }

    // onError(status){
    //     this.setState({
    //         itemList: null,
    //         error: true
    //     })
    // }

    function renderItems(arr) {
        return arr.map((item) => {
            const param = props.renderItem(item);
            return (
                <li
                    key={item.id}
                    className="list-group-item"
                    onClick={() => props.onCharSelected(item.id)}
                    >
                    {param}
                </li>
            )
        })
    }


    // render() {
    //     const {itemList, error} = this.state;

    //     if(error){
    //         return <ErrorMessage/>
    //     }

    //     if(!itemList) {
    //         return <Spinner/>
    //     }

    //     const items = this.renderItems(itemList);

    //     return (
    //         <ul className="item-list list-group">
    //             {items}
    //         </ul>
    //     );
    // }

    if(error){
        return <ErrorMessage/>
    }

    if(!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;