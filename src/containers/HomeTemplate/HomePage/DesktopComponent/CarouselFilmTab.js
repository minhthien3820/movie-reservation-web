import React, { useState } from "react";
import CarouselFilmComing from "../../../../components/CarouselMovie/CarouselFilmComing";
import CarouselFilmNow from "../../../../components/CarouselMovie/CarouselFilmNow";
import WithCarouselFilm from "../../../../components/CarouselMovie/WithCarouselFilm";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TabContext, TabPanel } from "@material-ui/lab";
import { DesktopHomeStyle } from "./DesktopHomeStyle";
import { connect } from "react-redux";
import { actListMovieApi } from "../modules/ListMovie/action";

const FilmNow = WithCarouselFilm(CarouselFilmNow);
const FilmComing = WithCarouselFilm(CarouselFilmComing);

function CarouselFilmTab(props) {
  const classes = DesktopHomeStyle();
  const [value, setValue] = useState("now");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (!props.listMovieComing) {
      props.changeCarousel(newValue);
    }
  };

  return (
    <div id="carouselTabFilm" className={classes.carouselTabFilm}>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          centered
          aria-label="film tabs"
        >
          <Tab
            label="Đang Chiếu"
            value="now"
            className={value === "now" ? classes.tabActive : classes.tabNormal}
          />
          <Tab
            label="Sắp Chiếu"
            value="coming"
            className={
              value === "coming" ? classes.tabActive : classes.tabNormal
            }
          />
        </Tabs>
        <TabPanel value="now">
          <FilmNow listMovie={props.listMovieNow} />
        </TabPanel>
        <TabPanel value="coming">
          <FilmComing listMovie={props.listMovieComing} />
        </TabPanel>
      </TabContext>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCarousel: (newValue) => {
      dispatch(actListMovieApi(newValue));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    listMovieNow: state.listMovieReducer.listMovieNow,
    listMovieComing: state.listMovieReducer.listMovieComing,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselFilmTab);
