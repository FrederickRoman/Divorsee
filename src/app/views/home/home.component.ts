import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('questionnaire', { read: ElementRef })
  questionnaireRef!: ElementRef;

  constructor() {}

  startQuestionnaire() {
    this.questionnaireRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
