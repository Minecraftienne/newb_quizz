import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListeQuizzPage } from '../liste-quizz/liste-quizz';
import { SuggestionQuestionPage } from '../suggestion-question/suggestion-question';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goListeQuizz() {
    this.navCtrl.push(ListeQuizzPage);
  }

  goSuggestionQuestion() {
    this.navCtrl.push(SuggestionQuestionPage);
  }
}
