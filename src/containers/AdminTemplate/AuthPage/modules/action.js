import Axios from "axios";
import { AUTH_FAILED, AUTH_REQUEST, AUTH_SUCCESS } from "./constant";

export const actAuthApi = (user, history) => {
  //username: dpnguyen password:123456
  return (dispatch) => {
    dispatch(actLoginRequest());
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data: user,
    })
      .then((result) => {
        dispatch(actLoginSuccess(result.data));
        if (result.data.maLoaiNguoiDung === "QuanTri") {
          //Chuyển đến trang dashboard
          //removeItem:
          localStorage.setItem("UserAdmin", JSON.stringify(result.data));
          history.push("/dashboard");
        } else {
          alert("Không có quyền truy cập");
        }
      })
      .catch((err) => {
        dispatch(actLoginFailed(err));
      });
  };
};
export const actLoginRequest = () => {
  return {
    type: AUTH_REQUEST,
  };
};
export const actLoginSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};
export const actLoginFailed = (err) => {
  return {
    type: AUTH_FAILED,
    payload: err,
  };
};
