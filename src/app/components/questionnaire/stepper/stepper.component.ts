import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DivorcePredictorService } from 'src/app/service/divorcePredictor/divorce-predictor.service';
import { QuestionProviderService } from 'src/app/service/questionProvider/question-provider.service';

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

  values: string[] = ['1', '2', '3', '4', '5'];

  questions: any = null;

  prediction: any = null;

  constructor(
    private _formBuilder: FormBuilder,
    private questionsService: QuestionProviderService,
    private divorcePredService: DivorcePredictorService
  ) {}

  get controlsConfig() {
    const validatorMapper = (q: any) => ({
      [q.ctrl]: ['3', Validators.required],
    });
    const mergeAllReducer = (acc: any, cur: any) => ({ ...acc, ...cur });
    return this.questions.map(validatorMapper).reduce(mergeAllReducer);
  }

  async ngOnInit() {
    try {
      this.questions = this.questionsService.getQuestions();
      this.firstFormGroup = this._formBuilder.group(this.controlsConfig);
      await this.divorcePredService.setUpDivorcePredictor();
      this.firstFormGroup.valueChanges.subscribe(this.updatePrediction);
    } catch (error) {
      console.log(error);
    }
  }

  private updatePrediction = (form: any): void => {
    this.prediction = this.divorcePredService.getPrediction(form);
  };
}
