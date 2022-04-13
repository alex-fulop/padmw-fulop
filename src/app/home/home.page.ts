import { Component, OnInit } from '@angular/core';

import { RestService } from '../rest.service';
import { LoadingController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  countries: any;
  errorMessage: string;

  constructor(public rest: RestService, public loadingCtrl: LoadingController, private navCtrl: NavController) { }

  ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ...'
    });
    await loading.present();
    await this.rest.getCountries()
      .subscribe(
        countries => {
          this.countries = countries.sort(
            (a, b) => a.name.official.localeCompare(b.name.official)
          );
          loading.dismiss();
        },
        error => { this.errorMessage = error as any; loading.dismiss(); });
  }

  showDetails(c) {
    const navigationExtras: NavigationExtras = {
      state: {
        name: c.name.official
      }
    };
    this.navCtrl.navigateForward(['details'], navigationExtras);
  }

}

