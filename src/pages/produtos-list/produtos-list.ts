import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, InfiniteScroll } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-produtos-list',
  templateUrl: 'produtos-list.html',
})
export class ProdutosListPage {
  produtos: any[];
  page: number;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) { }

  ionViewDidEnter() {
    this.produtos = [];
    this.page = 1;
    this.infiniteScroll.enable(true);
    this.getAllProdutos(this.page);
  }

  getAllProdutos(page: number) {
    this.userProvider.getAll(page)
      .then((result: any) => {
        for (var i = 0; i < result.data.length; i++) {
          var produto = result.data[i];
          this.produtos.push(produto);
        }

        if (this.infiniteScroll) {
          this.infiniteScroll.complete();
          if (this.produtos.length == result.total) {
            this.infiniteScroll.enable(false);
          }
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar os produto. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

  getProdutos() {
    setTimeout(() => {
      this.page += 1;
      this.getAllProdutos(this.page);
    }, 500);
  }

  openProdutos(id: number) {
    this.userProvider.get(id)
      .then((result: any) => {
        this.navCtrl.push('ProdutosDetailPage', { user: result.data });
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao recuperar o produto. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });

  }

  openCreateProduto() {
    this.navCtrl.push('ProdutosEditPage');
  }

  openEditProdutos(id: number) {
    this.userProvider.get(id)
      .then((result: any) => {
        this.navCtrl.push('ProdutosEditPage', { user: result.data });
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao recuperar o produto. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

  deleteProdutos(produtos: any) {
    this.userProvider.remove(produtos.idProduto)
      .then((result: any) => {
        let index = this.produtos.indexOf(produtos);
        this.produtos.splice(index, 1);

        this.toast.create({ message: 'Produto excluído com sucesso.', position: 'botton', duration: 3000 }).present();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao excluir o produto. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }
}
