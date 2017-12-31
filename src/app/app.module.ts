import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListeQuizzPage } from '../pages/liste-quizz/liste-quizz';
import { MenuPage } from '../pages/menu/menu';
import { SuggestionQuestionPage } from '../pages/suggestion-question/suggestion-question';
import { AddDataPage } from '../pages/add-data/add-data';
import { EditDataPage } from '../pages/edit-data/edit-data';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { Data } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FlashCardComponent,
    ListeQuizzPage,
    MenuPage,
    SuggestionQuestionPage,
    AddDataPage,
    EditDataPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListeQuizzPage,
    HomePage,
    MenuPage,
    SuggestionQuestionPage,
    AddDataPage,
    EditDataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    Data
  ]
})
export class AppModule {}
