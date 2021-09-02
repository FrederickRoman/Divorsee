import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
})
export class ComingSoonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    AOS.init();
  }
}
