/*
============================================
Title: NodeBucket
Author: Clayton Stacy
Date: 7 October 2020
Modified by: Clayton Stacy
Description: Application to build to do lists
============================================
*/

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  doing: Item[];
  done: Item[];
}
