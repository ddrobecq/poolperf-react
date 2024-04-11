import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import Webcam from "react-webcam";
import { useCallback, useMemo, useRef, useState } from "react";
import { _DEBUG } from "../lib/tools";
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function WebcamCapture(props) {
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: props.facingMode
    };

    return(
        <Webcam
            audio={false}
            height={videoConstraints.height}
            screenshotFormat="image/jpeg"
            width={videoConstraints.width}
            ref={props.webcamRef}
            videoConstraints={videoConstraints}
        >
        </Webcam>
    );
}

export default function UserPictureDialog (props) {
    const [facingMode, setFacingMode] = useState("user");
    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        props.onClose(imageSrc);
        },[webcamRef, props]
    );
    //const onCancel = useMemo(() => () => props.onClose(false), [props]);

    function onCancel () {
        props.onClose(false);
    }

    function reverse() {
        if (facingMode === "user") {
            setFacingMode("environment");
        } else {
            setFacingMode("user");
        }
    }

    return (
        <Dialog open={props.open} onClose={onCancel} >
            <DialogTitle>Prendre une photo</DialogTitle>
            <DialogContent>
                <Box sx={{ borderRadius:40, display: 'flex', justifyContent: 'center' }} >
                    <WebcamCapture sx={{ borderRadius:40 }} webcamRef={webcamRef} facingMode={facingMode} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} >Annuler</Button>
                <Button onClick={reverse} startIcon={<CameraswitchIcon />} >Reverse</Button>
                <Button onClick={capture} startIcon={<CameraAltIcon />} color={'success'} >Prendre</Button>
            </DialogActions>
        </Dialog>
    );
}