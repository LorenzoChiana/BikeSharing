import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  detailId: string;

    constructor(private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
      this.route.params.subscribe((params) => this.detailId = params.id);
    }

    goBack(): void {
      this.location.back();
    }
}
