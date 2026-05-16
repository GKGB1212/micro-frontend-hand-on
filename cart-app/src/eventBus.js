// ===========================================
// EVENT BUS — Communication between MFEs
// ===========================================
// Wrapper quanh window CustomEvent API.
// Tất cả MFE dùng cùng window → 1 event bus duy nhất.
// ===========================================

export const EVENTS = {
  CART_ADD: "cart:add",
  CART_REMOVE: "cart:remove",
  CART_CLEAR: "cart:clear",
};

export function emit(eventName, payload) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
}

export function on(eventName, handler) {
  const wrapped = (e) => handler(e.detail);
  window.addEventListener(eventName, wrapped);
  // Trả về cleanup function (pattern phổ biến cho useEffect)
  return () => window.removeEventListener(eventName, wrapped);
}
