import React, { useEffect } from "react";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import MobileHome from "./MobileHome";
import DesktopHome from "./DesktopHome";
import { actListMovieApi } from "./modules/ListMovie/action";
import { connect } from "react-redux";
import { actListShowTimeApi } from "./modules/ListShowTime/action";

function HomePage(props) {
  const { listMovieApi, listShowTimeApi } = props;
  useEffect(() => {
    listMovieApi();
    listShowTimeApi();
    // props.listCinemaApi();
  });
  if (isWidthUp("sm", props.width)) {
    return <DesktopHome />;
  }

  return <MobileHome />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    listMovieApi: () => {
      dispatch(actListMovieApi("now"));
    },
    listShowTimeApi: () => {
      dispatch(actListShowTimeApi());
    },
  };
};

export default connect(null, mapDispatchToProps)(withWidth()(HomePage));
