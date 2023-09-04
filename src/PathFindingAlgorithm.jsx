// import React, {Component} from "react";
// import Node from './Node';
// import './PathFindingAlgorithm.css';
// import  DEFAULT_NODE  from "./Node";
// import {dijkstra, getNodesInShortestPathOrder} from './dijkstra';

// const START_NODE_COL = 5;
// const START_NODE_ROW = 7;
// const END_NODE_COL = 7;
// const END_NODE_ROW = 7;
// const totalRows = 20;
// const totalCols = 50;

// //TODO: nodesInShortestPathOrder

// export default class PathFindingAlgorithm extends Component{
//     constructor(props){
//         super(props);

//         // This stores the current state of the entire grid 
//         this.state = {
//            grid : [],
//            mouseIsPressed: false,
//            visitedNodes: []
//         };
//     }

//     //initialize board using nested arrays (once the arrays are created, it will trigger setState, which will render the board)
//     componentDidMount(){
//         // const nodes = [];
//         // for (let row = 0; row < 20; row++){
//         //     const currentRow = [];
//         //     for (let col = 0; col < 50; col++){
//         //        const currentNode = {
//         //         col,
//         //         row,
//         //         isStart : row === 10 && col === 5,
//         //         isFinish : row === 10 && col === 45,
//         //        }
//         //        currentRow.push(currentNode);
//         //     }
//         //     nodes.push(currentRow);
//         // }
//         // //NOTE: Once setState gets executed, it will perform 2 operations:
//         // //1. Update the nodes array in this.state
//         // //2. Call the render() function IMMEDIATELY to render the 2-D array onto the screen
//         // this.setState({nodes});
//         // // The setState() method enqueues all of the updates made to the component state and instructs React to 
//         // //re-render the component and its children with the updated state.

 
//         const grid = getInitialGrid();
//         this.setState({grid});
//     }

//     //we are creating a new grid with walls every time the mouse is pressed on the grid
//     handleMouseDown= (row, col) => {
//        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
//        this.setState({grid: newGrid, mouseIsPressed: true}) //we dont need to say this.state.mouseIsPressed because setState
//                                                      //already knows to update the state's attributes 
//     }
    
//     // when the mouse enters the board 
//     handleMouseEnter = (row, col) => {
//         if(!this.state.mouseIsPressed) return; //if the mouse is not pressed down within the board, just return nothing
//         const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
//         this.setState({grid: newGrid});
//     }

//     // The mouseIsPressed state attribute is set to false when mouse event is released since we dont want to create anymore walls
//     handleMouseUp = () => {
//        this.setState({mouseIsPressed: false}) 
//     }
    
//     //NOTE: This is where Dijkstra's function is being called!
//     // The dijkstra() function is returning the array of visited Nodes in order
//     // The animateDijkstra() function is iterating through all the nodes (in order),
//     // it will then create a new node from the old node, and mark the visited nodes with the 
//     // "isVisited" property. And then, we update the state (grid) with that new node, then,
//     // with a delay of 100ms, we update that new state with that node as "isVisited" property, 
//     // 
//     //which will re-render everything,
//     visualizeDijkstra(){
//         const {grid} = this.state;
//         const startNode = grid[START_NODE_ROW][START_NODE_COL];
//         const endNode = grid[END_NODE_ROW][END_NODE_COL];
//         console.log(startNode, endNode);
//         const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
//         this.setState({ visitedNodes: visitedNodesInOrder });
//         // const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
//         console.log("animateDijkstra has been called!");
//         this.animateDijkstra(visitedNodesInOrder);
//     }
    
