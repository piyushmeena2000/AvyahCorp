document.addEventListener('DOMContentLoaded', function () {
  const variantsJsonEl = document.getElementById('taakat-variants-json');
  if (!variantsJsonEl) return;

  let variants = [];
  try {
    variants = JSON.parse(variantsJsonEl.textContent);
  } catch (e) {
    console.error('Failed to parse Taakat variants', e);
    return;
  }

  // Find destination inside product info block
  // We want to insert our custom widget right below the product title/subtitle area
  const productDetailsEl = document.querySelector('.product-details .group-block');
  if (!productDetailsEl) return;

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
    let barsLabel = '20 Bars';
    let tagHtml = '';
    
    if (index === 0) {
      boxLabel = '1 BOX';
      barsLabel = '20 Bars';
    } else if (index === 1) {
      boxLabel = '2 BOXES';
      barsLabel = '40 Bars';
      tagHtml = '<span class="taakat-box-tag">10% OFF</span>';
    } else if (index === 2) {
      boxLabel = '3 BOXES';
      barsLabel = '60 Bars';
      tagHtml = '<span class="taakat-box-tag">POPULAR - 20% OFF</span>';
    }

    const priceFormatted = (variant.price / 100).toFixed(2);
    const perBarFormatted = (variant.price / 100 / (index === 0 ? 20 : index === 1 ? 40 : 60)).toFixed(2);

    boxCardsHtml += `
      <div class="taakat-box-card ${index === 0 ? 'active' : ''}" data-index="${index}" data-price="${variant.price}">
        ${tagHtml}
        <span class="taakat-box-title">${boxLabel}</span>
        <span class="taakat-box-bars">${barsLabel}</span>
        <span class="taakat-box-price">Rs. ${priceFormatted}</span>
        <span class="taakat-box-perbar">Rs. ${perBarFormatted}/Bar</span>
      </div>
    `;
  });

  // Full Widget Layout
  customWidget.innerHTML = `
    <span class="taakat-variant-label">Select Quantity:</span>
    <div class="taakat-box-grid">
      ${boxCardsHtml}
    </div>

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

    <button type="button" class="taakat-submit-btn">ADD TO CART - Rs. 0.00</button>
    <span class="taakat-shipping-note">⚡ FREE SHIPPING ON 2+ BOXES</span>

    <div class="taakat-badges-bar">
      <div class="taakat-badge-item">
        <span class="taakat-badge-icon">🌾</span>
        <span>Gluten Free</span>
      </div>
      <div class="taakat-badge-item">
        <span class="taakat-badge-icon">🌱</span>
        <span>Non GMO</span>
      </div>
      <div class="taakat-badge-item">
        <span class="taakat-badge-icon">🥛</span>
        <span>Soy Free</span>
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
  let purchaseType = 'onetime'; // 'onetime' or 'subscribe'

  function updatePricing() {
    const activeVariant = variants[activeIndex];
    if (!activeVariant) return;

    const basePrice = activeVariant.price / 100;
    const subPrice = basePrice * 0.9;

    document.getElementById('tpo-onetime-price').textContent = `Rs. ${basePrice.toFixed(2)}`;
    document.getElementById('tpo-sub-price').textContent = `Rs. ${subPrice.toFixed(2)}`;

    const finalPrice = purchaseType === 'subscribe' ? subPrice : basePrice;
    document.querySelector('.taakat-submit-btn').textContent = `ADD TO CART - Rs. ${finalPrice.toFixed(2)}`;
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
    // Find Shopify's real Add to Cart submit button and trigger click
    const realSubmitBtn = document.querySelector('.product-details form[action*="/cart/add"] [type="submit"], .product-details form[action*="/cart/add"] button[type="submit"], .product-details buy-buttons button');
    if (realSubmitBtn) {
      realSubmitBtn.click();
    } else {
      // Fallback: programmatic form submit
      const form = document.querySelector('.product-details form[action*="/cart/add"]');
      if (form) form.submit();
    }
  });

  function selectShopifyVariant(index) {
    // Attempt to check corresponding radio button in native widget
    const variantInputs = document.querySelectorAll('.product-details variant-picker input[type="radio"]');
    if (variantInputs.length > index) {
      variantInputs[index].click();
      variantInputs[index].checked = true;
      // Dispatch change event to notify theme JS
      variantInputs[index].dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Also select in standard option select fields if present
    const selectEl = document.querySelector('.product-details select[name="id"]');
    if (selectEl && selectEl.options.length > index) {
      selectEl.selectedIndex = index;
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // Initial update
  selectShopifyVariant(0);
  updatePricing();
});
