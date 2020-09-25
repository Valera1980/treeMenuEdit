
export interface ITopMenuItem {
  readonly id: number;
  readonly name: string;
  readonly route: string;
  readonly items: ITopMenuItem[] | ModelTopMenuItem[];
  readonly isShow: boolean;
  // members for primenG tree
  readonly key?: number;
  readonly label?: string;
  readonly children?: ITopMenuItem[] | ModelTopMenuItem[];
}

export class ModelTopMenuItem {
  readonly id: number;
  readonly name: string;
  readonly route: string;
  readonly items: ModelTopMenuItem[];
  readonly isShow: boolean;
  // members for primenG tree
  readonly key?: number;
  readonly label?: string;
  readonly children?: ModelTopMenuItem[];
  constructor({
    id = -1,
    name = '',
    route = '',
    items = [],
    isShow = true
  }: Partial<ITopMenuItem> = {}) {
    this.id = this.key = id;
    this.name = name;
    this.route = route;
    this.isShow = isShow;
    this.items = this.children = isArrayModelTopMenu(items) ? items : items.map(i => new ModelTopMenuItem(i));
  }
  clone(): ModelTopMenuItem {
    return new ModelTopMenuItem(this.serialize());
  }
  serialize(): ITopMenuItem {
    return {
      id: this.id,
      name: this.name,
      route: this.route,
      items: this.items,
      isShow: this.isShow
    };
  }
  isNode(): boolean {
    return this.items.length > 0;
  }
}

function isArrayModelTopMenu(arr: ModelTopMenuItem[] | ITopMenuItem[]): arr is ModelTopMenuItem[] {
  return arr.length > 0 && arr[0] instanceof ModelTopMenuItem;
}
