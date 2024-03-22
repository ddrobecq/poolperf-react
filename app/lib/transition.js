import { forwardRef } from "react";

const { Slide } = require("@mui/material");

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default Transition;