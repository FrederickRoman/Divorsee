import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ext-link-a',
  templateUrl: './ext-link-a.component.html',
  styleUrls: ['./ext-link-a.component.scss'],
})
export class ExtLinkAComponent implements OnInit {
  @Input() href: string = '';
  @Input() undecorated: '' | undefined = undefined;

  hideUnderline: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.hideUnderline = this.undecorated !== undefined;
  }
}
