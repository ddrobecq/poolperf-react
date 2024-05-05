import { useTheme } from '@emotion/react';
import { Stack, Box, Skeleton } from '@mui/material';
import _default from 'next/dist/client/router';
import { useContext } from 'react';
import { _DEBUG } from '../../../components/tools';
import { GameContext } from './game-context';

export default function ProgressiveBar(props) {
    const height = 3;
    const width = 20;
    const theme = useTheme();
    const { game, setGame} = useContext(GameContext);

    if (props.data === null) {
        return (
            <Stack direction={'row'} spacing={0.1}>
                <Skeleton variant={"rectangular"} height={height} width={width} />
                <Skeleton variant={"rectangular"} height={height} width={width} />
                <Skeleton variant={"rectangular"} height={height} width={width} />
                <Skeleton variant={"rectangular"} height={height} width={width} />
                <Skeleton variant={"rectangular"} height={height} width={width} />
            </Stack>
        );
    } else {
        const greyColor = theme.palette.background.paper;
        let barColors = [greyColor, greyColor, greyColor, greyColor, greyColor];
        const nbShot = game.players[props.id].nbShot;
        if (nbShot > 0) {
            switch (props.item) {
                case 'nbPocket': {
                    const value = game.players[props.id][props.item]/nbShot;
                    barColors = [
                        (value >= props.data.nbPocket.max) ? theme.palette.success.light : greyColor,
                        (value >= props.data.nbPocket.avg*1.2) ? theme.palette.success.dark : greyColor,
                        ((value > props.data.nbPocket.avg*0.8) || (value < props.data.nbPocket.avg*1.2)) ? theme.palette.info.main : greyColor,
                        (value <= props.data.nbPocket.avg*0.8) ? theme.palette.error.light : greyColor,
                        (value <= props.data.nbPocket.min) ? theme.palette.error.dark : greyColor
                    ];
                    break;
                }
                case 'nbFoul': {
                    const value = game.players[props.id][props.item];
                    barColors = [
                        (value <= props.data.nbFoul.min) ? theme.palette.success.light : greyColor,
                        (value <= props.data.nbFoul.avg*0.8) ? theme.palette.success.dark : greyColor,
                        ((value > props.data.nbFoul.avg*0.8) || (value > props.data.nbFoul.avg*1.2)) ? theme.palette.info.main : greyColor,
                        (value >= props.data.nbFoul.avg*1.2) ? theme.palette.error.light : greyColor,
                        (value >= props.data.nbFoul.max) ? theme.palette.error.dark : greyColor
                    ];
                    break;
                }  
                default:
                    barColors = [greyColor, greyColor, greyColor, greyColor, greyColor];
                    break;
            };
        };
        return (
            <Stack direction={'row'} spacing={0.1}>
                {barColors.map((color, index) => (
                    <Box key={index} height={height} width={width} bgcolor={color} />
                ))}
            </Stack>
        );
    }
}