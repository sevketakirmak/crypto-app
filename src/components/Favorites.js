import React from "react";
import { getFavs, addFav, removeFav } from "../actions"
import { connect } from "react-redux";
var numeral = require('numeral');

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = { favs: [] };
    }
    componentDidMount() {

        const coinFavs = JSON.parse(localStorage.getItem('fav') || '[]');



        coinFavs.map(coin => {

            var found = false;
            for (var i = 0; i < this.props.listFav.length; i++) {
                if (this.props.listFav[i][0].id == coin) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.props.getFavs(coin);
            }
        });
    }

    componentDidUpdate(prevProps){
        if(prevProps.favorites !== this.props.favorites){
            localStorage.setItem('fav', JSON.stringify(this.props.favorites));
        }
    }

    render() {

        const renderCoin = this.props.listFav.map(coin => {

            const price = numeral(coin[0].current_price).format('($0,0)');
            const volume = numeral(coin[0].total_volume).format('($0,0)');
            return (<tr key={coin[0].id}>
                <td className="d-none d-sm-table-cell">{coin[0].market_cap_rank}</td>
                <td><img src={coin[0].image} alt={coin[0].id} /> {coin[0].id} - <span>{coin[0].symbol}</span></td>
                <td>{price}</td>
                <td className="d-none d-md-table-cell">{coin[0].market_cap_change_percentage_24h?coin[0].market_cap_change_percentage_24h.toFixed(2):'NULL'}%</td>
                <td className="d-none d-md-table-cell">{volume}</td>
                <td><i onClick={(e) => {
                    if(this.props.favorites.includes(coin[0].id)){
                        e.target.style.color = "#212529";
                        this.props.removeFav(coin[0].id);
                    }
                    else {
                        e.target.style.color = "#f9c74f";
                        this.props.addFav(coin[0].id);
                    }
                    
                }} className="far fa-star fa-2x" style={{color: `${this.props.favorites.includes(coin[0].id)?`#f9c74f`:`#212529`}`}}></i></td>
            </tr>)
        });
        return (
            <div className="">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="d-none d-sm-table-cell" scope="col">#</th>
                            <th scope="col">Coin</th>
                            <th scope="col">Price</th>
                            <th className="d-none d-md-table-cell" scope="col">1h (Percentage)</th>
                            <th className="d-none d-md-table-cell" scope="col">24h Volume</th>
                            <th scope="col">Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCoin }
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapState = (state) => {
    return { listFav: state.listFav, favorites: state.favorites };
}
export default connect(mapState, { getFavs, addFav, removeFav })(Favorites);