export interface ICovid19Props {
  description: string;
  serviceScope: any;
}

export interface ICovid19States {
  title: string;
  subTitle: string;
  siteTabTitle: string;
  districtWiseDataInArray: Array<any>;
  districtWiseDataInObject: any;
  stateWiseDataInArray: Array<any>;
  userProfileItems: any;
}

export interface IGridStates {
  columnDefs: Array<any>;
  rowData: Array<any>;
  inDistrictLevel: boolean;
  selectedState: any;
  selectedDistrict: any;
  totalIndiaCount: any;
  imageUrl: string;
}

export interface IGridProps {
  statesData: Array<any>;
  statesDataObject: any;
  statesUpdatedData: Array<any>;
}

export interface ISideBarProps {
  currState: any;
  currDistrict: any;
  IndiaData: any;
}
export interface ISideBarStates {
  name: string;
  active: any;
  confirmed: any;
  deceased: any;
  recovered: any;
  todayDeceased: any;
  todayConfirmed: any;
  todayRecovered: any;
}

export interface ImageDisplayProps {
  url: string;
}

export interface IndiaTotalProps {
  TotalData: any;
}
