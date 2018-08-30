import { Component, OnInit} from '@angular/core';
import { IImage } from '../modules/slideshow/IImage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public imagesUrl;
	public imageUrls: (string | IImage)[] = [
    { url: '../../assets/images/g4.jpg', backgroundSize: 'contain', backgroundPosition: 'center' },
    { url: '../../assets/images/g2.jpg', backgroundSize: 'contain', backgroundPosition: 'center' },
    { url: '../../assets/images/g5.jpg', backgroundSize: 'contain', backgroundPosition: 'center' },
    { url: '../../assets/images/g3.jpg', backgroundSize: 'contain', backgroundPosition: 'center' },
    { url: '../../assets/images/g6.jpg', backgroundSize: 'contain', backgroundPosition: 'center' }
 	];
 	height: string = '400px';
  	minHeight: string;
	arrowSize: string = '30px';
	showArrows: boolean = true;
	disableSwiping: boolean = false;
	autoPlay: boolean = true;
	autoPlayInterval: number = 3333;
	stopAutoPlayOnSlide: boolean = true;
	debug: boolean = false;
	backgroundSize: string = 'cover';
	backgroundPosition: string = 'center center';
	backgroundRepeat: string = 'no-repeat';
	showDots: boolean = true;
	dotColor: string = '#FFF';
	showCaptions: boolean = true;
	captionColor: string = '#FFF';
	captionBackground: string = 'rgba(0, 0, 0, .35)';
	lazyLoad: boolean = false;
	width: string = '100%';
	
  	constructor(){}
 
  	ngOnInit() {
  		setTimeout(() => {
      		console.log('adding an image url dynamically.');
      		this.imageUrls.push({ url: '../../assets/images/g1.jpg', backgroundSize: 'contain', backgroundPosition: 'center' });
    	}, 2000);
  	}
    
}
