import * as React from 'react'
import * as GeoPattern from 'geopattern'

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

  imageFallback: string

  constructor (props) {
    super(props)
    this.imageFallback = GeoPattern.generate(this.props.text).toDataUri()
  }

  render = () => {
    // const column = `col-${Math.floor(12 / this.props.portion)}`
    return (
      <div
        className="col-12 p-0"
        onMouseOver={() => { this.setState({ entered: true }) }}
        onMouseOut={() => { this.setState({ entered: false }) }}
      >
        <div
          className="w-100 h-100 pb-0 pl-3 pr-3 pt-3 d-flex"
          style={{
            height: "4rem",
            backgroundColor: (this.props.cellStyle === "incorrect" ? "#f008" : (this.props.cellStyle === "correct" ? "#0f08" : "")),
          }}
          onClick={this.props.enable ? this.props.onClick : () => {}}
        >
          <div
            className="flex-grow-1 d-flex"
            style={{
              boxShadow: "0rem 0.125rem 0.5rem #0002"
            }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                zIndex: 0,
                width: "4rem",
                height: "4rem",
              }}
            >
              {
                <img
                  className={ this.props.imageUrl.endsWith(".svg") ? "w-75 h-75" : "w-100 h-100" }
                  src={this.props.imageUrl || this.imageFallback}
                  style={{ objectFit: this.props.imageUrl.endsWith(".svg") ? "scale-down" : "cover" }}
                >
                </img>
              }
            </div>
            <div
              className="flex-grow-1"
              style={{
                backgroundColor: "#fff"
              }}
            >
              <span
                className="pl-2 pr-2"
                style={{
                  zIndex: 2,
                  fontSize: "1.5rem",
                  fontFamily: this.props.imageUrl.length > 0 ? "inherit" : "monospace"
                }}
              >
                {this.props.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}