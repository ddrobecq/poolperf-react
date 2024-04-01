import LoadingButton from '@mui/lab/LoadingButton';
import useFetch from "../lib/fetchAPI";
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { _DEBUG } from '../lib/tools';

export default function UserSave (props) {
    const [result, isSaving] = useFetch(`/users/${props.id}`, 'PUT', strUserBody (props.name));
    const [error, setError] = useState(false);
    const [updated, setUpdated] = useState(false);

    /* BUILD JSON BODY FOR SAVNG A USER */
    function strUserBody (name){
        const body = {
            usr_name: name,
        };
        const strBody = JSON.stringify (body);
        return strBody;
    }

    useEffect(() => {
        if (result) {
            if (result.affectedRows == 1) {
                setUpdated (true);
            } else {
                setError (true);
            }
        } 
    }, [result]);

    useEffect(() => {
        if (updated) {
            props.onClose();
        } 
    }, [props, updated]);

    return (
        <>
        {(error) 
        ?   <Button color={'error'} >Erreur</Button>
        :   <LoadingButton loading={isSaving} disabled >
                <span>Enregistrer</span>
            </LoadingButton>}
        </>
    );
}