//     //TODO: Re-read the shet out of this and make sure you fully understand what the hell is going on! See 28:50 in video!
//     //TODO: Try to use async/await to change this!
// //     animateDijkstra(visitedNodesInOrder) {
// //         visitedNodesInOrder.forEach((node, i) => {
// //         setTimeout(() => {
// //             this.setState(prevState => {
// //                 const updatedGrid = [...prevState.grid];
// //                 const updatedNode = {...node, isVisited: true};
// //                 updatedGrid[node.row][node.col] = updatedNode;
// //                 // const updatedVisitedNodes = [...prevState.visitedNodes, node];
// //                 return { grid: updatedGrid };
// //             });
// //         }, 1000 * i);
// //     });
// // }
//     async animateDijkstra(visitedNodesInOrder) {
//         for (let i = 0; i < visitedNodesInOrder.length; i++) {
//             const node = visitedNodesInOrder[i];
//             await this.delay(500); // Delay for 500ms (adjust as needed)
//             this.setState(prevState => {
//                 const updatedGrid = prevState.grid.map(row => row.map(n => ({ ...n })));
//                 updatedGrid[node.row][node.col].isVisited = true;
//                 return { grid: updatedGrid };
//             });
//         }
//     }

//     delay = ms => new Promise(resolve => setTimeout(resolve, ms));




//     // animateDijkstra(visitedNodesInOrder) {
//     //     for (let i = 0; i <= visitedNodesInOrder.length; i++) {
//     //         console.log("visitedNodesInOrder: ", visitedNodesInOrder);
//     //         if (i === visitedNodesInOrder.length) {
//     //             // setTimeout(() => {
//     //             // this.animateShortestPath(nodesInShortestPathOrder);
//     //             // }, 10 * i);
//     //             console.log("i === visitedNdoesInOrder.length", i)
//     //             return;
//     //         }
//     //         setTimeout(() => {
//     //             const node = visitedNodesInOrder[i];
//     //             document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
//     //         }, 500 * i);
//     //     }
//     // }

//     //TODO: Finish Later
//     // animateShortestPath = (nodesInShortestPathOrder) => {
        
//     // }
        

//     render(){
       
//         //Destructuring this.state (which currently contains only the variable nodes)
//         const { grid, mouseIsPressed, visitedNodes } = this.state
//         // You can also do:
//         // const nodes = this.state.nodes;
        
//         // console.log("grid in render(): ", grid)
       
//         //nodes.map will loop through every row, and for every row, it will add a Node Component to each value in that row
//         //thereby making it so that every square in the grid (i.e. nested array) will be a Node Component
//         return (
//             <>
//                 <button onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra Algorithm</button>
//                 {/* {console.log("in render")} */}
//                 <div className="grid">
//                     {grid.map((row, rowIdx) => {
//                         return(
//                                 <div key={rowIdx}>
//                                 {row.map((node, nodeIdx) => {
//                                     // console.log(node, nodeIdx) --> returns Node object, and node index
//                                     //NOTE: The ORDER of Object destructuring DOES NOT MATTER so long as the VARIABLE NAME
//                                     //MATCHES with the key in the object!
//                                     let {row, col, isStart, isFinish, isWall, isVisited} = node;
                                    
//                                     // console.log("node: ", node);
//                                     // console.log("visitedNodes: ", visitedNodes);
//                                     // const extraClassName = isStart ? 'node-start' :
//                                     // isFinish ? 'node-finish' :
//                                     // isWall ? 'node-wall' :
//                                     // visitedNodes.includes(node) ? 'node-visited' :
//                                     // '';
//                                     // {if (visitedNodes.includes(node)){isVisited=true}}
//                                     // console.log("node.row, node.col, node.isVisited: ", node.row, node.col, node.isVisited);
//                                     // console.log(visitedNodes)
//                                     if(visitedNodes.includes(node)){
//                                         console.log("vistedNodes includes node!");
//                                         console.log("visitedNodes: ", visitedNodes);
//                                         console.log("node: ", node);
//                                         isVisited=true;
//                                     }

