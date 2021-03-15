import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { movieStyles } from "./MovieStyle";
import { Link } from "react-router-dom";
import RatingStar from "../RatingStar";

export default function Movie(props) {
  const classes = movieStyles();
  const { movie, type } = props;
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea
          className={classes.actionArea}
          component={Link}
          to={`/phim/${movie.maPhim}`}
        >
          <CardMedia
            className={classes.media}
            image={movie.hinhAnh}
            title="Contemplative Reptile"
          />
          <div className={classes.overlay}></div>
          {type === "beingSold" ? (
            <React.Fragment>
              <CardContent className={classes.content}>
                <Box display="flex">
                  <span className={classes.buttonAge}>C18</span>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ textTransform: "uppercase", color: "#fff" }}
                  >
                    Đang chiếu
                  </Typography>
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="textPrimary"
                  component="h2"
                  className={classes.title}
                >
                  {movie.tenPhim}
                </Typography>
              </CardContent>
              <span className={classes.ticketButton}>Đặt vé</span>
              <span className={classes.score}>
                {movie.danhGia}
                <RatingStar>{movie.danhGia}</RatingStar>
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className={classes.dayStart}>
                {new Date(movie.ngayKhoiChieu).toLocaleDateString("VI", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </span>
            </React.Fragment>
          )}
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
}
