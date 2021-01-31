// https://gist.github.com/richdouglasevans/0f9a57e5a52b13e93c0c03630165ecd8

import { tagged } from "daggy";

Function.prototype.map = function (f) {
  return (x) => f(this(x));
};
//+ data Store p s = Store (p -> s) p
const Store = tagged("Store", ["lookup", "pointer"]);

Store.prototype.peek = function (p) {
  return this.seek(p).extract();
};

Store.prototype.seek = function (p) {
  return Store(this.lookup, p);
};

Store.prototype.map = function (f) {
  return Store(this.lookup.map(f), this.pointer);
};

Store.prototype.extend = function (f) {
  return Store((pointer) => f(Store(this.lookup, pointer)), this.pointer); // create new lookup function from next pointer and previous lookup function
};

Store.prototype.extract = function () {
  return this.lookup(this.pointer);
};

export default Store;
