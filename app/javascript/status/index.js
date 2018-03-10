// app/javascript/quotes/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import Board from './components/board'

const board = document.querySelector('#board')
ReactDOM.render(<Board />, board)
