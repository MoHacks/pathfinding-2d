import React, { useEffect, useState, useRef } from "react";
import Node from "./Node";
import "./PathFindingAlgorithm.css";
import { dijkstra, getNodesInShortestPathOrder } from "../dijkstra";
import StartRowDropdown from "./Dropdown";
import useScreenWidth from "../ScreenWidthHook";

let selectedStartColValue = 5;
let selectedStartRowValue = 7;
let selectedEndColValue = 7;
let selectedEndRowValue = 3;

let MAX_TOTAL_COL = 50
let MAX_TOTAL_ROW = 50
let selectedGridColValue = MAX_TOTAL_COL;
let selectedGridRowValue = MAX_TOTAL_ROW;

export {
  selectedStartColValue,
  selectedStartRowValue,
  selectedEndColValue,
  selectedEndRowValue,
  selectedGridColValue,
  selectedGridRowValue,
  MAX_TOTAL_COL,
  MAX_TOTAL_ROW
};



// Easier to use Functional Component instead of Class Component
export default function PathFindingAlgorithm() {

  const [grid, setGrid] = useState(getInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [shortestPathNodes, setShortestPathNodes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(null); // State to track animation status

  let dijkstraCompleted = false;
  let dijkstraNotComplete = false;
  let screenWidth = useScreenWidth();

  const abortControllerRef = useRef(null);
  const previousCountRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (screenWidth >= 1300) {
      console.log(
        "1300 screenWidth: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 50;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 1100) {
      console.log(
        "1100 screenWidth: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 40;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 900) {
      console.log(
        "900 screenWidth: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 30;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 700) {
      console.log(
        "700 screenWidth: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 20;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 100) {
      console.log(
        "500 screenWidth: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 10;
      const grid = getInitialGrid();
      setGrid(grid);
    }


    // Here, you can cancel any ongoing animation or cleanup resources if needed
    console.log("Within UseEffect(), Current Animation Counter Value: ");
    console.log("Within UseEffect, screenWidth: ", screenWidth);
  }, [screenWidth]);

  //updates start col value and updates the grid accordingly
  const handleSelectStartColValue = (value) => {
    selectedStartColValue = value;
    selectedStartColValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log(
      "UseEffect(), in handleSelectedStartColValue with col value: ",
      value
    );
  };

  const handleSelectStartRowValue = (value) => {
    selectedStartRowValue = value;
    selectedStartRowValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log(
      "UseEffect(), in handleSelectStartRowValue with row value: ",
      value
    );
  };

  const handleSelectEndColValue = (value) => {
    selectedEndColValue = value;
    selectedEndColValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("UseEffect(), in handleSelect withhhhh col value: ", value);
  };

  const handleSelectEndRowValue = (value) => {
    selectedEndRowValue = value;
    selectedEndRowValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("UseEffect(), in handleSelect withhhhh row value: ", value);
  };

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
    for (
      let i = 0;
      i < (selectedGridColValue * selectedGridRowValue) / 3;
      i++
    ) {
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
    //if the previous animation is running, just return it early (i.e. cancel the previous call)
    setCount(count + 1);
    if (isAnimating) {
      console.log("counter isAnimating is already set to true...");

    }

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
    if (selectedEndRowValue >= selectedGridRowValue) {
      alert(
        "Finish Node Row Value is greater than the total number of Rows in the Grid!"
      );
      return;
    }

    resetVisitedNodesToFalse();

    let startNode = grid[selectedStartRowValue][selectedStartColValue];
    let endNode = grid[selectedEndRowValue][selectedEndColValue];

    setIsAnimating(true);

    //NOTE: This updates the CountRef to the most current value.
    previousCountRef.current = count;

    try {
      console.log(
        "before signal"
      );

      // Perform animation or any asynchronous task
      const visitedNodesInOrder = dijkstra(grid, startNode, endNode, {
        signal: abortControllerRef.signal, // Pass the signal to dijkstra
      });

      // Perform the animation
      const animateAlgorithm = await animateDijkstra(visitedNodesInOrder);
      console.log("Next");

      console.log(
        "Counter returned animateAlgorithm value: ",
        animateAlgorithm
      );

      const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);

      console.log("nodes in shortest path order: ", nodesInShortestPathOrder);

      console.log("VisitedNodesInOrder: ", visitedNodesInOrder);
      console.log(
        "Last visitedNodesInOrder: ",
        visitedNodesInOrder[visitedNodesInOrder.length - 1]
      );

      if (dijkstraCompleted) {
        console.log(
          "we will now call the animateShortestPath function from visualizeDijkstra()"
        );
        animateShortestPath(nodesInShortestPathOrder);
        // alert("Found End Node!");
      }

    } catch (error) {
      // Handle any errors, e.g., if the animation is cancelled
      console.error("Animation error:", error.message);
    } finally {
      // Clean up the AbortController
      console.log("finally: clean up abortControllerRef");

      abortControllerRef.current = null;

    }

  };

  // NOTE: This literally changes the COLOR of the grid by removing the Visited Paths and the Shortest Paths!
  const resetVisitedNodesToFalse = () => {
    //creates a shallow copy of the grid, which means the nested arrays WILL CHANGE THE ORIGINAL
    console.log(
      "Within resetVisitedNodes, selectedGridRowValue, selectedGridColValue: ",
      selectedGridRowValue,
      selectedGridColValue
    );
    let newGrid = [...grid];
    //you can also do initialGrid = Array(selectedGridRowValue).fill(Array(selectedGridColValue).fill('')), to create
    for (let row = 0; row < selectedGridRowValue; row++) {
      for (let col = 0; col < selectedGridColValue; col++) {
        //if the current node has been visited before, we will turn it into an unvisited node
        if (
          newGrid[row][col].isVisited ||
          newGrid[row][col].previousNode ||
          newGrid[row][col].isShortestPath
        ) {
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
    console.log("walls have been resetted");
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
      "Begin animating Dijkstra!!!"
    );

    console.log(
      "Counter abortControllerRef.current: ",
      abortControllerRef.current
    );

    if (
      abortControllerRef.current &&
      abortControllerRef.current.signal.aborted
    ) {
      console.log("IF Counter abortControllerRef.current.signal.aborted");
    }

    for (let index = 0; index < visitedNodesInOrder.length; index++) {
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

      if (
        visitedNodesInOrder[index] ===
        grid[selectedEndRowValue][selectedEndColValue]
      ) {
        console.log(
          "we have reached the end node: ",
          visitedNodesInOrder[index]
        );
        dijkstraCompleted = true;
      }

      //NOTE: ORDER OF OPERATIONS: log("current index"), setVisitedNodes(), log("right before render"), await delay(10000),
      //after 10000ms: render(), log("after delay")
      console.log("after delay");
    }

    //finished Aniamting Dijkstra
    setIsAnimating(false);

    console.log("isAnimating: ", isAnimating);

    //abortController.current ==> DID abort
    //!abortController.current ==> DID NOT abort

    console.log(
      "zz: abortControllerRef.current, isAnimating, previousCountRef.current, count",
      abortControllerRef.current,
      isAnimating,
      previousCountRef.current,
      count
    );

    //NOTE: previousCountRef.current will always store the most updated iteration value,
    //NOTE: meanwhile the count will need to eventually catchup to previousCountRef
    //NOTE: THIS IS HOW YOU COMPARE CURRENT COUNT STATES WITH PREVIOUS COUNT STATES!
    if (previousCountRef.current === count) {
      //we let the animation complete while cutting previous animation(s) short
      if (
        abortControllerRef.current === null &&
        !visitedNodesInOrder[visitedNodesInOrder.length - 1].isFinish
      ) {
        alert("1) Hit the Wall! Cannot Reach the End Destination!");
      }

      //we let the animation finish completely without cutting previous animation(s) short
      else if (
        (isAnimating === false || isAnimating === null) &&
        abortControllerRef.current &&
        !abortControllerRef.current.signal.aborted &&
        !visitedNodesInOrder[visitedNodesInOrder.length - 1].isFinish
      ) {
        alert("2) Hit the Wall! Cannot Reach the End Destination!");
      }

      dijkstraNotComplete = true;
    }

    if (dijkstraCompleted) {
      console.log("Finished animating Dijkstra!");
    } else if (dijkstraNotComplete) {
      console.log("Dijkstra NOT complete!");
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
        "IN THE MAIN RETURN STATEMENT"
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
            GridCols:
            <StartRowDropdown
              dropDownType="grid-col-dropdown"
              initialGridColSize={selectedGridColValue}
              onSelectEndRow={selectedEndRowValue}
              updateGridColSize={handleSelectGridColValue} //this will hold and set the value of the Grid Columns
            />
          </label>

          {console.log("selected Grid Row Size: ", selectedGridRowValue)}
          <label>
            {" "}
            GridRows:
            <StartRowDropdown
              dropDownType="grid-row-dropdown"

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
            StartCols:
            <StartRowDropdown
              onSelectStartCol={selectedStartColValue}
              dropDownType="start-col-dropdown"
              updateStartColPositionInGrid={handleSelectStartColValue} //this will hold and set the value of the startCol
            />
          </label>

          <label>
            {" "}
            StartRows:
            <StartRowDropdown
              onSelectStartRow={selectedStartRowValue}
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
            EndCols:
            <StartRowDropdown
              onSelectEndCol={selectedEndColValue}
              dropDownType="end-col-dropdown"
              updateEndColPositionInGrid={handleSelectEndColValue} //this will hold and set the value of the endCol
            />
          </label>
          {/* {console.log("AFTER selectedEndColValue was changed: ", selectedEndColValue)} */}
          <label>
            {" "}
            EndRows:
            <StartRowDropdown
              onSelectEndRow={selectedEndRowValue}
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
    isStart: row === selectedStartRowValue && col === selectedStartColValue,
    isFinish: row === selectedEndRowValue && col === selectedEndColValue,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isShortestPath: false,
  };
};

const getInitialGrid = () => {
  const grid = [];

  //you can also do initialGrid = Array(selectedGridRowValue).fill(Array(selectedGridColValue).fill('')), to do the same thing
  for (let row = 0; row < selectedGridRowValue; row++) {
    const currentRow = [];
    for (let col = 0; col < selectedGridColValue; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  console.log("FINAL selectedGridColValue: ", selectedGridColValue);
  console.log("FINAL selectedGridRowValue: ", selectedGridRowValue);
  return grid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  // If the row and col cell that was clicked on is the start or end cell, do nothing and return the grid
  if (
    (row === selectedStartRowValue && col === selectedStartColValue) ||
    (row === selectedEndRowValue && col === selectedEndColValue)
  ) {
    console.log(
      "in the get new Grid start row, col OR end row, col: ",
      row,
      col
    );
    return grid;
  }

  const newGrid = [...grid]; //creates a shallow copy of the grid, which means the nested arrays WILL CHANGE THE ORIGINAL grid
  // because NESTED OBJECTS THAT ARE SHALLOW COPIED WILL ALTER THE ORIGINAL OBJECT AS WELL!
  // console.log("newGrid: ", newGrid);
  console.log("row: ", row);
  console.log("col: ", col);
  const node = newGrid[row][col];
  const newNode = {
    ...node, //produces a SHALLOW copy of the node
    isWall: !node.isWall, //this TOGGLES the node so that if a wall already exists, set isWall=False, else set isWall=true
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
