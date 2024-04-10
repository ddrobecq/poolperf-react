import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

export default function Header (props) {
    return (
        <AppBar position={'sticky'} sx={{ paddingY:1 }} >
            <Typography variant="h1" align="center">Pool Perf</Typography>
        </AppBar>
    );
}