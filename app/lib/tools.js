/* Log message to console only if not in Production */
export function _DEBUG (...args) {
    if (process.env.NODE_ENV !== "production") {
    console.debug(...args);
    }
}
  
