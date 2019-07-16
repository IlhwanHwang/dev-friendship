import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render = () => {
    return (
      <div
        className="row h-100 d-flex align-items-center"
      >
        <div
          className="w-100 h-100"
          style={{
            backgroundImage: "url('/images/bg-programming.jpg')",
            backgroundSize: "cover",
            position: "absolute",
            top: "0",
            left: "0"
          }}
        >
        </div>
        <div
          className="w-100 h-100"
          style={{
            backgroundColor: "#343a40a0",
            position: "absolute",
            top: "0",
            left: "0"
          }}
        >
        </div>
        <div className="col text-center">
          <h1 className="text-white">
            개발자 우정 테스트
          </h1>
          <p className="text-white">
            우정테스트를 만들고 공유하세요.
          </p>
          <Link to="/make" className="btn btn-primary">새 우정 테스트 만들기</Link>
        </div>
      </div>
    )
  }
}