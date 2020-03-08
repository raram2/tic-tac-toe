import React, {useReducer, useCallback, useEffect} from 'react';
import Table from './Table';
import ResetButton from './ResetButton';

const initialState = {
  winner: '',
  isDraw: false,
  turn: 'O',
  tableData: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  recentCell: [-1, -1], // 없는 칸으로 일단 설정
};

// 액션 타입 정의 (리덕스 커뮤니티 규칙)
export const SET_WINNER = 'SET_WINNER';
export const SET_TURN = 'SET_TURN';
export const CLICK_TD = 'CLICK_TD';
export const RESET_GAME = 'RESET_GAME';
export const SET_DRAW = 'SET_DRAW';

// state(기존 데이터를 담은 객체)와 action(업데이트 요청사항을 담은 데이터)를 결합
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER: {
      return {
        ...state, // 1. 기존 state 전체 얕은 복사 후
        winner: action.winner, // 2. 업데이트 상태만 오버라이드
      };
    }
    case CLICK_TD: {
      const tableData = [...state.tableData]; // 기존 state.tableData 얕은 복사
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      // 컴포넌트에서 dispatch로 보낸 action 객체 데이터를 통해 기존 데이터 업데이트 (이 부분 코드는 immer 라이브러리로 가독성 해결)
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case SET_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case SET_DRAW: {
      return {
        ...state,
        isDraw: true,
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        winner: '',
        isDraw: false,
        turn: 'O',
        tableData: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState); // state가 많아질 수록 한번에 모아 액션 요청에 따라 처리하는 리듀서 사용
  const {winner, isDraw, turn, tableData, recentCell} = state;
  const handleTableClick = useCallback(() => {
    dispatch({type: 'SET_WINNER', winner: 'O'});
  }, []);
  const handleReset = () => {
    dispatch({type: RESET_GAME});
  };
  useEffect(() => {
    // recentCell이 바뀔 때 마다, 누가 이겼는지 그때 마다 체크
    const [row, cell] = recentCell;
    if (row < 0) {
      // 처음 렌더링 될 때 로직이 실행 되지 않게
      return;
    }
    let win = false;
    // 먼저, 가로 라인 검사
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    // 다음으로 세로 라인 검사
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    // 다음으로 대각선 \ 라인 검사
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    // 마지막으로 대각선 / 라인 검사
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win === true) {
      // 승자가 결정된 상태일 때
      dispatch({type: SET_WINNER, winner: turn});
    } else {
      // 승자가 결정되지 않은 상태일 때
      let all = true; // all이 true면 무승부라는 뜻
      // 무승부 검사
      tableData.forEach(row => {
        row.forEach(cell => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        // 무승부일 때
        dispatch({type: SET_DRAW});
      } else {
        dispatch({type: SET_TURN});
      }
    }
    // return () => {
    //   // 컴포넌트가 제거 되었을 때
    // };
  }, [recentCell]);
  return (
    <>
      {/* TicTacToe 컴포넌트에서 useReducer을 통해 생성한 dispatch 함수를 자식 컴포넌트들에도 전달해주어야 그 컴포넌트들에서도 사용가능하므로 props로 넘겨주기 */}
      {/* 단, 이렇게 단계별로 넘겨주는 과정이 번거롭기 때문에 Context API 사용하게 됨. Context API는 원하는 자식 컴포넌트에 다이렉트로 props 전달 가능 */}
      {console.log(winner)}
      <Table onClick={handleTableClick} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
      {isDraw && <div>무승부</div>}
      {winner || isDraw ? <ResetButton onClick={handleReset} /> : null}
    </>
  );
};

export default TicTacToe;
