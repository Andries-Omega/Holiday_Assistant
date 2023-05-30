export class ToggleLoading {
  static readonly type = '[ToggleLoading] Toggle Loading';
  constructor(public isLoading: boolean) {}
}

export class SetLoadingMessage {
  static readonly type = '[SetLoadingMessage] Set Loading Message';
  constructor(public loadingMessage: string) {}
}
