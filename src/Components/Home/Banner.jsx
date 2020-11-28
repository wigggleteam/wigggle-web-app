import React from 'react';
import styled from 'styled-components';

export const Banner = () => (
  <>
    <BannerBackground className="banners">
      <BannerImage
        className="first"
        src="/assets/banner2.png"
      />
      <BannerImage
        src="/assets/banner1.png"
      />
      <BannerImage
        src="/assets/banner2.png"
      />
      <BannerImage
        src="/assets/banner1.png"
      />
      <BannerImage
        src="/assets/banner2.png"
      />
      <BannerImage
        src="/assets/banner1.png"
      />
    </BannerBackground>
    <style jsx global>
      {`

      .first {
        -webkit-animation: bannermove 90s linear infinite;
          -moz-animation: bannermove 90s linear infinite;
            -ms-animation: bannermove 90s linear infinite;
            -o-animation: bannermove 90s linear infinite;
                animation: bannermove 90s linear infinite;
      }

      @keyframes "bannermove" {
        0% {margin-left: 0px;}
        100% {margin-left: -2400px;}
      }
        
      @-moz-keyframes bannermove {
        0% {margin-left: 0px;}
        100% {margin-left: -2400px;}
      }
        
      @-webkit-keyframes "bannermove" {
        0% {margin-left: 0px;}
        100% {margin-left: -2400px;}
      }
        
      @-ms-keyframes "bannermove" {
        0% {margin-left: 0px;}
        100% {margin-left: -2400px;}
      }
        
      @-o-keyframes "bannermove" {
        0% {margin-left: 0px;}
        100% {margin-left: -2400px;}
      }

      .banners:hover .first 
      {
        -webkit-animation-play-state: paused;
        -moz-animation-play-state: paused;
        -o-animation-play-state: paused;
        animation-play-state: paused;
      }
    `}
    </style>
    <div style={{ clear: 'both' }} />
  </>
);

/* Styled Components */

const BannerBackground = styled.div`
  height: 300px;
  float: left;
  width: 4000px;
`;

const BannerImage = styled.img`
  height: 250px;
  width: 600px;
  margin: 25px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover{
    cursor: pointer;
    -webkit-box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
    -moz-box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
    box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
  }
`;
