import { BarPlot, ChartsAxisHighlight, ChartsReferenceLine, ChartsTooltip, ChartsXAxis, ChartsYAxis, LineHighlightPlot, LinePlot, ResponsiveChartContainer } from '@mui/x-charts';
import { Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { _DEBUG } from "@/app/lib/tools";
import { useTheme } from '@emotion/react';
import { darken } from '@mui/material/styles';

function UserDetailGamesChart(props) {
    const data = (props.data.length > 0) ? props.data.map((item) => item.y) : null;
    const trend = (props.data.length > 0) ? props.data.map((item) => item.z) : null;
    const xAxisData = (props.data.length > 0) ? props.data.map((item) => item.x) : null;
    const percent = (props.percent) ? '%' : '';
    const chartHeight = 300;
    const xAxis = [
        {
            label: 'Parties', 
            data: xAxisData, 
            scaleType: 'band'
        }
    ]
    const yAxis = [
        {
            data: [0, 100],
            valueFormatter: (value) => value.toString()+percent
        }
    ]

    return (
        <Stack direction={"column"} spacing={2} >
            <Typography variant={"h1"}>{props.label}</Typography>
            {(data) 
            ? <ResponsiveChartContainer
                xAxis={xAxis}
                yAxis={yAxis}
                rightAxis={false}
                series={[{
                    type: 'bar',
                    color: props.color,
                    data:data
                    },
                    {
                    type: 'line',
                    color: darken (props.color, 0.5),
                    data: trend,
                    }
                ]}
                margin={{top: 5, right: 30, left: 15}}
                height={chartHeight}
                >
                    <BarPlot />
                    <LinePlot />
                    <ChartsXAxis />
                    <ChartsYAxis position={'right'} />
                    <LineHighlightPlot />
                    <ChartsAxisHighlight x="line" />
                    <ChartsTooltip trigger={'item'} />
                    <ChartsReferenceLine
                        y={props.max}
                        label={"Max"}
                        labelAlign={'start'}
                        lineStyle={{stroke: '#128128', strokeDasharray: '3 3'}}
                    />
                    <ChartsReferenceLine
                        y={props.min}
                        label={"Min"}
                        labelAlign={'start'}
                        lineStyle={{stroke: '#ed6c02', strokeDasharray: '3 3'}}
                    />
                </ResponsiveChartContainer>
            : <Skeleton variant="rectangular" height={chartHeight} />
            }
        </Stack>
    );
}

export default function UserDetailGames(props) {
    const [dataPocket, setDataPocket] = useState([]);
    const [dataFoul, setDataFoul] = useState([]);
    const [minPocket, setMinPocket] = useState(0);
    const [maxPocket, setMaxPocket] = useState(0);
    const [minFoul, setMinFoul] = useState(0);
    const [maxFoul, setMaxFoul] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        const data = props.dataStats;
        if (data) {
            setMinPocket(data[0].minPocket * 100);
            setMaxPocket(data[0].maxPocket * 100);
            setMinFoul(data[0].minFoul);
            setMaxFoul(data[0].maxFoul);
        }
    }, [props.dataStats]);

    useEffect(() => {
        function calcTrend(value, n, prevAvg) {
            return (n !=0) ? ((value-prevAvg) * 2/(n+1) + prevAvg) : 0;
        }

        const data = props.dataGames;
        let arrPocket = [];
        let arrFoul = [];
        let yValue = 0;
        if (data) {
            for (let i=0;i < data.length;i++){
                yValue = (data[i].gam_pocket/data[i].gam_shot) * 100;
                arrPocket[i] = {
                    x: (i+1), 
                    y: Math.round(yValue),
                    z: (i !=0) ? calcTrend (yValue, i, arrPocket[i-1].z) : yValue,
                };
                yValue = data[i].gam_foul;
                arrFoul[i] = {
                    x: (i+1), 
                    y: yValue,
                    z: (i !=0) ? calcTrend (yValue, i, arrFoul[i-1].z) : yValue,
                };
            }
            setDataPocket(arrPocket);
            setDataFoul(arrFoul);
        }
    }, [props.dataGames]);

    return (
        <Stack direction={'column'} spacing={2} width={'100%'} >
            <UserDetailGamesChart data={dataPocket} min={minPocket} max={maxPocket} label={'Empochées'} percent color={theme.palette.success.main} />
            <UserDetailGamesChart data={dataFoul} min={minFoul} max={maxFoul} label={'Fautes'} color={theme.palette.error.main} />
        </Stack>
    );
}