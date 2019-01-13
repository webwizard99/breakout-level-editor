import React from 'react';
import './LevelList.css';
import Level from '../Level/Level';


class LevelList extends React.Component {
    constructor(props) {
        super(props);

        

        this.getListForRender = this.getListForRender.bind(this);
    }

    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentDidUpdate() {
        this.getListForRender();
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//

    getListForRender() {
        
        let levelList = this.props.levelList;
        
        if (levelList.length > 0) {

            let keyCount = -1;
            return (
                levelList.map((level, lvlN) => {
                    keyCount++;
                    return (
                        <Level 
                            key={keyCount}
                            num={lvlN + 1} 
                            name={level.name}
                            lvlId={level.id}
                            loadConfirm={this.props.loadConfirm}
                        />
                    )
                })
            );
        } else {
            return <p>No Levels</p>;
        }
    }
    
    render() {
        return (
            <div className="LevelList">
                {this.getListForRender()}
            </div>
        );
    }
};

export default LevelList;