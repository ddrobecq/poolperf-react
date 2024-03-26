import { Button } from "@mui/material";

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