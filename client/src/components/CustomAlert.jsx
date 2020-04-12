import React, { useContext } from "react";
import { Alert, AlertIcon } from "@chakra-ui/core";
import PropTypes from "prop-types";
import AlertContext from "../context/alert/alertContext";

const CustomAlert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert status={alert.alertType} key={alert.id}>
        <AlertIcon />
        {alert.msg}
      </Alert>
    ))
  );
};
