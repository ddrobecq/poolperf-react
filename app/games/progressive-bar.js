import { useTheme } from '@emotion/react';
import { Stack, Box, Skeleton } from '@mui/material';
import _default from 'next/dist/client/router';
import { useContext } from 'react';
import { _DEBUG } from '../lib/tools';
import { GameContext } from '../lib/context';

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
        const greyColor = theme.palette.grey[900];
        let barColors = [];
        _DEBUG ('ProgressiveBar', props.data, props.item, game)
        switch (props.item) {
            case 'nbPocket': {
                const value = game.players[props.id][props.item]/game.players[props.id].nbShot;
                barColors = [
                    (value >= props.data.max) ? theme.palette.success.light : greyColor,
                    (value >= props.data.avg*1.2) ? theme.palette.success.dark : greyColor,
                    ((value > props.data.avg*0.8) || (value < props.data.avg*1.2)) ? theme.palette.info.main : greyColor,
                    (value <= props.data.avg*0.8) ? theme.palette.error.light : greyColor,
                    (value <= props.data.min) ? theme.palette.error.dark : greyColor
                ];
                break;
            }
            case 'nbFoul': {
                const value = game.players[props.id][props.item];
                barColors = [
                    (value <= props.data.min) ? theme.palette.success.light : greyColor,
                    (value <= props.data.avg*0.8) ? theme.palette.success.dark : greyColor,
                    ((value > props.data.avg*0.8) || (value > props.data.avg*1.2)) ? theme.palette.info.main : greyColor,
                    (value >= props.data.avg*1.2) ? theme.palette.error.light : greyColor,
                    (value >= props.data.max) ? theme.palette.error.dark : greyColor
                ];
                break;
            }  
            default:
                barColors = [greyColor, greyColor, greyColor, greyColor, greyColor];
                break;
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