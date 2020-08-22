import React from 'react';
import { Banner } from './Banner';
import { NearYou } from './NearYou';
import { Discover } from './Discover';
import { Events } from './Events';
import { MyGroup } from './MyGroup';
import { Footer } from './Footer';

export const Home = () => {
  return (
    <>
      <Banner />
      <NearYou />
      <Discover />
      <Events />
      <MyGroup />
      <Footer />
    </>
  )
}
