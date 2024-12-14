import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CommonDataServiceService implements OnInit {
  public commonDataServiceUrl = '/common-data-service/';

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  public initializeComponent(): void {}

  public getAvailablePrivilegeList(method: string, url: string, groupId: number): Promise<any> {
    const requestUrl = environment.baseUrl + this.commonDataServiceUrl + url + '/' + groupId.toString();

    let headers = {};

    if (this.authenticationService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.authenticationService.getAuthToken()
      };
    }

    if (method === 'get') {
      return this.http.get(requestUrl, { headers: headers }).toPromise();
    } else {
      return this.http.get(requestUrl, { headers: headers }).toPromise();
    }
  }

  public getAssignedPrivilegeList(method: string, url: string, groupId: number): Promise<any> {
    const requestUrl = environment.baseUrl + this.commonDataServiceUrl + url + '/' + groupId.toString();

    let headers = {};

    if (this.authenticationService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.authenticationService.getAuthToken()
      };
    }

    if (method === 'get') {
      return this.http.get(requestUrl, { headers: headers }).toPromise();
    } else {
      return this.http.get(requestUrl, { headers: headers }).toPromise();
    }
  }

  public saveData(method: string, url: string, body: any): Promise<any> {
    const requestUrl = environment.baseUrl + this.commonDataServiceUrl + url;

    let headers = {};

    if (this.authenticationService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.authenticationService.getAuthToken()
      };
    }

    if (method === 'post') {
      return this.http.post(requestUrl, body, { headers: headers }).toPromise();
    } else {
      return this.http.get(requestUrl, { headers: headers }).toPromise();
    }
  }
}
