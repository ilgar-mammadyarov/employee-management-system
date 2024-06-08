export interface Snackbar {
  type: SnackbarType;
  message: string;
}

export type SnackbarType = 'success' | 'fail';
