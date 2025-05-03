/**
 * Environment variables utility
 *
 * This file provides typed access to environment variables
 * and fallback values for development.
 */

export const env = {
  /**
   * API URL for backend services
   */
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
};
