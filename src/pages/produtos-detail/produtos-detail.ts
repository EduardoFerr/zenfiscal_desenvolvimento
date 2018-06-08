import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos-detail',
  templateUrl: 'produtos-detail.html',
})
export class ProdutosDetailPage {
  produtos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.produtos = this.navParams.data.produtos;
  }

}
