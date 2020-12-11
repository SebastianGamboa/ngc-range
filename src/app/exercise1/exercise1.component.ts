import { Component, OnInit } from '@angular/core';
import { RangeService } from '../ngc-range/range.service';

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})
export class Exercise1Component implements OnInit {

  min: number;
  max: number;

  constructor(private rangeService: RangeService) {
    this.min = 0;
    this.max = 0;
  }

  ngOnInit(): void {
    this.rangeService.getRange().subscribe(range => {
      this.min = range.min;
      this.max = range.max;
    });
  }

  onRangeChange(e: any) {
    console.log(e);
  }

}
