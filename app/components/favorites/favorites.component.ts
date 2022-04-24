import { Component, OnInit } from '@angular/core';
import {RedcapService} from "../../services/redcap.service";
import {Card3} from "../../card3.model";
import {TimedSegment} from "../../timedsegment.model";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private redcapService: RedcapService) { }

  card =[];

  ngOnInit() {}

  ngAfterContentInit(){
    this.loadFavorites();
  }
  
  loadFavorites(){
    let timedSegment = this.redcapService.getTimedSegment();
    this.card = [];
    var _cards = this.card;
    var _favoritecards = this.redcapService.favoriteCards;

    //console.log("How many resources: " + _favoritecards.length);

    this.redcapService.getFavorites(timedSegment.user).subscribe( res => {

      for (var i=0; i < res.length; i++){
        let myfavorites = _favoritecards.filter((a) => a.label === res[i]);
        if(myfavorites.length > 0){ 
          _cards.push(myfavorites[0]);
          //console.log("loading : " + myfavorites[0]);    
        }
      }

      /*
      for (var i=0; i < res.length; i++){
        for (var j=0; j < _favoritecards.length; j++){
          if(_favoritecards[j].label == res[i]){
            _cards.push(_favoritecards[j]);
          }
        }
      }
      */



    } );

  }

  deleteFavorite(label:string){

    this.card = [];
    var _cards = this.card;
    var _favoritecards = this.redcapService.favoriteCards;
    let timedSegment = this.redcapService.getTimedSegment();
    this.redcapService.deleteFavorites(timedSegment.user, label).subscribe( res => {
      this.redcapService.getFavorites(timedSegment.user).subscribe( res => {
        for (var i=0; i < res.length; i++){
          _cards.push(_favoritecards[res[i]])
        }
      });
    });

  }

}
