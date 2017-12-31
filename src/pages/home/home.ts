import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { ListeQuizzPage } from '../liste-quizz/liste-quizz';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('slides') slides: any;

    hasAnswered: boolean = false;
    score: number = 0;

    slideOptions: any;
    questions: any;

    theme: string;

    // on récupère le thème des questions dans la variable theme (ex: sciences)
    constructor(public navCtrl: NavController, public dataService: Data, public navParams: NavParams) {
        this.theme = navParams.get('theme');
    }

    // quand on charge la vue on récupère le thème des questions défini dans le constructeur
    ionViewDidLoad() {
        this.slides.lockSwipes(true);
        this.dataService.load(this.theme).then((data) => {

            data.map((question) => {
                let originalOrder = question.answers;
                question.answers = this.randomizeAnswers(originalOrder);
                return question;
            });
            this.questions = data;
        });
    }

    // on passe à la question suivante
    nextSlide() {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }

    // quand on clique sur une réponse
    selectAnswer(answer, question) {
        this.hasAnswered = true;
        answer.selected = true;
        question.flashCardFlipped = true;

        // on augmente le score de 1
        if (answer.correct) {
            this.score++;
        }

        // on remet les variables par défaut
        setTimeout(() => {
            this.hasAnswered = false;
            this.nextSlide();
            answer.selected = false;
            question.flashCardFlipped = false;
        }, 3000);
    }

    // les réponses dans le json ne s'affichent pas dans l'ordre
    randomizeAnswers(rawAnswers: any[]): any[] {
        for (let i = rawAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = rawAnswers[i];
            rawAnswers[i] = rawAnswers[j];
            rawAnswers[j] = temp;
        }
        return rawAnswers;
    }

    // on remet le quizz à zéro
    restartQuiz() {
        this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 1000);
        this.slides.lockSwipes(true);
    }

    // retour à la liste des thèmes
    menu() {
      this.navCtrl.pop();
      this.navCtrl.push(ListeQuizzPage);
    }
}
