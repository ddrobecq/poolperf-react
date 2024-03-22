import useFetch from "@/app/lib/fetchAPI";
import Loader from "@/app/lib/loader";
import { BarChart } from "@mui/x-charts";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "@/app/lib/theme";

function UserDetailGamesChart(props) {
    const data = props.data.map((item) => item.y);
    const xAxis = props.data.map((item) => item.x);
    const percent = (props.percent) ? '%' : '';

    if (!data) return <Typography>Erreur</Typography>
    else return (
        <Stack direction={"column"} spacing={2} >
            <Typography variant={"h1"}>{props.label}</Typography>
            <BarChart
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
                height={300}
            />
        </Stack>
    );
}

export default function UserDetailGames(props) {
    const [data, isLoading] = useFetch (`/users/${props.id}/games`, "GET", null, true);
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

    if (isLoading) return <Loader />
    else if (!data) return <Typography>Erreur</Typography>;
    else return (
        <Stack direction={'column'} spacing={2} width={'100%'} >
            <UserDetailGamesChart data={dataPocket} label={'Empochées'} percent color={theme.palette.success.main} />
            <UserDetailGamesChart data={dataFoul} label={'Fautes'} color={theme.palette.error.main} />
        </Stack>
    );
}