//                                     return (
//                                         <Node 
//                                             key={nodeIdx}
//                                             isStart={isStart}
//                                             isFinish={isFinish}
//                                             col={col}
//                                             row={row}
//                                             isWall={isWall}
//                                             isVisited={isVisited}
//                                             visitedNodes={visitedNodes}
//                                             mouseIsPressed={mouseIsPressed}
//                                             onMouseDown={(row, col) => this.handleMouseDown(row, col)}
//                                             onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
//                                             onMouseUp={() => this.handleMouseUp()}
//                                             // className={`node ${extraClassName}`}
//                                             test={'foo'}></Node>
//                                     )
//                                 })}
//                                 </div>
//                             )
//                     })}
//                 </div>
//             </>
//         );
//     }
// }

// const getInitialGrid = () => {
//    const grid = [];
    
//     //you can also do initialGrid = Array(totalRows).fill(Array(totalCols).fill('')), to create 
//    for (let row = 0; row < totalRows; row ++) {
//         const currentRow = [];
//         for (let col = 0; col < totalCols; col++){
//             currentRow.push(createNode(col, row));
//         }
//         grid.push(currentRow);
//     }
//     return grid;
// }

// const createNode = (col, row) => {
//    return {
//     col,
//     row,
//     isStart: row === START_NODE_ROW && col === START_NODE_COL,
//     isFinish: row === END_NODE_ROW && col === END_NODE_COL,
//     distance: Infinity,
//     isVisited: false,
//     isWall: false,
//     previousNode: null
//    };
// }

// // this returns a new grid with a new wall (and the original grid's content will change)
// const getNewGridWithWallToggled = (grid, row, col) => {
//     const newGrid = [...grid]; //creates a shallow copy of the grid, which means the nested arrays WILL CHANGE THE ORIGINAL
//                               //grid because NESTED OBJECTS THAT ARE SHALLOW COPIED WILL ALTER THE ORIGINAL OBJECT AS WELL! 
//     // console.log("newGrid: ", newGrid);
//     const node = newGrid[row][col];
//     const newNode = {
//         ...node, //produces a SHALLOW copy of the node
//         isWall: !node.isWall, //this makes it so that if a wall already exists, set isWall=False, otherwise set isWall=True
//     };
//     newGrid[row][col] = newNode;
//     return newGrid;
// }

import React, { useState } from "react";
import Node from './Node';
import './PathFindingAlgorithm.css';
import { dijkstra, getNodesInShortestPathOrder} from './dijkstra';
import StartRowDropdown from "./Dropdown";

export let START_NODE_COL = 5;
export let START_NODE_ROW = 7;
export let END_NODE_COL = 15;
export let END_NODE_ROW = 3;
export let totalRows = 20;
export let totalCols = 50;
export let MAX_TOTAL_COL = 50;
export let MAX_TOTAL_ROW = 50;

