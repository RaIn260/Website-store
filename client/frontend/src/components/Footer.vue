<template>
  <footer class="footer">

<div class="footer-container">

  <div class="footer-column">
    <h3>M-DROP</h3>

    <p>
      Эксклюзивный мерч ваших любимых артистов.
      Доставка по всему миру.
    </p>
  </div>

  <div class="footer-column">
    <h4>Контакты</h4>

    <p>📞 +375 (33) 601-71-21</p>
    <p>✉ support@m-drop.com</p>
  </div>

  <div class="footer-column">
    <h4>Социальные сети</h4>

    <a href="#">Instagram</a>
    <a href="#">Telegram</a>
    <a href="#">VK</a>
  </div>

  <div class="footer-column">
    <h4>Оплата</h4>

    <p>💳 Visa / MasterCard</p>
    <p>💳 Мир</p>
    <p>📱 Apple Pay</p>
    <p>📱 Google Pay</p>
    <p>💵 Наличкой</p>
  </div>

</div>

<div class="delivery">
  🚚 Доставка осуществляется в любую точку мира.
  Стоимость и сроки рассчитываются при оформлении заказа.
</div>

<div class="copyright">
  © 2026 M-DROP. Все права защищены.
</div>

  </footer>
</template>

<style scoped>

.footer {
  margin-top: 80px;
  background: #0b0b0b;
  border-top: 1px solid rgba(255, 0, 21, 0.2);
  padding: 50px 30px 20px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(220px, 1fr));

  gap: 40px;
}

.footer-column h3,
.footer-column h4 {
  color: #ff0015;
  margin-bottom: 15px;
}

.footer-column p,
.footer-column a {
  display: block;
  color: #aaa;
  text-decoration: none;
  margin-bottom: 10px;
  transition: .3s;
}

.footer-column a:hover {
  color: white;
}

.delivery {
  max-width: 1200px;
  margin: 40px auto 20px;

  text-align: center;
  color: #ddd;
  padding: 15px;

  border-top: 1px solid #222;
  border-bottom: 1px solid #222;
}

.copyright {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 20px;
}

</style>
