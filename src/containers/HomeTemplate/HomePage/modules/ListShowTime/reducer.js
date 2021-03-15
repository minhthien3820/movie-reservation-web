import {
  LIST_SHOWTIME_REQUEST,
  LIST_SHOWTIME_FAILED,
  LIST_SHOWTIME_SUCCESS,
  CHANGE_SHOWTIME_LIST,
  CHANGE_CINEMA_LIST,
} from "./constant";

let initialState = {
  loading: false,
  data: null,
  err: null,
  listLogo: null,
  listCinema: null,
  listShowTime: null,
  currentShowTime: 0,
  currentCinema: 0,
  currentLogo: 0,
};

const listShowTimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SHOWTIME_REQUEST:
      state.loading = true;
      state.listCinema = null;
      state.err = null;
      return { ...state };
    case LIST_SHOWTIME_SUCCESS:
      state.loading = false;
      state.err = null;
      let data = action.payload;
      state.data = data;
      //render logoCinema Component
      //listLogo is not change during visiting
      state.listLogo = data.map((item) => {
        return {
          tenHeThongRap: item.tenHeThongRap,
          logo: item.logo,
        };
      });

      //render CinemaList component with active at the first listItem
      //when client click another listItem in logoCinema --> change listCinema follow cinemaIndex
      state.listCinema = data[0].lstCumRap;

      //render ShowTimeList component with active at the first listItem
      state.listShowTime = data[0].lstCumRap[0].danhSachPhim;
      state.currentShowTime = 0;
      return { ...state };

    case LIST_SHOWTIME_FAILED:
      state.loading = false;
      state.listCinema = null;
      state.err = action.payload;
      return { ...state };

    //update when client click another listItem in logoCinema --> change listCinema follow cinemaIndex
    case CHANGE_CINEMA_LIST:
      const cinemaIndex = action.payload;
      state.listCinema = state.data[cinemaIndex].lstCumRap;
      state.listShowTime = state.data[cinemaIndex].lstCumRap[0].danhSachPhim;
      state.currentShowTime = 0;
      state.currentLogo = cinemaIndex;
      return { ...state };

    //update when client click another listItem in cinemaList --> change listShowTime follow showTimeIndex
    case CHANGE_SHOWTIME_LIST:
      const showTimeIndex = action.payload;
      state.listShowTime = state.listCinema[showTimeIndex].danhSachPhim;
      state.currentShowTime = showTimeIndex;
      return { ...state };
    default:
      return {
        ...state,
      };
  }
};

export default listShowTimeReducer;
