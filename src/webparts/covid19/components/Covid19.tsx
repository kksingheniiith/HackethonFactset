import * as React from 'react';
// import styles from './Covid19.module.scss';
import { ICovid19Props, ICovid19States } from './ICovid19Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Covid19 extends React.Component<ICovid19Props, ICovid19States> {

  constructor(props: any){
    super(props);

    this.state = {
      title: 'Welcome to Teams App!',
      subTitle: 'Customize SharePoint experiences using Web Parts.',
      siteTabTitle: 'Learn more1',
    }
  }

  public componentDidMount(){

  }

  public render(): React.ReactElement<ICovid19Props> {
    return (
      // <div className={ styles.covid19 }>
      //   <div className={ styles.container }>
      //     <div className={ styles.row }>
      //       <div className={ styles.column }>
      //         <span className={ styles.title }>Welcome to SharePoint!</span>
      //         <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={ styles.description }>{escape(this.props.description)}</p>
      //         <a href="https://aka.ms/spfx" className={ styles.button }>
      //           <span className={ styles.label }>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div>
        <span>{this.state.title}</span>
        <p>Customize SharePoint experiences using Web Parts.</p>
        <p>{escape(this.props.description)}</p>
        <a href="https://aka.ms/spfx">
          <span>Learn more1</span>
        </a>
      </div>
    );
  }
}