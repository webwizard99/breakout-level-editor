import React from 'react';
import './DropdownHead.css';

class DropdownHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.getMenu = this.getMenu.bind(this);
  }
  
  handleClick() {
    this.setState({
      open: true
    })
  }

  handleLeave() {
    this.setState({
      open: false
    })
  }

  getMenu() {
    if (!this.props.menuOptions) return '';

    const menuOptions = this.props.menuOptions;
    return menuOptions.map(({url, content}) => {
      return (<a className="DropdownItem" 
        href={url}>
          {content}
        </a>);
    });

  }

  render() {
    return (
      <div className="DropdownHead"
        onMouseLeave={this.handleLeave}>
        <div className="HeadContent"
          onClick={this.handleClick}>
          {this.props.headContent}
        </div>
        {this.state.open ? this.getMenu() : ''}
      </div>
    )
  }
}

export default DropdownHead;