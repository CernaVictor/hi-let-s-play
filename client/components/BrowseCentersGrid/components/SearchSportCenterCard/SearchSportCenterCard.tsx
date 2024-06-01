import { Card, Tabs, Text } from '@mantine/core';
import { SearchDTO, SearchSportCenter } from '../../../../types/types';
import { SearchSportFieldCard } from '../SearchSportFieldCard/SearchSportFieldCard';
import { Carousel } from '../../../Carousel/Carousel';
import { Divider } from '@mantine/core';
import { useRouter } from 'next/navigation';
import './styles.css';
import Link from 'next/link';

export const SearchSportCenterCard = ({
  sportCenter,
  searchParams,
}: {
  sportCenter: SearchSportCenter;
  searchParams: SearchDTO;
}) => {
  const { push } = useRouter();

  // const onCentrePress = () => {
  //   push(`/browseCenters/${sportCenter.id}`);
  // };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="div-link-to-center">
        <Link
          href={`/browseCenters/${sportCenter.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <span style={{ fontSize: 26 }}>{sportCenter.name}</span>
        </Link>
        <Text lineClamp={1}>{sportCenter.address}</Text>
      </div>
      <Divider />
      <div
        style={{
          marginTop: '10px',
          width: '100%',
        }}
      >
        <Carousel photos={sportCenter.imageGallery} />
      </div>
      <div style={{ marginTop: '10px', flex: 1, flexDirection: 'column' }}>
        <Tabs defaultValue={sportCenter.sportFields[0].name}>
          <Tabs.List>
            {sportCenter.sportFields.map((sportField) => {
              return (
                <Tabs.Tab value={sportField.name}>{sportField.name}</Tabs.Tab>
              );
            })}
          </Tabs.List>

          {sportCenter.sportFields.map((sportField) => {
            return (
              <Tabs.Panel value={sportField.name}>
                <SearchSportFieldCard
                  key={sportField.id}
                  sportField={sportField}
                  searchParams={searchParams}
                />
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>
    </Card>
  );
};
