import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import {MatProgressBarModule} from '@angular/material/progress-bar'; 

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import {MatStepperModule} from '@angular/material/stepper'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatRadioModule} from '@angular/material/radio'; 

import {MatCardModule} from '@angular/material/card'; 
import {MatDividerModule} from '@angular/material/divider'; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import {MatGridListModule} from '@angular/material/grid-list'; 

import { HomeComponent } from './views/home/home.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { StepperComponent } from './components/questionnaire/stepper/stepper.component';
import { QuestionComponent } from './components/questionnaire/question/question.component';
import { MainBannerComponent } from './components/banner/main-banner/main-banner.component';
import { MainBriefIntroComponent } from './components/content/main-brief-intro/main-brief-intro.component';
import { MainFooterComponent } from './components/footer/main-footer/main-footer.component';
import { AboutComponent } from './views/about/about/about.component';
import { ComingSoonComponent } from './views/comingSoon/coming-soon/coming-soon.component';
import { PageNotFoundComponent } from './views/404/page-not-found/page-not-found.component';
import { MainNavComponent } from './components/nav/main-nav/main-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionnaireComponent,
    StepperComponent,
    QuestionComponent,
    MainBannerComponent,
    MainBriefIntroComponent,
    MainFooterComponent,
    AboutComponent,
    ComingSoonComponent,
    PageNotFoundComponent,
    MainNavComponent
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
    MatCardModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
