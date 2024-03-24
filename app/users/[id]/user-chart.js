import useFetch from "@/app/lib/fetchAPI";
import { BarChart } from "@mui/x-charts";
import { Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "@/app/lib/theme";
import { _DEBUG } from "@/app/lib/tools";

function UserDetailGamesChart(props) {
    const data = (props.data.length > 0) ? props.data.map((item) => item.y) : null;
    const xAxis = (props.data.length > 0) ? props.data.map((item) => item.x) : null;
    const percent = (props.percent) ? '%' : '';
    const chartHeight = 300;

    return (
        <Stack direction={"column"} spacing={2} >
            <Typography variant={"h1"}>{props.label}</Typography>
            {(data) 
            ? <BarChart
                xAxis={[{
                    label: 'Parties', 
                    data: xAxis, 
                    scaleType: 'band', 
                }]}
                yAxis={[{
                    data: [0, 100],
                    valueFormatter: (value) => value.toString()+percent
                }]}
                series={[{
                    color: props.color,
                    data:data
                }]}
                margin={{top: 5, right: 15, left: 30}}
                height={chartHeight}
                />
            : <Skeleton variant="rectangular" height={chartHeight} />
            }
        </Stack>
    );
}

export default function UserDetailGames(props) {
    const [data, isLoading] = useFetch (`/users/${props.id}/games`, "GET", null);
    const [dataPocket, setDataPocket] = useState([]);
    const [dataFoul, setDataFoul] = useState([]);

    useEffect(() => {
        let arrPocket = [];
        let arrFoul = [];
        if (!isLoading && data) {
            for (let i=0;i < data.length;i++){
                arrPocket[i] = {x:(i+1), y: Math.round(((data[i].gam_pocket/data[i].gam_shot) * 100))};
                arrFoul[i] = {x:(i+1), y: data[i].gam_foul};
            }
            setDataPocket(arrPocket);
            setDataFoul(arrFoul);
        }
    }, [data, isLoading]);

    return (
        <Stack direction={'column'} spacing={2} width={'100%'} >
            <UserDetailGamesChart data={dataPocket} label={'Empochées'} percent color={theme.palette.success.main} />
            <UserDetailGamesChart data={dataFoul} label={'Fautes'} color={theme.palette.error.main} />
        </Stack>
    );
}