import * as React from "react";
// import styles from './Covid19.module.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { ICovid19Props, ICovid19States } from "./ICovid19Props";
import { escape } from "@microsoft/sp-lodash-subset";
import Grid from "./grid/grid";
import covidService from "../../../Services/covid19.svc";
import "./Covid19.css";
import SideBar from "./sideBar/sideBar";
import { ServiceScope } from '@microsoft/sp-core-library';
import { UserProfileService } from '../../../Services/UserProfileService';
import { IUserProfile } from '../../../Services/IUserProfile';
import { EmployeesDetail } from './EmpolyeesDetail/EmployeeDetail';

export default class Covid19 extends React.Component<
  ICovid19Props,
  ICovid19States
> {
  private dataCenterServiceInstance: any;
  constructor(props: any) {
    super(props);
    this.state = {
      title: "Welcome to Teams App!",
      subTitle: "Customize SharePoint experiences using Web Parts.",
      siteTabTitle: "Learn more1",
      districtWiseDataInArray: [],
      districtWiseDataInObject : undefined,
      stateWiseDataInArray: [],
      userProfileItems: undefined
    };
  }

  public componentDidMount(){
    let serviceScope: ServiceScope = this.props.serviceScope;    
    this.dataCenterServiceInstance = serviceScope.consume(UserProfileService.serviceKey);  
  
    this.dataCenterServiceInstance.getUserProfileProperties().then((userProfileItems: IUserProfile) => {    
      for (let i: number = 0; i < userProfileItems.UserProfileProperties.length; i++) {  
        if (userProfileItems.UserProfileProperties[i].Key == "FirstName") {  
          userProfileItems.FirstName = userProfileItems.UserProfileProperties[i].Value;  
        }  
  
        if (userProfileItems.UserProfileProperties[i].Key == "LastName") {  
          userProfileItems.LastName = userProfileItems.UserProfileProperties[i].Value;  
        }  
  
        if (userProfileItems.UserProfileProperties[i].Key == "WorkPhone") {  
          userProfileItems.WorkPhone = userProfileItems.UserProfileProperties[i].Value;  
        }  
  
        if (userProfileItems.UserProfileProperties[i].Key == "Department") {  
          userProfileItems.Department = userProfileItems.UserProfileProperties[i].Value;  
        }  
  
        if (userProfileItems.UserProfileProperties[i].Key == "PictureURL") {  
          userProfileItems.PictureURL = userProfileItems.UserProfileProperties[i].Value;  
        }  
      }  
      console.log(userProfileItems);
      this.setState({ userProfileItems: userProfileItems }); 
    });
    covidService.getDistrictWiseData().then((data: any) => {
      covidService.getStateWiseData().then((stateData: any) => {
        this.setState({
          districtWiseDataInArray: [...Object.keys(data).map(state =>{
             return {"state" : state,"data" : data[state]};
            })],
            districtWiseDataInObject: data,
            stateWiseDataInArray: stateData.statewise,
        });
      });
    });
  }

  public render(): React.ReactElement<ICovid19Props> {
    let display;
    if (this.state.districtWiseDataInArray.length === 0) {
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
          statesData={this.state.districtWiseDataInArray}
          statesDataObject={this.state.districtWiseDataInObject}
          statesUpdatedData={this.state.stateWiseDataInArray}
        />
      );
    }

    return (
      <div>
        <EmployeesDetail
          serviceScope={this.props.serviceScope}
          curentUser={this.state.userProfileItems}
        />

        <div className="grid-display">{display}</div>
      </div>
    );
  }
}