// HACK: Use Functional COMPONENT instead of Class Component, and useState instead of setSet for synchronous rendering
export default function PathFindingAlgorithm() {

    // NOTE: useState takes an initial value as an argument and returns an array with two elements: 
    // 1) the current state value 2) a function to update the state

    // the current state grid is stored in the "grid" variable (with value of what is returned from getInitialGrid())
    // the next grid state is stored in the "setGrid" variable and is currently set to None 
    // mouseIsPressed = false, setMouseIsPressed = None
    // visitedNodes = [], setVisitedNodes = None
    // isAnimating = false, setIsAnimating = None
    const [grid, setGrid] = useState(getInitialGrid());
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [visitedNodes, setVisitedNodes] = useState([]);
    const [shortestPathNodes, setShortestPathNodes] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false); // State to track animation status
    // const [selectedStartColValue, setSelectedStartColValue] = useState(START_NODE_COL);
    // const [selectedStartRowValue, setSelectedStartRowValue] = useState(START_NODE_ROW);
    // const [selectedEndColValue, setSelectedEndColValue] = useState(END_NODE_COL);
    // const [selectedEndRowValue, setSelectedEndRowValue] = useState(END_NODE_ROW);

    // const [selectedGridColValue, setSelectedGridColValue] = useState(totalCols);
    // const [selectedGridRowValue, setSelectedGridRowValue] = useState(totalRows);
    const selectedStartColValue = START_NODE_COL;
    const selectedStartRowValue = START_NODE_ROW;
    const selectedEndColValue = END_NODE_COL;
    const selectedEndRowValue = END_NODE_ROW;

    const selectedGridColValue = totalCols;
    const selectedGridRowValue = totalRows;
    let dijkstraCompleted = false;

    //updates start col value and updates the grid accordingly
    const handleSelectStartColValue = (value) => {
        // setSelectedStartColValue(value);
        // await delay(20000);
        START_NODE_COL = value;
        const grid = getInitialGrid();
        setGrid(grid);
        console.log("in handleSelectedStartColValue with col value: ", value);
    }

    const handleSelectStartRowValue = (value) => {
        // setSelectedStartRowValue(value);
        // await delay(20000)
        START_NODE_ROW = value;
        const grid = getInitialGrid();
        setGrid(grid)
        console.log("in handleSelectStartRowValue with row value: ", value)
    }

    const handleSelectEndColValue = (value) => {
        // setSelectedEndColValue(value);
        END_NODE_COL = value;
        const grid = getInitialGrid();
        setGrid(grid);
        console.log("in handleSelect withhhhh col value: ", value)
    }

    const handleSelectEndRowValue = (value) => {
        // setSelectedEndRowValue(value);
        END_NODE_ROW = value;
        const grid = getInitialGrid();
        setGrid(grid);
        console.log("in handleSelect withhhhh row value: ", value)
    }

    const handleSelectGridColValue = (value) => {
        // setSelectedGridColValue(value);
        totalCols = value;
        const grid = getInitialGrid();
        setGrid(grid);
        console.log("in handleSelectGridColValue with col value: ", value)

    }

    const handleSelectGridRowValue = (value) => {
        // setSelectedGridRowValue(value);
        totalRows = value;
        const grid = getInitialGrid();
        setGrid(grid);
        console.log("in handleSelectGridRowValue with row value: ", value)
    }

    const handleMouseDown = (row, col) => {
        if(!isAnimating){
            const newGrid = getNewGridWithWallToggled(grid, row, col);
            setGrid(newGrid);
            setMouseIsPressed(true);
        }
    }

    //if mouse is within the grid perimeter
    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }

    const resetGrid = () => {
        const newGrid = getInitialGrid();
        setGrid(newGrid);
        setIsAnimating(false);
    }

    const generateRandomGrid = () => {

        // Resets all the nodes to false
        resetVisitedNodesToFalse();

        // Resets all the walls
        resetWalls();

        let newGrid = [...grid];

        let randomRow = Math.floor(Math.random() * (totalRows));
        let randomCol = Math.floor(Math.random() * (totalCols));
        let updatedGrid = getNewGridWithWallToggled(newGrid, randomRow, randomCol);

        for(let i = 0; i < (totalCols * totalRows) / 3; i++){
            randomRow = Math.floor(Math.random() * (totalRows));
            randomCol = Math.floor(Math.random() * (totalCols));
            updatedGrid = getNewGridWithWallToggled(newGrid, randomRow, randomCol);
        }
        let c = 0
        for (let i = 0; i < totalRows; i++){
            for(let j = 0; j < totalCols; j++){
                if(updatedGrid[i][j].isWall){
                    c += 1
                }
                
            }
        }
        console.log("counter: ", c);
        setGrid(updatedGrid);
        setIsAnimating(false);
    }

    //This needs to be an async function because we must await the result from animateDijkstra function before calling the
    //animateShortestpath() function
    const visualizeDijkstra = async () => {

        //TODO: REFACTOR THE IF CONDITIONS USING: START_NODE_COL, START_NODE_ROW, END_NODE_COL, END_NODE_ROW instead of "selected"
        if(selectedStartColValue >= totalCols){
            alert("Start Node Column Value is greater than the total number of Columns in the Grid!")
            return
        }
        if(selectedStartRowValue >= totalRows){
            alert("Start Node Row Value is greater than the total number of Rows in the Grid!")
            return
        }
        if(selectedEndColValue >= totalCols){
            alert("Finish Node Column Value is greater than the total number of Columns in the Grid!")
            return
        }
        if(selectedStartRowValue >= totalRows){
            alert("Finish Node Row Value is greater than the total number of Rows in the Grid!")
            return
        }
        setIsAnimating(true);
        resetVisitedNodesToFalse();
        let startNode = grid[START_NODE_ROW][START_NODE_COL];
        let endNode = grid[END_NODE_ROW][END_NODE_COL];
        //NOTE: visitedNodesInOrder returns ALL the nodes that were traversed UNTIL REACHING THE END NODE!
        //this process precomputes the dijkstra algorithm and stores the Nodes in an array
        //NOTE: it also changes the value of the nodes visited to Node.isVisited=true
        
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode); 

        console.log("nodes in shortest path order: ", nodesInShortestPathOrder); 
        //this actually writes the dijkstra computation onto the screen, i.e. updates the UI
        await animateDijkstra(visitedNodesInOrder);

        console.log("VisitedNodesInOrder: ", visitedNodesInOrder);
        console.log("Last visitedNodesInOrder: ", visitedNodesInOrder[visitedNodesInOrder.length - 1]);
        
        if(!visitedNodesInOrder[visitedNodesInOrder.length - 1].isFinish){
            alert("Cannot Reach the End Destination")
        }

        //This will only be true if the animateDijkstra function has raeched the finish node
        if(dijkstraCompleted){
            console.log("we will now call the animateShortestPath function from visualizeDijkstra()");
            animateShortestPath(nodesInShortestPathOrder);
        }
        
    }

    // NOTE: This literally changes the COLOR of the grid by removing the Visited Paths and the Shortest Paths!
    const resetVisitedNodesToFalse = () => {
        
        //creates a shallow copy of the grid, which means the nested arrays WILL CHANGE THE ORIGINAL
        let newGrid = [...grid];
        
        //you can also do initialGrid = Array(totalRows).fill(Array(totalCols).fill('')), to create 
        for (let row = 0; row < totalRows; row ++) {
            for (let col = 0; col < totalCols; col++){

                //if the current node has been visited before, we will turn it into an unvisited node
                if (newGrid[row][col].isVisited || 
                    newGrid[row][col].previousNode || 
                    newGrid[row][col].isShortestPath){
                    const node = newGrid[row][col];
                    const newNode = {
                        ...node,
                        isVisited: false,
                        isShortestPath: false,
                        distance: Infinity,
                        previousNode: null,
                    }
                    newGrid[row][col] = newNode;
                }
            }               
        }
        setGrid(newGrid);
    }

    const resetWalls = () => {
        let newGrid = [...grid];
        for (let row = 0; row < totalRows; row ++) {
            for (let col = 0; col < totalCols; col++){

                //if the current node has been visited before, we will turn it into an unvisited node
                if (newGrid[row][col].isWall){
                    const node = newGrid[row][col];
                    const newNode = {
                        ...node,
                        isWall: false,
                    }
                    newGrid[row][col] = newNode;
                }                
            }
        }

        setGrid(newGrid);
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const animateDijkstra = async (visitedNodesInOrder) => {
        //if dijkstraComplete
        console.log("Begin animating Dijkstra!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        for(let index = 0; index < visitedNodesInOrder.length; index++){            //our animation has reached the end Node (i.e. visitedNodes.length)
            console.log("current index: ", index);

            //NOTE: updates the state of the visitedNodes array in the React component. 
            /*
                HACK: setVisitedNodes: This is the function provided by the useState hook that allows you to update 
                the state of the visitedNodes array. 
                HACK: prevVisitedNodes: This is a parameter of the callback function passed to setVisitedNodes.
                It represents the current value of the visitedNodes state before the update.
                HACK: [...prevVisitedNodes, visitedNodesInOrder[index]]: This part creates a new array that includes all
                the elements from the current visitedNodes array (prevVisitedNodes) and adds a new element from the 
                visitedNodesInOrder array at the specified index (index).
                HACK: The entire line is inside a function that gets executed when the shortest path animation is triggered. 
                It adds the current node being animated to the visitedNodes state array.
            */

            setVisitedNodes(prevVisitedNodes => [...prevVisitedNodes, visitedNodesInOrder[index]]);
            console.log("right before delay and after setVisitedNodes");
            
            // NOTE: Due to the await, it will just IMMEDIATELY jump to the render() function 
            await delay(10);
            
            if(visitedNodesInOrder[index] === grid[END_NODE_ROW][END_NODE_COL]){
                console.log("we have reach the end node: ", visitedNodesInOrder[index]);
                dijkstraCompleted = true;
            }
            
            //NOTE: ORDER OF OPERATIONS: log("current index"), setVisitedNodes(), log("right before render"), await delay(10000),
                                   //after 10000ms: render(), log("after delay") 
            console.log("after delay");
        } 

            if(dijkstraCompleted){
                console.log("Finished animating Dijkstra!")
            }
    }
    
    const animateShortestPath = async (nodesInShortestPathOrder) => {
        
        console.log("AnimateShortestPath!: ", getNodesInShortestPathOrder(nodesInShortestPathOrder));
        console.log("nodesInShortestPathOrder.length: ", nodesInShortestPathOrder.length);
        
        //our animation has reached the end Node (i.e. visitedNodes.length)
        for(let index = nodesInShortestPathOrder.length - 2; index > 0 ; index--){            
            console.log("current index: ", index);
            console.log(`nodesInShortestPath[${index}]: `, nodesInShortestPathOrder[index]);
            setShortestPathNodes(prevVisitedNodes => [...prevVisitedNodes, nodesInShortestPathOrder[index]]);
            await delay(10);
        }   
        setIsAnimating(false);
    }

    
    return (
      <>
        {console.log("IN THE MAIN RETURNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN STATEMENT")}
        <div className="buttons">
            <button onClick={visualizeDijkstra}> Visualize Algorithm </button>
            <button onClick={resetGrid}>Reset Grid</button>
            <button onClick={generateRandomGrid}>Generate Random Grid (or click and drag your mouse)</button>
        </div>
        
        <h3>Selected Grid Columns and Rows: {(selectedGridColValue) + ", " + (selectedGridRowValue) }</h3>
        
        {console.log("selected Grid Col Size: ", totalCols)}
        
        <label> Grid Columns:
            <StartRowDropdown
                dropDownType="grid-col-dropdown"
                updateGridColSize={handleSelectGridColValue} //this will hold and set the value of the Grid Columns
            />
            
        </label>

        {console.log("selected Grid Row Size: ", totalRows)}

        <label> Grid Rows:
            <StartRowDropdown
                dropDownType="grid-row-dropdown"
                updateGridRowSize={handleSelectGridRowValue} //this will hold and set the value of the Grid Rows
            />
            
        </label>

        <h3>Selected Start Column and Row Values: {(selectedStartColValue + 1) + ", " + (selectedStartRowValue + 1) }</h3>
        
        <label> Start Col Value:
            <StartRowDropdown
                onSelectStartCol={START_NODE_COL}
                onSelectStartRow={START_NODE_ROW}
                onSelectEndCol={END_NODE_COL}
                onSelectEndRow={END_NODE_ROW}
                dropDownType="start-col-dropdown"
                updateStartColPositionInGrid={handleSelectStartColValue} //this will hold and set the value of the startCol
            />
            
        </label>
        
        <label> Start Row Value:
            <StartRowDropdown
                onSelectStartCol={START_NODE_COL}
                onSelectStartRow={START_NODE_ROW}
                onSelectEndCol={END_NODE_COL}
                onSelectEndRow={END_NODE_ROW}
                dropDownType="start-row-dropdown"    
                updateStartRowPositionInGrid={handleSelectStartRowValue} //this will hold and set the value of the startRow
            />
        </label>
        
        {/* {console.log("BEFORE END_NODE_COL was changed: ", END_NODE_COL)} */}
        <h3>Selected End Column and Row Values: {(selectedEndColValue + 1) + ", " + (selectedEndRowValue + 1)}</h3>
        <label> End Col Value:
            <StartRowDropdown 
                onSelectStartCol={START_NODE_COL}
                onSelectStartRow={START_NODE_ROW}
                onSelectEndCol={END_NODE_COL}
                onSelectEndRow={END_NODE_ROW}
                dropDownType="end-col-dropdown"    
                updateEndColPositionInGrid={handleSelectEndColValue} //this will hold and set the value of the endCol
            />
        </label>
        {/* {console.log("AFTER END_NODE_COL was changed: ", END_NODE_COL)} */}
        <label> End Row Value:
            <StartRowDropdown
                onSelectStartCol={START_NODE_COL}
                onSelectStartRow={START_NODE_ROW}
                onSelectEndCol={END_NODE_COL}
                onSelectEndRow={END_NODE_ROW}
                dropDownType="end-row-dropdown"    
                updateEndRowPositionInGrid={handleSelectEndRowValue} //this will hold and set the value of the endRow
            />
        </label>
        
        <div className="grid">
          {/* incrementally adds nodes and its neighbours, starting from start node, until reaching end node */}
          {console.log("In render function, visitedNodes: ", visitedNodes)}
          {console.log("In render function, shortestPathNodes: ", shortestPathNodes)}
          {grid.map((row, rowIdx) => (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => (
                <Node
                  key={nodeIdx}
                  row={rowIdx}
                  col={nodeIdx}
                  isStart={node.isStart}
                  isFinish={node.isFinish}
                  isWall={node.isWall}
                  isVisited={visitedNodes.includes(node)}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                  onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                  onMouseUp={handleMouseUp}
                  isShortestPath={shortestPathNodes.includes(node)}
                />
              ))}
            </div>
          ))}
        </div>
      </>
    );
}

