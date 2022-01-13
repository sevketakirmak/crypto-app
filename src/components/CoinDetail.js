import React, { PureComponent } from 'react';
import { getChart, addCoin, getCoinDetail } from '../actions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';


class CoinDetail extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }


    componentDidMount() {
        console.log(this.props.selectCoin);
        this.props.getChart(this.props.selectCoin, 1);
        this.props.getCoinDetail(this.props.selectCoin);
    }

    render() {
        console.log(this.props.coinDetail[0]);
        const array = [];
        var max = 0;
        var min = 0;
        for (let index = 0; index < this.props.chart.length; index++) {

            if (max < this.props.chart[index][1]) {
                max = parseInt(this.props.chart[index][1].toFixed(2));
            }
            if (min > this.props.chart[index][1] || index == 0) {
                min = parseInt(this.props.chart[index][1].toFixed(2));
            }

            const dateObject = new Date(this.props.chart[index][0]);

            array.push({
                date: dateObject.getDate() +
                    "/" + (dateObject.getMonth() + 1) +
                    "/" + dateObject.getFullYear() +
                    " " + dateObject.getHours() +
                    ":" + dateObject.getMinutes() +
                    ":" + dateObject.getSeconds(), price: this.props.chart[index][1].toFixed(2)
            });
        }
        if (min < 10) {
            min = 0;
            max = max + 5;
        }
        else if (min < 100) {
            min = min - 10;
            max = max + 50;
        }
        else if (min < 1000) {
            min = min - 100;
            max = max + 100;
        }
        else if (min < 10000) {
            min = min - 100;
            max = max + 100;
        }
        else {
            min = min - 2500;
            max = max + 2500;
        }
        console.log(this.props.coinDetail);
        return (
            <div className='container'>

                <div className='row align-items-center'>
                    <div className='col-md-4'><img style={{ width: '100%' }} src={this.props.coinDetail[0] ? this.props.coinDetail[0].image : ''} /> </div>
                    <div className='col-md-8'>
                        <ul className="list-group">
                            <li className="list-group-item" style={{ textTransform: 'uppercase' }}>{this.props.coinDetail[0] ? this.props.coinDetail[0].id : ''}</li>
                            <li className="list-group-item">Price: ${this.props.coinDetail[0] ? this.props.coinDetail[0].current_price : ''}</li>
                            <li className="list-group-item">24H Low: ${this.props.coinDetail[0] ? this.props.coinDetail[0].low_24h : ''}</li>
                            <li className="list-group-item">24H High: ${this.props.coinDetail[0] ? this.props.coinDetail[0].high_24h : ''}</li>
                            <li className="list-group-item">Market Cap Rank: #{this.props.coinDetail[0] ? this.props.coinDetail[0].market_cap_rank : ''}</li>
                        </ul>
                    </div>
                    <div className="btn-group d-flex justify-content-end mt-3" role="group" aria-label="First group">
                        <button type="button" className="btn btn-outline-secondary" value={1} onClick={(e)=>{this.props.getChart(this.props.selectCoin, e.target.value)}}>24H</button>
                        <button type="button" className="btn btn-outline-secondary" value={7} onClick={(e)=>{this.props.getChart(this.props.selectCoin, e.target.value)}}>7D</button>
                        <button type="button" className="btn btn-outline-secondary" value={14} onClick={(e)=>{this.props.getChart(this.props.selectCoin, e.target.value)}}>14D</button>
                        <button type="button" className="btn btn-outline-secondary" value={30} onClick={(e)=>{this.props.getChart(this.props.selectCoin, e.target.value)}}>30D</button>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={1000}
                        height={500}
                        data={array}
                        margin={{
                            top: 50,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[min, max]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dot={false} dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
const mapState = (state) => {
    return { chart: state.chart, selectCoin: state.selectCoin, coinDetail: state.coinDetail };
}
export default connect(mapState, { getChart, addCoin, getCoinDetail })(CoinDetail);