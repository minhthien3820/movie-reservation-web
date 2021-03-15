import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { FilmAdminStyles } from "./FilmAdminStyles";
import {
  actChangeDialogFilmAdminStatus,
  actDeleteFilmAdminApi,
  actEditFilmAdmin,
  actFilmAdminApi,
} from "./modules/action";
import DialogFilmAdmin from "./DialogFilmAdmin";

const columns = [
  { id: "maPhim", label: "Mã phim", minWidth: 100 },
  { id: "tenPhim", label: "Tên phim", minWidth: 100 },
  {
    id: "hinhAnh",
    label: "Hình ảnh",
    minWidth: 100,
  },
  {
    id: "moTa",
    label: "Mô tả",
    minWidth: 100,
  },
  {
    id: "ngayKhoiChieu",
    label: "Ngày chiếu",
    minWidth: 100,
    format: (value) =>
      new Date(value).toLocaleDateString("vi", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      }),
  },
  {
    id: "thaoTac",
    label: "Thao tác",
    minWidth: 330,
  },
];

function FilmPage(props) {
  const classes = FilmAdminStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const {
    handleFilmAdminApi,
    data,
    changeDialogStatus,
    handleEditFilm,
    handleDeleteFilm,
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeSearch = (event) => {
    handleFilmAdminApi(event.target.value);
  };

  const handleClickOpen = () => {
    changeDialogStatus(true);
  };

  useEffect(() => {
    handleFilmAdminApi("");
  }, [handleFilmAdminApi]);

  const handleButtonItem = (column, value, film) => {
    switch (column.id) {
      case "thaoTac":
        return (
          <React.Fragment>
            <Box display="flex" flexWrap="no-wrap">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log(film);
                }}
                style={{ marginRight: "10px" }}
              >
                Tạo lịch chiếu
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={() => {
                  handleEditFilm(film);
                }}
                style={{ marginRight: "10px" }}
              >
                Sửa
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleDeleteFilm(film.maPhim);
                }}
              >
                Xóa
              </Button>
            </Box>
          </React.Fragment>
        );
      case "hinhAnh":
        return (
          <img
            src={value}
            alt={value}
            style={{ width: "100px", height: "auto" }}
          />
        );
      case "ngayKhoiChieu":
        return column.format(value);
      default:
        return value;
    }
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="left"
                alignItems="center"
                height="100%"
                width="auto"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Thêm phim
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.root}>
                <Box
                  display="flex"
                  justifyContent="left"
                  alignItems="center"
                  height="100%"
                  maxWidth="500px"
                  marginX="20px"
                >
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Tìm kiếm phim"
                    variant="outlined"
                    className={classes.inputSearch}
                    onChange={handleChangeSearch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
            {/* Data table */}

            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Paper className={classes.root}>
                  <TableContainer className={classes.containerTable}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data ? (
                          data
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((film, id) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={id}
                                >
                                  {columns.map((column) => {
                                    const value = film[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {handleButtonItem(column, value, film)}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })
                        ) : (
                          <React.Fragment></React.Fragment>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {data && data.length > 0 ? (
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <DialogFilmAdmin />
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.filmAdminReducer.data,
    dialogStatus: state.filmAdminReducer.dialogStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFilmAdminApi: (keyword) => {
      dispatch(actFilmAdminApi(keyword));
    },
    changeDialogStatus: (status) => {
      dispatch(actChangeDialogFilmAdminStatus(status));
    },
    handleDeleteFilm: (maPhim) => {
      dispatch(actDeleteFilmAdminApi(maPhim));
    },
    handleEditFilm: (film) => {
      dispatch(actEditFilmAdmin(film));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
