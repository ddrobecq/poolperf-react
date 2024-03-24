import useFetch from "@/app/lib/fetchAPI";
import Loader from "@/app/lib/loader";
import { Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

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

    function SkeletonTableCell (props) {
        return (
            <Skeleton variant={"h2"} />
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
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].avgPocket)}/> : <SkeletonTableCell/>}</TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].minPocket)}/> : <SkeletonTableCell/>}</TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].maxPocket)}/> : <SkeletonTableCell/>}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><TypoTableHeader title='Fautes'/></TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].avgFoul)}/> : <SkeletonTableCell/>}</TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].minFoul)}/> : <SkeletonTableCell/>}</TableCell>
                        <TableCell>{(data) ? <TypoTableCell value={formatPercent (data[0].maxFoul)}/> : <SkeletonTableCell/>}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Stack>
    );
}
