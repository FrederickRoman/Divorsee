import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  @ViewChild('stepperQuestionnaire')
  stepperQuestionnaire: ElementRef<HTMLElement> | null = null;
  
  showProgressBar: boolean = false;
  didQuestionnaire: boolean = false;
  progressBarValue: number = 0;
  readonly progressBarColor: ThemePalette = 'accent';

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.stepperQuestionnaire) {
      const stepperQnEl: HTMLElement = this.stepperQuestionnaire.nativeElement;
      const bounding: DOMRect = stepperQnEl.getBoundingClientRect();
      const scrolledToQuestionnaire: boolean = bounding.top <= 0;
      if (scrolledToQuestionnaire) {
        const { pageYOffset } = window;
        const { scrollHeight } = document.documentElement;
        const scrollRatio: number = pageYOffset / scrollHeight;
        this.progressBarValue = scrollRatio * 100;
      }
      this.showProgressBar = scrolledToQuestionnaire && !this.didQuestionnaire;
    }
  }

  onDidQuestionnaire(isQuestionnaireDone: boolean): void {
    this.didQuestionnaire = isQuestionnaireDone;
  }
}
