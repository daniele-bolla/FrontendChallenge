import {
  Directive,
  ElementRef,
  AfterViewInit,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFitText]',
  standalone: true,
})
export class FitTextDirective implements AfterViewInit, OnChanges {
  @Input() modelToWatch: unknown | undefined;

  constructor(private fitTextElement: ElementRef) {
    this.fitTextElement.nativeElement.style.whiteSpace = 'nowrap';
    this.fitTextElement.nativeElement.style.textWrap = 'nowrap';
    this.fitTextElement.nativeElement.style.display = 'inline-block';
  }

  ngAfterViewInit() {
    if (this.fitTextElement.nativeElement) {
      this.fitText(this.fitTextElement.nativeElement);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    const { modelToWatch } = changes;
    if (modelToWatch && this.fitTextElement.nativeElement) {
      const { firstChange, previousValue, currentValue } = modelToWatch;
      if (!firstChange && previousValue !== currentValue) {
        this.fitText(this.fitTextElement.nativeElement);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('window:orientationchange', ['$event'])
  onResize() {
    this.fitText(this.fitTextElement.nativeElement);
  }

  private fitText(element: HTMLElement): void {
    const parentWidth = element.parentElement?.offsetWidth || 0;
    const fontSizeStyle = window
      .getComputedStyle(element, null)
      .getPropertyValue('font-size');
    let fontSize = parseFloat(fontSizeStyle);

    while (element.scrollWidth < parentWidth && fontSize < 400) {
      fontSize += 1;
      element.style.fontSize = `${fontSize}px`;
    }

    while (element.scrollWidth > parentWidth && fontSize > 10) {
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
    }
  }
}
