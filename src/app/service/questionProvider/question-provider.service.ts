import { Injectable } from '@angular/core';
import questions from './questions';

interface IFomatedQuestion {
  id: number;
  ctrl: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionProviderService {
  public readonly numOfQns: number = questions.length;

  constructor() {}

  public getQuestions(): IFomatedQuestion[] {
    return this.formatQuestions(questions);
  }

  private formatQuestions(questions: readonly string[]): IFomatedQuestion[] {
    return questions.map(
      (question: string, index: number): IFomatedQuestion => {
        const id: number = index;
        const ctrl: string = `Q${index}Ctrl`;
        const text: string = question;
        return { id, ctrl, text };
      }
    );
  }
}
