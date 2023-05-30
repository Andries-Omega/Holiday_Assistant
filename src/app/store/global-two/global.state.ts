import { Action, Select, State, StateContext } from '@ngxs/store';
import { GlobalStateI } from 'src/app/models/State';
import { SetLoadingMessage, ToggleLoading } from './global.actions';
import { Injectable } from '@angular/core';

@State<GlobalStateI>({
  name: 'global',
  defaults: {
    isLoading: false,
    loadingMessage: '',
  },
})
@Injectable()
export class GlobalState {
  @Action(ToggleLoading)
  toggleLoading(
    { setState, getState }: StateContext<GlobalStateI>,
    { isLoading }: GlobalStateI
  ) {
    const state = getState();
    setState({ ...state, isLoading });
  }

  @Action(SetLoadingMessage)
  setLoadingMessage(
    { setState, getState }: StateContext<GlobalStateI>,
    { loadingMessage }: GlobalStateI
  ) {
    const state = getState();
    setState({ ...state, loadingMessage });
  }
}
