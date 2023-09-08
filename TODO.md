Current fixes to make:
1. Make the program stop visualizing when the 
2. perhaps remove START_NODE_COL, START_NODE_ROW, END_NODE_COL, END_NODE_ROW and replace it with the respective selectedStartColValue, selectedStartRowValue, selectedEndColValue, selectedEndRowValue
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


TODO: Lessons Learned
1. Within the return() statement of PathfindingAlgorithm.jsx, you ONLY WANT to pass in the respective "onSelect" value, for instance, when you want to render the __End Node Column__ value, you pass the `onSelectEndCol` value in the DropDown Component as a prop. This prop gets rendered as a DropDown FOR THAT RESPECTIVE NODE ATTRIBUTE (i.e. either Start/End Node Position) 
2. __DO NOT PASS IN__ the `onSelectStartCol, onSelectStartRow, onSelectEndRow` attributes for the __End Node Column__. Since passing in those values will __OVERRIDE__ the previous `onSelectStart, onSelectStartRow, onSelectEndRow` values, which you dont want since it creates __unnessary re-rendering__ and will trigger the `useEffect()` function from the `Dropdown.jsx` since its listening for changes in the `onSelect` variables. But we only want to update the respective `onSelect` variable __FOR ITS SPECIFIC `dropDownType` (in the `renderDropdownDiv()` function).

```javascript
<Dropdown
    // onSelectStartCol={START_NODE_COL}
    // onSelectStartRow={START_NODE_ROW}
    onSelectEndCol={END_NODE_COL}
    // onSelectEndRow={END_NODE_ROW}
    // initialGridColSize={selectedGridColValue}
    // initialGridRowSize={selectedGridRowValue}
    dropDownType="end-col-dropdown"
    updateEndColPositionInGrid={handleSelectEndColValue} //this will hold and set the value of the endCol
/>
```