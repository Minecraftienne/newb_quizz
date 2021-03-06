import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-liste-quizz',
  templateUrl: 'liste-quizz.html',
})

export class ListeQuizzPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // on récupère le thème du quizz (ex: mode)
  charger(dataTheme) {
    this.navCtrl.push(HomePage, {
      theme:dataTheme,
    });
  }
}
