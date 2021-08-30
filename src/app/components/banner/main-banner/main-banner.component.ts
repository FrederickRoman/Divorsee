import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss'],
})
export class MainBannerComponent implements AfterViewInit {
  @ViewChild('background') bgRef!: ElementRef<HTMLImageElement>;

  centerTextStyle: { [klass: string]: string } = {
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '120%',
  };
  private bgInitTopPosition: number = 0;
  private readonly PARALLAX_RATIO: number = 1;

  ngAfterViewInit(): void {
    const { top } = this.bgRef.nativeElement.getBoundingClientRect();
    this.bgInitTopPosition = -top;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const parallaxShift: number = this.PARALLAX_RATIO * window.scrollY;
    const curTopPosition: number = this.bgInitTopPosition - parallaxShift;
    this.bgRef.nativeElement.style.top = `${curTopPosition}px`;
  }
}
