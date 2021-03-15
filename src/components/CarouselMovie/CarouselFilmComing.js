import React from "react";
// import PlayArrowIcon from "@material-ui/icons/PlayArrow";

export default function CarouselFilmComing(props) {
  const { item } = props;
  return (
    <React.Fragment>
      <div className="imgBx">
        <img src={item.hinhAnh} alt={item.biDanh} />
        <div className="overlayFilm"></div>
        {/* <div className="playButton">
          <PlayArrowIcon className="playIcon" />
        </div> */}
        <div className="startDay">
          {new Date(item.ngayKhoiChieu).toLocaleDateString("vi", {
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      </div>
      <div className="detail">
        <div className="filmTitle">
          <h3>
            <span className="ageLimit">C18</span>
            {item.tenPhim}
          </h3>
          <div className="filmDuration">100 phút</div>
        </div>
      </div>
    </React.Fragment>
  );
}
