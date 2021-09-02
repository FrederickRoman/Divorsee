import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  readonly PUBLIC_RESEARCH_EXT_LINK: string =
    'https://dergipark.org.tr/en/download/article-file/748448';
  readonly DATASET_EXT_LINK: string =
    'https://archive.ics.uci.edu/ml/datasets/Divorce+Predictors+data+set';
  readonly TF_EXT_LINK: string = 'https://www.tensorflow.org/js';
  readonly ANN_EXT_LINK: string = 'https://en.wikipedia.org/wiki/Neural_network';
  readonly AUTHOR_EXT_LINK: string = 'https://www.frederickroman.com';

  constructor() {}

  ngOnInit(): void {
    AOS.init();
  }
}
