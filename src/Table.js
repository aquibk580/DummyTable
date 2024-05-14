import React from "react";
import "./Table.css";
import {TableData} from "./TableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import GenerateExcel from "./Excel";

const Table = () => {
  let filterCount = 0;
  const [pageInitIndex, setPageInitIndex] = useState(0);
  const [pageEndIndex, setpageEndIndex] = useState(9);
  const [pageCount, setPageCount] = useState(1);
  const handleLeftArrowClick = () => {
    if (pageInitIndex <= 0) {
      setPageInitIndex(pageInitIndex);
      setpageEndIndex(pageEndIndex);
    } else {
      setPageCount(pageCount - 1);
      setPageInitIndex(pageInitIndex - 10);
      setpageEndIndex(pageEndIndex - 10);
    }
  };
  const handleRightArrowClick = () => {
    if (pageEndIndex >= 45) {
      setPageInitIndex(pageInitIndex);
      setpageEndIndex(pageEndIndex);
    } else {
      setPageCount(pageCount + 1);
      setPageInitIndex(pageInitIndex + 10);
      setpageEndIndex(pageEndIndex + 10);
    }
  };
  const handlePageNumber = (event) => {
    if (event.target.value == 1) {
      setPageCount(event.target.value);
      setPageInitIndex(0);
      setpageEndIndex(9);
    } else if (event.target.value == 2) {
      setPageCount(event.target.value);
      setPageInitIndex(10);
      setpageEndIndex(19);
    } else if (event.target.value == 3) {
      setPageCount(event.target.value);
      setPageInitIndex(20);
      setpageEndIndex(29);
    } else if (event.target.value == 4) {
      setPageCount(event.target.value);
      setPageInitIndex(30);
      setpageEndIndex(39);
    } else if (event.target.value == 5) {
      setPageCount(event.target.value);
      setPageInitIndex(40);
      setpageEndIndex(45);
    }
  };
  const sortedData = TableData.sort((a, b) => {
    const nameA = a.Account_Name.toLowerCase();
    const nameB = b.Account_Name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  const Dsort = TableData.slice();
  const DSortedData = Dsort.sort((a, b) => {
    const nameA = a.Account_Name.toLowerCase();
    const nameB = b.Account_Name.toLowerCase();
    if (nameA > nameB) return -1;
    if (nameA < nameB) return 1;
    return 0;
  });
  const data = sortedData.map((item) => {
    return item.Account_Name;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const results = data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };
  const [order, setOrder] = useState(false);
  const handleAsscending = () => {
    setOrder(false);
  };
  const handleDesscending = () => {
    setOrder(true);
  };
  let DataObject = [];
  return (
    <div className="flex col">
      <div className="flex row hps">
        <div className="flex col hp">
          <h1>Account Lists</h1>
          <p>Here is the list of your accounts</p>
        </div>
        <div className="filters flex row">
          <GenerateExcel DataObject={DataObject}/>
          <DropdownMenu
            handleAsscending={handleAsscending}
            handleDesscending={handleDesscending}
          />
          <input
            type="text"
            placeholder="Search Here..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <table>
        <thead className="head">
          <tr>
            <th>Account Name</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Website</th>
            <th>Industry</th>
            <th>Account Status</th>
            <th>Remark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {order === true
            ? DSortedData.map((item, index) => {
                if (index >= pageInitIndex && index <= pageEndIndex) {
                  DataObject.push(item);
                  return (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "white" : "gray"} tr`}
                    >
                      <td>{item.Account_Name}</td>
                      <td>{item.Email}</td>
                      <td>{item.Phone_No}</td>
                      <td>{item.Website}</td>
                      <td>{item.Industry}</td>
                      <td>{item.Account_Status}</td>
                      <td>{item.Remark}</td>
                      <td>{item.Actions}</td>
                    </tr>
                  );
                }
              })
            : searchQuery === ""
            ? sortedData.map((item, index) => {
                if (index >= pageInitIndex && index <= pageEndIndex) {
                  DataObject.push(item);
                  return (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "white" : "gray"} tr`}
                    >
                      <td>{item.Account_Name}</td>
                      <td>{item.Email}</td>
                      <td>{item.Phone_No}</td>
                      <td>{item.Website}</td>
                      <td>{item.Industry}</td>
                      <td>{item.Account_Status}</td>
                      <td>{item.Remark}</td>
                      <td>{item.Actions}</td>
                    </tr>
                  );
                }
              })
            : sortedData
                .filter((element) => {
                  return searchResults.some((name) => {
                    return element.Account_Name.includes(name);
                  });
                })
                .map((item, index) => {
                  filterCount++;
                  if (filterCount <= 10) {
                    DataObject.push(item)
                    return (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "white" : "gray"} tr`}
                      >
                        <td>{item.Account_Name}</td>
                        <td>{item.Email}</td>
                        <td>{item.Phone_No}</td>
                        <td>{item.Website}</td>
                        <td>{item.Industry}</td>
                        <td>{item.Account_Status}</td>
                        <td>{item.Remark}</td>
                        <td>{item.Actions}</td>
                      </tr>
                    );
                  }
                })}
        </tbody>
      </table>
      <div className="footer flex row">
        <h3> Page {pageCount} of 5 | Go to page : </h3>
        <input
          type="number"
          min="1"
          max="5"
          minvalue="1"
          defaultValue={pageCount}
          onChange={handlePageNumber}
        />
        <div className="left-arrow" onClick={handleLeftArrowClick}>
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-left" />
        </div>
        <div className="right-arrow" onClick={handleRightArrowClick}>
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-right"/>
        </div>
      </div>
    </div>
  );
};
export default Table;
