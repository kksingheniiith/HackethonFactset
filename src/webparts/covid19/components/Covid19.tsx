import * as React from "react";
// import styles from './Covid19.module.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { ICovid19Props, ICovid19States } from "./ICovid19Props";
import { escape } from "@microsoft/sp-lodash-subset";
import Grid from "./grid/grid";
import covidService from "../../../Services/covid19.svc";
import { Spinner } from "react-bootstrap";
import "./Covid19.css";

export default class Covid19 extends React.Component<
  ICovid19Props,
  ICovid19States
> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "Welcome to Teams App!",
      subTitle: "Customize SharePoint experiences using Web Parts.",
      siteTabTitle: "Learn more1",
      stateWiseDataInArray: [],
      stateWiseDataInObject: undefined,
    };
  }

  public componentDidMount() {
    covidService.getStateWiseData().then((data: any) => {
      this.setState({
        stateWiseDataInArray: [
          ...Object.keys(data).map((state) => {
            return { state: state, data: data[state] };
          }),
        ],
        stateWiseDataInObject: data,
      });
    });
  }

  public render(): React.ReactElement<ICovid19Props> {
    let display;
    if (this.state.stateWiseDataInArray.length === 0) {
      display = (
        <div className="spinner-div">
          <div className="spinner-border spinner-size" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      display = (
        <Grid
          statesData={this.state.stateWiseDataInArray}
          statesDataObject={this.state.stateWiseDataInObject}
        />
      );
    }

    return (
      <div>
        <span>{this.state.title}</span>
        <p>Customize SharePoint experiences using Web Parts.</p>
        <p>{escape(this.props.description)}</p>
        <a href="https://aka.ms/spfx">
          <span>gg</span>
        </a>
        <div className="grid-display">{display}</div>
      </div>
    );
  }
}
