import { Component, OnInit } from '@angular/core';
import {RedcapService} from "../../services/redcap.service";
import {TimedSegment} from "../../timedsegment.model";

declare var SC;

@Component({
  selector: 'app-symptom-library-mouthsores',
  templateUrl: './symptom-library-mouthsores.component.html',
  styleUrls: ['./symptom-library-mouthsores.component.scss']
})
export class SymptomLibraryMouthSoresComponent implements OnInit {
	isWarn: boolean = true;
	constructor(private redcapService: RedcapService) { }

	ngOnInit() {
	}

	  ngAfterContentInit(){
	    let timedSegment = this.redcapService.getTimedSegment();
	    timedSegment.topic = "SymptomLibrary Mouth Sores";
	    this.redcapService.setTimedSegment(timedSegment);
	    var iframeElement   = document.querySelector('iframe');
	    var iframeElementID = iframeElement.id;
	    var widget1         = SC.Widget(iframeElement);

	    var localSvc = this.redcapService;

	    widget1.bind(SC.Widget.Events.PLAY, function(e) {      
	      widget1.getCurrentSound(function(currentSound) {
	        localSvc.logWebsite(timedSegment,currentSound.permalink,"sound file").subscribe( res => {});
	      });
	    });
	  }

	  logWebsite(site:string){
	    let timedSegment = this.redcapService.getTimedSegment();
	    this.redcapService.logWebsite(timedSegment, site, "website").subscribe( res => {});
	  }

	  logPDF(doc:string){
	    let timedSegment = this.redcapService.getTimedSegment();
	    this.redcapService.logWebsite(timedSegment, doc, "pdf").subscribe( res => {});
	  }	
	   	  
	dismiss(){
	this.isWarn = false;
	}
	
	displayWebsite(site:string){
		window.open(site, "_blank");
  	}
}
