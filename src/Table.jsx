import React from 'react';
import Tr from './Tr';

const Table = ({tableData, dispatch}) => {
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((v, i) => (
            <Tr key={i} trIndex={i} trData={tableData[i]} dispatch={dispatch} />
            // Tr 컴포넌트에 tableData 값인 2차원 배열 [[],[],[]]의 요소인 배열 []을 props.rowData로 전달한다.
          ))}
      </tbody>
    </table>
  );
};

export default Table;
