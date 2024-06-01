import React, { useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { useStyles } from './MapStyles';
import { LoadingDiv } from '../LoadingDiv/LoadingDiv';
import { SportCenter } from '../../types/types';

const mapWrapper = {
  width: '100%',
  height: '100%',
  borderRadius: '20px',
};

type Props = {
  sportCenters: SportCenter[];
  center: { lat: number; lng: number };
};

export const Map = ({ sportCenters, center }: Props) => {
  const mapRef = useRef<GoogleMap>();

  const { isLoaded } = useJsApiLoader({
    id: 'hlp-google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_PLACES_API_KEY ?? '',
  });

  const getLatLong = (location) => {
    return {
      lat: Number(location.latitude),
      lng: Number(location.longitude),
    };
  };

  const onLoad = React.useCallback((map) => (mapRef.current = map), []);

  const styles = useStyles();

  if (!isLoaded) {
    return (
      <div className={styles.classes.divWrapper}>
        <LoadingDiv height={800} />
      </div>
    );
  }

  return (
    <div className={styles.classes.divWrapper}>
      <GoogleMap
        mapContainerStyle={mapWrapper}
        center={center}
        zoom={13}
        onLoad={onLoad}
        options={{ mapId: '8fa4c99632018e44', disableDefaultUI: true }}
      >
        {sportCenters &&
          sportCenters.map((sportCenter) => {
            const sportCenterPosition = getLatLong(sportCenter);
            return (
              <MarkerF
                key={sportCenter.id}
                position={sportCenterPosition}
                label={{
                  text: sportCenter.name,
                  color: '#DD722A',
                  fontWeight: 'bold',
                }}
                icon={{
                  url: '/stadium.png',
                  scaledSize: new window.google.maps.Size(70, 30),
                  labelOrigin: new window.google.maps.Point(35, 35),
                }}
              />
            );
          })}
      </GoogleMap>
    </div>
  );
};
