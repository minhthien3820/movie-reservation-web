import { Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { actChangeDialogStatus } from "./modules/action";

function DialogMovie(props) {
  const { dialogStatus, changeDialogStatus, movie } = props;

  const handleClose = () => {
    changeDialogStatus({ status: false, movie: null });
  };
  if (movie) {
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={dialogStatus}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent style={{ padding: 0, overflowY: "hidden" }}>
          <iframe
            width={"100%"}
            height={"100%"}
            title={movie.biDanh}
            src={movie.trailer}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </DialogContent>
      </Dialog>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    dialogStatus: state.dialogReducer.dialogStatus,
    movie: state.dialogReducer.movie,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeDialogStatus: (data) => {
      dispatch(actChangeDialogStatus(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogMovie);
