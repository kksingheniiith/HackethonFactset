import * as React from 'react';
import { ServiceScope } from '@microsoft/sp-core-library';
import {
    Dialog,
    DialogType,
    DialogFooter,
    Button,
    ButtonType,
  } from 'office-ui-fabric-react';
import { UserProfileService } from '../../../../Services/UserProfileService';
import { IEmployeeDetailProps, IEmployeeDetailStates } from './IEmployeeDetail';
import './EmployeeDetail.scss';

enum Status{
  SAFE = "Safe",
  SYMPTOMS = "Symptoms",
  CONFIRMED = "Confirmed"
}

export class EmployeesDetail extends React.Component<IEmployeeDetailProps, IEmployeeDetailStates> {
    private dataCenterServiceInstance: any;
    constructor(props: any){
        super(props);
        this.state = {
            employeesDetail : [],
            safe: 0,
            symptom: 0,
            confirm: 0,
            showDialog: false
        };
        this._showDialog = this._showDialog.bind(this);
        this._closeDialog = this._closeDialog.bind(this);
    }

    private _showDialog() {
        this.setState({ showDialog: true });
    }

    private _closeDialog(status: string) {
        if(status.length > 0){
            let serviceScope: ServiceScope = this.props.serviceScope;
            this.dataCenterServiceInstance = serviceScope.consume(UserProfileService.serviceKey);
            if(this.state.employeesDetail.some(detail => detail.Title == this.props.curentUser.Email)){
                this.dataCenterServiceInstance.UpdateListData(this.state.employeesDetail.filter(detail => detail.Title == this.props.curentUser.Email)[0].ID, status);
                this.updateStatus(status, this.state.employeesDetail.filter(detail => detail.Title == this.props.curentUser.Email)[0].Status);
            }
            else{
                this.dataCenterServiceInstance.postListData(this.props.curentUser.Email, status);
                this.updateStatus(status);
            }
        }
        
        this.setState({ showDialog: false });
    }

    private updateStatus(status: string, oldStatus?: string){
        if(status == Status.SAFE){
            this.setState({
                safe: oldStatus && oldStatus == Status.SAFE ? this.state.safe : this.state.safe + 1,
                symptom: oldStatus && oldStatus == Status.SYMPTOMS ? this.state.symptom -1 : this.state.symptom,
                confirm: oldStatus && oldStatus == Status.CONFIRMED ? this.state.confirm - 1 : this.state.symptom,
                employeesDetail: [...this.state.employeesDetail.map(detail => {if(detail.Title == this.props.curentUser.Email){return {...detail, Status:status};}else{return {...detail};}})]
            });
        }
        else if(status == Status.SYMPTOMS){
            this.setState({
                symptom: oldStatus && oldStatus == Status.SYMPTOMS ? this.state.symptom : this.state.symptom + 1,
                confirm: oldStatus && oldStatus == Status.CONFIRMED ? this.state.confirm - 1 : this.state.symptom,
                safe: oldStatus && oldStatus == Status.SAFE ? this.state.safe - 1 : this.state.safe,
                employeesDetail: [...this.state.employeesDetail.map(detail => {if(detail.Title == this.props.curentUser.Email){return {...detail, Status:status};}else{return {...detail};}})]
            });
        }
        else{
            this.setState({
                confirm: oldStatus && oldStatus == Status.CONFIRMED ? this.state.confirm : this.state.confirm + 1,
                safe: oldStatus && oldStatus == Status.SAFE ? this.state.safe - 1 : this.state.safe,
                symptom: oldStatus && oldStatus == Status.SYMPTOMS ? this.state.symptom -1 : this.state.symptom,
                employeesDetail: [...this.state.employeesDetail.map(detail => {if(detail.Title == this.props.curentUser.Email){return {...detail, Status:status};}else{return {...detail};}})]
            });
        }
    }

    public componentDidMount() {
        let serviceScope: ServiceScope = this.props.serviceScope;
        this.dataCenterServiceInstance = serviceScope.consume(UserProfileService.serviceKey);
        this.dataCenterServiceInstance.getListData().then((data: any) => {
            this.setState({
                employeesDetail : data.value,
                safe: data.value.filter(val => val.Status == "Safe").length,
                symptom: data.value.filter(val => val.Status == "Symptoms").length,
                confirm: data.value.filter(val => val.Status == "Confirmed").length
            });
        });
    }

    public render(): React.ReactElement<IEmployeeDetailProps> {
        return (
            <div>
                <header className="employee-detail-header">
                    {`Total `}
                    <span className="safe-text">{`${this.state.safe} Employees are marked as safe, `}</span>
                    <span className="symptom-text">{`${this.state.symptom} Employees are feeling same symptom, `}</span>
                    <span className="confirm-text">{`${this.state.confirm} Employees are confirmed`}</span>
                    <Button className="mark-button" onClick={this._showDialog}>Mark as safe</Button>
                </header>
                <Dialog
                    isOpen={this.state.showDialog}
                    type={DialogType.normal}
                    onDismiss={() => {this._closeDialog("");}}
                    title='Please confirm your status'
                    isBlocking={false}
                    containerClassName='ms-dialogMainOverride'
                    maxWidth="600"
                >
                    <DialogFooter>
                        <Button buttonType={ButtonType.primary} onClick={() => this._closeDialog("Safe")}>Safe</Button>
                        <Button buttonType={ButtonType.primary} onClick={() => this._closeDialog("Symptoms")}>Symptoms</Button>
                        <Button buttonType={ButtonType.primary} onClick={() => this._closeDialog("Confirmed")}>Confirmed</Button>
                    </DialogFooter>
                </Dialog>
            </div>
        );
      }
}