/*
============================================
Title: NodeBucket
Author: Clayton Stacy
Date: 7 Oct 2020
Modified by: Clayton Stacy
Description: Application to build to do lists
============================================
*/

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../shared/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from 'src/app/shared/employee.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tasks: any;
  todo: Item[];
  doing: Item[];
  done: Item[];
  employee: Employee;
  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = this.cookieService.get('session_user');

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.doing = this.employee.doing;
      this.done = this.employee.done;
    })
  }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<any[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTaskList(this.empId, this.todo, this.doing, this.done)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.updateTaskList(this.empId, this.todo, this.doing, this.done)
    }
  }

  private updateTaskList(empId: string, todo: Item[], doing: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, doing, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.doing = this.employee.doing;
      this.done = this.employee.done;
    })
  }
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.doing= this.employee.doing;
          this.done = this.employee.done;
        })
      }
    })
  }
  deleteTask(taskId: string) {
    if(taskId) {
      console.log('Deleting Task', this.empId, taskId);

      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
      }, err => {
        console.log(err);
      }, () => {
        this.todo= this.employee.todo;
        this.doing= this.employee.doing;
        this.done= this.employee.done;
      });
    }else {
      console.log('Trying to delete but no id');
    }
  }
}
