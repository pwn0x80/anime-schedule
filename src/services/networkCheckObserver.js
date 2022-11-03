export let Subject = {
  _state: null,
  _observers: [],
  add: function(observer) {
    this._observers.push(observer);
  },
  getState: function() {
    return this._state;
  },
  setState: function(value) {
    this._state = value;

    for (let i = 0; i < this._observers.length; i++) {
      this._observers[i].signal(this);
    }
  },
  isDataAvailable: function() {
    if (this._state == null) {
      return false;
    } else {
      return true;
    }
  },
  getFlow: function*() {
    let i = 0;
    while (true) {
      let out = this._state[i]
      yield (out)
      i++;

    }

  }
};
// let sub = Subject.getFlow();
export default Subject;
