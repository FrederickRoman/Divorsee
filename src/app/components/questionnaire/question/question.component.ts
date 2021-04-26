import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() formControlName: string = '';
  @Input() text: string = '';

  values: string[] = ['1', '2', '3', '4', '5'];

  constructor() {}

  ngOnInit(): void {}
}
