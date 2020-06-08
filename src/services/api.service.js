import BaseRequestModel from "../utils/base-request.model";

class ApiService {
  constructor(route, form) {
    this.route = route;
    this.form = form;
  }

  get() {
    const headers = {
      // "Access-Control-Allow-Origin": "*",
      // "Content-Type": "application/json; charset=UTF-8",
    };
    const newBase = new BaseRequestModel(this.route, "GET", headers);
    return newBase.request();
  }

  post() {
    const headers = {
      // 'Access-Control-Allow-Origin': '*',
      // "Content-Type": "application/json; charset=UTF-8",
    };
    const newBase = new BaseRequestModel(
      this.route,
      "POST",
      headers,
      this.form
    );
    return newBase.request();
  }
  // put u delete heto khavaqenq
}

export default ApiService;
