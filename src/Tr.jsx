import React, {useMemo} from 'react';
import Td from './Td';

const Tr = React.memo(({trIndex, trData, dispatch}) => {
  console.log('Tr rendered');
  return (
    <tr>
      {Array(trData.length)
        .fill()
        .map((v, i) => (
          <Td key={i} trIndex={trIndex} tdIndex={i} tdData={trData[i]} dispatch={dispatch} />
        ))}
    </tr>
  );
});

export default Tr;
