import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss'],
})
export class MainBannerComponent {
  @Output() startQuestionnaire = new EventEmitter<void>();

  @ViewChild('background') bgRef!: ElementRef<HTMLImageElement>;

  centerTextStyle: { [klass: string]: string } = {
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '120%',
  };
  private bgInitTopPosition: number = -56; // -top
  private readonly PARALLAX_RATIO: number = 1;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const parallaxShift: number = this.PARALLAX_RATIO * window.scrollY;
    const curTopPosition: number = this.bgInitTopPosition - parallaxShift;
    this.bgRef.nativeElement.style.top = `${curTopPosition}px`;
  }

  start(): void {
    this.startQuestionnaire.emit();
  }
}
