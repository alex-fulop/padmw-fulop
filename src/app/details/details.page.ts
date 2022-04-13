import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  name:string;
  countryDetails:any;
  errorMessage:string;

  constructor(public rest: RestService, public loadingCtrl: LoadingController, private activatedRoute: ActivatedRoute, private router: Router ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      let navParams = this.router.getCurrentNavigation().extras.state;
      this.name = navParams?.name ?? '';
    });
  }

  async ngOnInit() {
    await this.getCountryDetails(this.name);
  }

  async getCountryDetails(name) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ...'
    });
    await loading.present();
    await this.rest.getCountryDetails(name)
      .subscribe(
        countryDetails => {
          this.countryDetails = countryDetails[0];
          loading.dismiss();
          console.log(this.countryDetails);
        },
        error => { this.errorMessage = error as any; loading.dismiss(); });
  }

  getCurrencies(c){
    if(c===undefined)
      return [];
    const currencies = [];
    Object.keys(c.currencies).forEach(currency =>currencies.push(c.currencies[currency]));
    return currencies;
  }

}
