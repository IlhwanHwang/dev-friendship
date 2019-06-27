import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render = () => {
    return (
      <div>
        <Link to="/make">새 우정 테스트 만들기</Link>
      </div>
    )
  }
}