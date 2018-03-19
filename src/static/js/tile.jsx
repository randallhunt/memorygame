import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/tile.scss';

export default class Tile extends React.Component {

  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.state = {
      matched: false,
      visible: false
    };
  }

  click() {
    if (this.props.onClick instanceof Function) {
      if (!this.props.onClick(this)) {
        return false;
      }
    }
    this.setState({ visible: !this.state.visible});
  }

  render() {
    const classname = 'tile' + (this.state.visible ? ' visible' : '') + (this.props.matched ? ' matched' : '');
    return (
      <div className={classname} onClick={this.click}>
        <img src={`/images/${this.props.id}.jpg`} />
      </div>
    );
  }
}
