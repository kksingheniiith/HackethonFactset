import { SPHttpClient } from '@microsoft/sp-http';

class covidService {
    private context;
    public getDistrictWiseData(): Promise<any>{
        return fetch(
            "https://api.covid19india.org/state_district_wise.json"
        ).then((response: any) => {
            return response.json();
        }).then((data: any) => {
            return data;
        });
    }

    public getStateWiseData(): Promise<any>{
        return fetch(
            "https://api.covid19india.org/data.json"
        ).then((response: any) => {
            return response.json();
        }).then((data: any) => {
            return data;
        })
    }
}

export default new covidService();