import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dataList: Array<any> = [];

  constructor(private http:HttpClient) { }
  apiurl='https://crudcrud.com/api/f842a71464cf4dc7bd82e55a743f51f9/user';

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











