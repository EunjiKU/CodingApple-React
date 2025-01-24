import logo from "./logo.svg";
import "./App.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import data from "./data.js";
import Detail from "./routes/Detail.js";
import Cart from "./routes/Cart.js";
import { createContext, useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

// 1️⃣ Context : 저장공간 만들기
export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [pageNum, setPageNum] = useState(2);
  let [loading, setLoading] = useState(false);
  let [test, setTest] = useState("context 테스트");
  let [watchedItems, setWatchedItems] = useState([]);
  let navigate = useNavigate();
  // navigage(1) 앞으로 이동
  // navigage(-1) 뒤로 이동

  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }

    // localStorage에서 최근 본 상품 가져오기
    let watched = JSON.parse(localStorage.getItem("watched"));
    setWatchedItems(watched);
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">KEJ⭐</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              홈
            </Link>
            <Link to="/about" className="nav-link">
              대해
            </Link>
            <Link to="/cart" className="nav-link">
              장바구니
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="view-pop">
        <p>최근 본 상품</p>
        <div className="scroll-area">
          {watchedItems.map((id, idx) => (
            <WatchedItem
              key={idx}
              shoes={shoes.find((item) => item.id === id)}
            />
          ))}
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((item, idx) => {
                    return <Card shoes={item} key={idx} />;
                  })}
                </div>
              </div>
              {loading && <p>로딩중...</p>}
              <Button
                variant="dark"
                disabled={pageNum > 3 ? true : false}
                onClick={() => {
                  if (loading) return; // 로딩 중 중복 호출 방지
                  setLoading(true);

                  axios
                    .get(
                      `https://codingapple1.github.io/shop/data${pageNum}.json`
                    )
                    .then((response) => {
                      let newShoes = [...shoes, ...response.data];
                      setShoes(newShoes);
                      setPageNum((prevPageNum) => prevPageNum + 1);
                      setLoading(false);
                    })
                    .catch(() => {
                      console.log("실패");
                      setLoading(false);
                    });
                }}
              >
                더보기
              </Button>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            // 2️⃣ Context : 사용할 곳 감싸기
            <Context1.Provider value={{ test }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        {/* ⭐ nested routes */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버</div>}></Route>
          <Route path="location" element={<div>위치</div>}></Route>
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route
          path="*"
          element={
            <div>
              <h4 style={{ color: "red" }}>404</h4>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

function Card({ shoes }) {
  return (
    <div className="col-md-4">
      <Link to={`/detail/${shoes.id}`}>
        <img
          src={`https://codingapple1.github.io/shop/shoes${shoes.id + 1}.jpg`}
          width="80%"
          alt=""
        />
        <h4>{shoes.title}</h4>
        <p>{shoes.content}</p>
      </Link>
    </div>
  );
}

function WatchedItem({ shoes }) {
  return (
    <Link to={`/detail/${shoes.id}`}>
      <img
        src={`https://codingapple1.github.io/shop/shoes${shoes.id + 1}.jpg`}
        width="80%"
        alt=""
      />
      <h4>{shoes.title}</h4>
      <p>{shoes.content}</p>
    </Link>
  );
}

function About() {
  return (
    <div>
      <h4>about페이지임</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
