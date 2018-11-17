import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public show: boolean = false;
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
    }

  onSubmit(form: NgForm) {
    this.createService('http://0.0.0.0:9000/api/register', form.value);
  }

  private createService(url, param): Promise<any> {
    const body = JSON.stringify(param);
    return this.http
      .post(url, body, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    this.router.navigate(['/login']);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
