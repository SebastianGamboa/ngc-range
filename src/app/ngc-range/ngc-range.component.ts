import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'ngc-range',
  templateUrl: './ngc-range.component.html',
  styleUrls: ['./ngc-range.component.css']
})
export class NgcRangeComponent implements OnInit {

  @Input() type: string | undefined;
  @Input() min: number;
  @Input() max: number;
  @Input() values: number[];
  @Output() rangeChange: EventEmitter<any>;

  maxWidth: number;
  lengthValues: number;
  rangeUnitPosition: number;
  minRange: number;
  maxRange: number;
  minRangeControlPosition: number;
  maxRangeControlPosition: number;

  @ViewChild("container")
  container!: ElementRef;

  @ViewChild("thumb1")
  thumb1!: ElementRef;

  @ViewChild("thumb2")
  thumb2!: ElementRef;

  constructor(private renderer: Renderer2) {
    this.rangeChange = new EventEmitter<any>();
    this.min = 0;
    this.max = 0;
    this.values = [];
    this.maxWidth = 0;
    this.lengthValues = 0;
    this.rangeUnitPosition = 0;
    this.minRange = 0;
    this.maxRange = 0;
    this.minRangeControlPosition = 0;
    this.maxRangeControlPosition = 0;
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.initValues();
  }

  ngAfterViewInit() {
    this.maxWidth = this.getMaxWidth(
      this.container.nativeElement.offsetWidth,
      this.thumb2.nativeElement.offsetWidth
    );
    this.renderer.listen(this.thumb1.nativeElement, 'mousedown', () => this.onMoveSlider(true));
    this.renderer.listen(this.thumb2.nativeElement, 'mousedown', () => this.onMoveSlider());
  }

  initValues() {
    this.lengthValues = this.values.length;
    if (this.lengthValues > 0) {
      this.minRange =  this.values[0];
      this.maxRange = this.values[this.lengthValues - 1];
      this.rangeUnitPosition = this.maxWidth / (this.lengthValues - 1);
      this.maxRangeControlPosition = this.maxWidth;
    } else {
      this.minRange = this.min;
      this.maxRange = this.max;
    }
  }

  onMoveSlider(isFirstThumb?: boolean) {
    const slide = (e: any) => {
      const { left } = this.container.nativeElement.getBoundingClientRect();
      const thumb1OffsetWidth = this.thumb1.nativeElement.offsetWidth;
      const thumb2OffsetWidth = this.thumb2.nativeElement.offsetWidth;
      const containerOffsetWitdh = this.container.nativeElement.offsetWidth;
      let maxLeft = 0;
      const thumbLeft = e.clientX - left;
      if (isFirstThumb) {
        maxLeft = this.getMaxWidth(containerOffsetWitdh, thumb1OffsetWidth);
        let positionValue = this.getPositionValue(thumbLeft, maxLeft);
        this.minRangeControlPosition = positionValue;
        if (this.isFixedRange() && this.lengthValues > 0) {
          const rangePosition = Math.round(positionValue / this.rangeUnitPosition);
          this.minRange = this.values[rangePosition];
          this.minRangeControlPosition = this.rangeUnitPosition * rangePosition;
          if (this.validateCrossRange()) {
            console.log('MAX POSITION', this.maxRangeControlPosition);
            this.minRangeControlPosition = this.maxRangeControlPosition - this.rangeUnitPosition;
            this.minRange = this.values[this.values.indexOf(this.maxRange) - 1];
          }
        } else {
          this.minRange = this.getUnitRangeValue(positionValue);
          if (this.validateCrossRange()) {
            this.minRangeControlPosition = this.maxRangeControlPosition - (this.maxWidth / this.max);
            this.minRange = this.maxRange - 1;
          }
        }
        this.renderer.setStyle(this.thumb1.nativeElement, 'left', `${this.minRangeControlPosition}px`);
      } else {
        maxLeft = this.getMaxWidth(containerOffsetWitdh, thumb2OffsetWidth);
        let positionValue = this.getPositionValue(thumbLeft, maxLeft);
        this.maxRangeControlPosition = positionValue;
        if (this.isFixedRange() && this.lengthValues > 0) {
          const rangePosition = Math.round(positionValue / this.rangeUnitPosition);
          this.maxRange = this.values[rangePosition];
          this.maxRangeControlPosition = this.rangeUnitPosition * rangePosition;
          if (this.validateCrossRange()) {
            this.maxRangeControlPosition = this.minRangeControlPosition + this.rangeUnitPosition;
            this.maxRange = this.values[this.values.indexOf(this.minRange) + 1];
          }
        } else {
          this.maxRange = this.getUnitRangeValue(positionValue);
          if (this.validateCrossRange()) {
            this.maxRangeControlPosition = this.minRangeControlPosition + (this.maxWidth / this.max);
            this.maxRange = this.minRange + 1;
          }
        }
        this.renderer.setStyle(this.thumb2.nativeElement, 'left', `${this.maxRangeControlPosition}px`);
      }
      this.rangeChange.emit(this.getRange());
    };
    document.addEventListener("mousemove", slide);

    function cancelSlide(e: any) {
      document.removeEventListener("mousemove", slide);
      document.removeEventListener("mouseup", cancelSlide);
    }

    document.addEventListener("mouseup", cancelSlide);
  }

  getMaxWidth(offsetWidthContainer: number, offsetWitdhSlider: number): number {
    return offsetWidthContainer - offsetWitdhSlider;
  }

  getRangeValue(selectedValue: number): number {
    let value = 0;
    if (this.maxWidth > 0) {
      value = Math.round((selectedValue * this.max) / this.maxWidth);
    }
    return value;
  }

  getPositionValue(thumbLeft: number, maxLeft: number): number {
    thumbLeft < 0 && (thumbLeft = 0);
    thumbLeft > maxLeft && (thumbLeft = maxLeft);
    return thumbLeft;
  }

  getRange() {
    return {
      min: this.minRange,
      max: this.maxRange
    };
  }

  isFixedRange() {
    return this.type && this.type.toLowerCase() === 'fixed';
  }

  verifyMinValue(rangeValue: number): number {
    return rangeValue === 0 ? this.min : rangeValue;
  }

  getUnitRangeValue(positionValue: number): number {
    let rangeValue = this.getRangeValue(positionValue);
    return this.verifyMinValue(rangeValue);
  }

  validateCrossRange() {
    return this.minRange >= this.maxRange;
  }

}
