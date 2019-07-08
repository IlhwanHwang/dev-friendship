import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render = () => {
    return (
      <div className="row">
        <div className="col text-center">
          <h1>개발자 우정 테스트</h1>
          <p>
            우정테스트를 만들고 공유하세요.
          </p>
          <Link to="/make" className="btn btn-primary">새 우정 테스트 만들기</Link>
        </div>
      </div>
    )
  }
}