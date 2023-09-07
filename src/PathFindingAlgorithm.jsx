import React, { useEffect, useState } from "react";
import Node from "./Node";
import "./PathFindingAlgorithm.css";
import { dijkstra, getNodesInShortestPathOrder } from "./dijkstra";
import StartRowDropdown from "./Dropdown";
import useScreenWidth from "./ScreenWidthHook";

let START_NODE_COL = 5;
let START_NODE_ROW = 7;
let END_NODE_COL = 15;
let END_NODE_ROW = 3;
let MAX_TOTAL_COL = 20;
let MAX_TOTAL_ROW = 50;
let selectedGridColValue = MAX_TOTAL_COL;
let selectedGridRowValue = MAX_TOTAL_ROW;

export {START_NODE_COL, START_NODE_ROW, END_NODE_COL, END_NODE_ROW, MAX_TOTAL_COL, MAX_TOTAL_ROW };

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
  // cont screenWidtdEndColValue] = useState(END_NODE_COL);
  // const [selectedEndRowValue, setSelectedEndRowValue] = useState(END_NODE_ROW);

  // const [selectedGridColValue, setSelectedGridColValue] = useState(MAX_TOTAL_COL);
  // const [selectedGridRowValue, setSelectedGridRowValue] = useState(totalRows);

  //selected
  let selectedStartColValue = START_NODE_COL;
  let selectedStartRowValue = START_NODE_ROW;
  let selectedEndColValue = END_NODE_COL;
  let selectedEndRowValue = END_NODE_ROW;

  let dijkstraCompleted = false;
  let screenWidth = useScreenWidth();

  // const [customScreenWidth, setCustomScreenWidth] = useState(useScreenWidth);
  
  useEffect(() => {
    if (screenWidth >= 1300) {
      console.log(
        "1300 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = 50;
      selectedGridColValue = MAX_TOTAL_COL;
      const grid = getInitialGrid();
      setGrid(grid);
      
    } else if (screenWidth >= 1100) {
      console.log(
        "1100 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = 40;
      selectedGridColValue = MAX_TOTAL_COL;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 900) {
      console.log(
        "900 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = 30;
      selectedGridColValue = MAX_TOTAL_COL;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 700) {
      console.log(
        "700 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = 20;
      selectedGridColValue = MAX_TOTAL_COL;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 500) {
      console.log(
        "500 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = 12;
      selectedGridColValue = MAX_TOTAL_COL;
      const grid = getInitialGrid();
      setGrid(grid);
    }
  }, [screenWidth]);

  //updates start col value and updates the grid accordingly
  const handleSelectStartColValue = (value) => {
    START_NODE_COL = value;
    selectedStartColValue = value
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("in handleSelectedStartColValue with col value: ", value);
  };

  const handleSelectStartRowValue = (value) => {
    START_NODE_ROW = value;
    selectedStartRowValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("in handleSelectStartRowValue with row value: ", value);
  };

  const handleSelectEndColValue = (value) => {
    console.log("END COLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL: ", value)
    END_NODE_COL = value;
    selectedEndColValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("in handleSelect withhhhh col value: ", value);
  };

  const handleSelectEndRowValue = (value) => {
    END_NODE_ROW = value;
    selectedEndRowValue = value
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("in handleSelect withhhhh row value: ", value);
  };

  //TODO: Think about adding an if statement to this so that it only gets triggered when the user actually changes the dropdown
  const handleSelectGridColValue = (value) => {
    selectedGridColValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("in handleSelectGridColValue with col value: ", value);
  };

  const handleSelectGridRowValue = (value) => {
    selectedGridRowValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("in handleSelectGridRowValue with row value: ", value);
  };

  const handleMouseDown = (row, col) => {
    if (!isAnimating) {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  //if mouse is within the grid perimeter
  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const resetGrid = () => {
    const newGrid = getInitialGrid();
    setGrid(newGrid);
    setIsAnimating(false);
  };

  const generateRandomGrid = () => {
    // Resets all the nodes to false
    resetVisitedNodesToFalse();

    // Resets all the walls
    resetWalls();

    let newGrid = [...grid];
    let randomRow = Math.floor(Math.random() * selectedGridRowValue);
    let randomCol = Math.floor(Math.random() * selectedGridColValue);
    let updatedGrid = getNewGridWithWallToggled(newGrid, randomRow, randomCol);
    for (let i = 0; i < (selectedGridColValue * selectedGridRowValue) / 3; i++) {
      randomRow = Math.floor(Math.random() * selectedGridRowValue);
      randomCol = Math.floor(Math.random() * selectedGridColValue);
      updatedGrid = getNewGridWithWallToggled(newGrid, randomRow, randomCol);
      
    }
    let c = 0;
    for (let i = 0; i < selectedGridRowValue; i++) {
      for (let j = 0; j < selectedGridColValue; j++) {
        if (updatedGrid[i][j].isWall) {
          c += 1;
        }
      }
    }
    console.log("counter: ", c);
    setGrid(updatedGrid);
    setIsAnimating(false);
  };

  //This needs to be an async function because we must await the result from animateDijkstra function before calling the
  //animateShortestpath() function
  const visualizeDijkstra = async () => {
    //TODO: REFACTOR THE IF CONDITIONS USING: START_NODE_COL, START_NODE_ROW, END_NODE_COL, END_NODE_ROW instead of "selected"
    if (selectedStartColValue >= selectedGridColValue) {
      alert(
        "Start Node Column Value is greater than the total number of Columns in the Grid!"
      );
      return;
    }
    if (selectedStartRowValue >= selectedGridRowValue) {
      alert(
        "Start Node Row Value is greater than the total number of Rows in the Grid!"
      );
      return;
    }
    if (selectedEndColValue >= selectedGridColValue) {
      alert(
        "Finish Node Column Value is greater than the total number of Columns in the Grid!"
      );
      return;
    }
    if (selectedStartRowValue >= selectedGridRowValue) {
      alert(
        "Finish Node Row Value is greater than the total number of Rows in the Grid!"
      );
      return;
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
    console.log(
      "Last visitedNodesInOrder: ",
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    );

    if (!visitedNodesInOrder[visitedNodesInOrder.length - 1].isFinish) {
      alert("Cannot Reach the End Destination");
    }

    //This will only be true if the animateDijkstra function has raeched the finish node
    if (dijkstraCompleted) {
      console.log(
        "we will now call the animateShortestPath function from visualizeDijkstra()"
      );
      animateShortestPath(nodesInShortestPathOrder);
    }
  };

  // NOTE: This literally changes the COLOR of the grid by removing the Visited Paths and the Shortest Paths!
  const resetVisitedNodesToFalse = () => {
    //creates a shallow copy of the grid, which means the nested arrays WILL CHANGE THE ORIGINAL
    console.log("Within resetVisitedNodes, selectedGridRowValue, selectedGridColValue: ", selectedGridRowValue, selectedGridColValue) 
    let newGrid = [...grid];
    
    //you can also do initialGrid = Array(selectedGridRowValue).fill(Array(MAX_TOTAL_COL).fill('')), to create
    for (let row = 0; row < selectedGridRowValue; row++) {
      for (let col = 0; col < selectedGridColValue; col++) {
        //if the current node has been visited before, we will turn it into an unvisited node
        if (
          newGrid[row][col].isVisited ||
          newGrid[row][col].previousNode ||
          newGrid[row][col].isShortestPath
        ) {


          console.log("FUCKIN NODE: ", newGrid[row][col]);
          const node = newGrid[row][col];
          
          const newNode = {
            ...node,
            isVisited: false,
            isShortestPath: false,
            distance: Infinity,
            previousNode: null,
          };
          newGrid[row][col] = newNode;
        }
      }
    }
    setGrid(newGrid);
  };

  const resetWalls = () => {
    let newGrid = [...grid];
    for (let row = 0; row < selectedGridRowValue; row++) {
      for (let col = 0; col < selectedGridColValue; col++) {
        //if the current node has been visited before, we will turn it into an unvisited node
        if (newGrid[row][col].isWall) {
          const node = newGrid[row][col];
          const newNode = {
            ...node,
            isWall: false,
          };
          newGrid[row][col] = newNode;
        }
      }
    }

    setGrid(newGrid);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const animateDijkstra = async (visitedNodesInOrder) => {
    //if dijkstraComplete
    console.log(
      "Begin animating Dijkstra!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    for (let index = 0; index < visitedNodesInOrder.length; index++) {
      //our animation has reached the end Node (i.e. visitedNodes.length)
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

      setVisitedNodes((prevVisitedNodes) => [
        ...prevVisitedNodes,
        visitedNodesInOrder[index],
      ]);
      console.log("right before delay and after setVisitedNodes");

      // NOTE: Due to the await, it will just IMMEDIATELY jump to the render() function
      await delay(10);

      if (visitedNodesInOrder[index] === grid[END_NODE_ROW][END_NODE_COL]) {
        console.log("we have reach the end node: ", visitedNodesInOrder[index]);
        dijkstraCompleted = true;
      }

      //NOTE: ORDER OF OPERATIONS: log("current index"), setVisitedNodes(), log("right before render"), await delay(10000),
      //after 10000ms: render(), log("after delay")
      console.log("after delay");
    }

    if (dijkstraCompleted) {
      console.log("Finished animating Dijkstra!");
    }
  };

  const animateShortestPath = async (nodesInShortestPathOrder) => {
    console.log(
      "AnimateShortestPath!: ",
      getNodesInShortestPathOrder(nodesInShortestPathOrder)
    );
    console.log(
      "nodesInShortestPathOrder.length: ",
      nodesInShortestPathOrder.length
    );

    //our animation has reached the end Node (i.e. visitedNodes.length)
    for (let index = nodesInShortestPathOrder.length - 2; index > 0; index--) {
      console.log("current index: ", index);
      console.log(
        `nodesInShortestPath[${index}]: `,
        nodesInShortestPathOrder[index]
      );
      setShortestPathNodes((prevVisitedNodes) => [
        ...prevVisitedNodes,
        nodesInShortestPathOrder[index],
      ]);
      await delay(10);
    }
    setIsAnimating(false);
  };

  return (
    <>
      {console.log(
        "IN THE MAIN RETURNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN STATEMENT"
      )}
      <div className="buttons">
        <button onClick={visualizeDijkstra}> Visualize Algorithm </button>
        <button onClick={resetGrid}>Reset Grid</button>
        <button onClick={generateRandomGrid}>
          Generate Random Grid (or click and drag your mouse)
        </button>
      </div>

      <div className="headers">
        <div className="gridDimensions">
          <h3>
            Selected Grid Columns and Rows:{" "}
            {selectedGridColValue + ", " + selectedGridRowValue}
          </h3>

          {console.log("selected Grid Col Size: ", selectedGridColValue)}

          <label>
            {" "}
            Grid Cols:
            <StartRowDropdown
              dropDownType="grid-col-dropdown"
              initialGridColSize={selectedGridColValue}
              onSelectEndCol={END_NODE_COL}
              // initialGridRowSize={selectedGridRowValue}
              updateGridColSize={handleSelectGridColValue} //this will hold and set the value of the Grid Columns
            />
          </label>

          {console.log("selected Grid Row Size: ", selectedGridRowValue)}
          <label>
            {" "}
            Grid Rows:
            <StartRowDropdown
              dropDownType="grid-row-dropdown"
              // initialGridColSize={selectedGridColValue}
              
              initialGridRowSize={selectedGridRowValue}
              updateGridRowSize={handleSelectGridRowValue} //this will hold and set the value of the Grid Rows
            />
          </label>
        </div>
        
        <div className="startDimensions">
          <h3>
            Selected Start Columns and Rows:{" "}
            {selectedStartColValue + 1 + ", " + (selectedStartRowValue + 1)}
          </h3>

          <label>
            {" "}
            Start Cols:
            <StartRowDropdown
              onSelectStartCol={START_NODE_COL}
              onSelectStartRow={START_NODE_ROW}
              onSelectEndCol={END_NODE_COL}
              onSelectEndRow={END_NODE_ROW}
              initialGridColSize={selectedGridColValue}
              initialGridRowSize={selectedGridRowValue}
              dropDownType="start-col-dropdown"
              updateStartColPositionInGrid={handleSelectStartColValue} //this will hold and set the value of the startCol
            />
          </label>

          <label>
            {" "}
            Start Rows:
            <StartRowDropdown
              onSelectStartCol={START_NODE_COL}
              onSelectStartRow={START_NODE_ROW}
              onSelectEndCol={END_NODE_COL}
              onSelectEndRow={END_NODE_ROW}
              initialGridColSize={selectedGridColValue}
              initialGridRowSize={selectedGridRowValue}
              dropDownType="start-row-dropdown"
              updateStartRowPositionInGrid={handleSelectStartRowValue} //this will hold and set the value of the startRow
            />
          </label>
        </div>

        <div className="endDimensions">
          <h3>
            Selected End Columns and Rows:{" "}
            {selectedEndColValue + 1 + ", " + (selectedEndRowValue + 1)}
          </h3>
          <label>
            {" "}
            End Cols:
            <StartRowDropdown
              onSelectStartCol={START_NODE_COL}
              onSelectStartRow={START_NODE_ROW}
              onSelectEndCol={END_NODE_COL}
              onSelectEndRow={END_NODE_ROW}
              initialGridColSize={selectedGridColValue}
              initialGridRowSize={selectedGridRowValue}
              dropDownType="end-col-dropdown"
              updateEndColPositionInGrid={handleSelectEndColValue} //this will hold and set the value of the endCol
            />
          </label>
          {/* {console.log("AFTER END_NODE_COL was changed: ", END_NODE_COL)} */}
          <label>
            {" "}
            End Rows:
            <StartRowDropdown
              onSelectStartCol={START_NODE_COL}
              onSelectStartRow={START_NODE_ROW}
              onSelectEndCol={END_NODE_COL}
              onSelectEndRow={END_NODE_ROW}
              initialGridColSize={selectedGridColValue}
              initialGridRowSize={selectedGridRowValue}
              dropDownType="end-row-dropdown"
              updateEndRowPositionInGrid={handleSelectEndRowValue} //this will hold and set the value of the endRow
            />
          </label>
        </div>
        
      </div>
      <div className="grid">
        {/* incrementally adds nodes and its neighbours, starting from start node, until reaching end node */}
        {console.log("In render function, visitedNodes: ", visitedNodes)}
        {console.log(
          "In render function, shortestPathNodes: ",
          shortestPathNodes
        )}
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
    isShortestPath: false,
  };
};

const getInitialGrid = () => {
  const grid = [];

  //you can also do initialGrid = Array(selectedGridRowValue).fill(Array(MAX_TOTAL_COL).fill('')), to do the same thing
  for (let row = 0; row < selectedGridRowValue; row++) {
    const currentRow = [];
    for (let col = 0; col < selectedGridColValue; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  console.log("FINAL selectedGridColValue: ", selectedGridColValue)
  console.log("FINAL selectedGridRowValue: ", selectedGridRowValue)
  return grid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  if (
    (row === START_NODE_ROW && col === START_NODE_COL) ||
    (row === END_NODE_ROW && col === END_NODE_COL)
  ) {
    console.log(
      "in the get new Grid start row, col OR end row, col: ",
      row,
      col
    );
    return grid;
  }

  const newGrid = [...grid]; //creates a shallow copy of the grid, which means the nested arrays WILL CHANGE THE ORIGINAL
  //grid because NESTED OBJECTS THAT ARE SHALLOW COPIED WILL ALTER THE ORIGINAL OBJECT AS WELL!
  // console.log("newGrid: ", newGrid);
  console.log("row: ", row);
  console.log("col: ", col);
  const node = newGrid[row][col];
  const newNode = {
    ...node, //produces a SHALLOW copy of the node
    isWall: !node.isWall, //this TOGGLES the node so that if a wall already exists, set isWall=False, else set isWall=true
  };
  console.log("AHH Before:",row, col);
  newGrid[row][col] = newNode;
  console.log("AHH After:",row, col);
  return newGrid;
};