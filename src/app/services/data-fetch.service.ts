import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataFetchService {

    constructor(private http: HttpClient) {
    }

    getJSONData() {
        let url = 'https://hackaton-api.analyzere.net/optimization_views/4141f37e-5c28-4619-ab35-32f4d35bef1c/candidates';
        let headers = new HttpHeaders({
            Authorization: 'Basic Z2FyZ2FudHVhbnBlbGljYW5zOmFoTWVlOWVp'
        });
        return this.http.get(url, { headers });
    }
}
