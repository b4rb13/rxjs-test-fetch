import { Observable } from "rxjs";

// const baseUrl = "https://randomuser.me/";
const baseUrl = "http://jsonplaceholder.typicode.com/";

export default class BaseRequestModel {
  constructor(url, method, headers, body) {
    this.url = url;
    this.body = body;
    this.method = method || "GET";
    this.headers = headers || {};
  }
  request() {
    return new Observable((observer) => {
        
      fetch(`${baseUrl}${this.url}`, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body),
      })
        .then((r) => {
          return r.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((e) => {
          observer.error(e);
        });
      return () => {
        // clean up on unsubscribe
      };
    });
  }
}
