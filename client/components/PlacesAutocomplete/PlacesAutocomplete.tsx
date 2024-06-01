import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useGoogleMapsScript, Libraries } from 'use-google-maps-script';
import { Select } from '@mantine/core';

interface ISearchBoxProps {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longitude: number | null,
  ) => void;
  defaultValue: string;
  label?: string;
  icon?: React.ReactNode;
  classNames?: any;
}

const libraries: Libraries = ['places'];

export function PlacesAutocomplete(props: ISearchBoxProps) {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_PLACES_API_KEY ?? '',
    libraries,
  });

  if (!isLoaded || loadError) return null;

  return <SearchBox {...props} />;
}

function SearchBox({
  onSelectAddress,
  defaultValue,
  label,
  icon,
  classNames,
}: ISearchBoxProps) {
  const {
    value,
    setValue,
    suggestions: { data },
  } = usePlacesAutocomplete({ debounce: 300, defaultValue });

  const handleSelect = async (address: string) => {
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      onSelectAddress(address, lat, lng);
    } catch (error) {
      console.error(`😱 Error:`, error);
    }
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, setValue]);

  return (
    <Select
      classNames={classNames}
      searchable
      label={label}
      searchValue={value}
      onSearchChange={setValue}
      onChange={handleSelect}
      data={data.map((el) => el.description)}
      clearable
      filter={() => true}
      required
      icon={icon}
      placeholder="Address"
    />
  );
}
