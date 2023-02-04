import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { errorStyles } from "./error-style";

type ErrorProps = {
  message : string
}

function Error({ message } : ErrorProps) {
  return (
    <Box sx={{ ...errorStyles }}>
      <Box sx={{ fontSize: "24px" }}>Something Wrong :(</Box>
      <Box>{message}</Box>
    </Box>
  );
}

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
