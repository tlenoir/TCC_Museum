import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = AboutPage;

  constructor(private bCs: BarcodeScanner,
    private sqlite: SQLite,
    private iab: InAppBrowser,
    private navCtrl: NavController,
  ) {



  }

  scanBro() {
    console.log("scan ready");
    this.bCs.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      
      this.updateChecked(barcodeData.text);
      


    }).catch(err => {
      console.log('Error', err);

      


    });

  }

  updateChecked(code) {
    console.log("updateChecked");

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('UPDATE oeuvres SET checked = 1 WHERE code =' + code, {})
          .then((data) => {

            const browser = this.iab
              .create('http://tcc.1click.pf/museum/index.php?mat=FVK96BLUEL&oeuvre=' + code, '_blank');

            browser.on('exit').subscribe(event => {
              this.navCtrl.setRoot(TabsPage);
            })
          });
      });
  }
}
