import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Stepper with editable steps
 */
@Component({
  selector: 'stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss']
})
export class StepperComponent implements OnInit {
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  isEditable = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
