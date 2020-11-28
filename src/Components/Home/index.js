import React from 'react';
import { Banner } from './Banner';
import { NearYou } from './NearYou';
import { Discover } from './Discover';
import { Events } from './Events';
import { MyGroup } from './MyGroup';

const Home = () => (
  <>
    <Banner />
    <NearYou />
    <Discover />
    <Events />
    <MyGroup />
  </>
);

export default Home;
