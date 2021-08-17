import { Injectable } from '@angular/core';
import IFomatedQuestion from 'src/app/interfaces/IFomatedQuestion';
import questions from './questions';

@Injectable({
  providedIn: 'root',
})
export class QuestionProviderService {
  readonly numOfQns: number = questions.length;

  getQuestions(): IFomatedQuestion[] {
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
