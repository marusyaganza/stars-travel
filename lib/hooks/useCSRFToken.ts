import { useState, useEffect } from "react";

interface CSRFTokenResponse {
  token: string;
}

interface UseCSRFTokenReturn {
  csrfToken: string;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCSRFToken(): UseCSRFTokenReturn {
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCSRFToken = async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/csrf", { signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CSRFTokenResponse = await response.json();
      if (data.token) {
        setCsrfToken(data.token);
      } else {
        throw new Error("No CSRF token received");
      }
    } catch (err) {
      // Don't update state if the request was aborted
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch CSRF token";
      setError(errorMessage);
      console.error("Failed to fetch CSRF token:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    fetchCSRFToken(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    csrfToken,
    isLoading,
    error,
    refetch: () => fetchCSRFToken(),
  };
}
