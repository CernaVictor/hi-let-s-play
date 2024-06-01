import { Skeleton, Grid, Container } from '@mantine/core';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchDTO, SearchResult } from '../../types/types';
import './Styles.css';
import { SearchSportCenterCard } from './components/SearchSportCenterCard/SearchSportCenterCard';

type Props = {
  searchParams: SearchDTO;
  sportCenters: SearchResult[];
  isLoading: boolean;
  onSearchPress: (params: SearchDTO) => void;
};

export const BrowseCentersGrid = ({
  searchParams,
  sportCenters,
  isLoading,
  onSearchPress,
}: Props) => {
  return (
    <div className="grid-wrapper">
      <SearchForm defaultValues={searchParams} onSearchPress={onSearchPress} />
      <Skeleton visible={isLoading}>
        <Container>
          <Grid columns={4} className="grid" style={{ marginTop: '10px' }}>
            {sportCenters?.map((sportCenter) => (
              <Grid.Col span={2} key={sportCenter.id}>
                <SearchSportCenterCard
                  sportCenter={sportCenter}
                  searchParams={searchParams}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Skeleton>
    </div>
  );
};
