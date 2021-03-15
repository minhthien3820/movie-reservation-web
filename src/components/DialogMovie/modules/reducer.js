import { CHANGE_DIALOG_STATUS } from "./constant";

let initialState = {
  dialogStatus: false,
  movie: null,
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DIALOG_STATUS:
      state.dialogStatus = action.payload.status;
      state.movie = action.payload.movie;
      return { ...state };

    default:
      return { ...state };
  }
};

export default dialogReducer;
