import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ScheduleInterview, ScheduleService } from './schedule.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InterviewSchedulerApp';

  constructor(private scheduleService: ScheduleService){}

  candidates: Candidate[];
  jobProfiles: JobProfile[];
  scheduleSearchForm: FormGroup;
  currentCandidateID: string;
  currentStartTime: string;
  currentEndTime: string;
  currentProfile: string;

  ngOnInit(){
    this.scheduleSearchForm = new FormGroup({
      candidateID: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      profile: new FormControl('')
    });
    this.scheduleSearchForm.valueChanges.subscribe(form => {
      if(form.candidateID) {
        let candidateValues: string[] = form.candidateID.split('|');
        this.currentCandidateID = form.candidateID;
        this.currentProfile = form.profile;
      }
      
      this.currentStartTime = form.startTime;
      this.currentEndTime = form.endTime;
      
    });

    this.candidates=[new Candidate("id1234","76543"),
    new Candidate("id1235","76544"),
    new Candidate("id1236","76545")]

    this.jobProfiles=[new JobProfile("jd1234","Jr. Full Stack Developer"),
    new JobProfile("jd1235","Sr. Full Stack Developer"),
    new JobProfile("jd1236","Solution Architect - Java")]
  }
  createSchedule(){
    this.scheduleService.CreateSchedule(
      new ScheduleInterview(this.currentCandidateID, 
        this.currentStartTime, 
        this.currentEndTime, 
        this.currentProfile)).subscribe(postResult =>
        console.log(postResult));
        console.log("Schedule Created!!!");
        this.scheduleSearchForm.reset();
  }
}
export class Candidate {
  id: string;
  candidateID: string;

  constructor(id: string, candidateID: string){
    this.id = id;
    this.candidateID = candidateID;
  }
}
export class JobProfile {
  id: string;
  profile: string;

  constructor(id: string, profile: string){
    this.id = id;
    this.profile = profile;
  }
}
