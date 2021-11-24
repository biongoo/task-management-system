import React from 'react';
import Lottie from 'lottie-react';
import sign from '../../../assets/sign.json';

const Animation = () => {
  return <Lottie animationData={sign} style={{ width: '400px' }} />;
};

export default Animation;
