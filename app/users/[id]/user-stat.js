import useFetch from "@/app/lib/fetchAPI";
import Loader from "@/app/lib/loader";
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

export default function UserDetailStats(props) {
    const [data, isLoading] = useFetch (`/users/${props.id}/stats`, "GET", null);

    function TypoTableHeader (props) {
        return (
            <Typography variant={"h2"}>{props.title}</Typography>
        );
    }

    function TypoTableCell (props) {
        return (
            <Typography variant={"h2"} >{props.value}</Typography>
        );
    }

    function formatPercent (value) {
        return (value * 100).toFixed(0) + " %";
    }

    return (
        <Stack direction={"column"} width={'100%'}>
            <Typography variant={"h1"}>Statistiques</Typography>
            <Table >
                <TableHead >
                    <TableRow >
                        <TableCell></TableCell>
                        <TableCell><TypoTableHeader title='Moy' /></TableCell>
                        <TableCell><TypoTableHeader title='Min' /></TableCell>
                        <TableCell><TypoTableHeader title='Max'/></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell><TypoTableHeader title='Empochées'/></TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].avgPocket)}/> : <Loader/>}</TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].minPocket)}/> : <Loader/>}</TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].maxPocket)}/> : <Loader/>}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><TypoTableHeader title='Fautes'/></TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].avgFoul)}/> : <Loader/>}</TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].minFoul)}/> : <Loader/>}</TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].maxFoul)}/> : <Loader/>}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Stack>
    );
}
