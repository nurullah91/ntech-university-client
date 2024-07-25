export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  error?: TError;
};
