export interface HttpSuccessResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}
