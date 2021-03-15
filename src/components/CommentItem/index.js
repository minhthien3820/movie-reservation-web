import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import RatingStar from "../RatingStar";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyle = makeStyles((theme) => ({
  reviewerContain: {
    border: "1px solid #e6e6e6",
    borderBottom: "none",
    borderRadius: "3px",
    backgroundColor: theme.palette.background.paper,
    marginTop: "15px",
  },
  dadCommentReviewer: {
    position: "relative",
    width: "100%",
    padding: "20px 20px 12px",
    borderBottom: "1px solid #e6e6e6",
  },
  scoreReview: {
    color: "#91d25a",
    fontSize: "16px",
    margin: "auto",
  },
  mainComment: {
    backgroundColor: "transparent",
    padding: "20px 0",
    fontSize: "14px",
    color: theme.palette.text.secondary,
    letterSpacing: "-.2px",
    textAlign: "justify",
  },
  likeIcon: {
    marginRight: "10px",
    transition: "all 0.5s",
    cursor: "pointer",
    "&:hover": {
      color: theme.status.red,
    },
    "&:focus": {
      color: theme.status.red,
    },
  },
}));

export default function CommentItem(props) {
  const classes = useStyle();
  return (
    <Box className={` ${props.className} ${classes.reviewerContain}`}>
      <Box className={classes.dadCommentReviewer}>
        <Box m={0} display="flex" justifyContent="space-between">
          <Box display="flex">
            <Avatar
              alt="avatar"
              src="https://s120-ava-talk.zadn.vn/1/d/c/c/4/120/24d4f63ab75d2c759cd9192d97772138.jpg"
            />
            <Box display="flex" flexDirection="column" ml={1}>
              <Typography variant="body2" component="p" color="textPrimary">
                Jan
              </Typography>
              <Typography variant="caption" component="p" color="textSecondary">
                2 ngày trước
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography className={classes.scoreReview} variant="body2">
              6
            </Typography>
            <RatingStar>6</RatingStar>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2" className={classes.mainComment}>
            Nội dung truyện ok nhưng biến tấu thành phim không ổn, diễn viên
            không tới, nhất là những cảnh quay cận diễn viên quần chúng, nội
            dung rời rạc, ko lắp ráp tình tiết cho gây cấn, hấp dẫn nên phim
            chưa hay. Xem hơi buồn ngủ vì đoán được hết tình tiết phim. Chưa đậm
            chất điện ảnh, còn hời hợt, làm chưa tới. 6đ
          </Typography>
        </Box>
        <Box pt={1} mt={0} borderTop="1px solid #e6e6e6" textAlign="left">
          <Box display="flex" mr={4}>
            <FavoriteIcon fontSize="small" className={classes.likeIcon} />
            <Typography color="textPrimary" variant="body2">
              <strong>0 </strong>
              Thích
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
