
export interface ITopMenuItem {
  readonly id: number | string;
  readonly name: string;
  readonly route: string;
  readonly items: ITopMenuItem[] | ModelTopMenuItem[];
  readonly isShow: boolean;
  readonly viewMode: 'edit' | 'view';
  readonly isNew: boolean;
  // members for primenG tree
  readonly key?: number |string;
  readonly label?: string;
  readonly children?: ITopMenuItem[] | ModelTopMenuItem[];
}

export class ModelTopMenuItem implements ITopMenuItem {
  readonly id: number | string;
  readonly name: string;
  readonly route: string;
  readonly items: ModelTopMenuItem[];
  readonly isShow: boolean;
  readonly viewMode: 'edit' | 'view';
  readonly isNew: boolean;
  // members for primenG tree
  readonly key?: number | string;
  readonly label?: string;
  readonly children?: ModelTopMenuItem[];
  constructor({
    id = -1,
    name = '',
    route = '',
    items = [],
    isShow = true,
    viewMode = 'view',
    isNew = false
  }: Partial<ITopMenuItem> = {}) {
    this.id = this.key = id;
    this.name = name;
    this.route = route;
    this.isShow = isShow;
    this.viewMode = viewMode;
    this.isNew = isNew;
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
      isShow: this.isShow,
      viewMode: this.viewMode,
      isNew: this.isNew
    };
  }
  isNode(): boolean {
    return this.items.length > 0;
  }
}

function isArrayModelTopMenu(arr: ModelTopMenuItem[] | ITopMenuItem[]): arr is ModelTopMenuItem[] {
  return arr.length > 0 && arr[0] instanceof ModelTopMenuItem;
}
