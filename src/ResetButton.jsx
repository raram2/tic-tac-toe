import React from 'react';

const ResetButton = ({onClick}) => {
  console.log('ResetButton rendered');
  return <button onClick={onClick}>다시 하기</button>;
};

export default ResetButton;
