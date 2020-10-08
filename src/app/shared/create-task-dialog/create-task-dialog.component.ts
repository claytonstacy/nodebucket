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
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  cancel() {
    this.dialogRef.close()
  }
}
