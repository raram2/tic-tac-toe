import React, {useCallback, useEffect, useRef} from 'react';
import {CLICK_TD} from './TicTacToe';

const Td = React.memo(({trIndex, tdIndex, tdData, dispatch}) => {
  console.log('Td rendered');
  // 성능 강화
  const ref = useRef([]);
  useEffect(() => {
    console.log(
      trIndex === ref.current[0],
      tdIndex === ref.current[1],
      dispatch === ref.current[2],
      tdData === ref.current[3],
    );
    console.log(tdData, ref.current[3]);
    ref.current = [trIndex, tdIndex, dispatch, tdData];
  }, [trIndex, tdIndex, dispatch, tdData]);

  const handleTdClick = useCallback(() => {
    console.log(trIndex + '-' + tdIndex);
    if (tdData) return; // 이미 채워졌다면(tdData가 truthy일 경우) 변경 못하게
    dispatch({type: CLICK_TD, row: trIndex, cell: tdIndex}); // dispatch 함수는 props로 전달만 된다면 어느 자식 컴포넌트든 다이렉트로 state 업데이트 가능
  }, [tdData]);
  return <td onClick={handleTdClick}>{tdData}</td>;
});

export default Td;
