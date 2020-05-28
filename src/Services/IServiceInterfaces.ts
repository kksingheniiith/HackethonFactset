export interface IUserProfile {  
    FirstName: string;  
    LastName: string;      
    Email: string;  
    Title: string;  
    WorkPhone: string;  
    DisplayName: string;  
    Department: string;  
    PictureURL: string;      
    UserProfileProperties: Array<any>;  
} 

export interface ISPList {
    Title: string;
    CustomerID: string;
    CustomerContactNo :string;
  }