import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddDataPage } from '../add-data/add-data';
import { EditDataPage } from '../edit-data/edit-data';

@Component({
  selector: 'page-suggestion-question',
  templateUrl: 'suggestion-question.html',
})

export class SuggestionQuestionPage {

  questions: any = [];

  constructor(public navCtrl: NavController, private sqlite: SQLite) {

  }

  ionViewDidLoad() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.sqlite.create({
      name: 'newbdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS question(rowid INTEGER PRIMARY KEY, nom_question TEXT, reponseA TEXT, reponseB TEXT, reponseC TEXT, reponseD TEXT, bonne_reponse TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM question ORDER BY rowid DESC', {})
      .then(res => {
        this.questions = [];
        for(var i=0; i<res.rows.length; i++) {
          this.questions.push({rowid:res.rows.item(i).rowid,nom_question:res.rows.item(i).nom_question,reponseA:res.rows.item(i).reponseA,reponseB:res.rows.item(i).reponseB,reponseC:res.rows.item(i).reponseC,reponseD:res.rows.item(i).reponseD,bonne_reponse:res.rows.item(i).bonne_reponse})
        }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  addData() {
    this.navCtrl.push(AddDataPage);
  }

  editData(rowid) {
    this.navCtrl.push(EditDataPage, {
      rowid:rowid
    });
  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'newbdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM question WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
