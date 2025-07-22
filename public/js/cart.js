export function getCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

export function saveCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  updateCartCount();
}

export function agregarAlCarrito(producto) {
  const carrito = getCarrito();
  const existente = carrito.find(p => p.slug === producto.slug);

  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  saveCarrito(carrito);
  showToast(`✅ "${producto.name}" agregado al carrito`);
}

export function eliminarDelCarrito(slug) {
  const carrito = getCarrito();
  const nuevoCarrito = carrito.filter(p => p.slug !== slug);
  saveCarrito(nuevoCarrito);
}

export function updateCartCount() {
  const count = document.getElementById('cart-count');
  if (count) {
    const carrito = getCarrito();
    const total = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
    count.textContent = total;
  }
}

function showToast(mensaje) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = mensaje;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

if (!document.getElementById('toast-style')) {
  const style = document.createElement('style');
  style.id = 'toast-style';
  style.textContent = `
    .toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100%);
      background: #4e4e4eff;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 1rem;
      font-weight: bold;
      opacity: 0;
      transition: all 0.4s ease;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
}


