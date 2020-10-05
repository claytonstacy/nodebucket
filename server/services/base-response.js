/*
============================================
Title: NodeBucket
Author: Clayton Stacy
Date: 24 Sept 2020
Modified by: Clayton Stacy
Description: Application to build to do lists
============================================
*/

class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }
  toObject() {
    return {
    'httpCode': this.httpCode,
    'message': this.message,
    'data': this.data,
    'timestamp': new Date().toLocaleDateString()
  }
}
}

module.exports = BaseResponse;
