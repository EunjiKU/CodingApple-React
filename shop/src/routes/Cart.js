import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import { addCount, minusCount } from "../store/cartSlice";

export default function Cart() {
  // 6️⃣ Redux : 사용
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  let cart = useSelector((state) => state.cart);

  return (
    <>
      <h4 className="mt-4">
        <b>{user.name}</b>의 장바구니
      </h4>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => dispatch(addCount(item.id))}
                  >
                    + 1
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(minusCount(item.id))}
                  >
                    - 1
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
