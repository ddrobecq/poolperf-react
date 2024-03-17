import { Button } from "@mui/material";
import { Children } from "react";

export default function CustomButton(props) {
    return (
        <Button variant={"contained"} fullWidth color={props.color} {...props}>
            {props.children}
        </Button>
    );
}