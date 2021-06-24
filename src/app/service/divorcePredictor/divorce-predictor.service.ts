import { Injectable } from '@angular/core';
import questions from './questions';

import * as tf from '@tensorflow/tfjs';
import { FormGroup } from '@angular/forms';

interface IFomatedQuestion {
  id: number;
  ctrl: string;
  text: string;
}

type responseVal = '1' | '2' | '3' | '4' | '5';
type tensorShape2D = [number, number];

@Injectable({
  providedIn: 'root',
})
export class DivorcePredictorService {
  constructor() {}

  private model: tf.LayersModel | null = null;

  public async loadDivorcePredictionModel(): Promise<void> {
    try {
      const MODEL_DIR = '/assets/tfjs_model/model.json';
      const model: tf.LayersModel = await tf.loadLayersModel(MODEL_DIR);
      this.model = model;
    } catch (error) {
      console.log(error);
    }
  }

  public formatQuestions(questions: readonly string[]): IFomatedQuestion[] {
    return questions.map(
      (question: string, index: number): IFomatedQuestion => {
        const id: number = index;
        const ctrl: string = `Q${index}Ctrl`;
        const text: string = question;
        return { id, ctrl, text };
      }
    );
  }

  public getQuestions(): IFomatedQuestion[] {
    return this.formatQuestions(questions);
  }

  public getPrediction(form: FormGroup): number {
    console.log(form);
    const responseVals: responseVal[] = Object.values(form);
    const responseNums: number[] = responseVals.map((val) => Number(val) - 1);
    const NUM_OF_QNS: number = questions.length;
    const INPUT_SHAPE: tensorShape2D = [1, NUM_OF_QNS];
    const predictions: number[] = tf.tidy(() => {
      if (this.model) {
        const inputTensor: tf.Tensor2D = tf.tensor2d(responseNums, INPUT_SHAPE);
        const outputTensor = this.model.predict(inputTensor) as tf.Tensor1D;
        return outputTensor.arraySync() as number[];
      } else return [];
    });
    console.log(predictions);
    return 1;
  }
}
