import 'p2';
import 'pixi';
import 'phaser';

//Hero
import { HeroCharacter } from '../hero/hero';

//Redux
import {
  Action,
  Reducer,
  Store,
  createStore
} from 'redux';

interface AppState {
  messages: string[];
}

interface AddMessageAction extends Action {
  message: string;
}

interface DeleteMessageAction extends Action {
  index: number;
}

let initialState: AppState = { messages: [] };

let reducer: Reducer<AppState> =
  (state: AppState = initialState, action: Action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    return {
      messages: state.messages.concat((<AddMessageAction>action).message),
    };
  case 'DELETE_MESSAGE':
    let idx = (<DeleteMessageAction>action).index;
    return {
      messages: [
        ...state.messages.slice(0, idx),
        ...state.messages.slice(idx + 1, state.messages.length)
      ]
    };
  default:
    return state;
  }
};

class MessageActions {
  static addMessage(message: string): AddMessageAction {
    return {
      type: 'ADD_MESSAGE',
      message: message
    };
  }
  static deleteMessage(index: number): DeleteMessageAction {
    return {
      type: 'DELETE_MESSAGE',
      index: index
    };
  }
}

export class GameState {
  private store: Store<any> = createStore<AppState>(reducer);

  constructor() {

    this.store.dispatch(
      MessageActions.addMessage('Would you say the fringe was made of silk?'));

    console.log(this.store.getState());
  }
}
