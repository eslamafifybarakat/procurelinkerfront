import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {
  @Input() type: string = '';
  @Input() items: any;
  @Input() tableItems: any;

  constructor() { }

  ngOnInit(): void {
  }

}
