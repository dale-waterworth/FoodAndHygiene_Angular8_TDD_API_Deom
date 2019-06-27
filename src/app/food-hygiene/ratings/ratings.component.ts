import { Component, OnInit, Input } from '@angular/core';
import { IRating } from '../food-hygiene.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  @Input() ratings: IRating[];

  constructor() { }

  ngOnInit() {
  }

}
