import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeQuizzPage } from './liste-quizz';
import { HomePage } from '../home/home';

@NgModule({
  declarations: [
    ListeQuizzPage,
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(ListeQuizzPage),
  ],
  entryComponents: [
    ListeQuizzPage,
    HomePage
  ],
})
export class ListeQuizzPageModule {}
