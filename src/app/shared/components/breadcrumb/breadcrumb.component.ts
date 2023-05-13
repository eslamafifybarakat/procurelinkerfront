import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  items: any;
  home: any;

  constructor() { }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      { label: 'Categories' },
      { label: 'Sports' },
      { label: 'Football' },
      { label: 'Countries' },
      { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' }
    ];
  }

}
