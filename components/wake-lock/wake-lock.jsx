import React, { useEffect, useState } from 'react';
import WakeLockAndroid from './android';
import WakeLockIOS from './ios';
import { _DEBUG } from '../tools';
import { isMobile, isIOS, isAndroid } from 'react-device-detect';

export default function WakeLock(props) {
  const [clientMode, setClientMode] = useState (false);
  const [isIPhone,setIsIPhone] = useState(false);

  useEffect (() => {
    setClientMode (true);
  }, []);

  useEffect (() => {
    if (clientMode) {
      if (isIOS && isMobile) {
        setIsIPhone(true);
      }
    }
  }, [clientMode]);

  if (isIPhone) return <WakeLockIOS {...props} />;
  if (isAndroid) return <WakeLockAndroid {...props} />;
  return null;
} 
