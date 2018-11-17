import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public show: false;
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http, private toastrService: ToastrService ) {}

  ngOnInit() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  onSubmit(form: NgForm) {
    this.createService('http://0.0.0.0:9000/api/login', form.value);
    }

  private createService(url, param): Promise<any> {
    const body = JSON.stringify(param);
    return this.http
        .post(url, body, this.options)
        .toPromise()
        .then(result => {
          this.extractData(result);
        })
        .catch(this.handleError);
}

  private extractData(res: Response) {
    const body = res.json();
    if (body.status) {
      this.toastrService.success(body.message);
    } else {
      this.toastrService.error(body.message);
    }
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
