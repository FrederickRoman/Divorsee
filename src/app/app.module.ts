import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatProgressBarModule} from '@angular/material/progress-bar'; 

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import {MatStepperModule} from '@angular/material/stepper'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 

import {MatRadioModule} from '@angular/material/radio'; 

import {MatDividerModule} from '@angular/material/divider'; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import {MatGridListModule} from '@angular/material/grid-list'; 

import { HomeComponent } from './views/home/home.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { StepperComponent } from './components/questionnaire/stepper/stepper.component';
import { QuestionComponent } from './components/questionnaire/question/question.component';
import { MainBannerComponent } from './components/banner/main-banner/main-banner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionnaireComponent,
    StepperComponent,
    QuestionComponent,
    MainBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatDividerModule,
    MatGridListModule,
    MatProgressBarModule,
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
