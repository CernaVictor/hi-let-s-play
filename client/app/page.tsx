'use client';
import React, { useRef } from 'react';
import { NextPage } from 'next';
import { Benefits } from '../components/Benefits/Benefits';
import { Hero } from '../components/Hero/Hero';

const Home: NextPage = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const scrollToSearchForm = () => {
    divRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div>
      <Hero ref={divRef} />
      <Benefits scrollToSearchForm={scrollToSearchForm} />
    </div>
  );
};

export default Home;
