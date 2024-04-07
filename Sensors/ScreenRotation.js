import React from 'react';
import { ScreenOrientation } from 'expo';

export default function ScreenRotation({ children, orientation }) {
  React.useEffect(() => {
    const setScreenOrientation = async () => {
      if (orientation === 'landscape') {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    };

    setScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, [orientation]);

  return <>{children}</>;
}
