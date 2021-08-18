import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import IFomatedQuestion from 'src/app/interfaces/IFomatedQuestion';
import { responseVal } from 'src/app/types/responseVal';
import { DivorcePredictorService } from 'src/app/service/divorcePredictor/divorce-predictor.service';
import { QuestionProviderService } from 'src/app/service/questionProvider/question-provider.service';

type control = (control: AbstractControl) => ValidationErrors | null;
interface IValid {
  [x: string]: (string | control)[];
}

const QUESTION_RESPONSE_VALUE_OPTIONS: readonly responseVal[] = Object.freeze([
  '1',
  '2',
  '3',
  '4',
  '5',
]);
const INIT_FORMATED_QUESTION: IFomatedQuestion = Object.freeze({
  id: 0,
  ctrl: `Q0Ctrl`,
  text: '',
});

/**
 * @title Stepper vertical
 */
@Component({
  selector: 'stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  IKnowFormGroup: FormGroup = new FormGroup({});

  values: readonly responseVal[] = QUESTION_RESPONSE_VALUE_OPTIONS;
  questions: IFomatedQuestion[] = [INIT_FORMATED_QUESTION];
  prediction: number[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private questionsService: QuestionProviderService,
    private divorcePredService: DivorcePredictorService
  ) {}

  get controlsConfig(): IValid {
    const assignValidator = (q: IFomatedQuestion): IValid => ({
      [q.ctrl]: ['3', Validators.required],
    });
    const mergeAll = (acc: IValid, cur: IValid): IValid => ({ ...acc, ...cur });
    return this.questions.map(assignValidator).reduce(mergeAll);
  }

  async ngOnInit(): Promise<void> {
    try {
      this.questions = this.questionsService.getQuestions();
      this.firstFormGroup = this._formBuilder.group(this.controlsConfig);
      await this.divorcePredService.setUpDivorcePredictor();
      this.firstFormGroup.valueChanges.subscribe((form: FormGroup): void =>
        this.updatePrediction(form)
      );
    } catch (error) {
      console.log(error);
    }
  }

  private updatePrediction(form: FormGroup): void {
    this.prediction = this.divorcePredService.getPrediction(form);
  }
}
