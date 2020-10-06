/*
============================================
Title: NodeBucket
Author: Clayton Stacy
Date: 24 Sept 2020
Modified by: Clayton Stacy
Description: Application to build to do lists
============================================
*/

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../shared/item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tasks: any;
  todo: Array<Item>;
  doing: Array<Item>;
  done: Array<Item>;

  constructor(private taskService: TaskService, private httpClient: HttpClient) {
    this.taskService.findAllTasks().subscribe(res => {
      console.log('This is the response', res);
      this.todo = res['data'].todo;
      this.doing = res['data'].doing;
      this.done = res['data'].done;
      console.log('This is todo', JSON.stringify(this.todo));
      console.log('This is doing', JSON.stringify(this.doing));
      console.log('This is done', JSON.stringify(this.done));
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
  }

}
