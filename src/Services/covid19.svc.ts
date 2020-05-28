import { SPHttpClient } from '@microsoft/sp-http';

class covidService {
    private context;
    public getStateWiseData(): Promise<any>{
        return fetch(
            "https://api.covid19india.org/state_district_wise.json"
        ).then((response: any) => {
            return response.json();
        }).then((data: any) => {
            return data;
        });
    }
}

export default new covidService();