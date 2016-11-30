export class FetchService {
  pull (url: string): Promise<any> {
    return new Promise((res, rej) => {
        let req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.setRequestHeader('Origin', 'http://www.yourpage.com');
        req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        req.onload = () => {
          switch (req.status) {
            case 200: res(req.response); break;
            default: rej(req.statusText); break;
          }
        };
        req.onerror = () => { rej('Network Error'); };
        req.send();
      })
      .catch((error) => {
        // TODO: handle failure to get urlbetter
        return error.toString();
      });

  }
};
