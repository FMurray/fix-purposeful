export interface User {
  id: Number;
  name: String;
  username: String;
  email: String;
  address: {
    street: String;
    suite: String;
    city: String;
    zipcode: String;
    geo: {
      lat: String;
      long: String;
    }
  };
  phone: String;
  website: String;
  company: {
      name: String,
      catchPhrase: String,
      bs: String
    };
}

/**
 * EXAMPLE USER
 * {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
 */