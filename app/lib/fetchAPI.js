'use client'

import {useState, useEffect} from 'react';
import { _DEBUG } from './tools';
import {_STORAGE_KEY_IS_CACHE} from './constants';
const _APIURL = "https://api.billard.drobecq.fr";

// **********************************************
// function : useFetch
//  url : URL to call API
//  method : method to call API's resources (GET, POST, PUT, DELETE)
//  bWithPagination (optional) : true if data should be fetched page by page
// description : to use as a React hook 
// **********************************************
export default function useFetch (url, method, strPayLoad, bWithCache) {
    const [data, setData] = useState (null); 
    const [isLoading, setIsLoading] = useState (true); 

    useEffect(() => {
        if (url) {
                callAPIPerfPool(url, method, strPayLoad, bWithCache, true)
                .then ((results) => {
                    setData (results);
                    setIsLoading(false);
                }
                , (error) => {
                    setData(null);
                    setIsLoading(false);
                });
        }    
    }, [url, method, bWithCache, strPayLoad]);

    return [data, isLoading];
}

function callAPIPerfPool (strPath, strMethod, strPayLoad, bWithCache, bRetry) {
    const url = _APIURL + strPath;
    return (callAPI (url, strMethod, strPayLoad, bWithCache, bRetry));
}

/* RETURN AJAX API CALL */
function callAPI(strPath, strMethod, strPayLoad, bWithCache, bRetry) {
    return new Promise((resolve, reject) => {
        let cachedResult = null;
        if (bWithCache) cachedResult = JSON.parse(sessionStorage.getItem(strPath));
        if (cachedResult && bWithCache) {
            resolve(cachedResult);
        }
        else {
            let xhr = new XMLHttpRequest();
            xhr.open(strMethod, strPath);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.responseType = "json";
            xhr.onload = function() {
                if (this.status === 200) {
                    _DEBUG ("received : ", this.response);
                    if (bWithCache)
                        try {
                            sessionStorage.setItem (strPath, JSON.stringify(this.response));
                        } catch (e) {
                            if (e.name === 'QuotaExceededError') {
                                sessionStorage.clear();
                            }
                        };
                    resolve(this.response);
                } else {
                    console.error ('received : ', `ERROR ${this.status}`, JSON.stringify(this.response));
                    reject({
                        status: this.status,
                        error: JSON.stringify(this.response),
                    });
                }
            };
            xhr.onerror = function(error) {
                console.error (`received : ERROR ${this.status} on request ${strMethod} ${strPath}`, error);
                if (bRetry) {
                    console.error ('retry:', `${strMethod} ${strPath}`);
                    return (callAPI(strPath, strMethod, strPayLoad, bWithCache, false));
                } else reject({
                    status: this.status,
                    error: error
                });
            };
            xhr.ontimeout = function(error) {
                console.error (`received : TIMEOUT ${this.status} on request ${strMethod} ${strPath}`, error);
                reject({
                    status: 408,
                    error: error
                });
            };
            xhr.send(strPayLoad);       
            _DEBUG ("sent : ", `${strMethod} ${strPath}`); 
        }
    });
};
