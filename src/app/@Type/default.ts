export interface navbarType{
  title: string ,
  path: string,
  icon?:string|undefined,

}
export interface navListActiveType{
  isActive: boolean,
  pageTitle: string,
}
export interface productsType{
  _id: string,
  name: string,
  quantity: number,
    price: number,
    image: string,
    content: string,
    category: string,
    buildDate: number,
    updataDate: number,
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
export interface addShopListType {
  categoryId: string,
  category: string,
  productId:string,
  productName: string,
  productPrice: number,
  productQuantity: number,
  productSum: number,
 }
export interface orderListType {
  customerId: string,
  customerName:string,
  email: string,
  phone: string,
  city: string,
  town: string,
  add_detail: string,
  totalPrice: 246
  products: addShopListType[],
}
