import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';

export const Banner = ({ imagesUrl }) => {
  console.log(imagesUrl);
  return (
    <BannerImage src={imagesUrl[0]} />
  );
};

const BannerImage = styled(Image)`
  margin: 10px auto;
  width: 600px;
  height: 300px;
`;
