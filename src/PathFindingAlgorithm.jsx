import React, { useEffect, useState, useRef } from "react";
import Node from "./Node";
import "./PathFindingAlgorithm.css";
import { dijkstra, getNodesInShortestPathOrder } from "./dijkstra";
import StartRowDropdown from "./Dropdown";
import useScreenWidth from "./ScreenWidthHook";

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
  const [isAnimating, setIsAnimating] = useState(null); // State to track animation status

  // const [selectedStartColValue, setSelectedStartColValue] = useState(selectedStartColValue);
  // const [selectedStartRowValue, setSelectedStartRowValue] = useState(selectedStartRowValue);
  // cont screenWidtdEndColValue] = useState(selectedEndColValue);
  // const [selectedEndRowValue, setSelectedEndRowValue] = useState(selectedEndRowValue);

  // const [selectedGridColValue, setSelectedGridColValue] = useState(selectedGridColValue);
  // const [selectedGridRowValue, setSelectedGridRowValue] = useState(totalRows);

  //selected
  // let selectedStartColValue = selectedStartColValue;
  // let selectedStartRowValue = selectedStartRowValue;
  // let selectedEndColValue = selectedEndColValue;
  // let selectedEndRowValue = selectedEndRowValue;

  let dijkstraCompleted = false;
  let dijkstraNotComplete = false;
  let screenWidth = useScreenWidth();

  const abortControllerRef = useRef(null); // Create a ref for the AbortController
  const previousCountRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    /* TODO: 1) The problem here is that whenever I click "Visualize Dijkstra" AFTER the alert "Cannt Reach the End Destination", 
             it makes the walls reset
             2) Futhermore, if the algorithm reaches the end node, it doesn't reveal the colorful shortest path visualization 
     */

    if (screenWidth >= 1300) {
      console.log(
        "1300 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 50;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 1100) {
      console.log(
        "1100 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 40;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 900) {
      console.log(
        "900 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 30;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 700) {
      console.log(
        "700 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 20;
      const grid = getInitialGrid();
      setGrid(grid);
    } else if (screenWidth >= 500) {
      console.log(
        "500 screenWidthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ",
        screenWidth
      );
      MAX_TOTAL_COL = selectedGridColValue = 12;
      const grid = getInitialGrid();
      setGrid(grid);
    }

    // if (!visitedNodesInOrderRef.current.length) return; //skip if array is empty

    // const lastVisitedNode = visitedNodesInOrderRef.current[
    //   visitedNodesInOrderRef.current.length - 1
    // ];

    // if (!lastVisitedNode.isFinish && !isAnimatingRef.current) {
    //   setIsAnimating(false); //allows for drawing walls after the animation has completed
    //   //TODO: IT resets the walls on the grid for some reason....
    //   alert("Within useEffect(), Cannot Reach the End Destination");
    // }
    // if(!visitedNodesInOrder[visitedNodesInOrder.length - 1].isFinish && !isAnimating){
    //   alert("within useEffect() AND if(isAnimating): ", isAnimating);
    // }

    // if (isNewAnimationStarted === false) {
    //   alert("Within UseEffect, isNewAnimatedStarted: Cannot Reach the End Destination");
    // }

    // Here, you can cancel any ongoing animation or cleanup resources if needed
    // I wish to cancel the previous Dijkstra animation,
    console.log("Within UseEffect(), Current Animation Counter Value: ");
    console.log("Within UseEffect, screenWidth: ", screenWidth);
  }, [screenWidth]);

  //updates start col value and updates the grid accordingly
  const handleSelectStartColValue = (value) => {
    // if(value === selectedEndColValue && selectedStartRowValue === selectedEndRowValue){
    //   alert("1) STUPID, THEY ARE SAME COL")
    //   return
    // }
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
    // if(value === selectedEndRowValue && selectedStartColValue === selectedEndColValue){
    //   alert("2) STUPID, THEY ARE SAME ROW")
    //   return
    // }
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
    // if(value === selectedStartColValue && selectedStartRowValue === selectedEndRowValue){
    //   alert("3) STUPID, THEY ARE SAME COL")
    //   return
    // }
    selectedEndColValue = value;
    selectedEndColValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("UseEffect(), in handleSelect withhhhh col value: ", value);
  };

  const handleSelectEndRowValue = (value) => {
    // if(value === selectedStartRowValue && selectedStartColValue === selectedEndColValue){
    //   alert("4) STUPID, THEY ARE SAME ROW")
    //   return
    // }
    selectedEndRowValue = value;
    selectedEndRowValue = value;
    const grid = getInitialGrid();
    setGrid(grid);
    console.log("UseEffect(), in handleSelect withhhhh row value: ", value);
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
    //TODO: Decide if you need setIsAnimating
    setIsAnimating(false);
    // isAnimating = false
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
    //TODO: Decide if you need this
    setIsAnimating(false);
    // isAnimating = false
  };

  //This needs to be an async function because we must await the result from animateDijkstra function before calling the
  //animateShortestpath() function

  const visualizeDijkstra = async () => {
    //if the previous animation is running, just return it early (i.e. cancel the previous call)
    // if(isAnimatingRef.current){
    setCount(count + 1);
    if (isAnimating) {
      console.log("counter isAnimating is already set to true...");
      // Set the cancelAnimation flag to true to stop the ongoing animation
      // cancelAnimation = true;

      //if animation is already in progress, cancel it
      // return;
    }

    //TODO: REFACTOR THE IF CONDITIONS USING: selectedStartColValue, selectedStartRowValue, selectedEndColValue, selectedEndRowValue instead of "selected"
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

    // isAnimatingRef.current = true; // Animation starts

    let startNode = grid[selectedStartRowValue][selectedStartColValue];
    let endNode = grid[selectedEndRowValue][selectedEndColValue];
    //NOTE: visitedNodesInOrder returns ALL the nodes that were traversed UNTIL REACHING THE END NODE!
    //this process precomputes the dijkstra algorithm and stores the Nodes in an array
    //NOTE: it also changes the value of the nodes visited to Node.isVisited=true

    // Create a new AbortController

    // Set isNewAnimationStarted to true to indicate a new animation has started
    // setIsNewAnimationStarted(true);

    /*
    //first time instantiating abortControllerRef
    if (abortControllerRef.current === null) {
      console.log("counter newAbortController instantiated");
      abortControllerRef.current = newAbortController;
      alert("1")
    }

    //not first time instantiated AND if there was NOT a signal from above to abort, then reset the abortControllerRef
    else if (abortControllerRef.current && !abortControllerRef.current.signal) {
      console.log(
        "counter newAbortController with abort signal as FALSE, WE RESET abortControl to original"
      );
      abortControllerRef.current = newAbortController;
      alert("2")
    }

    //else, not first time instantiated AND if there WAS a signal from above to abort, then DO NOT reset the abortControllerRef
    else if (abortControllerRef.current && abortControllerRef.current.signal) {
      console.log(
        "counter newAbortController with abort signal as TRUE, we DO NOT RESET abortControl"
      );
      alert("3")
    }
    */

    // abortControllerRef.current = newAbortController;
    // console.log("counter signal after: ", abortControllerRef.current.signal);

    setIsAnimating(true);

    //NOTE: This updates the CountRef to the most currrent value.
    previousCountRef.current = count;

    try {
      console.log(
        "beforeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee signallllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
      );

      // Perform animation or any asynchronous task
      const visitedNodesInOrder = dijkstra(grid, startNode, endNode, {
        signal: abortControllerRef.signal, // Pass the signal to dijkstra
      });
      // const visitedNodesInOrder = dijkstra(grid, startNode, endNode);

      // Perform the animation
      const animateAlgorithm = await animateDijkstra(visitedNodesInOrder);
      console.log("Next");

      console.log(
        "Counter returned animateAlgorithm value: ",
        animateAlgorithm
      );

      // if (animateAlgorithm === "wrong") {
      //   alert("Did not reach the end node!");
      //   return;
      // }

      //   if (!visitedNodesInOrder[visitedNodesInOrder.length - 1].isFinish) {
      //     alert("Cannot Reach the End Destination");
      // }

      //TODO: Here, the function call is still being processed even though we re-click "Visualize Algorthim", to fix this,
      //TODO: we should try to change the
      // Handle the result of the animation, e.g., show an alert
      // if (!visitedNodesInOrder[visitedNodesInOrder.length - 1].isFinish) {
      //   alert("Cannot Reach the End Destination");
      // }

      const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);

      console.log("nodes in shortest path order: ", nodesInShortestPathOrder);
      //this actually writes the dijkstra computation onto the screen, i.e. updates the UI

      // await animateDijkstra(visitedNodesInOrder)

      // console.log("isAnimatingRef.current RIGHT AFTER animate Dijkstra: ", isAnimatingRef.current)
      // isAnimatingRef.current = false; // Animation finishes
      // console.log("isAnimatingRef.current RIGHT AFTER AFTER animate Dijkstra: ", isAnimatingRef.current)

      //TODO: Decide whether you need setIsAnimating(true)
      // setIsAnimating(false);
      // isAnimating = true

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
      /*
      else if (dijkstraNotComplete) {
        alert("dijkstaNotComplete, Cannot Reach the End Destination");
      }
      */
    } catch (error) {
      // Handle any errors, e.g., if the animation is cancelled
      console.error("Animation error:", error.message);
    } finally {
      // Clean up the AbortController
      console.log("finally: clean up abortControllerRef");
      //TODO: Maybe this is necessary, not sure though, probably not
      abortControllerRef.current = null;

      // Reset isNewAnimationStarted
      // setIsNewAnimationStarted(false);
    }

    // const visitedNodesInOrder = dijkstra(grid, startNode, endNode);

    // visitedNodesInOrderRef.current = visitedNodesInOrder; // Update the ref
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
      "Begin animating Dijkstra!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    console.log(
      "Counter abortControllerRef.current: ",
      abortControllerRef.current
    );

    if (
      abortControllerRef.current &&
      abortControllerRef.current.signal.aborted
    ) {
      console.log("IFFF Counter abortControllerRef.current.signal.aborted");
      //TODO: When I add this 'return' statement, it just cleans up the visualization, it DOES NOT reset the animation
      //TODO: However, the for loop directly below that was initiated FROM THE PREVIOUS "visualizeDijksta()" continues to go on
      // return;
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

    //NOTE: VERY IMPORTANT!!!
    // if(!abortControllerRef.current){
    //   alert("We ARE in the most recent iteration, this is the REAL ALERT!")
    // }

    //finished Aniamting Dijkstra
    setIsAnimating(false);

    //Case 1: We have NOT clicked on the visualize button early before starting new animation, and surrounded by wall
    //Case 2: We HAVE clicked on the visusalize button early before starting new animation, and surrounded by wall (DONE)
    console.log("isAnimating: ", isAnimating);
    // alert(`abortControllerRef.current: ${abortControllerRef.current}`)
    // alert(`abortControllerRef.current.signal.aborted: ${abortControllerRef.current.signal.aborted}, isAnimating: ${isAnimating}`)

    //abortController.current ==> DID abort
    //!abortController.current ==> DID NOT abort

    console.log(
      "zz: abortControllerRef.current, isAnimating, previousCountRef.current, count",
      abortControllerRef.current,
      isAnimating,
      previousCountRef.current,
      count
    );

    //NOTE: previousCountRef.current will always store the most updated iteration vaue,
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

      //TODO: I DONT THINK I NEED THIS.....
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

    /*
    if(isAnimating){
      alert(`if isAnimating isAnimating`)
    }
    else if(!isAnimating){
      alert(`else if NOT isAniamting`)
    }
    */
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

    //TODO: Decide whether you need setIsAnimating
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
              // onSelectStartCol={selectedStartColValue}
              // onSelectStartRow={selectedStartRowValue}
              // onSelectEndCol={selectedEndColValue}
              onSelectEndRow={selectedEndRowValue}
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
              onSelectStartCol={selectedStartColValue}
              // onSelectStartRow={selectedStartRowValue}
              // onSelectEndCol={selectedEndColValue}
              // onSelectEndRow={selectedEndRowValue}
              // initialGridColSize={selectedGridColValue}
              // initialGridRowSize={selectedGridRowValue}
              dropDownType="start-col-dropdown"
              updateStartColPositionInGrid={handleSelectStartColValue} //this will hold and set the value of the startCol
            />
          </label>

          <label>
            {" "}
            Start Rows:
            <StartRowDropdown
              // onSelectStartCol={selectedStartColValue}
              onSelectStartRow={selectedStartRowValue}
              // onSelectEndCol={selectedEndColValue}
              // onSelectEndRow={selectedEndRowValue}
              // initialGridColSize={selectedGridColValue}
              // initialGridRowSize={selectedGridRowValue}
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
              // onSelectStartCol={selectedStartColValue}
              // onSelectStartRow={selectedStartRowValue}
              onSelectEndCol={selectedEndColValue}
              // onSelectEndRow={selectedEndRowValue}
              // initialGridColSize={selectedGridColValue}
              // initialGridRowSize={selectedGridRowValue}
              dropDownType="end-col-dropdown"
              updateEndColPositionInGrid={handleSelectEndColValue} //this will hold and set the value of the endCol
            />
          </label>
          {/* {console.log("AFTER selectedEndColValue was changed: ", selectedEndColValue)} */}
          <label>
            {" "}
            End Rows:
            <StartRowDropdown
              // onSelectStartCol={selectedStartColValue}
              // onSelectStartRow={selectedStartRowValue}
              // onSelectEndCol={selectedEndColValue}
              onSelectEndRow={selectedEndRowValue}
              // initialGridColSize={selectedGridColValue}
              // initialGridRowSize={selectedGridRowValue}
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
  console.log("AHH Before:", row, col);
  newGrid[row][col] = newNode;
  console.log("AHH After:", row, col);
  return newGrid;
};
