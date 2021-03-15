import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RatingStar from "../RatingStar";
import { connect } from "react-redux";
import { actChangeDialogStatus } from "../DialogMovie/modules/action";
import { Link } from "react-router-dom";

function CarouselFilmNow(props) {
  const { item, changeDialogStatus } = props;
  const handleClickOpen = () => {
    changeDialogStatus({ status: true, movie: item });
  };

  return (
    <React.Fragment>
      <div className="imgBx">
        <img src={item.hinhAnh} alt={item.biDanh} />
        <div className="overlayFilm"></div>
        <div className="playButton" onClick={handleClickOpen}>
          <PlayArrowIcon className="playIcon" />
        </div>
        <div className="reviewScore">
          <span className="ratingNumber">{item.danhGia}</span>

          <RatingStar>{parseFloat(item.danhGia)}</RatingStar>
        </div>
      </div>
      <div className="detail">
        <div className="filmTitle">
          <h3>
            <span className="ageLimit">C18</span>
            {item.tenPhim}
          </h3>
          <div className="filmDuration">100 phút</div>
          <Link className="buyTicket" to={`/phim/${item.maPhim}`}>
            Mua vé
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeDialogStatus: (data) => {
      dispatch(actChangeDialogStatus(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(CarouselFilmNow);
