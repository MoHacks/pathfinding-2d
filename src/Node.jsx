import React, {Component} from "react";
import './Node.css';

export default class Node extends Component{

    // The props is comimng from the parent state, which is <Node></Node> in the PathFindingAlgorithm.jsx
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const {col, isStart, isFinish, isWall, isVisited, onMouseDown, onMouseEnter, onMouseUp, row, isShortestPath} = this.props;
    
        const extraClassName = isShortestPath ? 'node-shortest-path': 
                              isStart ? 'node-start' : 
                              isFinish ? 'node-finish' : 
                              isWall ? 'node-wall' :
                              isVisited ? 'node-visited':
                              '';

        // console.log(extraClassName)
        // if isStart true, we add a node-start class, which will  set the color to green in the Node.css class
        // if isFinish true, we add a node-finish class, which will  set the color to red in the Node.css class

        // to check if the currentNode should be animated, check if it is Visited AND 
         
        return (
            // Because className will have multiple classes, that means multiple css properties will be activated at once
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}>
                {/* {console.log(`in Node-${row}-${col}`)}  */}
            </div>
        );
    }
}
