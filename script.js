const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const navbar = document.querySelector(".navbar");
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    navbar.classList.toggle("menu-open")
    if
        (navLinks.classList.contains("active")) {
        menuToggle.textContent = "x";
    } else {
        menuToggle.textContent = "☰";
    }
});
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
const hiddenElements = document.querySelectorAll(".card,.box");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

hiddenElements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1200);

});
const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.add("success");

        button.innerHTML = "✔ تمت الإضافة";

        setTimeout(() => {

            button.classList.remove("success");

            button.innerHTML = "🛒 أضف إلى السلة";

        }, 1000);

    });

});
let cartCount = 0;

const cartCounter = document.getElementById("cartCount");
console.log(cartCounter);
cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        cartCount++;

        cartCounter.textContent = cartCount;

    });

});
let cartItems = [];

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".card, .popular-card");

        const productName = card.querySelector("h3").textContent;

        const productPrice = card.querySelector(".price").textContent;

        const existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cartItems.push({

                name: productName,
                price: productPrice,
                quantity: 1

            });

        }

    });

});

const cartIcon = document.getElementById("cartIcon");
const cartModal = document.getElementById("cartModal");
const cartItemsDiv = document.getElementById("cartItems");
const closeCart = document.getElementById("closeCart");

cartIcon.addEventListener("click", () => {

    renderCart();

    cartModal.style.display = "flex";

});

closeCart.addEventListener("click", () => {

    cartModal.style.display = "none";

});
function renderCart() {

    cartItemsDiv.innerHTML = "";

    cartItems.forEach((item, index) => {

        cartItemsDiv.innerHTML += `

        <div class="cart-item">

            <strong>${item.name}</strong><br>

            <span>${item.price}</span>

            <div class="qty-box">

    <button class="minus" data-index="${index}">➖</button>

    <span>${item.quantity}</span>

    <button class="plus" data-index="${index}">➕</button>

    <button class="delete-item" data-index="${index}">🗑️</button>

</div>

        </div>

        `;

    });

    document.querySelectorAll(".plus").forEach(btn => {

        btn.addEventListener("click", () => {

            cartItems[btn.dataset.index].quantity++;

            renderCart();

        });

    });

    document.querySelectorAll(".minus").forEach(btn => {

        btn.addEventListener("click", () => {

            const i = btn.dataset.index;

            cartItems[i].quantity--;

            if (cartItems[i].quantity <= 0) {

                cartItems.splice(i, 1);

            }

            renderCart();

        });

    });
    document.querySelectorAll(".delete-item").forEach(btn => {

        btn.addEventListener("click", () => {

            cartItems.splice(btn.dataset.index, 1);

            cartCount--;

            if (cartCount < 0) {
                cartCount = 0;
            }

            cartCounter.textContent = cartCount;

            renderCart();

        });

    });
}
const sendWhatsApp = document.getElementById("sendWhatsApp");

sendWhatsApp.addEventListener("click", () => {

    let message = "☕ طلب جديد من ROZ Coffee\n\n";

    if (tableSection.style.display !== "none") {

        const tableNumber = document.getElementById("tableNumber").value;

        if (tableNumber === "") {

            alert("يرجى إدخال رقم الطاولة.");

            return;

        }

        message += "🍽️ نوع الطلب: داخل المقهى\n";
        message += "🪑 رقم الطاولة: " + tableNumber + "\n\n";

    } else {

        const customerName = document.getElementById("customerName").value;
        const customerPhone = document.getElementById("customerPhone").value;
        const customerAddress = document.getElementById("customerAddress").value;

        if (customerName === "" || customerPhone === "" || customerAddress === "") {

            alert("يرجى تعبئة جميع بيانات الديليفري.");

            return;

        }

        message += "🚗 نوع الطلب: ديليفري\n\n";

        message += "👤 الاسم: " + customerName + "\n";
        message += "📞 الهاتف: " + customerPhone + "\n";
        message += "📍 العنوان: " + customerAddress + "\n";

        if (userLocation !== "") {

            message += "🗺️ الموقع: " + userLocation + "\n";

        }

        message += "\n";

    }
    message += "🛒 الطلب:\n\n";

    cartItems.forEach(item => {

        message += `• ${item.name} × ${item.quantity}\n`;

    });

    const url = `https://wa.me/963991604765?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

});
const tableBtn = document.getElementById("tableBtn");
const deliveryBtn = document.getElementById("deliveryBtn");

const tableSection = document.getElementById("tableSection");
const deliverySection = document.getElementById("deliverySection");

tableBtn.addEventListener("click", () => {

    tableBtn.classList.add("active");
    deliveryBtn.classList.remove("active");

    tableSection.style.display = "block";
    deliverySection.style.display = "none";

});

deliveryBtn.addEventListener("click", () => {

    deliveryBtn.classList.add("active");
    tableBtn.classList.remove("active");

    tableSection.style.display = "none";
    deliverySection.style.display = "block";

});
let userLocation = "";

const getLocationBtn = document.getElementById("getLocation");
const locationStatus = document.getElementById("locationStatus");

getLocationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {

        alert("المتصفح لا يدعم تحديد الموقع.");

        return;

    }

    locationStatus.textContent = "⏳ جاري تحديد موقعك...";

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            userLocation = `https://maps.google.com/?q=${lat},${lng}`;

            locationStatus.textContent = "✅ تم تحديد موقعك بنجاح.";

        },

        () => {

            locationStatus.textContent = "❌ لم يتم السماح بالوصول للموقع.";

        }

    );

});