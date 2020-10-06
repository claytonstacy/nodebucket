
/*
============================================
Title: NodeBucket
Author: Clayton Stacy
Date: 24 Sept 2020
Modified by: Clayton Stacy
Description: Application to build to do lists
============================================
*/
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  sessionUser: string;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.sessionUser = this.cookieService.get('session_user');
  }


/*
findAllTasks
*/

findAllTasks() {
  return this.http.get('/api/tasks/' + this.sessionUser)
};

/*
createTasks
*/


/*
updateTasks
*/

/*
deleteTasks
*/

}
