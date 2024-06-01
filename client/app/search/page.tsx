'use client';

import { useState } from 'react';
import { BrowseCentersGrid } from '../../components/BrowseCentersGrid/BrowseCentersGrid';
import { Map } from '../../components/Map/Map';
import { useSearchApi } from '../../hooks/useSearchApi';
import { SearchDTO } from '../../types/types';

export default function SearchPage({
  searchParams,
}: {
  searchParams?: SearchDTO;
}) {
  const [mapCenter, setMapCenter] = useState({ lat: 45.7489, lng: 21.2287 });

  const [queryParams, setQueryParams] = useState<SearchDTO>(searchParams ?? {});
  const { data, isLoading, isFetching } = useSearchApi(queryParams);

  const handleSearchPress = (values: SearchDTO) => {
    setQueryParams(values);
    setMapCenter({
      lat: Number(values.latitude),
      lng: Number(values.longitude),
    });
  };
  return (
    <div
      style={{
        backgroundColor: '#dff7ff',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 20,
        paddingBottom: 20,
      }}
    >
      <BrowseCentersGrid
        searchParams={queryParams}
        sportCenters={data ?? []}
        isLoading={isLoading || isFetching}
        onSearchPress={handleSearchPress}
      />
      <Map sportCenters={data ?? []} center={mapCenter} />
    </div>
  );
}
