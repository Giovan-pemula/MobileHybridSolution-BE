/**
 * Safely extract a route parameter as a string.
 * Express 5 params can be string | string[] | undefined.
 */
export function getParam(params: Record<string, any>, key: string): string {
  const val = params[key];
  if (Array.isArray(val)) return val[0] ?? '';
  return val ?? '';
}

/**
 * Safely extract a route parameter as an integer.
 */
export function getParamInt(params: Record<string, any>, key: string): number {
  return parseInt(getParam(params, key), 10);
}
