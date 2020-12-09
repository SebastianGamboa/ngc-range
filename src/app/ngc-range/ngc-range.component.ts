import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ngc-range',
  templateUrl: './ngc-range.component.html',
  styleUrls: ['./ngc-range.component.css']
})
export class NgcRangeComponent implements OnInit {

  @Input() min: number;
  @Input() max: number;
  @Output() rangeChange: EventEmitter<number> | undefined;

  @ViewChild("container")
  container!: ElementRef;

  @ViewChild("thumb1")
  thumb1!: ElementRef;

  @ViewChild("thumb2")
  thumb2!: ElementRef;

  constructor(private renderer: Renderer2) {
    this.min = 0;
    this.max = 0;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.renderer.listen(this.thumb1.nativeElement, 'mousedown', () => this.onMoveSlider(true));
    this.renderer.listen(this.thumb2.nativeElement, 'mousedown', () => this.onMoveSlider());
  }

  onMoveSlider(isFirstThumb?: boolean) {
    const slide = (e: any) => {
      const { left } = this.container.nativeElement.getBoundingClientRect();
      let thumb1OffsetWidth = this.thumb1.nativeElement.offsetWidth;
      let thumb2OffsetWidth = this.thumb2.nativeElement.offsetWidth;
      let maxLeft: number;
      let thumbLeft = e.clientX - left;
      if (isFirstThumb) {
        maxLeft = this.container.nativeElement.offsetWidth - thumb1OffsetWidth;
        thumbLeft = this.getRange(thumbLeft, maxLeft);
        this.renderer.setStyle(this.thumb1.nativeElement, 'left', `${thumbLeft}px`);
      } else {
        maxLeft = this.container.nativeElement.offsetWidth - thumb2OffsetWidth;
        thumbLeft = this.getRange(thumbLeft, maxLeft);
        this.renderer.setStyle(this.thumb2.nativeElement, 'left', `${thumbLeft}px`);
      }
    }
    document.addEventListener("mousemove", slide);

    function cancelSlide(e: any) {
      document.removeEventListener("mousemove", slide);
      document.removeEventListener("mouseup", cancelSlide);
    }

    document.addEventListener("mouseup", cancelSlide);
  }

  getRange(thumbLeft: number, maxLeft: number): number {
    thumbLeft < 0 && (thumbLeft = 0);
    thumbLeft > maxLeft && (thumbLeft = maxLeft);
    return thumbLeft;
  }

}
