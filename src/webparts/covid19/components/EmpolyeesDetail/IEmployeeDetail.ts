import { IUserProfile } from '../../../../Services/IUserProfile';

export interface IEmployeeDetailProps {
    serviceScope: any;
    curentUser:IUserProfile;
}

export interface IEmployeeDetailStates {
    employeesDetail: Array<any>;
    safe: number;
    symptom: number;
    confirm: number;
    showMarkDialog: boolean;
    showEmployeeDialog: boolean;
}