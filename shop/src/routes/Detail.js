import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

import { addCart } from "../store/cartSlice";

import { Context1 } from "./../App.js";
import { useDispatch } from "react-redux";
// import styled from 'styled-components';

export default function Detail({ shoes }) {
  // 3️⃣ Context : 저장공간 열기
  // let t = useContext(Context1);
  // console.log(`앙${t}`);

  let { id } = useParams();
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState("");
  let shoesItem = shoes.find(function (x) {
    return x.id == id;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // 🔹 첫번째 방법
    // let viewWatchItems = localStorage.getItem("watched");
    // viewWatchItems = JSON.parse(viewWatchItems);
    // viewWatchItems.push(shoesItem.id);
    // // Set으로 바꿔서 중복삭제하고, 다시 Array로 바꿈
    // viewWatchItems = new Set(viewWatchItems);
    // viewWatchItems = Array.from(viewWatchItems);
    // localStorage.setItem("watched", JSON.stringify(viewWatchItems));

    // 🔹 두번째 방법
    let viewWatchItems = localStorage.getItem("watched");
    viewWatchItems = viewWatchItems ? JSON.parse(viewWatchItems) : [];
    // 이미 해당 id가 존재하는 경우 먼저 제거
    viewWatchItems = viewWatchItems.filter((id) => id !== shoesItem.id);
    // id를 배열의 마지막에 추가
    viewWatchItems.push(shoesItem.id);
    // 변경된 배열을 localStorage에 저장
    localStorage.setItem("watched", JSON.stringify(viewWatchItems));
  }, [shoesItem]);

  useEffect(() => {
    let b = setTimeout(() => {
      setFade2("end");
    }, 100);

    return () => {
      // useEffect가 실행되기 전에 실행
      clearTimeout(b);
      setFade2("");
    };
  }, []);

  return (
    <div className={`container start ${fade2}`}>
      <div className="row">
        <div
          className="col-md-6"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              shoesItem.id + 1
            }.jpg`}
            width="100%"
            alt=""
          />
          <div className="col-md-6">
            <h4>{shoesItem.title}</h4>
            <p>{shoesItem.content}</p>
            <p>{shoesItem.price}원</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(addCart(shoesItem));
              }}
            >
              주문하기
            </button>
          </div>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState("");
  // let a = useContext(Context1);
  // console.log(a);

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      // useEffect가 실행되기 전에 실행
      clearTimeout(a);
      setFade("");
    };
  }, [tab]);

  return (
    <div className={`start ${fade} mt-4`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}
