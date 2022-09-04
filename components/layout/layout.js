import { Fragment } from "react";
import FilterNavigation from "./filter-navigation";
import MainHeader from "./main-header";
import SubNavigation from "./sub-navigation";
import Main from "./main";

function Layout(props) {
  const songFilters = [
    { name: "데뷔 전", id: 13 },
    { name: "LATATA", id: 1 },
    { name: "한(一)", id: 2 },
    { name: "Senroita", id: 3 },
    { name: "Uh-Oh", id: 4 },
    { name: "퀸덤&Lion", id: 12 },
    { name: "Oh my god", id: 6 },
    { name: "I'm the trend", id: 7 },
    { name: "DUMDi DUMDi", id: 8 },
    { name: "화(火花)", id: 9 },
    { name: "개인활동기", id: 10 },
    { name: "TOMBOY", id: 11 },
  ];


  return (
    <Fragment>
      <MainHeader></MainHeader>
      <SubNavigation data={songFilters}></SubNavigation>
      {/* <FilterNavigation data={channelFilters} handleFilters={(filters) => handleFilters(filters, "filters")}></FilterNavigation> */}
      <Main data={props.children}></Main>
    </Fragment>
  );
}

export default Layout;
