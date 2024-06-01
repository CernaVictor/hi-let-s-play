import Image from 'next/image';
import { SearchForm } from '../SearchForm/SearchForm';
import LandingImg from '../../assets/landing.jpg';
import { forwardRef } from 'react';
import { useStyles } from './HeroStyles';
import { useRouter } from 'next/navigation';
import { SearchDTO } from '../../types/types';

export const Hero = forwardRef<HTMLDivElement>(function Hero(_, ref) {
  const classes = useStyles();
  const { push } = useRouter();

  const onSearchPress = (values: SearchDTO) => {
    const searchParams = new URLSearchParams(values);
    push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className={classes.classes.heroWrapper}>
      <div ref={ref} className={classes.classes.searchFormWrapper}>
        <h1>Book a sports facility near you</h1>
        <SearchForm onSearchPress={onSearchPress} />
      </div>
      <Image
        className={classes.classes.heroImg}
        src={LandingImg}
        alt="landing img"
      />
    </div>
  );
});
