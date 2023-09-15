Current fixes to make:

1. Make the Start position of Start/End Nodes not touch each other (DONE)
2. The screenWidth in UseEffect is glitchy, fix ASAP!!!!! (DONE)
3. Perhaps remove selectedStartColValue, selectedStartRowValue, selectedEndColValue, selectedEndRowValue and replace it with the respective selectedStartColValue, selectedStartRowValue, selectedEndColValue, selectedEndRowValue --> Still need to make sure the lengths of the dropdown Values do not exceed the lengths of the grid row/columns (DONE)
4. When the screenWidth is smaller, make sure that the max col option never exceeds the screenWidth (>=1300px, >=1000px, >=900px, >=700px, >=500px)
5. 

---

Once completed the project, add the following features:
1. Allow a slider for different animation speeds
2. Allow for multiple squares to be the end destination and the algorithm should choose the destination square that is closest to the start
3. Also finish DFS (using Stack Data Structure), Weighted Dijkstra, and A\* pathfinding algorithms
4. If time permits:
   - Refactor CSS to use TailwindCSS instead
   - refactor using Hooks
   - refactor everything into Typescript, but push the Javascript Version onto a branch in Gihub first!

TODO: Lessons Learned

1. Within the return() statement of PathfindingAlgorithm.jsx, you ONLY WANT to pass in the respective "onSelect" value, for instance, when you want to render the **End Node Column** value, you pass the `onSelectEndCol` value in the DropDown Component as a prop. This prop gets rendered as a DropDown FOR THAT RESPECTIVE NODE ATTRIBUTE (i.e. either Start/End Node Position)
2. **DO NOT PASS IN** the `onSelectStartCol, onSelectStartRow, onSelectEndRow` attributes for the **End Node Column**. Since passing in those values will **OVERRIDE** the previous `onSelectStart, onSelectStartRow, onSelectEndRow` values, which you dont want since it creates **unnessary re-rendering** and will trigger the `useEffect()` function from the `Dropdown.jsx` since its listening for changes for all the `onSelect` variables. But we only want to update the respective `onSelect` variable \_\_FOR ITS SPECIFIC `dropDownType` (in the `renderDropdownDiv()` function).

```javascript
<Dropdown
  // onSelectStartCol={selectedStartColValue}
  // onSelectStartRow={selectedStartRowValue}
  onSelectEndCol={selectedEndColValue}
  // onSelectEndRow={selectedEndRowValue}
  // initialGridColSize={selectedGridColValue}
  // initialGridRowSize={selectedGridRowValue}
  dropDownType="end-col-dropdown"
  updateEndColPositionInGrid={handleSelectEndColValue} //this will hold and set the value of the endCol
/>
```
