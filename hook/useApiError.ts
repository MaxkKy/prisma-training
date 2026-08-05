import axios from 'axios';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { AppError, type ApiErrorResponse } from '@/lib/error/AppError';
import { ERROR_MESSAGES } from '@/constants/errorMessages';

export const useApiError = () => {
  const handleError = useCallback((error: unknown) => {
    // 1) Known application error
    if (AppError.isAppError(error)) {
      const message = ERROR_MESSAGES[error.code] ?? error.message;
      toast.error(message);

      // Handle specific error codes
      if (error.code === 'UNAUTHORIZED') {
        // Redirect to login
      }
      return;
    }

    // 2) Axios error (ใช้ axios ตรงๆ จาก API ของเรา)
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as ApiErrorResponse | undefined;
      if (data?.code) {
        toast.error(ERROR_MESSAGES[data.code] ?? data.message);
        return;
      }

      const status = error.response?.status;

      if (status === 400) {
        toast.error(ERROR_MESSAGES.BAD_REQUEST);
        return;
      }
      if (status === 401) {
        toast.error(ERROR_MESSAGES.UNAUTHORIZED);
        return;
      }

      if (status === 403) {
        toast.error(ERROR_MESSAGES.FORBIDDEN);
        return;
      }

      if (status === 404) {
        toast.error(ERROR_MESSAGES.NOT_FOUND);
        return;
      }

      if (status === 429) {
        toast.error(ERROR_MESSAGES.RATE_LIMIT);
        return;
      }

      if (!error.response) {
        toast.error(ERROR_MESSAGES.NETWORK_ERROR);
        return;
      }
    }

    // 3) Unknown error
    console.error('Unhandled error:', error);
    toast.error(ERROR_MESSAGES.DEFAULT);
  }, []);

  return { handleError };
};