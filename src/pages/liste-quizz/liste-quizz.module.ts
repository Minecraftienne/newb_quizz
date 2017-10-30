import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeQuizzPage } from './liste-quizz';

@NgModule({
  declarations: [
    ListeQuizzPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeQuizzPage),
  ],
})
export class ListeQuizzPageModule {}
