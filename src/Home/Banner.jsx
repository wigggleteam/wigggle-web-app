import React from 'react';
import styled from 'styled-components';

export const Banner = () => {
  return (
    <>
      <BannerBackground className="banners">
        <BannerImage className='first'
          src='/assets/banner2.png'
        />
        <BannerImage
          src='/assets/banner1.png'
        />
        <BannerImage
          src='/assets/banner2.png'
        />
        <BannerImage
          src='/assets/banner1.png'
        />
        <BannerImage
          src='/assets/banner2.png'
        />
        <BannerImage
          src='/assets/banner1.png'
        />
      </BannerBackground>
      <style jsx global>{`

    .first {
      -webkit-animation: bannermove 30s linear infinite;
         -moz-animation: bannermove 30s linear infinite;
          -ms-animation: bannermove 30s linear infinite;
           -o-animation: bannermove 30s linear infinite;
              animation: bannermove 30s linear infinite;
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
    `}</style>
    <div style={{clear: 'both'}}></div>
    </>
  )
}

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
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -o-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
    cursor: pointer;
 
    -webkit-box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
    -moz-box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
    box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
  }
`;