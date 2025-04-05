export class GetAllThemes {
   static readonly type = "[Themes] Get";
}

export class GetThemes {
   static readonly type = "[Themes] Get";
}

export class GetHomePage {
   static readonly type = "[Home Page] Get";
   constructor(public slug?: string) {}
}
