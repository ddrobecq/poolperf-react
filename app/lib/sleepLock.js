import { _DEBUG } from "./tools";
import { useState, useEffect } from "react";
import { useWakeLock } from "react-screen-wake-lock";

export default function useSleepLock (url, method, strPayLoad) {
    const { isSupported, released, request, release } = useWakeLock({
    onRequest: () => _DEBUG('Screen Wake Lock: requested!'),
    onError: () => console.error('An error happened when requesting the screen wake lock.'),
    onRelease: () => _DEBUG('Screen Wake Lock: released!'),
    });
    const [isActive, setIsActive] = useState (false);

    useEffect (() => {
        if (released === undefined) setIsActive (false)
        else setIsActive (!released);
    }, [released]);

    return [isSupported, isActive, request, release];
}