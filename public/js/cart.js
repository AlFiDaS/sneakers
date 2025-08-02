// cart.js actualizado para manejar productos con cantidad y talle

export function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

export function saveCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  updateCartCount();
}

export function agregarAlCarrito(producto) {
  let carrito = getCarrito();

  // buscar coincidencia por slug y name (puede incluir talla si lo agregaste al nombre)
  const index = carrito.findIndex(
    (p) => p.slug === producto.slug && p.name === producto.name
  );

  if (index !== -1) {
    carrito[index].cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  saveCarrito(carrito);
  mostrarToast(`${producto.name} agregado al carrito 🛒`);
}

export function updateCartCount() {
  const carrito = getCarrito();
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  const badgeDesktop = document.getElementById("cart-count");
  const badgeMobile = document.getElementById("cart-count-mobile");

  if (badgeDesktop) badgeDesktop.textContent = total;
  if (badgeMobile) badgeMobile.textContent = total;
}

function mostrarToast(mensaje) {
  const toast = document.createElement("div");
  toast.textContent = mensaje;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: black;
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = 1;
  });
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}
