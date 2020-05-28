import * as React from "react";
import "./sideBar.css";
import { ISideBarProps, ISideBarStates } from "../ICovid19Props";

export default class SideBar extends React.Component<
  ISideBarProps,
  ISideBarStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      active: {},
      deceased: {},
      recovered: {},
      confirmed: {},
      todayDeceased: {},
      todayConfirmed: {},
      todayRecovered: {}
    };
  }

  public componentDidMount() {
    let { currState, currDistrict, IndiaData } = this.props;
    if (currDistrict === "none") {
      this.setState({
        name: currState.state,
        active: { num: currState.active, den: IndiaData.active },
        recovered: { num: currState.recovered, den: IndiaData.recovered },
        deceased: { num: currState.deceased, den: IndiaData.deceased },
        confirmed: { num: currState.confirmed, den: IndiaData.confirmed },
        todayDeceased: { num: currState.todayDeceased, den: IndiaData.todayDeceased },
        todayConfirmed: { num: currState.todayConfirmed, den: IndiaData.todayConfirmed },
        todayRecovered: { num: currState.todayRecovered, den: IndiaData.todayRecovered } 
      });
    } else {
      this.setState({
        name: currDistrict.district + " district",
        active: { num: currDistrict.active, den: currState.active },
        recovered: { num: currDistrict.recovered, den: currState.recovered },
        deceased: { num: currDistrict.deceased, den: currState.deceased },
        confirmed: { num: currDistrict.confirmed, den: currState.confirmed },
        todayDeceased: { num: currState.todayDeceased, den: IndiaData.todayDeceased },
        todayConfirmed: { num: currState.todayConfirmed, den: IndiaData.todayConfirmed },
        todayRecovered: { num: currState.todayRecovered, den: IndiaData.todayRecovered } 
      });
    }
  }

  public componentWillReceiveProps(updatedProps: any) {
    let { currState, currDistrict, IndiaData } = updatedProps;
    if (currDistrict === "none") {
      this.setState({
        name: currState.state,
        active: { num: currState.active, den: IndiaData.active },
        recovered: { num: currState.recovered, den: IndiaData.recovered },
        deceased: { num: currState.deceased, den: IndiaData.deceased },
        confirmed: { num: currState.confirmed, den: IndiaData.confirmed },
        todayDeceased: { num: currState.todayDeceased, den: IndiaData.todayDeceased },
        todayConfirmed: { num: currState.todayConfirmed, den: IndiaData.todayConfirmed },
        todayRecovered: { num: currState.todayRecovered, den: IndiaData.todayRecovered } 
      });
    } else {
      this.setState({
        name: currDistrict.district + " district",
        active: { num: currDistrict.active, den: currState.active },
        recovered: { num: currDistrict.recovered, den: currState.recovered },
        deceased: { num: currDistrict.deceased, den: currState.deceased },
        confirmed: { num: currDistrict.confirmed, den: currState.confirmed },
        todayDeceased: { num: currState.todayDeceased, den: IndiaData.todayDeceased },
        todayConfirmed: { num: currState.todayConfirmed, den: IndiaData.todayConfirmed },
        todayRecovered: { num: currState.todayRecovered, den: IndiaData.todayRecovered } 
      });
    }
  }

  public calc(obj) {
    return Math.ceil((obj.num / obj.den) * 100);
  }
  public render() {
    return (
      <div className="sidebar-class">
        <div className=" w-100 ">
          <h5 className="card-title font-weight-bold text-center">
            {this.state.name}
          </h5>
        </div>
        <div
          className="card text-warning sidebar-card"
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <h6 className="card-title font-weight-bold">Confirmed</h6>
            <h4 className="card-title font-weight-bold">
              {this.state.confirmed.num}
              <span>&#8593;</span><span>{this.state.todayConfirmed.num}</span>
            </h4>
            <div className="progress">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${this.calc(this.state.confirmed)}%` }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="card text-primary sidebar-card"
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <h6 className="card-title font-weight-bold">Active</h6>
            <h4 className="card-title font-weight-bold">
              {this.state.active.num}
            </h4>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${this.calc(this.state.active)}%` }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="card text-success sidebar-card"
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <h6 className="card-title font-weight-bold">Recovered</h6>
            <h4 className="card-title font-weight-bold">
              {this.state.recovered.num}
              <span>&#8593;</span><span>{this.state.todayRecovered.num}</span>
            </h4>
            <div className="progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${this.calc(this.state.recovered)}%` }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="card text-danger sidebar-card"
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <h6 className="card-title font-weight-bold">Deceased</h6>
            <h4 className="card-title font-weight-bold">
              {this.state.deceased.num}
              <span>&#8593;</span><span>{this.state.todayDeceased.num}</span>
            </h4>
            <div className="progress">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${this.calc(this.state.deceased)}%` }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
