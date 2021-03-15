import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TabContext, TabPanel } from "@material-ui/lab";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Typography,
  Button,
  Hidden,
} from "@material-ui/core";
import { NewInput, UserStyles } from "./UserStyles";
import { Formik } from "formik";
import * as Yup from "yup";
import { actChangeInfoApi, actUserGuestApi } from "../LoginPage/modules/action";

const validationSchema = Yup.object().shape({
  taiKhoan: Yup.string()
    .min(6, "Quá ngắn!")
    .max(20, "Quá dài!")
    .required("Vui lòng nhập tài khoản!"),
  matKhau: Yup.string()
    .min(6, "Quá ngắn!")
    .max(20, "Quá dài!")
    .required("Vui lòng nhập mật khẩu!"),
  hoTen: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Vui lòng nhập họ tên!")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      "Họ tên không hợp lệ"
    ),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email!"),
  soDt: Yup.string()
    .matches(/^\d{10}$/, "Số ĐT không hợp lệ")
    .required("Vui lòng nhập số ĐT!"),
});

function UserGuestPage(props) {
  const classes = UserStyles();
  const { userGuestApi, user, handleChangeInfo } = props;

  const [value, setValue] = useState("info");

  useEffect(() => {
    userGuestApi();
  }, [userGuestApi]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  if (!user && !JSON.parse(localStorage.getItem("UserGuest"))) {
    return <Redirect to="/dang-nhap" />;
  }

  const ValidationForm = () => {
    return (
      <React.Fragment>
        <Formik
          initialValues={
            user || {
              taiKhoan: "",
              matKhau: "",
              hoTen: "",
              email: "",
              soDt: "",
              maNhom: "GP09",
              maLoaiNguoiDung: "KhachHang",
            }
          }
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleChangeInfo(values);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        shrink
                        htmlFor="taiKhoan"
                        className={classes.label}
                      >
                        Tài khoản
                      </InputLabel>
                      <NewInput
                        defaultValue={values.taiKhoan}
                        type="text"
                        id="taiKhoan"
                        name="taiKhoan"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.taiKhoan && errors.taiKhoan ? (
                        <div className={classes.error}>{errors.taiKhoan}</div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        shrink
                        htmlFor="matKhau"
                        className={classes.label}
                      >
                        Mật Khẩu
                      </InputLabel>
                      <NewInput
                        defaultValue={values.matKhau}
                        type="password"
                        id="matKhau"
                        name="matKhau"
                        onChange={handleChange}
                      />
                      {touched.matKhau && errors.matKhau ? (
                        <div className={classes.error}>{errors.matKhau}</div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        shrink
                        htmlFor="hoTen"
                        className={classes.label}
                      >
                        Họ Tên
                      </InputLabel>
                      <NewInput
                        defaultValue={values.hoTen}
                        id="hoTen"
                        name="hoTen"
                        type="text"
                        onChange={handleChange}
                      />
                      {touched.hoTen && errors.hoTen ? (
                        <div className={classes.error}>{errors.hoTen}</div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        shrink
                        htmlFor="email"
                        className={classes.label}
                      >
                        Email
                      </InputLabel>
                      <NewInput
                        defaultValue={values.email}
                        name="email"
                        type="text"
                        id="email"
                        onChange={handleChange}
                      />
                      {touched.email && errors.email ? (
                        <div className={classes.error}>{errors.email}</div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        shrink
                        htmlFor="soDt"
                        className={classes.label}
                      >
                        Số Điện Thoại
                      </InputLabel>
                      <NewInput
                        defaultValue={values.soDt}
                        name="soDt"
                        type="text"
                        id="soDt"
                        onChange={handleChange}
                      />
                      {touched.soDt && errors.soDt ? (
                        <div className={classes.error}>{errors.soDt}</div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </React.Fragment>
    );
  };

  const renderHistoryItem = () => {
    //use thongTinDatVe array to render historyItem
    return (
      <React.Fragment>
        {[0, 1, 2].map((item) => {
          return (
            <Grid container spacing={3} key={item}>
              <Grid item xs={5}>
                <img
                  src={`http://movie0706.cybersoft.edu.vn/hinhanh/ted-part-2_gp09.jfif`}
                  alt={`http://movie0706.cybersoft.edu.vn/hinhanh/ted-part-2_gp09.jfif`}
                  className={classes.image}
                />
              </Grid>
              <Grid item xs={7}>
                <Box className={classes.content}>
                  <Typography component="h5" variant="h5">
                    Tên phim
                  </Typography>
                  <Box display="flex">
                    <span className={classes.ageLimitButton}>C18</span>
                  </Box>
                  <p>Ngày chiếu</p>
                  <p>Giờ chiếu</p>
                  <p>Tên cụm rạp</p>
                  <p>Tên rạp - số ghế</p>
                  <p>Số tiền</p>
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <div>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          textColor="primary"
          centered
          aria-label="User info tab"
        >
          <Tab
            label="Thông tin"
            value="info"
            className={value === "info" ? classes.tabActive : classes.tabNormal}
          />
          <Tab
            label="Lịch sử đặt vé"
            value="history"
            className={
              value === "history" ? classes.tabActive : classes.tabNormal
            }
          />
        </Tabs>
        <TabPanel value="info">
          <Box
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paper className={classes.container}>{ValidationForm()}</Paper>
          </Box>
        </TabPanel>
        <TabPanel value="history">
          <Box
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paper className={classes.container}>{renderHistoryItem()}</Paper>
          </Box>
        </TabPanel>
      </TabContext>
      <Hidden smUp>
        <Button variant="contained" color="secondary" component={Link} to="/">
          Trang chủ
        </Button>
      </Hidden>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    userGuestApi: () => {
      dispatch(actUserGuestApi());
    },
    handleChangeInfo: (user) => {
      dispatch(actChangeInfoApi(user));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.userGuestReducer.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserGuestPage);
