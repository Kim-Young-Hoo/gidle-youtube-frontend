import Link from "next/link";
import classes from "./filter-navigation.module.css";
import React from "react";
import { Checkbox, Collapse } from "antd";
import { useState } from "react";

const channelFilters = [
  { name: "큐브채널", id: 6 },
  { name: "방송사/무대영상", id: 1 },
  { name: "예능/인터뷰", id: 2 },
  { name: "언론사", id: 4 },
  { name: "라디오", id: 5 },
  { name: "기타", id: 3 },
];

function FilterNavigation(props) {
  const [checked, setChecked] = useState([1, 2, 3, 4, 5, 6]);
  // const [allChecked, setAllChecked] = useState(true);

  function handleToggle(value) {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilter(newChecked);
  }

  // function handleAllToggle() {
  //   if (allChecked) {
  //     setAllChecked(false);
  //     setChecked([]);
  //     props.handleAllFilters({ allFilter: false, filters: [] });
  //   } else {
  //     setAllChecked(true);
  //     setChecked([1, 2, 3, 4, 5]);
  //     props.handleAllFilters({ allFilter: true, filters: [1, 2, 3, 4, 5] });
  //   }
  // }

  return (
    <nav className={classes.navigation}>
      <ul>
        <li>
          <span className={classes.span}>채널 유형 : </span>
        </li>
        {channelFilters.map((filter) => (
          <li>
            <Checkbox
              onChange={() => handleToggle(filter.id)}
              type="checkbox"
              checked={checked.indexOf(filter.id) === -1 ? false : true}
            >
              <span className={classes.span}>{filter.name}</span>
            </Checkbox>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FilterNavigation;
