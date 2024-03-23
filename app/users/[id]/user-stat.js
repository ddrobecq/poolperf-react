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

    if (isLoading) {
        return <Loader />;
    }
    else {
        if (!data) {
            return <Typography>Erreur</Typography>;
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
                            <TableCell><TypoTableCell value={formatPercent (data[0].avgPocket)}/></TableCell>
                            <TableCell><TypoTableCell value={formatPercent (data[0].minPocket)}/></TableCell>
                            <TableCell><TypoTableCell value={formatPercent (data[0].maxPocket)}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><TypoTableHeader title='Fautes'/></TableCell>
                            <TableCell><TypoTableCell value={formatPercent (data[0].avgFoul)}/></TableCell>
                            <TableCell><TypoTableCell value={formatPercent (data[0].minFoul)}/></TableCell>
                            <TableCell><TypoTableCell value={formatPercent (data[0].maxFoul)}/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Stack>
        );
    }
}
