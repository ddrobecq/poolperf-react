import { Button } from "@mui/material";
import Image from "next/image";
import { Children } from "react";

export default function CommandButton(props) {
    return (
        <Button fullWidth color={props.color} {...props}>
            {props.children}
        </Button>
    );
}

//créer un style de bouton qui prend la forme d'une boule de billard
export function BallButton(props) {
//    <Image src={'../public/1.svg'} alt={'ball'} width={50} height={50} />
    return (
        <Button 
            sx={{borderRadius:'50px'}} 
            fullWidth 
            color={'success'} 
            {...props} >
            {props.children}
        </Button>
    );
}