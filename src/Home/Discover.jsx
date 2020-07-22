import React from 'react';
import styled from 'styled-components';

const PictureContainer = ({ title, first }) => {
  return (
    <img src='https://via.placeholder.com/150' height='150' className={first ? 'first' : ''} />
  )
}

export const Discover = () => {

  const categories = new Array(15).fill(1);

  const horizontalScroll = (e) => {
    console.log('Scrolling')
  }

  return (
    <>
      <div style={{ marginTop: '40px' }}>
        <Heading>Discover</Heading>
        <Scrollbar className="discover">
          <Categories src='https://via.placeholder.com/150' height='150' className='first-discover' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
          <Categories src='https://via.placeholder.com/150' height='150' />
        </Scrollbar>
      </div>
      <style jsx global>{`

      .first-discover {
        -webkit-animation: discovermove 50s linear infinite;
          -moz-animation: discovermove 50s linear infinite;
            -ms-animation: discovermove 50s linear infinite;
            -o-animation: discovermove 50s linear infinite;
                animation: discovermove 50s linear infinite;
      }

      @keyframes "discovermove" {
        0% {margin-left: 0px;}
        100% {margin-left: -1600px;}
      }
        
      @-moz-keyframes discovermove {
        0% {margin-left: 0px;}
        100% {margin-left: -1600px;}
      }
        
      @-webkit-keyframes "discovermove" {
        0% {margin-left: 0px;}
        100% {margin-left: -1600px;}
      }
        
      @-ms-keyframes "discovermove" {
        0% {margin-left: 0px;}
        100% {margin-left: -1600px;}
      }
        
      @-o-keyframes "discovermove" {
        0% {margin-left: 0px;}
        100% {margin-left: -1600px;}
      }

      .discover:hover .first-discover 
      {
        -webkit-animation-play-state: paused;
        -moz-animation-play-state: paused;
        -o-animation-play-state: paused;
        animation-play-state: paused;
      }
    `}</style>
      <div style={{ clear: 'both' }}></div>
    </>
  )
}

/* Styled Components */

const Heading = styled.h2`
  margin: 10px auto;
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  font-family: 'Quicksand', sans-serif;
`;

const Scrollbar = styled.div`
  width: 3400px;
  height: 190px;
`;

const Categories = styled.img`
  margin: 20px;

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

const Title = styled.div`
  position: absolute;
  background-color: #000;
  color: #fff;
  height: 20px;
  width: 150px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  bottom: 0px;
`;

