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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http: HttpClient) {
  }


/*
findAllTasks
*/

findAllTasks(empId: string): Observable<any> {
  return this.http.get('/api/tasks/' + empId)
}

/*
createTasks
*/
createTask(empId: string, task: string): Observable<any>{
  return this.http.post('/api/tasks/' + empId, {
    text: task
  })
}

/*
updateTasks
*/
updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
  return this.http.put('/api/tasks/' + empId, {
    todo,
    done
  });
}

deleteTask(empId: string, taskId: string): Observable<any> {
  return this.http.delete('/api/tasks/' + empId + '/' + taskId);
}

}
