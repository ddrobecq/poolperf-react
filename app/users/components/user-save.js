import LoadingButton from '@mui/lab/LoadingButton';
import useFetch from "@/components/fetchAPI";
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { _DEBUG } from '@/components/tools';

export default function UserSave (props) {
    const method = (props.id == 0) ? 'POST' : 'PUT';
    const url = (props.id == 0) ? '/users' : `/users/${props.id}`;
    const [result, isSaving] = useFetch(url, method, strUserBody (props.name, props.picture));
    const [error, setError] = useState(false);
    const [updated, setUpdated] = useState(false);

    /* BUILD JSON BODY FOR SAVNG A USER */
    function strUserBody (name, picture){
        _DEBUG ('strUserBody', name, picture);
        let body ={};
        if (picture) {
            body = {
                usr_name: name,
                usr_avatar: picture,
            };
    
        } else {
            body = {
                usr_name: name,
            };                
        }
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