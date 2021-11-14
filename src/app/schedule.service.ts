import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  itle = 'InterviewSchedulerApp';

  constructor(private http:HttpClient) {}

  private baseUrl:string = 'http://localhost:8080';
  private scheduleUrl:string = this.baseUrl + '/interview/v1/scheduleInterview/';

  CreateSchedule(body: ScheduleInterview): Observable<Schedule>{
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.post<Schedule>(this.scheduleUrl, body, httpOptions);
  }
}

export class ScheduleInterview{
  candidateID: string;
  startTime: string;
  endTime: string;
  profile: string;

  constructor(candidateID: string, startTime: string, endTime: string, profile: string){
    this.candidateID = candidateID;
    this.startTime = startTime;
    this.endTime = endTime;
    this.profile = profile;
  }
}

export interface Schedule{
  id: string;
  candidateID: string;
  startTime: string;
  endTime: string;
  profile: string;
}
