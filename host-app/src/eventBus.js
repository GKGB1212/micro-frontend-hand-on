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
  return () => window.removeEventListener(eventName, wrapped);
}
