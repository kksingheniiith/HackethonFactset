import { IUserProfile } from './IUserProfile';

export interface IDataService {  
    getUserProfileProperties: () => Promise<IUserProfile>;  
}  