import React from "react";
import Coin from "./components/Coin";
import Favorites from "./components/Favorites";
import Menu from "./components/Menu";
import CoinDetail from "./components/CoinDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Menu />
                    <Routes>
                        <Route path="/" element={<Coin />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="coin-detail" element={<CoinDetail />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;