const createNode = (col, row) => {
   return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isShortestPath: false
   };
}

const getInitialGrid = () => {
   const grid = [];
    
   //you can also do initialGrid = Array(totalRows).fill(Array(totalCols).fill('')), to create 
   for (let row = 0; row < totalRows; row ++) {
        const currentRow = [];
        for (let col = 0; col < totalCols; col++){
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
}

const getNewGridWithWallToggled = (grid, row, col) => {
    if((row === START_NODE_ROW && col === START_NODE_COL) || (row === END_NODE_ROW && col === END_NODE_COL)){
        console.log("in the get new Grid start row, col OR end row, col: ", row, col)
        return grid;
    }
    
    const newGrid = [...grid]; //creates a shallow copy of the grid, which means the nested arrays WILL CHANGE THE ORIGINAL

    //grid because NESTED OBJECTS THAT ARE SHALLOW COPIED WILL ALTER THE ORIGINAL OBJECT AS WELL! 
    // console.log("newGrid: ", newGrid);
    console.log("row: ", row)
    console.log("col: ", col)
    const node = newGrid[row][col];
    const newNode = {
        ...node, //produces a SHALLOW copy of the node
        isWall: !node.isWall, //this TOGGLES the node so that if a wall already exists, set isWall=False, else set isWall=true
    };
    newGrid[row][col] = newNode;
    return newGrid;
}


