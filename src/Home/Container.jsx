import React from 'react';
import { Banner } from './Banner';
import { NearYou } from './NearYou';
import { Discover } from './Discover';

export const Home = () => {
  return (
    <>
      <Banner />
      <NearYou />
      <Discover />
    </>
  )
}
