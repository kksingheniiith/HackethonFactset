import * as React from "react";
// import styles from './Covid19.module.scss';
import { ICovid19Props, ICovid19States } from "./ICovid19Props";
import { escape } from "@microsoft/sp-lodash-subset";
import Grid from "./grid/grid";
import covidService from '../../../Services/covid19.svc';

export default class Covid19 extends React.Component<
  ICovid19Props,
  ICovid19States
> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: 'Welcome to Teams App!',
      subTitle: 'Customize SharePoint experiences using Web Parts.',
      siteTabTitle: 'Learn more1',
      stateWiseDataInArray: [],
      stateWiseDataInObject : undefined
    }
  }

  public componentDidMount(){
    covidService.getStateWiseData().then((data: any) => {
      this.setState({
        stateWiseDataInArray: [...Object.keys(data).map(state =>{
           return {"state" : state,"data" : data[state]};
          })],
          stateWiseDataInObject: data
      })
    });
    
  }

  public render(): React.ReactElement<ICovid19Props> {
    return (
      <div>
        <span>{this.state.title}</span>
        <p>Customize SharePoint experiences using Web Parts.</p>
        <p>{escape(this.props.description)}</p>
        <a href="https://aka.ms/spfx">
          <span>gg</span>
        </a>
        <Grid />
      </div>
    );
  }
}
