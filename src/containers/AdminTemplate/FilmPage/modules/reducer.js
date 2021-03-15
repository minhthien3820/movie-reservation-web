import {
  CHANGE_DIALOG_FILM_ADMIN_STATUS,
  FILM_ADMIN_EDIT,
  FILM_ADMIN_FAILED,
  FILM_ADMIN_REQUEST,
  FILM_ADMIN_SUCCESS,
} from "./constant";

let initialState = {
  loading: false,
  data: null,
  err: null,
  dialogStatus: false,
  filmEdit: null,
};

const filmAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILM_ADMIN_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case FILM_ADMIN_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };
    case FILM_ADMIN_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    case CHANGE_DIALOG_FILM_ADMIN_STATUS:
      state.dialogStatus = action.payload;
      state.filmEdit = null;
      return { ...state };
    case FILM_ADMIN_EDIT:
      state.filmEdit = action.payload;
      state.dialogStatus = true;
      return { ...state };

    default:
      return { ...state };
  }
};

export default filmAdminReducer;
