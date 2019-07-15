import * as React from 'react'
import * as GeoPattern from 'geopattern'

export default class ChoiceCell extends React.Component {
  props: {
    title: string,
    subtitle: string,
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
  isMono: boolean

  constructor (props) {
    super(props)
    this.imageFallback = GeoPattern.generate(this.props.title).toDataUri()
    this.isMono = this.props.imageUrl.length === 0 && this.props.title.match("^[_A-Za-z0-9 ]+$") !== null
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
          className="w-100 h-100 pb-0 pl-3 pr-3 pt-2 pb-2 d-flex"
          style={{ height: "4rem" }}
          onClick={this.props.enable ? this.props.onClick : () => {}}
        >
          <div
            className="flex-grow-1 d-flex overflow-hidden"
            style={{
              boxShadow: "0rem 0.125rem 0.5rem #0002",
              outlineColor: (this.props.cellStyle === "incorrect" ? "#f00" : (this.props.cellStyle === "correct" ? "#0f0" : "#fff0")),
              outlineWidth: "3px",
              outlineStyle: "solid"
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
              className="flex-grow-1 pl-2 pt-1 overflow-hidden"
              style={{
                backgroundColor: "#fff"
              }}
            >
              <span
                className="pl-2 pr-2 bg-dark text-white"
                style={{
                  fontSize: this.isMono ? "1.5rem" : "1.3rem",
                  fontFamily: this.isMono ? "monospace" : "inherit",
                  borderRadius: "0.5rem"
                }}
              >
                {this.props.title}
              </span>
              <br></br>
              <span
                className="text-secondary"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {this.props.subtitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}