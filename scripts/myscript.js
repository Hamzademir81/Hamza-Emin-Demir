document.addEventListener('DOMContentLoaded', () => {
    
    // SEPETE EKLEME İŞLEMİ (Ana Sayfa ve Ürünler Sayfası İçin)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Güncel sepeti her seferinde localStorage'dan çek
                let cart = JSON.parse(localStorage.getItem('minimalHomeCart')) || [];
                
                const product = {
                    id: button.getAttribute('data-id'),
                    name: button.getAttribute('data-name'),
                    price: parseFloat(button.getAttribute('data-price')),
                    img: button.getAttribute('data-img'),
                    quantity: 1
                };

                const existingProduct = cart.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push(product);
                }

                localStorage.setItem('minimalHomeCart', JSON.stringify(cart));
                alert(`${product.name} sepete eklendi!`);
            });
        });
    }

    // SEPET SAYFASI: Ürünleri Ekrana Yazdırma
    const cartContainer = document.getElementById('cart-container');
    
    if (cartContainer) {
        renderCart();
    }

    function renderCart() {
        // Her render işleminde güncel sepeti al
        let cart = JSON.parse(localStorage.getItem('minimalHomeCart')) || [];
        cartContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<div style="text-align:center; padding:30px; border:1px dashed #ccc;">Şu an sepetinizde ürün bulunmamaktadır.</div>';
            return;
        }

        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalPrice += item.price * item.quantity;
            
            const cartItemHTML = `
                <div class="cart-item" style="display: flex; border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-bottom:15px; align-items: center; justify-content: space-between;">
                    <div style="display:flex; align-items:center; gap:15px;">
                        <img src="../img/${item.img}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
                        <div class="item-info">
                            <h3 style="margin:0 0 5px 0;">${item.name}</h3>
                            <p style="margin:0; color:#555;">₺${item.price} (Adet: ${item.quantity})</p>
                        </div>
                    </div>
                    <button class="btn btn-secondary remove-btn" data-index="${index}">Sepetten Kaldır</button>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        cartContainer.insertAdjacentHTML('beforeend', `<div style="text-align: right; padding: 20px 0; border-top: 2px solid #333;"><h2>Genel Toplam: ₺${totalPrice}</h2></div>`);

        // Kaldır butonlarını dinle
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                let cart = JSON.parse(localStorage.getItem('minimalHomeCart')) || [];
                const itemIndex = e.target.getAttribute('data-index');
                
                cart.splice(itemIndex, 1); // Diziden sil
                localStorage.setItem('minimalHomeCart', JSON.stringify(cart)); // Güncel hafıza
                renderCart(); // Sayfayı tekrar çiz
            });
        });
    }
});