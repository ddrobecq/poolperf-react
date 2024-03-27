import React from "react";
import { Stack } from "@mui/material";
import { _DEBUG } from "./tools";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const Images = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

function BallTypo (props) {
  return (
    <Typography
      variant="h2"
      sx={{
        position: 'relative',
      }}
    >
      {props.label}
    </Typography>
  );
}

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
}));


export default function BallButton(props) {
  let imageURL;

  switch (props.color) {
    case 'success':
      imageURL = './ball-green.png';
      break;
    case 'warning':
      imageURL = './ball-red.png';
      break;
    default:
      imageURL = './ball-blue.png';
      break;
  };

  return (
    <Box justifyContent={'center'} sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 150, width: '100%' }}>
      <ImageButton
        focusRipple
        key={props.label}
        style={{
          width: 120,
          height: 120,
        }}
        {...props}
      >
        <ImageSrc style={{ backgroundImage: `url(${imageURL})` }} />
        <Images>
          <Stack direction={"column"} alignItems={'center'} >
            <BallTypo label={props.label} />
            <Stack direction={"row"} spacing={1} alignItems={'center'} >
              <BallTypo label={props.value} />
              {(props.total) 
              ? <BallTypo label={Math.round(props.value / props.total * 100)+'%'} />
              : <BallTypo label={''} />
              }
            </Stack>
          </Stack>
        </Images>
      </ImageButton>
    </Box>
  );
}

