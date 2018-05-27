import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NouvellesModel } from '../modeles/nouvelles.modele';
import { AnewsService } from '../services/anews.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-anews-detail',
  templateUrl: './anews-detail.component.html',
  styleUrls: ['./anews-detail.component.css']
})
export class AnewsDetailComponent implements OnInit, OnDestroy {

  @Input() truc;
  newsId:number;

  donnees$:Subscription;

  news:NouvellesModel[];
  newsActu:NouvellesModel;

  constructor(public donnees:AnewsService, private routeParams:ActivatedRoute, public authService:AuthService) { }
  
  ngOnInit() {
    this.newsId = 0; // Valeur par défaut de newsId corrigée sir

    this.routeParams.params.subscribe(params => {
      // Paramétrage de l'actualité si le tableau est déjà chargé
      this.newsId = +params['id']; // (+) converts string 'id' to a number
      // this.newsActu = this.donnees.news$.getValue()[this.newsId];
      // console.log("News actu", this.newsActu, this.donnees.news$.getValue(), this.donnees.news);
      this.donnees$ = this.donnees.news$.subscribe(
        data => {
          // this.news = data;
          console.log(this.newsId);
          if(this.newsId){
            this.news = data;
            this.newsActu = data[this.newsId];
            console.log("News actu", this.newsActu, this.donnees.news$.getValue(), this.donnees.news);
          }
      });
   });
   // Synchronisation avec les données du service au cas ou des modifications interviendraient
   
  }
  // Destruction des données à la déconnexion
  ngOnDestroy(){
    this.donnees$.unsubscribe();
  }

}