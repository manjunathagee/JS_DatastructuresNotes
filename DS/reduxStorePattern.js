const reducerFn = (state, action) => {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      case "INCREMENT_BY":
        return state + action.payload;
      default:
        return state;
    }
  };
  
  let incrementAction = { type: "INCREMENT" };
  let decrementAction = { type: "DECREMENT" };
  let incrementByAction = { type: "INCREMENT_BY", payload: 5 };
  
  console.clear();
  
  class Store {
    constructor(reducerFn, initialState) {
      this.reducer = reducerFn;
      this.state =
        typeof initialState === "function" ? initialState() : initialState;
      this.listeners = [];
    }
  
    dispatch(action) {
      this.state = this.reducer(this.state, action);
      this.listeners.forEach((l) => l());
    }
  
    getStore() {
      return this.state;
    }
  
    subscribe(fn) {
      this.listeners.push(fn);
      return () => {
        this.listeners = this.listeners.filter((l) => l !== fn);
      };
    }
  }
  
  const state = new Store(reducerFn, 0);
  state.dispatch(incrementAction);
  state.dispatch(incrementAction);
  
  let unsubscribe = state.subscribe(() => {
    console.log(state.getStore());
  });
  
  state.dispatch(incrementAction);
  state.dispatch(incrementAction);
  unsubscribe();
  state.dispatch(decrementAction);
  