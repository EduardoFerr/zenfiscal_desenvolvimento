import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new User();
    this.model.usuLogin = 'demo@varejo.br';
    this.model.senhamd5 = '43b4904001fd14f3aeda3c8f90325379';
    console.log(this.model);
  }

  login() {
    console.log('login-login('+this.model+')');
      this.userProvider.login(this.model)
      .then((result: any) => {
        this.toast.create({ message: 'Usuário logado com sucesso. Token: ' + result, position: 'botton', duration: 3000 }).present();

        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }
}

export class User {
  usuLogin: string;
  senhamd5: string;
}
