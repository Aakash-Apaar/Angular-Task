import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dataList: Array<any> = [];

  constructor(private http:HttpClient) { }
  apiurl='https://crudcrud.com/api/7a57a9dc8c0b4637876bd814e6faa274/user';

GetAll(){
  return this.http.get(this.apiurl);
}

saveUsers(data:any){
  return this.http.post(this.apiurl,data)
}

putUser(data:any,id:any){
  return this.http.put<any>(this.apiurl+'/'+id,data);
}

}











