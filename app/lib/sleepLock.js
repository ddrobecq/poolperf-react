import { _DEBUG } from "./tools";
import { useState, useEffect } from "react";
import useWakeLock from "react-use-wake-lock";

export default function useSleepLock () {
    const { isSupported, isLocked, request, release } = useWakeLock();
    const [isActive, setIsActive] = useState (false);

    useEffect (() => {
        if (isLocked === undefined) setIsActive (false)
        else setIsActive (isLocked);
    }, [isLocked]);

    return [isSupported, isActive, request, release];
}