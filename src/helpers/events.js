export default {
  events: {},
  $emit: function (event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  },
  $on: function (event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  $off: function (event) {
    if (this.events[event]) delete this.events[event];
  },
};
