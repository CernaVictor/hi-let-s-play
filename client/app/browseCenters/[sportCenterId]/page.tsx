'use client';

import { useGetSportCenterById } from '../../../hooks/useSportCentersApi';
import { SportCenterComponent } from '../../../components/SportCenterComponent/SportCenterComponent';
import { Map } from '../../../components/Map/Map';

export default function SportFieldPage({ params: { sportCenterId } }) {
  const getSportsCenterQuery = useGetSportCenterById(sportCenterId);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          paddingLeft: 20,
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        <Map
          sportCenters={
            getSportsCenterQuery.data ? [getSportsCenterQuery.data] : []
          }
          center={{
            lat: Number(getSportsCenterQuery.data?.latitude),
            lng: Number(getSportsCenterQuery.data?.longitude),
          }}
        />
        <SportCenterComponent sportCenterId={sportCenterId} />
      </div>
    </div>
  );
}
