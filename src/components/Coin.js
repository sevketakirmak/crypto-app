import React from "react";
import { getCoins, addFav, removeFav, addCoin } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./coin.css"
var numeral = require('numeral');

class Coin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentPage: 1};
    }

    componentDidMount() {
        this.props.getCoins(this.state.currentPage);
        
        const coinFavs = JSON.parse(localStorage.getItem('fav') || '[]');

        if(Array.isArray(coinFavs) && coinFavs.length > 0){
            coinFavs.map(coin => {
                if(!this.props.favorites.includes(coin)){
                    this.props.addFav(coin);
                }
            });
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.favorites !== this.props.favorites){
            localStorage.setItem('fav', JSON.stringify(this.props.favorites));
        }
    }
    render() {
        console.log(this.props.favorites);
        const aryBtn=Array.from(Array(5).keys());
        const renderBtn = aryBtn.map(index =>
            {
                return(
                    <button key={index} value={index+1} onClick={(e) => {this.setState({currentPage:e.target.value});this.props.getCoins(e.target.value); window.scrollTo(0, 0);}} type="button" className="btn btn-outline-secondary" >{index + 1}</button>
                );
            }
        );

        const renderCoin = this.props.coins.map(coin => {
            const price = numeral(coin.current_price).format('($0,0)');
            const volume = numeral(coin.total_volume).format('($0,0)');
            return (<tr key={coin.id}>
                <td className="d-none d-sm-table-cell">{coin.market_cap_rank}</td>
                <td><Link to="/coin-detail" onClick={()=> {this.props.addCoin(coin.id)}}><img src={coin.image} alt={coin.id} /> {coin.id} - <span>{coin.symbol}</span></Link></td>
                <td>{price}</td>
                <td className="d-none d-md-table-cell">{coin.market_cap_change_percentage_24h?coin.market_cap_change_percentage_24h.toFixed(2):'NULL'}%</td>
                <td className="d-none d-md-table-cell">{volume}</td>
                <td><i onClick={(e) => {
                    if(this.props.favorites.includes(coin.id)){
                        e.target.style.color = "#212529";
                        this.props.removeFav(coin.id);
                    }
                    else {
                        e.target.style.color = "#f9c74f";
                        this.props.addFav(coin.id);
                    }
                    
                }} className="far fa-star fa-2x" style={{color: `${this.props.favorites.includes(coin.id)?`#f9c74f`:`#212529`}`}}></i></td>
            </tr>)
        });


        return (
            
            <div>
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
                        {renderCoin}
                    </tbody>
                </table>
                <div className="btn-group d-flex justify-content-center mb-4" role="group" aria-label="First group">
                    <button type="button" className="btn btn-outline-secondary" disabled={this.state.currentPage==1?true:false}>Prev</button>
                    {renderBtn}
                    <button type="button" className="btn btn-outline-secondary" disabled={this.state.currentPage==5?true:false}>Next</button>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return { coins: state.coins, favorites: state.favorites };
}

export default connect(mapState, { getCoins, addFav, removeFav, addCoin })(Coin);