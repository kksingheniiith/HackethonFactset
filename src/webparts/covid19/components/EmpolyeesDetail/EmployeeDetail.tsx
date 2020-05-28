import * as React from "react";
import { ServiceScope } from "@microsoft/sp-core-library";
import {
  Dialog,
  DialogType,
  DialogFooter,
  Button,
  ButtonType,
} from "office-ui-fabric-react";
import { UserProfileService } from "../../../../Services/UserProfileService";
import { IEmployeeDetailProps, IEmployeeDetailStates } from "./IEmployeeDetail";
import { GridHeader } from "../Common/GridHeader/GridHeader";
import { GridRow } from "../Common/GridRow/GridRow";
import "./EmployeeDetail.css";

enum Status {
  SAFE = "Safe",
  SYMPTOMS = "Symptoms",
  CONFIRMED = "Confirmed",
}

export class EmployeesDetail extends React.Component<
  IEmployeeDetailProps,
  IEmployeeDetailStates
> {
  private dataCenterServiceInstance: any;
  constructor(props: any) {
    super(props);
    this.state = {
      employeesDetail: [
        { Title: "kundan", Status: Status.SAFE },
        { Title: "raju", Status: Status.CONFIRMED },
      ],
      safe: 0,
      symptom: 0,
      confirm: 0,
      showMarkDialog: false,
      showEmployeeDialog: false,
    };
    this._showMarkDialog = this._showMarkDialog.bind(this);
    this._showEmployeeDialog = this._showEmployeeDialog.bind(this);
    this._closeMarkDialog = this._closeMarkDialog.bind(this);
    this._closeEmployeeDialog = this._closeEmployeeDialog.bind(this);
  }

  private _showMarkDialog() {
    this.setState({ showMarkDialog: true });
  }

  private _showEmployeeDialog() {
    this.setState({ showEmployeeDialog: true });
  }

  private _closeEmployeeDialog() {
    this.setState({ showEmployeeDialog: false });
  }
  public componentWillReceiveProps;

  private _closeMarkDialog(status: string) {
    if (status.length > 0) {
      let serviceScope: ServiceScope = this.props.serviceScope;
      this.dataCenterServiceInstance = serviceScope.consume(
        UserProfileService.serviceKey
      );
      if (
        this.state.employeesDetail.some(
          (detail) => detail.Title == this.props.curentUser.Email
        )
      ) {
        this.dataCenterServiceInstance.UpdateListData(
          this.state.employeesDetail.filter(
            (detail) => detail.Title == this.props.curentUser.Email
          )[0].ID,
          status
        );
        this.updateStatus(
          status,
          this.state.employeesDetail.filter(
            (detail) => detail.Title == this.props.curentUser.Email
          )[0].Status
        );
      } else {
        this.dataCenterServiceInstance
          .postListData(
            this.props.curentUser.Email,
            status,
            this.props.curentUser.DisplayName
          )
          .then((updated: boolean) => {
            this.dataCenterServiceInstance.getListData().then((data: any) => {
              this.setState({
                employeesDetail: data.value,
                safe: data.value.filter((val) => val.Status == "Safe").length,
                symptom: data.value.filter((val) => val.Status == "Symptoms")
                  .length,
                confirm: data.value.filter((val) => val.Status == "Confirmed")
                  .length,
              });
            });
          });
        this.updateStatus(status);
      }
    }

    this.setState({ showMarkDialog: false });
  }

  private updateStatus(status: string, oldStatus?: string) {
    if (status == Status.SAFE) {
      this.setState({
        safe:
          oldStatus && oldStatus == Status.SAFE
            ? this.state.safe
            : this.state.safe + 1,
        symptom:
          oldStatus && oldStatus == Status.SYMPTOMS
            ? this.state.symptom - 1
            : this.state.symptom,
        confirm:
          oldStatus && oldStatus == Status.CONFIRMED
            ? this.state.confirm - 1
            : this.state.symptom,
        employeesDetail: [
          ...this.state.employeesDetail.map((detail) => {
            if (detail.Title == this.props.curentUser.Email) {
              return { ...detail, Status: status };
            } else {
              return { ...detail };
            }
          }),
        ],
      });
    } else if (status == Status.SYMPTOMS) {
      this.setState({
        symptom:
          oldStatus && oldStatus == Status.SYMPTOMS
            ? this.state.symptom
            : this.state.symptom + 1,
        confirm:
          oldStatus && oldStatus == Status.CONFIRMED
            ? this.state.confirm - 1
            : this.state.symptom,
        safe:
          oldStatus && oldStatus == Status.SAFE
            ? this.state.safe - 1
            : this.state.safe,
        employeesDetail: [
          ...this.state.employeesDetail.map((detail) => {
            if (detail.Title == this.props.curentUser.Email) {
              return { ...detail, Status: status };
            } else {
              return { ...detail };
            }
          }),
        ],
      });
    } else {
      this.setState({
        confirm:
          oldStatus && oldStatus == Status.CONFIRMED
            ? this.state.confirm
            : this.state.confirm + 1,
        safe:
          oldStatus && oldStatus == Status.SAFE
            ? this.state.safe - 1
            : this.state.safe,
        symptom:
          oldStatus && oldStatus == Status.SYMPTOMS
            ? this.state.symptom - 1
            : this.state.symptom,
        employeesDetail: [
          ...this.state.employeesDetail.map((detail) => {
            if (detail.Title == this.props.curentUser.Email) {
              return { ...detail, Status: status };
            } else {
              return { ...detail };
            }
          }),
        ],
      });
    }
  }

  public componentDidMount() {
    let serviceScope: ServiceScope = this.props.serviceScope;
    this.dataCenterServiceInstance = serviceScope.consume(
      UserProfileService.serviceKey
    );
    this.dataCenterServiceInstance.getListData().then((data: any) => {
      this.setState({
        employeesDetail: data.value,
        safe: data.value.filter((val) => val.Status == "Safe").length,
        symptom: data.value.filter((val) => val.Status == "Symptoms").length,
        confirm: data.value.filter((val) => val.Status == "Confirmed").length,
      });
    });
  }

  public render(): React.ReactElement<IEmployeeDetailProps> {
    return (
      <div>
        <header className="employee-detail-header">
          {`Total `}
          <span className="safe-text">{`${this.state.safe} Employees are safe, `}</span>
          <span className="symptom-text">{`${this.state.symptom} Employees are feeling symptoms, `}</span>
          <span className="confirm-text">{`${this.state.confirm} Employees are confirmed having covid19`}</span>
          <Button className="mark-button" onClick={this._showEmployeeDialog}>
            Employees List
          </Button>
          <Button className="mark-button" onClick={this._showMarkDialog}>
            Mark your status
          </Button>
        </header>
        <Dialog
          isOpen={this.state.showMarkDialog}
          type={DialogType.normal}
          onDismiss={() => {
            this._closeMarkDialog("");
          }}
          title="Please confirm your status"
          isBlocking={false}
          containerClassName="ms-dialogMainOverride"
        >
          <DialogFooter>
            <Button
              buttonType={ButtonType.primary}
              onClick={() => this._closeMarkDialog("Safe")}
            >
              Safe
            </Button>
            <Button
              buttonType={ButtonType.primary}
              onClick={() => this._closeMarkDialog("Symptoms")}
            >
              Symptoms
            </Button>
            <Button
              buttonType={ButtonType.primary}
              onClick={() => this._closeMarkDialog("Confirmed")}
            >
              Confirmed
            </Button>
          </DialogFooter>
        </Dialog>
        <Dialog
          isOpen={this.state.showEmployeeDialog}
          type={DialogType.normal}
          onDismiss={() => {
            this._closeEmployeeDialog();
          }}
          title="Emolyees List"
          isBlocking={false}
          containerClassName="ms-dialogMainOverride"
          maxWidth="800"
        >
          <GridHeader cols={["NAME", "EMAIL", "STATUS"]} />
          {this.state.employeesDetail.map((detail: any, index: number) => {
            return (
              <GridRow
                cols={["Kundan", detail.Title, detail.Status]}
                isEven={index % 2 != 0}
              />
            );
          })}
        </Dialog>
      </div>
    );
  }
}
