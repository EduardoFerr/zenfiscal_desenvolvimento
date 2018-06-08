import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
let API_URL = 'https://pdv-api.gladiumti.net.br/api/'

@Injectable()
export class UsersProvider {

  constructor(public http: Http) {
    console.log('Construindo UsersProvider');
   }

  createAccount(usuLogin: string, senhamd5: string) {
    return new Promise((resolve, reject) => {
      var data = {
        usuLoginv: usuLogin,
        senhamd5: senhamd5
      };

      this.http.post(API_URL + 'register', JSON.stringify(data), {headers: new Headers()})
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  login(data) {
    console.log('provider-users->login('+data+')');
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      
      xhr.open("GET", "https://pdv-api.gladiumti.net.br/api/autenticacao");
      xhr.setRequestHeader("usulogin", "demo@varejo.br");
      xhr.setRequestHeader("senhamd5", "43b4904001fd14f3aeda3c8f90325379");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("postman-token", "ffa3d3cf-cd9d-da82-324d-dffdb5e6cd8c");
      
     // xhr.send(data);

      this.http.post(API_URL + 'autenticacao', JSON.stringify(data))
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  getAll(page: number) {
    return new Promise((resolve, reject) => {

      let url = API_URL + 'produto/?criterio=10&idProduto=' + page;

      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  get(id: number) {
    return new Promise((resolve, reject) => {
      let url = API_URL + 'users/' + id;

      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  insert(user: any) {
    return new Promise((resolve, reject) => {
      let url = API_URL + 'users/';

      this.http.post(url, user)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  update(user: any) {
    return new Promise((resolve, reject) => {
      let url = API_URL + 'users/' + user.id;
      let data = {
        "first_name": user.first_name,
        "last_name": user.last_name
      }
      console.log('update'+data);
      this.http.put(url, user)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  remove(id: number) {
    return new Promise((resolve, reject) => {
      let url = API_URL + 'users/' + id;

      this.http.delete(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }
}
