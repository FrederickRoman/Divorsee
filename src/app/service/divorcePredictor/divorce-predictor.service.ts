import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  LayersModel,
  loadLayersModel,
  ready,
  Tensor1D,
  tensor2d,
  Tensor2D,
  tidy,
  zeros,
} from '@tensorflow/tfjs';
import to from 'await-to-js';
import { QuestionProviderService } from '../questionProvider/question-provider.service';
import { responseVal } from 'src/app/types/responseVal';

@Injectable({
  providedIn: 'root',
})
export class DivorcePredictorService {
  private readonly NUM_OF_QNS: number = this.questionsService.numOfQns;
  private readonly INPUT_SHAPE: [number, number] = [1, this.NUM_OF_QNS];
  private model: LayersModel | null = null;
  constructor(private questionsService: QuestionProviderService) {}

  async setUpDivorcePredictor(): Promise<void> {
    try {
      await this.getBackEndReady();
      await this.loadModel();
      await this.warmupModel();
    } catch (error) {
      console.log(error);
    }
  }

  getPrediction(form: FormGroup): number[] {
    console.log(form);
    const predictions: number[] = tidy(() => {
      if (this.model) {
        const inputArray: number[] = this.preprocess(form);
        const inputTensor: Tensor2D = tensor2d(inputArray, this.INPUT_SHAPE);
        const outputTensor = this.model.predict(inputTensor) as Tensor1D;
        const outputArray = outputTensor.arraySync() as number[];
        return outputArray;
      } else return [];
    });
    console.log(predictions);
    return predictions;
  }

  private preprocess(form: FormGroup): number[] {
    const responseVals: responseVal[] = Object.values(form);
    const zeroIndexFormat = (val: responseVal): number => Number(val) - 1;
    return responseVals.map(zeroIndexFormat);
  }

  private async getBackEndReady(): Promise<void> {
    const [error] = await to(ready());
    if (error) throw new Error('Failed to get (cpu, webgl, etc) backend ready');
  }

  private async loadModel(): Promise<void> {
    const MODEL_DIR = '/assets/tfjs_model/model.json';
    const [error, model] = await to<LayersModel>(loadLayersModel(MODEL_DIR));
    if (error) throw new Error('Failed to load model');
    if (model) this.model = model;
  }

  private async warmupModel(): Promise<void> {
    if (this.model) {
      const warmupInput: Tensor2D = zeros(this.INPUT_SHAPE);
      const warmupOuput = this.model.predict(warmupInput) as Tensor1D;
      const [error] = (await to(warmupOuput.data())) as number[][];
      warmupOuput.dispose();
      if (error) throw new Error('Failed to get data from warmed up model.');
    }
  }
}
