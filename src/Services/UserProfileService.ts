import { ServiceScope, ServiceKey, Environment, EnvironmentType } from "@microsoft/sp-core-library";    
import { IUserProfile, ISPList } from './IServiceInterfaces';  
import { IDataService } from './IDataService';   
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';    
import { PageContext } from '@microsoft/sp-page-context';    
   
export class UserProfileService {  
    public static readonly serviceKey: ServiceKey<IDataService> = ServiceKey.create<IDataService>('userProfle:data-service', UserProfileService);    
    private _spHttpClient: SPHttpClient;  
    private _pageContext: PageContext;    
    private _currentWebUrl: string;    
  
    constructor(serviceScope: ServiceScope) {    
        serviceScope.whenFinished(() => {    
            // Configure the required dependencies    
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);  
            this._pageContext = serviceScope.consume(PageContext.serviceKey);    
            this._currentWebUrl = this._pageContext.web.absoluteUrl;    
        });    
    }  
  
    public getUserProfileProperties(): Promise<IUserProfile> {  
        return new Promise<IUserProfile>((resolve: (itemId: IUserProfile) => void, reject: (error: any) => void): void => {    
            this.readUserProfile()    
              .then((orgChartItems: IUserProfile): void => {    
                resolve(this.processUserProfile(orgChartItems));    
              });    
          });  
    }  
  
    private readUserProfile(): Promise<IUserProfile> {    
        return new Promise<IUserProfile>((resolve: (itemId: IUserProfile) => void, reject: (error: any) => void): void => {    
          this._spHttpClient.get(`${this._currentWebUrl}/_api/SP.UserProfiles.PeopleManager/getmyproperties`,    
          SPHttpClient.configurations.v1,    
          {    
            headers: {    
              'Accept': 'application/json;odata=nometadata',    
              'odata-version': ''    
            }    
          })    
          .then((response: SPHttpClientResponse): Promise<{ value: IUserProfile }> => {    
            return response.json();    
          })    
          .then((response: { value: IUserProfile }): void => {    
            //resolve(response.value);    
            var output: any = JSON.stringify(response);    
            resolve(output);   
          }, (error: any): void => {    
            reject(error);    
          });    
        });        
    }    
  
    private processUserProfile(orgChartItems: any): any {   
        return JSON.parse(orgChartItems);    
    }  

    public getListData(): Promise<ISPList> {
        return this._spHttpClient.get(this._pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Employees')/Items", SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            });
    }
    
    public postListData(userEmail:any, data: any) {
        const body: string = JSON.stringify({  
            'Title': userEmail,
            'Status':  data
          }); 
        this._spHttpClient.post(this._pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Employees')/Items", SPHttpClient.configurations.v1,
            {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=nometadata',
                    'odata-version': ''
                },
                body: body
            });
    }

    public UpdateListData(id: any, data: any) {
        const body: string = JSON.stringify({
            'Status': data
        });
        this._spHttpClient.post(this._pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Employees')/items(${id})`, SPHttpClient.configurations.v1,
            {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=nometadata',
                    'odata-version': '',
                    'IF-MATCH': '*',
                    'X-HTTP-Method': 'MERGE'
                },
                body: body
            });
    }
}  