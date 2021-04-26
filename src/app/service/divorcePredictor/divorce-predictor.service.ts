import { Injectable } from '@angular/core';
import questions from './questions';


@Injectable({
  providedIn: 'root'
})
export class DivorcePredictorService {

  constructor() { }

  getQuestions(){
    return questions;
  }
}
