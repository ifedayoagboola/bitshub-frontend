export class ShowLoaderAction {
   static readonly type = '[Loader] Show loader action';
   constructor(public loading: boolean = true) {}
}

export class HideLoaderAction {
   static readonly type = '[Loader] Hide loader action';
}

export class ShowButtonSpinnerAction {
   static readonly type = '[Loader] Show Button Spinner action';
   constructor(public loading: boolean = true, public id?: string) {}
}

export class HideButtonSpinnerAction {
   static readonly type = '[Loader] Hide Button Spinner action';
}