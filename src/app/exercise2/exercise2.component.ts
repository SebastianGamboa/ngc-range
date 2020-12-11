import { Component, OnInit } from '@angular/core';
import { RangeService } from '../ngc-range/range.service';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css']
})
export class Exercise2Component implements OnInit {

  rangeValues: number[];
  fixed: string;

  constructor(private rangeService: RangeService) {
    this.rangeValues = [];
    this.fixed = 'fixed';
  }

  ngOnInit(): void {
    this.rangeService.getFixedRange().subscribe(response => this.rangeValues = response.rangeValues);
  }

  onChangeRange(e: any) {
    console.log(e);
  }

}
