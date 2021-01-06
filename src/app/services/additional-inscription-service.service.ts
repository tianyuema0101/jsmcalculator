import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

let token = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({"authorization": 'Bearer '+token, "Content-Type": "application/json" }),
  };



@Injectable({
  providedIn: 'root'
})
export class AdditionalInscriptionServiceService {

  constructor(private http: HttpClient) { }

  getAllInscriptions(){
 
    return this.http.get("/api/v1/additionalInscription/", httpOptions);
  }

  getInscription(inscriptionId){
    return this.http.get("/api/v1/additionalInscription/" + inscriptionId, httpOptions);
  }

  createInscription(newInscription){
    return this.http.post("/api/v1/additionalInscription/", newInscription, httpOptions);
  }

  updateInscription(inscriptionId, newInscription){
    return this.http.patch("/api/v1/additionalInscription/" + inscriptionId, newInscription, httpOptions)
  }

  deleteInscription(inscriptionId){
    return this.http.delete("/api/v1/additionalInscription/" + inscriptionId, httpOptions)
  }
  getInscriptionByOther(params){
    return this.http.get("/api/v1/additionalInscription/" + params, httpOptions )
  }
}
