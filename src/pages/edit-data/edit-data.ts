import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {

  data = { rowid:0, nom_question:"", reponseA:"", reponseB:"", reponseC:"", reponseD:"", bonne_reponse:""};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
      this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'newbdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM question WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.nom_question = res.rows.item(0).nom_question;
            this.data.reponseA = res.rows.item(0).reponseA;
            this.data.reponseB = res.rows.item(0).reponseB;
            this.data.reponseC = res.rows.item(0).reponseC;
            this.data.reponseD = res.rows.item(0).reponseD;
            this.data.bonne_reponse = res.rows.item(0).bonne_reponse;
          }
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

  updateData() {
    this.sqlite.create({
      name: 'newbdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE question SET nom_question=?,reponseA=?,reponseB=?,reponseC=?,reponseD=?,bonne_reponse=? WHERE rowid=?',[this.data.nom_question,this.data.reponseA,this.data.reponseB,this.data.reponseC,this.data.reponseD,this.data.bonne_reponse])
        .then(res => {
          console.log(res);
          this.toast.show('Question actualisée', '5000', 'center').subscribe(
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
