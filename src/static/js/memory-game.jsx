import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';
import styles from '../styles/memory-game.scss';

export default class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.clickTile = this.clickTile.bind(this);
    this.resetTiles = this.resetTiles.bind(this);

    // create 12 matching values
    let arr = [];
    this.unmatched = new Set();
    for (let i=1; i<=12; i++) {
      arr.push(i);
      arr.push(i);
      this.unmatched.add(i);
    }

    // shuffle those values
    let vals = [];
    while (arr.length) {
      vals.push(arr.splice(parseInt(arr.length * Math.random(), 10), 1)[0]);
    }

    // initialize state
    this.state = {
      current: null,
      delay: null,
      guesses: 0,
      matches: 0,
      vals: vals
    };
  }

  clickTile(tile) {
    // if we're delaying for animation effect, just return false
    if (this.state.delay) {
      return false;
    }

    // if nothing is showing, just flip it
    if (this.state.current === null) {
      this.setState({ current: tile });
      return true;
    }

    // if clicking the same tile, don't let people cheat
    if (this.state.current === tile) {
      console.log('cheat attempt detected');
      return false;
    }

    // if not delaying for animation, and not flipping an initial tile, increment guesses
    this.setState({
      // current: null,
      guesses: this.state.guesses + 1
    });

    this.setState({ delay: tile });

    // if something is showing, check for a match
    if (this.state.current.props.id === tile.props.id) {
      window.setTimeout(() => {
      this.setState({ matches: this.state.matches + 1 });
      this.unmatched.delete(this.state.current.props.id);
        this.state.current.setState({ matched: true });
      }, 300);
    }

    window.setTimeout(() => {
      this.resetTiles();
      this.setState({
        current: null,
        delay: null
      });
    }, 600);

    return true;
  }

  resetTiles() {
    this.state.current.setState({ visible: false });
    this.state.delay.setState({ visible: false });
  }

  renderTiles() {
    return this.state.vals.map((val) => {
      return (
        <Tile id={val} matched={this.unmatched.has(val) === false} onClick={this.clickTile} />
      )
    });
  }

  renderFinished() {
    return (
      <div className="congratulations">
        <h1>Congratulations!</h1>
        <h2>You've matched all the tiles.</h2>
      </div>
    );
  }

  render() {
    const content = (this.state.matches === 12) ? this.renderFinished() : this.renderTiles();
    return (
      <div className="memory-game">
        <div className="stats">
          <div className="matches">{`Matches: ${this.state.matches}`}</div>
          <div className="guesses">{`Guesses: ${this.state.guesses}`}</div>
        </div>
        {content}
      </div>
    );
  }
}
