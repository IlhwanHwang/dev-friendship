import * as React from 'react'

export default class ChoiceCell extends React.Component {
  props: {
    text: string,
    imageUrl: string,
    onClick: () => any
  }

  render = () => {
    return (
      <div
        className="col-6 d-flex justify-content-center align-items-end pb-3"
        style={{
          backgroundImage: `url("${this.props.imageUrl}")`,
          backgroundSize: "cover",
          height: "8rem"
        }}
      >
        <button
          className="btn btn-primary"
          onClick={this.props.onClick}
        >
          {this.props.text}
        </button>
      </div>
    )
  }
}