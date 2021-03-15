import Axios from "axios";
import {
  CHANGE_DIALOG_FILM_ADMIN_STATUS,
  FILM_ADMIN_EDIT,
  FILM_ADMIN_FAILED,
  FILM_ADMIN_REQUEST,
  FILM_ADMIN_SUCCESS,
} from "./constant";

export const actFilmAdminApi = (keyword) => {
  const URL =
    keyword.length === 0
      ? "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09"
      : `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09&tenPhim=${keyword}`;
  return (dispatch) => {
    if (keyword.length === 0) {
      dispatch(actFilmAdminRequest());
    }
    Axios({
      url: URL,
      method: "GET",
    })
      .then((result) => {
        dispatch(actFilmAdminSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actFilmAdminFailed(err.response.data));
      });
  };
};

export const actAddFilmAdminApi = (film, frm, status) => {
  let accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  const URL =
    status === "edit"
      ? "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim"
      : "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim";
  return (dispatch) => {
    dispatch(actFilmAdminRequest());
    Axios({
      url: URL,
      method: "POST",
      data: film,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        if (status === "edit") {
          alert("Đã cập nhật phim thành công");
        } else {
          alert("Đã thêm phim thành công");
        }
        dispatch(actUploadImageApi(frm, accessToken));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};

export const actUploadImageApi = (frm, accessToken) => {
  return (dispatch) => {
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/UploadHinhAnhPhim",
      data: frm,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        alert("upload ảnh thành công");
        dispatch(actFilmAdminApi(""));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const actDeleteFilmAdminApi = (maPhim) => {
  let accessToken = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  return (dispatch) => {
    dispatch(actFilmAdminRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actFilmAdminApi(""));
        alert("Xóa thành công");
      })
      .catch((err) => {
        dispatch(actFilmAdminApi(""));
        console.log(err);
      });
  };
};

export const actEditFilmAdmin = (film) => {
  return {
    type: FILM_ADMIN_EDIT,
    payload: film,
  };
};

export const actChangeDialogFilmAdminStatus = (status) => {
  return {
    type: CHANGE_DIALOG_FILM_ADMIN_STATUS,
    payload: status,
  };
};

export const actFilmAdminRequest = () => {
  return {
    type: FILM_ADMIN_REQUEST,
  };
};

export const actFilmAdminSuccess = (data) => {
  return {
    type: FILM_ADMIN_SUCCESS,
    payload: data,
  };
};

export const actFilmAdminFailed = (err) => {
  return {
    type: FILM_ADMIN_FAILED,
    payload: err,
  };
};
