import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CustomAlert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
      <Alert status={alert.alertType} key={alert.id}>
        <AlertIcon />
        {alert.msg}
      </Alert>
  ));

CustomAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(CustomAlert);
