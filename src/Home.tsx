import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render = () => {
    return (
      <Link to="/make">새 질문 만들기</Link>
    )
  }
}