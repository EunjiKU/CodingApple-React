// /* eslint-disable */ :  eslint가 잡아주는 warning 미출력

import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';

 /* 01/07(금) : 예전 React 문법 사용해보기 */
class Profile extends React.Component {
  constructor() {
    super();
    this.state = { name : 'KEJ' }
  }

  changeName = () => {
    this.setState({name : 'KU'});
  }

  render() {
    return (
     <div>
       <h3>프로필입니다.</h3>
       <p>저는 {this.state.name } 입니다.</p>
       <button onClick={ this.changeName }>이름 변경</button>
     </div>
    )
  }
}

function App() {
  let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '집에 가고 싶다']);
  let [like, setLike] = useState([0, 0, 0]);

  // 01/04(화) : 모달창을 띄우기 위한 state
  let [modal, setModal] = useState(false);

  // 01/06(목) : 제목별 모달창을 띄우기 위한 state
  let [select, setSelect] = useState(0);

  // 01/07(금) : input 다루기 1 - 사용자가 입력한 글을 변수에 저장하는 법
  let [input, setInput] = useState('');

  function changeTitle() {
    //setTitle(['여자 코트 추천', title[1], title[2]]);
    var newArray = [ ...title ];
    newArray[0] = '여자 코트 추천';
    setTitle(newArray);
  }

  function sortTitle() {
    var newArray = [...title];
    newArray.sort();
    setTitle(newArray);
  }

  function changeLike(item) {
    var changeLike = [...like];
    changeLike[title.indexOf(item)] += 1;
    setLike(changeLike);
  }

  /* // 01/07(금) : input 다루기 2 - 직접 짜본 코드
  function addTitle() {
    var newTitle = [ ...title];
    newTitle.push(input);
    setTitle(newTitle);

    var newLike = [...like];
    newLike.push(0);
    setLike(newLike);
    
    setInput('');
  }
  */

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      {/* <img src={ logo } /> */}

      <button onClick={ changeTitle }>제목 변경</button>
      <button onClick={ sortTitle }>제목 정렬</button>

      {/* 01/03(월) : HTML 정적 생성
      <div className="list">
        <h3> { title[0] }
            <span onClick={ () => { setLike(like+1) }}>💕</span> { like }
        </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3> { title[1] } </h3>
        <p>2월 18일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3> { title[2] } </h3>
        <p>2월 19일 발행</p>
        <hr/>
      </div> 
      */}

      <button onClick={ () => { setModal(!modal) }}>모달창 오픈</button>

    {
      // 01/04(화) : map() 함수를 사용해서 HTML 반복 생성하기
      // 01/06(목) : props를 응용한 상세페이지 만들기 - 각 제목 클릭 시 선택된 제목 변경
      // .map(param1, param2) : param1은 i번째의 실데이터(=array[i]), param2는 i

      // 01/07(금) : input 다루기 1 - 사용자가 입력한 글을 변수에 저장하는 법 
      // map 반복문으로 돌린 HTML에는 key={}/ 그 안에 인덱스를 넣어주어야 한다.
      title.map(function(data, i) {
        return (
          <div className="list" key={i}>
            <h3 onClick={ () => { setSelect(i); setModal(true);} }> { data } <span onClick={ () => { changeLike(data) }}>💕</span> { like[i] } </h3>
            <p>2월 19일 발행</p>
            <hr/>
          </div> 
        )
      })
    }
    
    {/* 01/07(금) : input 다루기 1 - 사용자가 입력한 글을 변수에 저장하는 법 */}
    {/* <input onChange={ (e) => { setInput(e.target.value); console.log(input); }}/> */}


    {/* 01/07(금) : input 다루기 2 - 블로그 글발행 기능 만들기 */}
    <div className="publish">
      <input onChange={ (e) => { setInput(e.target.value) }}/>
      <button onClick={ () => { 
        var newTitle = [...title];
        newTitle.unshift(input);
        setTitle(newTitle);
       }}>글 발행하기</button>
    </div>

    <Profile></Profile>

    {
      /* 01/06(목) : props 개념 */
      /* 01/06(목) : props 예제 */
      modal === true
      ? <Modal title={title} select={select}></Modal>
      : null
    }
    </div>
  );
}

function Modal(props) {
  /* 01/04(화) : React Component */
  return (
    <div className="modal">
      <h2>{ props.title[props.select] }</h2>
      <p>날짜</p>
      <p>상세 내용</p>
    </div>

    /* Fragment 사용법
    <>
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세 내용</p>
    </div>
    </>
    */
  );
} // Modal Func

export default App;
