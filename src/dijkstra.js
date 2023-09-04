//TODO: Rename to Breadth-First Search
export function dijkstra(grid, startNode, endNode){
    // if(!start || !target || start === target){
    //     return false;
    // }

    //TODO: Change this to a min-heap so that its more efficient
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    
    // After every closest node that we select, we append it to an array of closest nodes IN ORDER

    //This while loop is saying that as long as we have unvisitedNodes to visit (which at the first iteration, includes all nodes),
    //sortNodesByDistance function will take ALL the nodes (since all of them are considered unvisited in the beginning), 
    //it will take the 
    
    while (unvisitedNodes.length){
        console.log("Current unvistedNodes length: ", unvisitedNodes.length);
        //it simply sorts nodes by their distance
        //since the startNode.distance = 0 is the distance of the start node, that means it will take precendence first in the 
        //unvisitedNodes array
        // console.log("unvisitedNodes BEFORE SORT: ", unvisitedNodes)
        // sortNodesByDistance(unvisitedNodes);
        // console.log("sorted unvisitedNodes: ", unvisitedNodes);

        // Log the original order
        console.log("Before sorting:", [...unvisitedNodes]); 
        //Sort array, initially, all nodes will have distance property of Infinity EXCEPT the startNode
        sortNodesByDistance(unvisitedNodes);
        
        //creates a SHALLOW COPY of the unvisitedNodes object
        console.log("unvisitedNodes.slice(0,10): ", unvisitedNodes.slice(0, 10));
        // for(let i = 0; i < 10; i++){
            // console.log("ah: ", unvisitedNodes[i].isVisited);
        // }
        
        // pop first element from the array 
        const closestNode = unvisitedNodes.shift();
        
        //NOTE: if we encounter a wall, we continue to the next iteration
        if(closestNode.isWall){
            continue;
        }

        //NOTE: if we can't find the next closest next, i.e. if the wall wraps completely around the starNode and we 
        //can't make it to the end node, just stop
        if(closestNode.distance === Infinity){
            return visitedNodesInOrder;
        }
        
        //sets the popped element's (i.e. closest element w.r.t previous node) isVisited property to true
        //this makes sure that we don't re-append it to the unvisitedNeighbours array since its already visited
        //NOTE: THIS IS WHERE THE 
        closestNode.isVisited = true;
        
        // After every closest node that we select, we append it to an array of closest nodes that are already in order 
        visitedNodesInOrder.push(closestNode);

        //if we reach the end node, i.e. if the current node equates to the end node, we return the array of nodes
        if(closestNode === endNode){
            return visitedNodesInOrder;
        }
        
        //at each iteration, we check if its possible to append the 4 adjacent nodes of the current node
        //by checking if the adjacent nodes have a isVisited=false property
        //we also set the previous node to be the current closestNode and the distance of the next node to
        //closestNode.distance + 1
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Sort nodes based off their difference in distances
function sortNodesByDistance(unvisitedNodes){
    console.log("within sortNodesbyDistance (this is the univisitedNodes variable BEFORE sorting): ", [...unvisitedNodes]);
    unvisitedNodes.sort((nodeA, nodeB) => {
        if (nodeA.distance === Infinity) return 1; // Move Infinity values to the end, since returning positive number
                                                // for nodeA means nodeA > nodeB, therefore we swap nodeA and nodeB
        if (nodeB.distance === Infinity) return -1; // Move Infinity values to the end, since returning negative number
                                                //for nodeB means nodeA < nodeB, therefore we swap nodeA and nodeB
                                                
        
        return nodeA.distance - nodeB.distance;
    })
    console.log("within sortNodesbyDistance After sorting:", [...unvisitedNodes]); // Log the sorted order
}

function updateUnvisitedNeighbors(node, grid){
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors){
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

// Add neighbors to the current visited Node and append it to the neighbors array for it to be returned
function getUnvisitedNeighbors(node, grid){
    const neighbors = [];
    const {col, row} = node;

    // If the row number is being than zero, that means we can get the neighbor ABOVE the current node
    if (row > 0){
        neighbors.push(grid[row - 1][col]);
    }
    // If the row number is smaller than grid length - 1, that means we can get the neighbor BELOW the current node
    if(row < grid.length - 1){
        neighbors.push(grid[row + 1][col]);
    }
    // If the col number is greater than 0, that means we can get the neighbor to the LEFT of the current node
    if(col > 0){
        neighbors.push(grid[row][col - 1]);
    }
    // If the col number is less than grid length - 1, that means we can get the neighbor to the RIGHT of the current node
    if(col < grid[0].length - 1){
        neighbors.push(grid[row][col + 1])
    }
    
    // Filter the neighbors such that we keep the ones that HAVE NOT BEEN VISITED
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

//returns the nodes that we need in order to get from the finish node to the start node
export function getNodesInShortestPathOrder(finishNode){
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode != null){
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode.isShortestPath = true;
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}