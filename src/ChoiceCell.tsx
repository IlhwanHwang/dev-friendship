import * as React from 'react'

export default class ChoiceCell extends React.Component {
  props: {
    text: string,
    imageUrl: string,
    onClick: () => any,
    portion: number,
    cellStyle: "normal" | "correct" | "incorrect",
    enable: boolean
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
          height: "16rem",
          backgroundColor: "black"
        }}
        onMouseOver={() => { this.setState({ entered: true }) }}
        onMouseOut={() => { this.setState({ entered: false }) }}
      >
        <div
          className="w-100 h-100"
          style={{
            backgroundImage: `url("${this.props.imageUrl}")`,
            opacity: this.props.enable && this.state.entered ? 0.5 : 1.0,
            backgroundSize: "cover",
            position: "absolute"
          }}
        >
        </div>
        <span
          style={{
            zIndex: 1,
            textShadow: "0px 0px 5px black",
            color: "white"
          }}
        >
          {this.props.text}
        </span>
        <div
          className="w-100 h-100"
          style={{
            zIndex: 2,
            position: "absolute",
            backgroundColor: (this.props.cellStyle === "incorrect" ? "#f008" : (this.props.cellStyle === "correct" ? "#0f08" : ""))
          }}
        >
        </div>
        <div
          className="w-100 h-100"
          style={{
            zIndex: 3,
            position: "absolute"
          }}
          onClick={this.props.enable ? this.props.onClick : () => {}}
        >
        </div>
      </div>
    )
  }
}