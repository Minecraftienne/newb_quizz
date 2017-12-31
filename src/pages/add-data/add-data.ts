import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {

  data = { nom_question:"", reponseA:"", reponseB:"", reponseC:"", reponseD:"", bonne_reponse:""};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {}

  saveData() {
    this.sqlite.create({
      name: 'newbdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO question VALUES(NULL,?,?,?,?,?,?)',[this.data.nom_question,this.data.reponseA,this.data.reponseB,this.data.reponseC,this.data.reponseD,this.data.bonne_reponse])
        .then(res => {
          console.log(res);
          this.toast.show('Question ajoutée', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }
}
