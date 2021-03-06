import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import IFomatedQuestion from 'src/app/interfaces/IFomatedQuestion';
import { responseVal } from 'src/app/types/responseVal';
import { DivorcePredictorService } from 'src/app/service/divorcePredictor/divorce-predictor.service';
import { QuestionProviderService } from 'src/app/service/questionProvider/question-provider.service';
import { MatStepper } from '@angular/material/stepper';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type orientation = 'horizontal' | 'vertical';
type control = (control: AbstractControl) => ValidationErrors | null;
interface IValid {
  [x: string]: (string | control)[];
}

/**
 * @title Questionnaire vertical stepper.
 */
@Component({
  selector: 'stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Output() didQuestionnaire = new EventEmitter<boolean>();

  @ViewChild('stepper') stepper: MatStepper | null = null;

  formGroup = new FormGroup({});
  stepperOrientation: Observable<StepperOrientation>;
  questions: IFomatedQuestion[] = [{ id: 0, ctrl: 'Q0Ctrl', text: '' }];
  readonly values: responseVal[] = ['1', '2', '3', '4', '5'];
  readonly labels: { [val: string]: string } = {
    '1': 'never',
    '2': 'rarely',
    '3': 'sometimes',
    '4': 'very often',
    '5': 'always',
  };

  initialValues: string[] = [];
  divorceProbPercentageText: string = '';

  constructor(
    breakpointObserver: BreakpointObserver,
    private _formBuilder: FormBuilder,
    private questionsService: QuestionProviderService,
    private divorcePredService: DivorcePredictorService
  ) {
    const MEDIA_QUERY = '(min-width: 800px)';
    const queryToOrientation = (breakpoint: BreakpointState): orientation =>
      breakpoint.matches ? 'horizontal' : 'vertical';
    this.stepperOrientation = breakpointObserver
      .observe(MEDIA_QUERY)
      .pipe(map(queryToOrientation));
  }

  private get controlsConfig(): IValid {
    const assignValidator = (q: IFomatedQuestion): IValid => ({
      [q.ctrl]: ['3', Validators.required],
    });
    const mergeAll = (acc: IValid, cur: IValid): IValid => ({ ...acc, ...cur });
    return this.questions.map(assignValidator).reduce(mergeAll);
  }

  async ngOnInit(): Promise<void> {
    try {
      this.questions = this.questionsService.getQuestions();
      this.formGroup = this._formBuilder.group(this.controlsConfig);
      this.initialValues = this.formGroup.value;
      await this.divorcePredService.setUpDivorcePredictor();
      this.formGroup.valueChanges.subscribe((form: FormGroup): void =>
        this.updatePrediction(form)
      );
    } catch (error) {
      console.log(error);
    }
  }

  stepChanged(evt: StepperSelectionEvent): void {
    const selectedResultsStep: boolean = evt.selectedIndex === 1;
    console.log(selectedResultsStep);
    this.didQuestionnaire.emit(selectedResultsStep);
  }

  reset(): void {
    this.stepper?.reset();
    this.formGroup.reset(this.initialValues);
    this.divorceProbPercentageText = '';
  }

  private updatePrediction(form: FormGroup): void {
    const prediction: number[] = this.divorcePredService.getPrediction(form);
    this.divorceProbPercentageText = this.formatPrediction(prediction);
  }

  private formatPrediction(prediction: number[]): string {
    if (prediction.length) {
      const divorceProb: number = Number(`${prediction[0]}`.split(',')[0]);
      if (divorceProb < 0.01) return '< 1 %';
      else if (divorceProb > 0.99) return '> 99 %';
      else return ` ~${Math.round(divorceProb * 100)} %`;
    } else {
      return '';
    }
  }
}
