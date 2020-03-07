// node_modules에서 module 불러오기
import {hot} from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './TicTacToe';
const Hot = hot(TicTacToe);

ReactDOM.render(<Hot />, document.getElementById('root'));
