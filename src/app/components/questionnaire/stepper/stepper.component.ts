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
import { MatVerticalStepper } from '@angular/material/stepper';

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

  @ViewChild('stepper') stepper: MatVerticalStepper | null = null;

  formGroup = new FormGroup({});
  questions: IFomatedQuestion[] = [{ id: 0, ctrl: 'Q0Ctrl', text: '' }];
  readonly values: responseVal[] = ['1', '2', '3', '4', '5'];
  initialValues: any = [];
  divorceProbPercentageText: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private questionsService: QuestionProviderService,
    private divorcePredService: DivorcePredictorService
  ) {}

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
