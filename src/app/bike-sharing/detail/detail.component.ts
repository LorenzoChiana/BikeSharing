import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  imageUrl: string; // = "/assets/img/default-image.png";
  fileToUpload: File = null;

  detailId: string;

    constructor(private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
      this.route.params.subscribe((params) => this.detailId = params.id);
    }

    goBack(): void {
      this.location.back();
    }

/*
    handleFileInput(file: FileList) {
      this.fileToUpload = file.item(0);

      //Show image preview
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.imageUrl = event.target.result;
        //alert("image " + this.imageUrl)
      }
      reader.readAsDataURL(this.fileToUpload);

      alert("fileToUpload = " + fileToUpload)
    }
*/
    onFileChanged(event) {
      var reader = new FileReader()
      console.log(event.target.result)
      alert(event.target.result)
    }
}
