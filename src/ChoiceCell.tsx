import * as React from 'react'

export default class ChoiceCell extends React.Component {
  props: {
    text: string,
    imageUrl: string,
    onClick: () => any,
    portion: number
  }

  state = {
    entered: false
  }

  render = () => {
    const column = `col-${Math.floor(12 / this.props.portion)}`
    return (
      <div
        className={`${column} d-flex justify-content-center align-items-end`}
        style={{
          height: "8rem",
          backgroundColor: "rgba(0, 0, 0, 1)"
        }}
        onMouseOver={() => { this.setState({ entered: true }) }}
        onMouseOut={() => { this.setState({ entered: false }) }}
      >
        <div
          className="w-100 h-100"
          style={{
            backgroundImage: `url("${this.props.imageUrl}")`,
            opacity: this.state.entered ? 0.5 : 1.0,
            backgroundSize: "cover",
            position: "absolute"
          }}
        >
        </div>
        <span style={{ opacity: 1.0, zIndex: 1 }}>
          {this.props.text}
        </span>
        <div
          className="w-100 h-100"
          style={{
            zIndex: 2,
            position: "absolute"
          }}
          onClick={this.props.onClick}>
        </div>
      </div>
    )
  }
}