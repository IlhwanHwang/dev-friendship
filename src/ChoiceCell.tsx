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
        className={`${column} d-flex justify-content-center ${ this.props.imageUrl.length > 0 ? "align-items-end" : "align-items-center" }`}
        style={{
          height: "16rem",
          backgroundColor: "white"
        }}
        onMouseOver={() => { this.setState({ entered: true }) }}
        onMouseOut={() => { this.setState({ entered: false }) }}
      >
        <div
          className="w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ zIndex: 0, position: "absolute" }}
        >
          {
            this.props.imageUrl.endsWith(".svg") ? (
              <img
                className="w-75 h-75"
                src={this.props.imageUrl}
                style={{ objectFit: "scale-down" }}
              >
              </img>
            ) : (
              <img
                className="w-100 h-100"
                src={this.props.imageUrl}
                style={{ objectFit: "cover" }}
              >
              </img>
            )
          }
        </div>
        <div
          className="w-100 h-100"
          style={{
            zIndex: 1,
            position: "absolute",
            backgroundColor: "black",
            opacity: this.props.enable && this.state.entered ? 0.3 : 0.0,
          }}
        ></div>
        <span
          className="pl-2 pr-2"
          style={{
            zIndex: 2,
            fontSize: "2rem",
            textShadow: "0px 0px 5px black",
            textAlign: "center",
            color: "white",
            backgroundColor: "#0008",
            borderRadius: "5px",
            fontFamily: this.props.imageUrl.length > 0 ? "inherit" : "monospace"
          }}
        >
          {this.props.text}
        </span>
        <div
          className="w-100 h-100"
          style={{
            zIndex: 3,
            position: "absolute",
            backgroundColor: (this.props.cellStyle === "incorrect" ? "#f008" : (this.props.cellStyle === "correct" ? "#0f08" : ""))
          }}
        >
        </div>
        <div
          className="w-100 h-100"
          style={{
            zIndex: 4,
            position: "absolute"
          }}
          onClick={this.props.enable ? this.props.onClick : () => {}}
        >
        </div>
      </div>
    )
  }
}