import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

// add plus+ here
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  data: SQLiteObject;
  progress = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private platform: Platform) {

    this.platform.ready().then(() => {
      this.initDB();
    })

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  initDB() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        this.data = db;
        this.createOeuvresTable();
      })
      .catch(e => console.log(e));
  }

  createOeuvresTable() {

    this.data.executeSql('CREATE TABLE IF NOT EXISTS oeuvres (id INTEGER PRIMARY KEY, lastname TEXT, firstname TEXT, image TEXT, code INTEGER, checked INTEGER)', {})
      .then(() => {
        console.log('Executed SQL');
        this.checkOeuvresExits().then((data) => {
          let totalOeuvres = data;
          console.log('totalOeuvres', totalOeuvres);

          if (totalOeuvres == 21) this.redirectToTabs();
          else this.insertOeuvresData();
        })
      })
      .catch(e => console.log(e));

  }

  checkOeuvresExits(): any {

    return this.data.executeSql('SELECT * FROM oeuvres', {})
      .then((data) => {
        console.log("checkOeuvresExits");
        return data.rows.length;
      })
      .catch(e => console.log(e));

  }
  dropOeuvresTable(): any {

    return this.data.executeSql('DROP TABLE oeuvres', {})
      .then((data) => {
        console.log('DROPPED');
      })
      .catch(e => console.log(e));

  }

  insertOeuvresData() {

    let inserts =
      "INSERT INTO `oeuvres` VALUES (1,'ALVAREZ','Jean-Pierre','9213750369.jpg',9213750369,0)," +
      "(2,'ARAI','Poeragui','6510403686.jpg',6510403686,0)," +
      "(3,'CHANSIN','Jérôme','7216899933.jpg',7216899933,0)," +
      "(4,'CHEUNG-SEN ','Jonas','1629568455.jpg',1629568455,0)," +
      "(5,'CUNY','Heimana','9266553664.jpg',9266553664,0)," +
      "(6,'EBB','Nicolas','1168085824.jpg',1168085824,0)," +
      "(7,'LEHARTEL','Alexandre','2791010818.jpg',2791010818,0)," +
      "(8,'LENOIR','Tetuaoro','4173047359.jpg',4173047359,0)," +
      "(9,'LONGINE','Manaarii ','9782420312.jpg',9782420312,0)," +
      "(10,'LY','Joane ','6872232276.jpg',6872232276,0)," +
      "(11,'MARO','Teremu ','1234567890.jpg',1234567890,0)," +
      "(12,'MONACO','Vaitiare','4653519064.jpg',4653519064,0)," +
      "(13,'PAEAHI','Ariipaea','3658034121.jpg',3658034121,0)," +
      "(14,'PAMBRUN','Aito ','5175547403.jpg',5175547403,0)," +
      "(15,'PAMBRUN','Hiomai','9520532017.jpg',9520532017,0)," +
      "(16,'PEREZ','Rahiti','1228597258.jpg',1228597258,0)," +
      "(17,'PERRY','Matihamu ','5480211371.jpg',5480211371,0)," +
      "(18,'ROUSSEL','Christian ','2462643924.jpg',2462643924,0)," +
      "(19,'TEHUPE','Tinirau ','5055364030.jpg',5055364030,0)," +
      "(20,'TEMATAHOTOA','Tinirau ','6232447902.jpg',6232447902,0)," +
      "(21,'TOOFA','Teparii ','4235066246.jpg',4235066246,0);";
    ;
    this.data.executeSql(inserts, {})
      .then(() => {

        this.redirectToTabs();

      })
      .catch((e) => console.log('error', e))


  }
  // is progressbar
  redirectToTabs() {
    let limit = 3;
    let counter = 0;
    let myInterval = setInterval(() => {
      counter++;
      console.log('count', counter);
      this.progress = counter * 100 / limit;
      console.log('progress', this.progress);

      if (counter == limit) {
        clearInterval(myInterval);
        this.navCtrl.push(TabsPage);
      }

    }, 1000);
  }
}
