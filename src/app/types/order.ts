export default interface Order {
  id: string;
  orderNo: string;
  productId: string;
  quantity: number;
  salePrice: number;
  discount: number;
  totalAmount: number;
}
