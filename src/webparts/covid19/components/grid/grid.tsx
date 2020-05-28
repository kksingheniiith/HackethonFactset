import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { IGridStates, IGridProps } from "../ICovid19Props";
import "./grid.css";
import "ag-grid-enterprise";
import { RowDragFeature } from "ag-grid-community/dist/lib/gridPanel/rowDragFeature";

export default class Grid extends React.Component<IGridProps, IGridStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      columnDefs: [],
      rowData: [],
      inDistrictLevel: false,
    };
    this.rowSelected = this.rowSelected.bind(this);
    this.loadInitialGrid = this.loadInitialGrid.bind(this);
  }
  public componentDidMount() {
    this.loadInitialGrid();
  }

  public loadInitialGrid() {
    let gridData = [];
    const stateData = this.props.statesData;
    stateData.forEach(({ state, data }) => {
      let activeCount = 0,
        deceasedCount = 0,
        confirmedCount = 0,
        recoveredCount = 0;
      for (let district in data.districtData) {
        let { active, confirmed, deceased, recovered } = data.districtData[
          district
        ];
        activeCount += active;
        confirmedCount += confirmed;
        deceasedCount += deceased;
        recoveredCount += recoveredCount;
      }
      if (state !== "State Unassigned") {
        gridData.push({
          state,
          active: activeCount,
          deceased: deceasedCount,
          confirmed: confirmedCount,
          recovered: recoveredCount,
        });
      }
    });
    this.setState({
      columnDefs: [
        { headerName: "STATE", field: "state", filter: true },
        { headerName: "CONFIRMED", field: "confirmed", sortable: true },
        { headerName: "ACTIVE", field: "active", sortable: true },
        { headerName: "DECEASED", field: "deceased", sortable: true },
        { headerName: "RECOVERED", field: "recovered", sortable: true },
      ],
      rowData: [...gridData],
      inDistrictLevel: false,
    });
  }

  public rowSelected(row: any) {
    if (!this.state.inDistrictLevel) {
      let { state } = row.data;
      let gridData = [];
      let { districtData } = this.props.statesDataObject[state];
      for (let district in districtData) {
        let { active, deceased, confirmed, recovered } = districtData[district];
        gridData.push({ district, active, deceased, confirmed, recovered });
      }
      console.log("hehe dis ++ ", gridData);
      let temp = [...this.state.columnDefs];
      this.setState({
        columnDefs: [
          { headerName: "DISTRICT", field: "district", filter: true },
          { headerName: "CONFIRMED", field: "confirmed", sortable: true },
          { headerName: "ACTIVE", field: "active", sortable: true },
          { headerName: "DECEASED", field: "deceased", sortable: true },
          { headerName: "RECOVERED", field: "recovered", sortable: true },
        ],
        rowData: [...gridData],
        inDistrictLevel: true,
      });
    }
  }

  public render() {
    let backButton;
    if (this.state.inDistrictLevel) {
      backButton = (
        <button
          type="button"
          className="back-button btn btn-primary btn-arrow-left"
          onClick={this.loadInitialGrid}
        >
          Back
        </button>
      );
    } else {
      backButton = <span></span>;
    }
    return (
      <div className="ag-theme-alpine grid-class">
        {backButton}
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          rowSelection="single"
          suppressCellSelection={true}
          onRowDoubleClicked={this.rowSelected}
        />
      </div>
    );
  }
}
