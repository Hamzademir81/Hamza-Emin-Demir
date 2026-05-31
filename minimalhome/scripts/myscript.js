const products = [
  { id: 1, name: 'Ahşap Duvar Rafı', price: 350 },
  { id: 2, name: 'Seramik Vazo', price: 220 },
  { id: 3, name: 'Minimal Abajur', price: 480 }
];

function getCart() {
  const cartJSON = localStorage.getItem('minimalhome_cart');
  return cartJSON ? JSON.parse(cartJSON) : [];
}

function saveCart(cart) {
  localStorage.setItem('minimalhome_cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  alert('Ürün sepete eklendi.');
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', function () {
    const id = parseInt(this.getAttribute('data-id'), 10);
    addToCart(id);
  });
});

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  if (!cartItemsContainer || !cartTotalElement) {
    return;
  }

  const cart = getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Sepetiniz şu anda boş.</p>';
    cartTotalElement.textContent = '₺0';
    return;
  }

  let total = 0;
  let html = '<table class="cart-table"><thead><tr><th>Ürün Adı</th><th>Fiyat</th><th>Adet</th><th>Toplam</th><th>İşlem</th></tr></thead><tbody>';

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      const lineTotal = product.price * item.quantity;
      total += lineTotal;
      html += `<tr>
        <td>${product.name}</td>
        <td>₺${product.price}</td>
        <td>${item.quantity}</td>
        <td>₺${lineTotal}</td>
        <td><button class="btn btn-delete" onclick="removeFromCart(${product.id})">Sil</button></td>
      </tr>`;
    }
  });

  html += '</tbody></table>';

  cartItemsContainer.innerHTML = html;
  cartTotalElement.textContent = '₺' + total;
}

renderCart();

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    formMessage.textContent = 'Teşekkürler! Mesajınız Hamza Emin Demir\'e iletildi.';
    formMessage.style.display = 'block';

    contactForm.reset();

    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 3000);
  });
}
