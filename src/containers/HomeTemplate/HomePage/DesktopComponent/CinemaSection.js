import React from "react";
import { DesktopHomeStyle } from "./DesktopHomeStyle";
import LogoCinema from "../../../../components/LogoCinema";
import CinemaList from "../../../../components/CinemaList";
import ShowTimeList from "../../../../components/ShowTimeList";
import { CustomScrollbars } from "../../../../components/ScrollBar";
import { connect } from "react-redux";
import {
  actChangeCinemaList,
  actChangeShowTimeList,
} from "../modules/ListShowTime/action";

function CinemaSection(props) {
  const classes = DesktopHomeStyle();
  const {
    listShowTime,
    listLogo,
    currentLogo,
    listCinema,
    currentShowTime,
  } = props;

  const handleLogoClick = (event, index) => {
    props.changeListCinema(index);
  };

  const handleCinemaClick = (event, index) => {
    props.changeShowTime(index);
  };

  return (
    <div id="cumrap" className={classes.cinemaSection}>
      <LogoCinema
        listLogo={listLogo}
        handleLogoClick={handleLogoClick}
        currentLogo={currentLogo}
      />
      <CustomScrollbars className={classes.cinemaScrollBar}>
        <CinemaList
          listCinema={listCinema}
          currentShowTime={currentShowTime}
          handleCinemaClick={handleCinemaClick}
        />
      </CustomScrollbars>
      <CustomScrollbars className={classes.showTimeScrollBar}>
        <ShowTimeList listShowTime={listShowTime} />
      </CustomScrollbars>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listShowTime: state.listShowTimeReducer.listShowTime,
    listLogo: state.listShowTimeReducer.listLogo,
    currentLogo: state.listShowTimeReducer.currentLogo,
    listCinema: state.listShowTimeReducer.listCinema,
    currentShowTime: state.listShowTimeReducer.currentShowTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeListCinema: (cinemaIndex) => {
      dispatch(actChangeCinemaList(cinemaIndex));
    },
    changeShowTime: (currentIndex) => {
      dispatch(actChangeShowTimeList(currentIndex));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CinemaSection);
