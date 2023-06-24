const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "..", "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (error, data) => {
    fs.readFile(p, (error, data) => {
      if (error) {
        return cb([]);
      }
      cb(JSON.parse(data));
    });
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static getAll(cb) {
    getProductsFromFile(cb);
  }
};
