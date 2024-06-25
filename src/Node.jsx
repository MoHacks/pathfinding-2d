import React, {Component} from "react";
import './Node.css';

// Motivation: apply a class to each node if it fulfills a certain condition


// NOTE: We need to update the state, hence the constructor 
export default class Node extends Component{

    // The props is comimng from the parent state, which is <Node></Node> in the PathFindingAlgorithm.jsx
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const {col, isStart, isFinish, isWall, isVisited, onMouseDown, onMouseEnter, onMouseUp, row, isShortestPath} = this.props;
        
        // This is to determine if the prop we have received from the parent state checks off any of these conditions 
        // in order to update the grid
        const extraClassName = isShortestPath ? 'node-shortest-path': 
                              isStart ? 'node-start' : 
                              isFinish ? 'node-finish' : 
                              isWall ? 'node-wall' :
                              isVisited ? 'node-visited':
                              '';

        // console.log(extraClassName)
        // if isStart true, we add a node-start class, which will  set the color to green in Node.css 
        // if isFinish true, we add a node-finish class, which will  set the color to red in Node.css

        // to check if the currentNode should be animated, check if it is Visited AND 
         
        // the state gets updated and returned to the parent component in the PathFindingAlgorithm.jsx
        return (
            // only the first true property will be activated in extraClassName, 
            // if the node is not part of shortestPath, not start node, not finish node, not wall node, not visited node
            // then, this node will not have an extraClassName
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
