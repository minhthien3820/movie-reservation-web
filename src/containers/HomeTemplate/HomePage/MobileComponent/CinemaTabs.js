import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import { CinemaTabStyles } from "./MobileHomeStyles";
import { connect } from "react-redux";

function CinemaTabs(props) {
  const { data } = props;
  const classes = CinemaTabStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderCinema = (cinemaArray) => {
    return cinemaArray.map((item, index) => {
      return (
        <div key={index} className={classes.cinemaItem}>
          <Typography className={classes.nameCinema}>
            {item.tenCumRap}
          </Typography>
          <Typography className={classes.address}>{item.diaChi}</Typography>
        </div>
      );
    });
  };

  const renderCinemaSystem = () => {
    return data.map((item, index) => {
      return (
        <Accordion
          expanded={expanded === item.maHeThongRap}
          onChange={handleChange(item.maHeThongRap)}
          className={classes.bgAccor}
          key={index}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
            aria-controls={`${item.maHeThongRap}-content`}
            id={`${item.maHeThongRap}-header`}
          >
            <Avatar
              className={classes.avatar}
              alt={item.logo}
              src={item.logo}
            />
            <Typography className={classes.nameCinemaSystem}>
              {item.tenHeThongRap}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {expanded === item.maHeThongRap ? renderCinema(item.lstCumRap) : ""}
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return <div className={classes.cinemaLayout}>{renderCinemaSystem()}</div>;
}

const mapStateToProps = (state) => {
  return {
    data: state.listShowTimeReducer.data,
  };
};

export default connect(mapStateToProps, null)(CinemaTabs);
