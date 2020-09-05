import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react'

export const Banner = () => (
  <BannerImage src='/assets/banner1.png' />
)

const BannerImage = styled(Image)`
  margin: 10px auto;
  width: 100%;
`;