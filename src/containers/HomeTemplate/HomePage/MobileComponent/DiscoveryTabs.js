import { AppBar, Paper, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import { connect } from "react-redux";
import CardNewsLarge from "../../../../components/CardNewsLarge/CardNewsLarge";
import CardSmallFilm from "../../../../components/CardSmall/CardSmallFilm";
import CardSmallNews from "../../../../components/CardSmall/CardSmallNews";
import WithCard from "../../../../components/CardSmall/WithCard";
import CarouselHome from "../../../../components/CarouselHome";
import Movie from "../../../../components/Movie";
import { actListMovieApi } from "../modules/ListMovie/action";
import { newsArray } from "../NewsArray";
import { MobileHomeStyles } from "./MobileHomeStyles";

const CardNews = WithCard(CardSmallNews);
const CardFilm = WithCard(CardSmallFilm);

function DiscoveryTabs(props) {
  const { listMovieComing, listMovieNow } = props;
  const classes = MobileHomeStyles();
  const [discoverValue, setDiscoverValue] = useState("1");
  const handleChangeDiscoveryTab = (event, newValue) => {
    setDiscoverValue(newValue);
    if (newValue === "3" && !listMovieComing) {
      props.changeFilmTab("coming");
    }
  };

  const renderListMovie = (movieArr, type) => {
    if (movieArr) {
      return movieArr.map((item) => {
        return <Movie type={type} movie={item} key={item.maPhim} />;
      });
    }
  };
  const renderMovieSmall = (movieArr) => {
    return movieArr.map((item, index) => {
      return (
        <CardFilm
          data={{
            imageLink: item.hinhAnh,
            title: item.tenPhim,
            rating: item.danhGia,
          }}
          key={index}
        />
      );
    });
  };

  const renderFilmHome = () => {
    if (!listMovieNow) {
      return;
    }
    let movieLargeArr = listMovieNow.slice(0, 3);
    let movieSmallArr = listMovieNow.slice(3, 6);
    return (
      <React.Fragment>
        <Typography
          variant="body2"
          color="textPrimary"
          component="p"
          className={classes.homeTitle}
        >
          Phim được yêu thích nhất
        </Typography>
        {/* render 3 movieLarge */}
        {renderListMovie(movieLargeArr, "beingSold")}

        <Paper className={classes.paperContainer}>
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            className={classes.paperTitle}
          >
            Rạp phim đang có gì
          </Typography>
          {/* render 3 cardSmall */}
          {renderMovieSmall(movieSmallArr)}
        </Paper>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <TabContext value={discoverValue}>
        <AppBar position="static" className={classes.appBarDiscovery}>
          <TabList
            onChange={handleChangeDiscoveryTab}
            aria-label="tabs discovery"
            variant="fullWidth"
            TabIndicatorProps={{ className: classes.indicatorTop }}
          >
            <Tab label="Home" value="1" className={classes.tabTop} />
            <Tab label="Đang chiếu" value="2" className={classes.tabTop} />
            <Tab label="Sắp chiếu" value="3" className={classes.tabTop} />
          </TabList>
        </AppBar>

        {/* Home */}
        {discoverValue === "1" ? (
          <TabPanel value="1">
            <CarouselHome />
            {renderFilmHome()}
            <Typography
              variant="body2"
              color="textPrimary"
              component="p"
              className={classes.homeTitle}
            >
              Tin nóng nhất hôm nay
            </Typography>

            {/* render 3 items of CardNewsLarge */}
            {newsArray.filmArr
              .filter((item, index) => {
                return index <= 2;
              })
              .map((item) => {
                return <CardNewsLarge data={item} key={item.id} />;
              })}

            {/* render 5 items of CardNews  */}
            <Paper className={classes.paperContainer}>
              <Typography
                variant="body2"
                color="textPrimary"
                component="p"
                className={classes.paperTitle}
              >
                Lướt thêm tin mới nhé
              </Typography>
              {newsArray.promotionArr
                .filter((item, index) => {
                  return index <= 4;
                })
                .map((item) => {
                  return <CardNews data={item} key={item.id} />;
                })}
            </Paper>
          </TabPanel>
        ) : (
          ""
        )}

        {/* Đang chiếu tab */}
        {discoverValue === "2" ? (
          <TabPanel value="2">
            {renderListMovie(listMovieNow, "beingSold")}
          </TabPanel>
        ) : (
          ""
        )}

        {/* Sắp chiếu tabs */}
        {discoverValue === "3" ? (
          <TabPanel value="3">
            {renderListMovie(listMovieComing, "coming")}
          </TabPanel>
        ) : (
          ""
        )}
      </TabContext>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFilmTab: (filmTabStatus) => {
      dispatch(actListMovieApi(filmTabStatus));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    listMovieNow: state.listMovieReducer.listMovieNow,
    listMovieComing: state.listMovieReducer.listMovieComing,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryTabs);
