import * as React from "react";
import { ImageDisplayProps } from "../ICovid19Props";
import "./ImageDisplayer.css";

export default class ImageDisplayer extends React.Component<
  ImageDisplayProps,
  { imageURLS: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageURLS: {
        "Andaman and Nicobar Islands":
          "https://upload.wikimedia.org/wikipedia/commons/9/9d/IN-AN.svg",
        "Andhra Pradesh":
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/IN-AP.svg",
        "Arunachal Pradesh":
          "https://upload.wikimedia.org/wikipedia/commons/4/40/IN-AR.svg ",
        Assam: "https://upload.wikimedia.org/wikipedia/commons/8/80/IN-AS.svg",
        Bihar: "https://upload.wikimedia.org/wikipedia/commons/c/cd/IN-BR.svg",
        Chandigarh:
          "https://upload.wikimedia.org/wikipedia/commons/f/f3/IN-CH.svg",
        Chhattisgarh:
          "https://upload.wikimedia.org/wikipedia/commons/0/0d/IN-CT.svg",
        Delhi: "https://upload.wikimedia.org/wikipedia/commons/f/f3/IN-CH.svg",
        "Dadra and Nagar Haveli and Daman and Diu":
          "https://upload.wikimedia.org/wikipedia/commons/0/0a/IN-DN.svg",
        Goa: "https://upload.wikimedia.org/wikipedia/commons/4/4b/IN-GA.svg",
        Gujarat:
          "https://upload.wikimedia.org/wikipedia/commons/1/1e/IN-GJ.svg",
        "Himachal Pradesh":
          "https://upload.wikimedia.org/wikipedia/commons/5/54/IN-HP.svg",
        Haryana:
          "https://upload.wikimedia.org/wikipedia/commons/c/cf/IN-HR.svg",
        Jharkhand:
          "https://upload.wikimedia.org/wikipedia/commons/1/19/IN-JH.svg",
        "Jammu and Kashmir":
          "https://upload.wikimedia.org/wikipedia/commons/e/e7/IN-JK_%282019%29.svg",
        Karnataka:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/IN-KA.svg",
        Kerala: "https://upload.wikimedia.org/wikipedia/commons/4/4b/IN-KL.svg",
        Ladakh: "https://upload.wikimedia.org/wikipedia/commons/0/0f/IN-LA.svg",
        Lakshadweep:
          "https://upload.wikimedia.org/wikipedia/commons/1/1b/IN-LD.svg",
        Maharashtra:
          "https://upload.wikimedia.org/wikipedia/commons/1/16/IN-MH.svg",
        Meghalaya:
          "https://upload.wikimedia.org/wikipedia/commons/e/ef/IN-ML.svg",
        Manipur:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/IN-MN.svg",
        "Madhya Pradesh":
          "https://upload.wikimedia.org/wikipedia/commons/9/91/IN-MP.svg",
        Mizoram:
          "https://upload.wikimedia.org/wikipedia/commons/3/37/IN-MZ.svg",
        Nagaland:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/IN-NL.svg",
        Odisha: "https://upload.wikimedia.org/wikipedia/commons/2/2e/IN-OR.svg",
        Punjab: "https://upload.wikimedia.org/wikipedia/commons/1/10/IN-PB.svg",
        Puducherry:
          "https://upload.wikimedia.org/wikipedia/commons/b/b7/IN-PY.svg",
        Rajasthan:
          "https://upload.wikimedia.org/wikipedia/commons/c/cd/IN-RJ.svg",
        Sikkim: "https://upload.wikimedia.org/wikipedia/commons/c/ce/IN-SK.svg",
        Telangana:
          "https://upload.wikimedia.org/wikipedia/commons/a/ae/IN-TG.svg",
        "Tamil Nadu":
          "https://upload.wikimedia.org/wikipedia/commons/1/14/IN-TN.svg",
        Tripura:
          "https://upload.wikimedia.org/wikipedia/commons/e/e8/IN-TR.svg",
        "Uttar Pradesh":
          "https://upload.wikimedia.org/wikipedia/commons/9/91/IN-UP.svg",
        Uttarakhand:
          "https://upload.wikimedia.org/wikipedia/commons/d/de/IN-UT.svg",
        "West Bengal":
          "https://upload.wikimedia.org/wikipedia/commons/c/c7/IN-WB.svg",
      },
    };
  }
  public render() {
    console.log("props image url", this.props);
    return (
      <div className="image-display">
        <img
          className="image-class"
          src={this.state.imageURLS[this.props.url]}
          alt="cannot load image"
        />
      </div>
    );
  }
}
