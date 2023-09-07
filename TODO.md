Current Fixes to make:

1. Within Dropdown.jsx, the Start and End Row/Col Drop down values defaults to 1 for some reason when 
the Grid Row or Column values are smaller than the Row or Column Value of either the Start/End Nodes
2. 
3. 
4. 


------------------------------------
Once completed the project, add the following features:

1. Dynamically change grid size as the user changes window size (DONE)
2. If the user wants to resize the grid smaller than either the start or end node's column/row position, it 
breaks the dropdown col and row value for that node
3. Fix the alert only when the animation hits a deadend (i.e. its trapped within the walls and cannot reach the end node) and if the user decides to cut the animation short by pressing the "Visualize Algorithm" button again, the alert should not show up from the previous run(s)
4. Allow for multiple squares to be the end destination and the algorithm should choose the destination square that is closest to the start
5. Also finish DFS (using Stack Data Structure), Weighted Dijkstra, and A* pathfinding algorithms
6. If time permits:
    - Refactor CSS to use TailwindCSS instead
    - refactor using Hooks
    - refactor everything into Typescript, but push the Javascript Version onto a branch in Gihub first!



