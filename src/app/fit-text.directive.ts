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
  @Input() modelToWatch = '';

  constructor(private fitTextElement: ElementRef) {
    this.fitTextElement.nativeElement.style.whiteSpace = 'nowrap';
    this.fitTextElement.nativeElement.style.textWrap = 'nowrap';
    this.fitTextElement.nativeElement.style.display = 'inline-block';
  }

  ngAfterViewInit() {
    if (this.fitTextElement.nativeElement) {
      // this.fitText(this.fitTextElement.nativeElement);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['modelToWatch']) {
      this.fitTextElement.nativeElement.innerHTML = this.modelToWatch;
      if (!changes['modelToWatch'].firstChange) {
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
    let fontSize = 10;
    element.style.fontSize = `${fontSize}px`;

    while (element.scrollWidth < parentWidth) {
      fontSize += 1;
      element.style.fontSize = `${fontSize}px`;
    }

    if (element.scrollWidth > parentWidth) {
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
    }
  }
}
