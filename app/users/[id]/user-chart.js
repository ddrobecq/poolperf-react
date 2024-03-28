import { BarPlot, ChartsAxisHighlight, ChartsReferenceLine, ChartsTooltip, ChartsXAxis, ChartsYAxis, LineHighlightPlot, ResponsiveChartContainer } from '@mui/x-charts';
import { Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "@/app/lib/theme";
import { _DEBUG } from "@/app/lib/tools";

function UserDetailGamesChart(props) {
    const data = (props.data.length > 0) ? props.data.map((item) => item.y) : null;
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
                }]}
                margin={{top: 5, right: 30, left: 15}}
                height={chartHeight}
                >
                    <BarPlot />
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
        const data = props.dataGames;
        let arrPocket = [];
        let arrFoul = [];
        if (data) {
            for (let i=0;i < data.length;i++){
                arrPocket[i] = {x:(i+1), y: Math.round(((data[i].gam_pocket/data[i].gam_shot) * 100))};
                arrFoul[i] = {x:(i+1), y: data[i].gam_foul};
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