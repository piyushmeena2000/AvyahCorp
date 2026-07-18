(function() {
  function startPolling() {
    if (!window.location.pathname.includes('/products/sugar-free')) return;
    
    // Immediately apply body class so that CSS styling activates as early as possible
    document.body.classList.add('taakat-sugar-free-product-page');

    let attempts = 0;
    const maxAttempts = 100; // 5 seconds total (100 * 50ms)
    
    const interval = setInterval(function() {
      attempts++;
      const variantsJsonEl = document.getElementById('taakat-variants-json');
      const productDetailsEl = document.querySelector('.product-details .group-block');
      
      if (variantsJsonEl && productDetailsEl) {
        clearInterval(interval);
        initTaakatCustom(variantsJsonEl, productDetailsEl);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.warn('Taakat custom script timed out waiting for DOM elements.');
      }
    }, 50);
  }

  function initTaakatCustom(variantsJsonEl, productDetailsEl) {
    if (window.taakatCustomInitialized) return;
    window.taakatCustomInitialized = true;

    let variants = [];
    try {
      variants = JSON.parse(variantsJsonEl.textContent);
    } catch (e) {
      console.error('Failed to parse Taakat variants', e);
      return;
    }

    // Let's locate the standard title block to place subtitle right under it
    const titleBlock = productDetailsEl.querySelector('h1, h2, h3, .view-product-title');
    if (titleBlock) {
      const subtitle = document.createElement('span');
      subtitle.className = 'taakat-subtitle-badge';
      subtitle.textContent = 'FULL SIZE • 5G PROTEIN • 20+ SUPERFOODS';
      titleBlock.parentNode.insertBefore(subtitle, titleBlock.nextSibling);
    }

    // Create our main custom widget container
    const customWidget = document.createElement('div');
    customWidget.className = 'taakat-custom-widget';

    // Box grid html
    let boxCardsHtml = '';
    variants.forEach((variant, index) => {
      let boxLabel = '1 BOX';
      let discountLabel = '';
      let popularBadge = '';
      let discountMultiplier = 1.0;
      
      if (index === 0) {
        boxLabel = '1 BOX';
      } else if (index === 1) {
        boxLabel = '2 BOXES';
        discountLabel = '<span class="taakat-box-discount-label">10% OFF</span>';
        discountMultiplier = 0.9;
      } else if (index === 2) {
        boxLabel = '3 BOXES';
        discountLabel = '<span class="taakat-box-discount-label">20% OFF</span>';
        popularBadge = '<span class="taakat-popular-badge">POPULAR</span>';
        discountMultiplier = 0.8;
      }

      const priceRaw = variant.price;
      const finalPrice = priceRaw * discountMultiplier;
      const priceFormatted = (finalPrice / 100).toFixed(2);
      const barsCount = index === 0 ? 20 : index === 1 ? 40 : 60;
      const perBarFormatted = (finalPrice / 100 / barsCount).toFixed(2);

      boxCardsHtml += `
        <div class="taakat-box-card ${index === 0 ? 'active' : ''}" data-index="${index}" data-price="${variant.price}">
          ${discountLabel}
          <span class="taakat-box-title">${boxLabel}</span>
          <span class="taakat-box-price">Rs. ${priceFormatted}</span>
          <span class="taakat-box-perbar">Rs. ${perBarFormatted}/Bar</span>
          ${popularBadge}
        </div>
      `;
    });

    // Full Widget Layout (Adding Flavor, Size, Subscribe, Buttons)
    customWidget.innerHTML = `
      <!-- Flavor Selector Mockup -->
      <div class="taakat-flavor-section">
        <span class="taakat-flavor-label">Flavor:</span>
        <div class="taakat-flavor-dropdown">
          <div class="taakat-flavor-dropdown-left">
            <span class="tfd-dot"></span>
            <span>Taakat Hunger Bar | Sugarfree</span>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      <!-- Quantity Box Selector -->
      <span class="taakat-variant-label">Quantity:</span>
      <div class="taakat-box-grid">
        ${boxCardsHtml}
      </div>

      <!-- Size Pill Selector -->
      <div class="taakat-size-section">
        <span class="taakat-variant-label">Size:</span>
        <span class="taakat-size-pill" id="taakat-size-display-pill">20 BARS</span>
      </div>

      <!-- Purchase Switcher -->
      <div class="taakat-purchase-options">
        <div class="taakat-purchase-option active" data-type="onetime">
          <div class="tpo-left">
            <span class="tpo-radio"></span>
            <span class="tpo-label">One-Time Purchase</span>
          </div>
          <span class="tpo-price" id="tpo-onetime-price">Rs. 0.00</span>
        </div>
        <div class="taakat-purchase-option" data-type="subscribe">
          <div class="tpo-left">
            <span class="tpo-radio"></span>
            <span class="tpo-label">Subscribe & Save 10%</span>
          </div>
          <span class="tpo-price" id="tpo-sub-price">Rs. 0.00</span>
        </div>
      </div>

      <!-- Submit Add to Cart Button -->
      <button type="button" class="taakat-submit-btn">ADD TO CART - Rs. 0.00</button>
      <span class="taakat-shipping-note">⚡ FREE SHIPPING ON ORDERS WITH 2+ BOXES</span>

      <!-- Badge bar -->
      <div class="taakat-badges-bar">
        <div class="taakat-badge-item">
          <span class="taakat-badge-icon">🌾</span>
          <span>Soy Free</span>
        </div>
        <div class="taakat-badge-item">
          <span class="taakat-badge-icon">🌱</span>
          <span>Non GMO</span>
        </div>
        <div class="taakat-badge-item">
          <span class="taakat-badge-icon">🥛</span>
          <span>Gluten Free</span>
        </div>
      </div>
    `;

    // Find where to insert in details section (before accordion or descriptive texts)
    const accordionEl = productDetailsEl.querySelector('accordion, .accordion, [data-testid="product-information-details"] > div');
    if (accordionEl) {
      productDetailsEl.insertBefore(customWidget, accordionEl);
    } else {
      productDetailsEl.appendChild(customWidget);
    }

    // State
    let activeIndex = 0;
    let purchaseType = 'onetime';

    function updatePricing() {
      const activeVariant = variants[activeIndex];
      if (!activeVariant) return;

      let discountMultiplier = 1.0;
      if (activeIndex === 1) discountMultiplier = 0.9;
      else if (activeIndex === 2) discountMultiplier = 0.8;

      const basePrice = (activeVariant.price * discountMultiplier) / 100;
      const subPrice = basePrice * 0.9;

      document.getElementById('tpo-onetime-price').textContent = `Rs. ${basePrice.toFixed(2)}`;
      document.getElementById('tpo-sub-price').textContent = `Rs. ${subPrice.toFixed(2)}`;

      const finalPrice = purchaseType === 'subscribe' ? subPrice : basePrice;
      document.querySelector('.taakat-submit-btn').textContent = `ADD TO CART - Rs. ${finalPrice.toFixed(2)}`;

      // Update Size Pill
      const sizePillText = activeIndex === 0 ? '20 BARS' : activeIndex === 1 ? '40 BARS' : '60 BARS';
      document.getElementById('taakat-size-display-pill').textContent = sizePillText;
    }

    // Listeners
    customWidget.querySelectorAll('.taakat-box-card').forEach(card => {
      card.addEventListener('click', function () {
        customWidget.querySelectorAll('.taakat-box-card').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        activeIndex = parseInt(this.dataset.index);

        // Select actual shopify option
        selectShopifyVariant(activeIndex);
        updatePricing();
      });
    });

    customWidget.querySelectorAll('.taakat-purchase-option').forEach(option => {
      option.addEventListener('click', function () {
        customWidget.querySelectorAll('.taakat-purchase-option').forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        purchaseType = this.dataset.type;
        updatePricing();
      });
    });

    // Add to Cart submission intercept
    customWidget.querySelector('.taakat-submit-btn').addEventListener('click', function () {
      const realSubmitBtn = document.querySelector('.product-details form[action*="/cart/add"] [type="submit"], .product-details form[action*="/cart/add"] button[type="submit"], .product-details buy-buttons button');
      if (realSubmitBtn) {
        realSubmitBtn.click();
      } else {
        const form = document.querySelector('.product-details form[action*="/cart/add"]');
        if (form) form.submit();
      }
    });

    function selectShopifyVariant(index) {
      const variantInputs = document.querySelectorAll('.product-details variant-picker input[type="radio"]');
      if (variantInputs.length > index) {
        variantInputs[index].click();
        variantInputs[index].checked = true;
        variantInputs[index].dispatchEvent(new Event('change', { bubbles: true }));
      }

      const selectEl = document.querySelector('.product-details select[name="id"]');
      if (selectEl && selectEl.options.length > index) {
        selectEl.selectedIndex = index;
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    // Initial update
    selectShopifyVariant(0);
    updatePricing();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startPolling);
  } else {
    startPolling();
  }

  document.addEventListener('shopify:section:load', function() {
    window.taakatCustomInitialized = false;
    startPolling();
  });
})();
