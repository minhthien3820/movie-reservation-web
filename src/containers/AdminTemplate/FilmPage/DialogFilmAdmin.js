import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  actAddFilmAdminApi,
  actChangeDialogFilmAdminStatus,
} from "./modules/action";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  NewInput,
  UserStyles,
} from "../../HomeTemplate/UserGuestPage/UserStyles";

const validationSchema = Yup.object().shape({
  tenPhim: Yup.string().required("Vui lòng nhập tên phim"),
  trailer: Yup.string().required("Vui lòng nhập trailer!"),
  moTa: Yup.string().required("Vui lòng nhập mô tả!"),
  ngayKhoiChieu: Yup.string().required("Vui lòng chọn ngày khởi chiếu!"),
  danhGia: Yup.number()
    .moreThan(0, "Không được thấp hơn 0")
    .lessThan(10, "Không được cao hơn 10")
    .required("Vui lòng chọn đánh giá"),
});

function DialogFilmAdmin(props) {
  const classes = UserStyles();
  const [selectedFile, setSelectedFile] = useState();
  const {
    changeDialogStatus,
    dialogStatus,
    filmEdit,
    handleUpdateFilm,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClose = () => {
    changeDialogStatus(false);
  };

  const handleChangeFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSumissionFile = (values) => {
    var frm;
    if (selectedFile) {
      frm = new FormData();
      frm.append("File", selectedFile, selectedFile.name);
      frm.append("tenphim", values.tenPhim);
      frm.append("manhom", "GP09");
    }
    return frm;
  };

  const ValidationForm = () => {
    return (
      <React.Fragment>
        <Formik
          initialValues={
            filmEdit || {
              maPhim: 0,
              tenPhim: "",
              biDanh: "bi danh",
              trailer: "",
              hinhAnh: "",
              moTa: "",
              maNhom: "GP09",
              ngayKhoiChieu: "",
              danhGia: 0,
            }
          }
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values.ngayKhoiChieu = new Date(values.ngayKhoiChieu)
              .toISOString()
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("/");
            let frm = handleSumissionFile(values);
            if (filmEdit) {
              handleUpdateFilm(values, frm, "edit");
            } else {
              values.hinhAnh = selectedFile.name;
              handleUpdateFilm(values, frm, "add");
            }
          }}
        >
          {({
            touched,
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
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
                        htmlFor="maPhim"
                        className={classes.label}
                      >
                        Mã phim
                      </InputLabel>
                      <NewInput
                        defaultValue={values.maPhim}
                        type="text"
                        id="maPhim"
                        name="maPhim"
                        disabled
                      />
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
                      <TextField
                        id="ngayKhoiChieu"
                        name="ngayKhoiChieu"
                        type="date"
                        label="Ngày khởi chiếu"
                        defaultValue={
                          filmEdit
                            ? new Date(values.ngayKhoiChieu)
                                .toISOString()
                                .slice(0, 10)
                            : values.ngayKhoiChieu
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginTop: 20 }}
                      />
                      {touched.ngayKhoiChieu && errors.ngayKhoiChieu ? (
                        <div className={classes.error}>
                          {errors.ngayKhoiChieu}
                        </div>
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
                        htmlFor="tenPhim"
                        className={classes.label}
                      >
                        Tên phim
                      </InputLabel>
                      <NewInput
                        defaultValue={values.tenPhim}
                        type="text"
                        id="tenPhim"
                        name="tenPhim"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.tenPhim && errors.tenPhim ? (
                        <div className={classes.error}>{errors.tenPhim}</div>
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
                        htmlFor="trailer"
                        className={classes.label}
                      >
                        Trailer URL
                      </InputLabel>
                      <NewInput
                        defaultValue={values.trailer}
                        name="trailer"
                        type="text"
                        id="trailer"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.trailer && errors.trailer ? (
                        <div className={classes.error}>{errors.trailer}</div>
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
                        htmlFor="danhGia"
                        className={classes.label}
                      >
                        Đánh giá
                      </InputLabel>
                      <NewInput
                        defaultValue={values.danhGia}
                        name="danhGia"
                        type="number"
                        id="danhGia"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.danhGia && errors.danhGia ? (
                        <div className={classes.error}>{errors.danhGia}</div>
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
                        htmlFor="fileSelected"
                        className={classes.label}
                      >
                        Hình tải lên
                      </InputLabel>
                      <NewInput
                        defaultValue={""}
                        name="fileSelected"
                        type="file"
                        id="fileSelected"
                        onChange={handleChangeFile}
                      />
                      {touched.fileSelected && errors.fileSelected ? (
                        <div className={classes.error}>
                          {errors.fileSelected}
                        </div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        shrink
                        htmlFor="moTa"
                        className={classes.label}
                      >
                        Mô tả
                      </InputLabel>
                      <NewInput
                        defaultValue={values.moTa}
                        name="moTa"
                        type="text"
                        id="moTa"
                        rows={3}
                        rowsMin={3}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.moTa && errors.moTa ? (
                        <div className={classes.error}>{errors.moTa}</div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    !(
                      Object.values(errors).length === 0 &&
                      (Object.values(touched).length >= 3 ||
                        (filmEdit && Object.values(touched).length >= 1))
                    )
                  }
                >
                  {filmEdit ? "Cập nhật" : "Xác nhận"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </React.Fragment>
    );
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={dialogStatus}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {filmEdit ? "Cập nhật phim" : "Thêm phim"}
        </DialogTitle>
        <DialogContent>{ValidationForm()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dialogStatus: state.filmAdminReducer.dialogStatus,
    filmEdit: state.filmAdminReducer.filmEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeDialogStatus: (status) => {
      dispatch(actChangeDialogFilmAdminStatus(status));
    },
    handleUpdateFilm: (film, frm, status) => {
      dispatch(actAddFilmAdminApi(film, frm, status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogFilmAdmin);
