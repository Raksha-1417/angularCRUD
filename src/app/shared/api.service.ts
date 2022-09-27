import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  posturl=environment.userapi;
  postAccounts(data:any){
    return this.http.post<any>(this.posturl,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getAccounts(){
    return this.http.get<any>(this.posturl).pipe(map((res:any)=>{
      return res;
    }))
  }
  updateAccounts(data:any, id:number){
    return this.http.put<any>(this.posturl+'/'+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteAccounts(id:number){
    return this.http.delete<any>(this.posturl+'/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }

}
