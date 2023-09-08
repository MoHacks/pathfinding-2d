import React, { useState } from "react";
import { useEffect } from "react";
import {
  MAX_TOTAL_ROW,
  MAX_TOTAL_COL,
  END_NODE_COL,
} from "./PathFindingAlgorithm";

const Dropdown = ({
  onSelectStartCol,
  onSelectStartRow,
  onSelectEndCol,
  onSelectEndRow,
  initialGridColSize,
  initialGridRowSize,
  dropDownType,
  updateStartColPositionInGrid,
  updateStartRowPositionInGrid,
  updateEndColPositionInGrid,
  updateEndRowPositionInGrid,
  updateGridColSize,
  updateGridRowSize,
}) => {
  // const [selectedStartColValue, setSelectedStartColValue] = useState(START_NODE_COL);
  // const [selectedStartRowValue, setSelectedStartRowValue] = useState(START_NODE_ROW);
  // const [selectedEndColValue, setSelectedEndColValue] = useState(END_NODE_COL);
  // const [selectedEndRowValue, setSelectedEndRowValue] = useState(END_NODE_ROW);

  // const [selectedGridColValue, setSelectedGridColValue] = useState(MAX_TOTAL_COL);
  // const [selectedGridRowValue, setSelectedGridRowValue] = useState(MAX_TOTAL_ROW);

  const [selectedStartColValue, setSelectedStartColValue] =
    useState(onSelectStartCol);
  const [selectedStartRowValue, setSelectedStartRowValue] =
    useState(onSelectStartRow);
  const [selectedEndColValue, setSelectedEndColValue] =
    useState(onSelectEndCol);
  const [selectedEndRowValue, setSelectedEndRowValue] =
    useState(onSelectEndRow);

  const [selectedGridColValue, setSelectedGridColValue] =
    useState(initialGridColSize);
  const [selectedGridRowValue, setSelectedGridRowValue] =
    useState(MAX_TOTAL_ROW);
  //initializes the dropdown once (MUST START WITH CAPITAL LETTER SINCE ITS A CUSTOM REACT HOOK COMPONENT FUNCTION)

  // Use the useEffect hook to trigger a re-render ONLY when the selectedValue CHANGES
  useEffect(() => {
    // This code will run whenever selectedValue changes
    // You can perform any side effects or updates here
    console.log("In useEffect(), onSelectStartCol: ", onSelectStartCol);
    console.log("In useEffect(), onSelectStartRow: ", onSelectStartRow);
    console.log("In useEffect(), onSelectEndCol: ", onSelectEndCol);
    console.log("In useEffect(), onSelectEndRow: ", onSelectEndRow);

    console.log(
      "---------------------------------------------------------------------------"
    );

    console.log(
      "In useEffect(), selectedStartColValue: ",
      selectedStartColValue
    );
    console.log(
      "In useEffect(), selectedStartRowValue: ",
      selectedStartRowValue
    );
    console.log("In useEffect(), selectedEndColValue: ", selectedEndColValue);
    console.log("In useEffect(), selectedEndRowValue: ", selectedEndRowValue);

    if (dropDownType === "start-col-dropdown") {
      console.log(
        "HANDLESTARTCOLCHANGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE: ",
        onSelectStartCol,
        selectedStartColValue,
        selectedEndColValue,
        selectedStartRowValue,
        selectedEndRowValue
      );
      console.log("Update handleStartColChange to: ", selectedStartColValue);
      updateStartColPositionInGrid(selectedStartColValue);
      console.log("Within useEffect(), finished updateStartCol");
      console.log(
        "selectedStartColValue after renderDropdownDiv was finished: ",
        selectedStartColValue
      );
    } else if (dropDownType === "start-row-dropdown") {
      console.log(
        "HANDLESTARTROWCHANGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE: ",
        onSelectStartRow,
        selectedStartRowValue,
        selectedEndRowValue,
        selectedStartColValue,
        selectedEndColValue
      );
      console.log("Update handleStartRowChange to: ", selectedStartColValue);
      updateStartRowPositionInGrid(selectedStartRowValue);
      console.log("Within useEffect(), finished updateStartRow");
      console.log(
        "selectedStartRowValue after renderDropdownDiv was finished: ",
        selectedStartRowValue
      );
    } else if (dropDownType === "end-col-dropdown") {
      console.log(
        "HANDLEENDCOLCHANGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE: ",
        onSelectEndCol,
        selectedEndColValue,
        selectedStartColValue,
        selectedStartRowValue,
        selectedEndRowValue
      );
      console.log(
        "selectedEndColValue BEFORE setSelectedEndColValue:",
        selectedEndColValue
      );
      updateEndColPositionInGrid(selectedEndColValue);
      console.log("Within useEffect(), finished updateEndCol");

      console.log(
        "selectedEndColValue after renderDropdownDiv was finished: ",
        selectedEndColValue
      );

      console.log(
        "selectedEndRow after renderDropdownDiv was finished: ",
        selectedEndRowValue
      );
      console.log(
        "selectedEndCol after renderDropdownDiv was finished: ",
        selectedEndColValue
      );
      console.log(
        "onSelectEndCol AFTERRRR renderDrowndownDiv was finished: ",
        onSelectEndCol
      );
      console.log(
        "onSelectStartCol AFTERRRR renderDrowndownDiv was finished: ",
        onSelectStartCol
      );
      console.log(
        "onSelectEndRow AFTERRRR renderDrowndownDiv was finished: ",
        onSelectEndRow
      );
      console.log(
        "onSelectStartRow AFTERRRR renderDrowndownDiv was finished: ",
        onSelectStartRow
      );
    } else if (dropDownType === "end-row-dropdown") {
      console.log(
        "HANDLEENDROWCHANGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE: ",
        onSelectEndRow,
        selectedEndRowValue,
        selectedStartRowValue,
        selectedEndColValue,
        selectedStartColValue
      );
      updateEndRowPositionInGrid(selectedEndRowValue);
      console.log("Within useEffect(), finished updateEndRow");

      console.log(
        "selectedEndRow after renderDropdownDiv was finished: ",
        selectedEndRowValue
      );
      console.log(
        "selectedEndCol after renderDropdownDiv was finished: ",
        selectedEndColValue
      );
      console.log(
        "onSelectEndCol AFTERRRR renderDrowndownDiv was finished: ",
        onSelectEndCol
      );
      console.log(
        "onSelectStartCol AFTERRRR renderDrowndownDiv was finished: ",
        onSelectStartCol
      );
      console.log(
        "onSelectEndRow AFTERRRR renderDrowndownDiv was finished: ",
        onSelectEndRow
      );
      console.log(
        "onSelectStartRow AFTERRRR renderDrowndownDiv was finished: ",
        onSelectStartRow
      );
    } else if (dropDownType === "grid-col-dropdown") {
      updateGridColSize(selectedGridColValue);
      console.log("In useEffect(), finished updateGridCol: ", selectedGridColValue);
      console.log(
        "selectedEndColValue after updateGridCol was finished: ",
        selectedEndColValue
      );
      console.log(
        "selectedEndRowValue after updateGridCol was finished: ",
        selectedEndRowValue
      );
    } else if (dropDownType === "grid-row-dropdown") {
      updateGridRowSize(selectedGridRowValue);
      console.log("In useEffect(), finished updateGridRow: ", selectedGridRowValue);
    }

    console.log("in useEffect(), finished renderdropDownDiv");
  }, [
    selectedStartColValue,
    selectedStartRowValue,
    selectedEndColValue,
    selectedEndRowValue,
    selectedGridColValue, //TODO: When you COMMENT THIS OUT, IT ACTUALLY FIXES THE END-COL RESORTING BACK TO 1 PROBLEM, 
                        //BUT IT DOESNT CHANGE THE GRID COLS value at all...
    selectedGridRowValue,
    // onSelectStartCol, //NOTE: Not Sure if this is necessary...
    // onSelectStartRow, //NOTE: Not Sure if this is necessary...
    // onSelectEndCol, //NOTE: Not Sure if this is necessary...
    // onSelectEndRow, //NOTE: Not Sure if this is necessary...
    // initialGridColSize, //NOTE: DO NOT ADD THIS, it resets the grid col to the INITIAL size
    // initialGridRowSize //NOTE: DO NOT ADD THIS, it resets the grid row to the INITIAL size
  ]);

  const handleStartColChange = (event) => {
    const value = parseInt(event.target.value);
    if (value === onSelectEndCol && onSelectStartRow === onSelectEndRow) {
      alert(
        "A) Cannot select this Start Node Column Position since it overlaps with the End Node Column Position! Please Select a Different Column."
      );
    } else {
      setSelectedStartColValue(value);
    }
  };

  const handleStartRowChange = (event) => {
    const value = parseInt(event.target.value);
    if (value === onSelectEndRow && onSelectStartCol === onSelectEndCol) {
      alert(
        "B) Cannot select this Start Node Column Position since it overlaps with the End Node Column Position! Please Select a Different Row."
      );
    } else {
      setSelectedStartRowValue(value);
    }
  };

  const handleEndColChange = (event) => {
    const value = parseInt(event.target.value);
    if (value === onSelectStartCol && onSelectEndRow === onSelectStartRow) {
      alert(
        "C) Cannot select this Start Node Column Position since it overlaps with the End Node Column Position! Please Select a Different Column."
      );
    } else {
      setSelectedEndColValue(value);
    }

    console.log(
      "selectedEndColValue AFTER setSelectedEndColValue: ",
      selectedEndColValue
    );
    console.log("VALUEEE: ", value);
    console.log("OnSeleCtT: ", onSelectEndCol);
  };

  const handleEndRowChange = (event) => {
    let value = parseInt(event.target.value);
    if (value === onSelectStartRow && onSelectEndCol === onSelectStartCol) {
      alert(
        "D) Cannot select this Start Node Column Position since it overlaps with the End Node Column Position! Please Select a Different Row."
      );
    } else {
      setSelectedEndRowValue(value);
    }
    console.log("YOU WANT TO CHANGE TO THIS NEW ROW VALUE: ", value);
    console.log("selectedStartColValue: ", selectedStartColValue);
    console.log("selectedStartRowValue: ", selectedStartRowValue);
    console.log("selectedEndColValue: ", selectedEndColValue);
    console.log("selectedEndRowValue: ", selectedEndRowValue);
    console.log("onSelectEndCol: ", onSelectEndCol);
    console.log("onSelectEndRow: ", onSelectEndRow);
  };

  const handleGridColChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedGridColValue(value);
    console.log("valueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: ", value)
  };

  const handleGridRowChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedGridRowValue(value);
  };

  const renderDropdownDiv = () => {
    
    if (dropDownType === "start-col-dropdown") {
      console.log("We are in the START-COL-DROPDOWN");
      return (
        <div className="start-col-dropdown">
          {console.log("IN handleStartColChange: ", selectedStartColValue + 1)}
          <select
            id="startCol"
            value={selectedStartColValue}
            onChange={handleStartColChange}
            dropDownType={dropDownType}
          >
            {console.log("initialGridColSizeeeeee: ", initialGridColSize)}
            {console.log("selectedGridColValueeeee: ", selectedGridColValue)}
            {console.log("selectedStartColValueeee: ", selectedStartColValue)}
            {Array.from({ length: initialGridColSize ? initialGridColSize : MAX_TOTAL_COL }, (_, index) => index + 1).map(
              (col) => (
                <option key={col - 1} value={col - 1}>
                  {col}
                </option>
              )
            )}
          </select>
        </div>
      );
    } else if (dropDownType === "start-row-dropdown") {
      console.log("We are in the START-ROW-DROPDOWN");
      return (
        <div className="start-row-dropdown">
          {console.log("IN handleStartRowChange: ", selectedStartRowValue + 1)}
          {console.log("selectedGridRowValueeeee: ", selectedGridRowValue)}
          {console.log("selectedStartRowValueeee: ", selectedStartRowValue)}
          <select
            id="startRow"
            value={selectedStartRowValue}
            onChange={handleStartRowChange}
            dropDownType={dropDownType}
          >
            {Array.from({ length: initialGridRowSize ? initialGridRowSize : MAX_TOTAL_ROW }, (_, index) => index + 1).map(
              (row) => (
                <option key={row - 1} value={row - 1}>
                  {row}
                </option>
              )
            )}
          </select>
        </div>
      );
    } else if (dropDownType === "end-col-dropdown") {
      console.log("We are in the END-COL-DROPDOWN");
      console.log("selectedEndColValue (BEFORE): ", selectedEndColValue)
      return (
        <div className="end-col-dropdown">
          {console.log("IN handleEndColChange: ", selectedEndColValue + 1)}
          <select
            id="endCol"
            value={selectedEndColValue}
            onChange={handleEndColChange}
            dropDownType={dropDownType}
          >
            {console.log("initialGridColSizeeeeee: ", initialGridColSize)}
            {console.log("selectedGridColValueeeee: ", selectedGridColValue)}
            {console.log("selectedEndColValueeee: ", selectedEndColValue)}
            {console.log("END_NODE_COL: ", END_NODE_COL)}
            {/* {alert(`onSelectEmdCol: ${onSelectEndCol}`)} */}
            {Array.from({ length: initialGridColSize ? initialGridColSize : MAX_TOTAL_COL }, (_, index) => index + 1).map(
              (col) => (
                <option key={col - 1} value={col - 1}>
                  {col}
                </option>
              )
            )}
          </select>
        </div>
      );
    } else if (dropDownType === "end-row-dropdown") {
      console.log("We are in the END-ROW-DROPDOWN");
      return (
        <div className="end-row-dropdown">
          {console.log("IN handleEndRowChange")}
          {console.log("selectedEndRowValue: ", selectedEndRowValue + 1)}
          {console.log("selectedEndRowValueeee: ", selectedEndRowValue)}
          {console.log("selectedEndColValueeee: ", selectedEndColValue)}
          <select
            id="endRow"
            value={selectedEndRowValue}
            onChange={handleEndRowChange}
            dropDownType={dropDownType}
          >
            {Array.from({ length: initialGridRowSize ? initialGridRowSize : MAX_TOTAL_ROW }, (_, index) => index + 1).map(
              (row) => (
                <option key={row - 1} value={row - 1}>
                  {row}
                </option>
              )
            )}
          </select>
        </div>
      );
    } else if (dropDownType === "grid-col-dropdown") {
      console.log("initialGridColSize: ", initialGridColSize)
      console.log("We are in the GRID-COL-DROPDOWN");
      return (
        <div className="grid-col-dropdown">
          {console.log("IN handleGridColChange: ", selectedGridColValue)}
          <select
            id="gridCols"
            value={initialGridColSize}
            onChange={handleGridColChange}
            dropDownType={dropDownType}
            
          >
            {console.log("selectedGridColValue: ", selectedGridColValue)}
            {Array.from({ length: MAX_TOTAL_COL }, (_, index) => index + 1).map(
              (col) => (
                <option key={col - 1} value={col}>
                  {col}
                </option>
              )
            )}
          </select>
        </div>
      );
    } else if (dropDownType === "grid-row-dropdown") {
      console.log("We are in the GRID-ROW-DROPDOWN");
      return (
        <div className="grid-row-dropdown">
          {console.log("IN handleGridRowChange: ", selectedGridRowValue)}
          {/* NOTE: I want the grid to be MINIMUM 9 columns */}
          <select
            id="gridRows"
            value={selectedGridRowValue}
            onChange={handleGridRowChange}
            dropDownType={dropDownType}
          >
            {Array.from(
              { length: MAX_TOTAL_ROW - 8 },
              (_, index) => index + 9
            ).map((row) => (
              <option key={row - 1} value={row}>
                {row}
              </option>
            ))}
          </select>
        </div>
      );
    }
    console.log("dropdownType: ", dropDownType);
  };

  //NOTE: ORDER OF OPERATIONS BEING CALLED: 1) renderDropdrownDiv() 2) handleEndColChange() 3) useEffect)(), 4) return() in PathfindingAlgorithm.jsx
  return (
    <>
      {console.log("FIRST!")}
      {renderDropdownDiv()}

      {console.log("FINAL selectedEndRow: ", selectedEndRowValue)}
      {console.log("FINAL selectedEndCol: ", selectedEndColValue)}
      {console.log("FINAL onSelectEndCol: ", onSelectEndCol)}
      {/* {console.log("onSelectStartCol AFTERRRR renderDrowndownDiv was finished: ", onSelectStartCol)} */}
      {console.log("FINAL onSelectEndRow: ", onSelectEndRow)}
      {/* {console.log("FINAL onSelectStartRow: ", onSelectStartRow)} */}
      {console.log("FINAL selectedGridColValue: ", selectedGridColValue)}
      {console.log("FINAL selectedGridRowValue: ", selectedGridRowValue)}
    </>
  );
};

export default Dropdown;
