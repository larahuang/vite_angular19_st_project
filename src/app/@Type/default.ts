export interface productsType{
  _id: string,
  name: string,
  quantity: number,
    price: number,
    image: string,
    content: string,
    category: string,
    createdTime: string,
    updatedTime: string,
}

export type SortColumn = keyof productsType | '';

export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

export interface pagePerOptionType{
    value: number,
    label:string
  }
