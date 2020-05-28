import * as React from "react";
import { IndiaTotalProps } from "../ICovid19Props";
import "./IndiaTotal.css";

export default class IndiaTotal extends React.Component<IndiaTotalProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    console.log("prorp", this.props);
    let {
      active,
      confirmed,
      deaths,
      recovered,
      deltadeaths,
      deltaconfirmed,
      deltarecovered,
    } = this.props.TotalData;
    return (
      <div className="india-class">
        <div
          className="card text-warning border border-warning"
          style={{ width: "12rem" }}
        >
          <div className="card-body">
            <h6 className="card-title font-weight-bold">Confirmed</h6>
            <span>{` [+${deltaconfirmed}]`}</span>
            <h4 className="card-subtitle font-weight-bold">{confirmed}</h4>
          </div>
        </div>
        <div
          className="card text-primary border border-primary"
          style={{ width: "12rem" }}
        >
          <div className="card-body">
            <h6 className="card-title font-weight-bold">Active</h6>
            <h4 className="card-subtitle font-weight-bold">{active}</h4>
          </div>
        </div>
        <div
          className="card text-success border border-success"
          style={{ width: "12rem" }}
        >
          <div className="card-body">
            <h6 className="card-title font-weight-bold">Recovered</h6>
            <span>{` [+${deltarecovered}]`}</span>
            <h4 className="card-subtitle font-weight-bold">{recovered}</h4>
          </div>
        </div>
        <div
          className="card text-danger border border-danger"
          style={{ width: "12rem" }}
        >
          <div className="card-body">
            <h6 className="card-title font-weight-bold">Deceased</h6>
            <span>{` [+${deltadeaths}]`}</span>
            <h4 className="card-subtitle font-weight-bold">{deaths}</h4>
          </div>
        </div>
      </div>
    );
  }
}
