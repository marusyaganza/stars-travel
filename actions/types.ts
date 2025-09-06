export type ActionResponse<T = Record<string, string>> = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
  currentValues?: T;
};
