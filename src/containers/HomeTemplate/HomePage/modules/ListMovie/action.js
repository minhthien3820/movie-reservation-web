import Axios from "axios";
import {
  LIST_MOVIE_FAILED,
  LIST_MOVIE_REQUEST,
  LIST_MOVIE_SUCCESS,
} from "./constant";

export const actListMovieApi = (filmType) => {
  let url =
    filmType === "now"
      ? "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=2&soPhanTuTrenTrang=10"
      : "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=3&soPhanTuTrenTrang=10";

  return (dispatch) => {
    actListMovieRequest();
    Axios({
      url,
      method: "GET",
    })
      .then((result) => {
        dispatch(actListMovieSuccess(result.data.items, filmType));
      })
      .catch((err) => {
        dispatch(actListMovieFailed(err));
      });
  };
};

export const actListMovieRequest = () => {
  return {
    type: LIST_MOVIE_REQUEST,
  };
};

export const actListMovieSuccess = (data, filmType) => {
  return {
    type: LIST_MOVIE_SUCCESS,
    payload: data,
    filmType,
  };
};

export const actListMovieFailed = (err) => {
  return {
    type: LIST_MOVIE_FAILED,
    payload: err,
  };
};
