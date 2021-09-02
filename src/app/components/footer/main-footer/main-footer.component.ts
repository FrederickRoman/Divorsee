import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
})
export class MainFooterComponent implements OnInit {
  readonly AUTHOR_EXT_LINK: string = 'https://www.frederickroman.com';
  readonly curYear: number = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
