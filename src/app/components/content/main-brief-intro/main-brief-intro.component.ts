import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos'


@Component({
  selector: 'app-main-brief-intro',
  templateUrl: './main-brief-intro.component.html',
  styleUrls: ['./main-brief-intro.component.scss'],
})
export class MainBriefIntroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    AOS.init();
  }
}
