import * as React from "react";
import { ImageDisplayProps } from "../ICovid19Props";
import "./ImageDisplayer.css";

export default class ImageDisplayer extends React.Component<ImageDisplayProps> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    let finalURl = "../../../../src/images/";
    let { url } = this.props;
    finalURl += url.split(" ").join("");
    console.log("props image url", this.props, url);
    return (
      <div className="image-display">
        <img className="image-class" src="https://upload.wikimedia.org/wikipedia/commons/1/1e/IN-GJ.svg" alt="cannot load image" />
      </div>
    );
  }
}
