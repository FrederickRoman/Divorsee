import { Component, OnInit } from '@angular/core';

interface ILink {
  path: string;
  text: string;
  icon: string;
  id: string;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  readonly links: ILink[] = [
    { path: '/', text: 'Home', icon: 'home', id: 'home' },
    { path: '/about', text: 'About', icon: 'info', id: 'about' },
    {
      path: '/comingSoon',
      text: 'Contact',
      icon: 'contact_mail',
      id: 'contact',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  trackByFn(index: number, link: ILink) {
    return link.id ?? '';
  }
}
