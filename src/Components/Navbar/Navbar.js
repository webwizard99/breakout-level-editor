import React from 'react';
import './Navbar.css';
import DropdownHead from '../DropdownHead/DropdownHead';

class Navbar extends React.Component {
  render() {
    const switcherHead = (<p>Switcher</p>);
    const switcherOption = [
      { url: '#',
        content: (<p>switch app</p>)
      }
    ];
    const profileHead = (<p>Profile</p>);
    const profileOption = [
      { url: '#',
        content: (<p>profile</p>)
      }
    ];
    return (
      <div className="Navbar">
        <DropdownHead headContent={switcherHead}
          menuOptions={switcherOption} />
        <DropdownHead headContent={profileHead}
          menuOptions={profileOption} />
      </div>
    )
  }
}

export default Navbar;