import { calculateHeaderGroupHeight } from '@theme/critical';
import { Component } from '@theme/component';
import { onDocumentLoaded, changeMetaThemeColor } from '@theme/utilities';

/**
 * @typedef {Object} HeaderComponentRefs
 * @property {HTMLDivElement} headerDrawerContainer - The header drawer container element
 * @property {HTMLElement} headerMenu - The header menu element
 * @property {HTMLElement} headerRowTop - The header top row element
 */

/**
 * @typedef {CustomEvent<{ minimumReached: boolean }>} OverflowMinimumEvent
 */

/**
 * A custom element that manages the site header.
 *
 * @extends {Component<HeaderComponentRefs>}
 */

class HeaderComponent extends Component {
  requiredRefs = ['headerDrawerContainer', 'headerMenu', 'headerRowTop'];

  /**
   * Width of window when header drawer was hidden
   * @type {number | null}
   */
  #menuDrawerHiddenWidth = null;

  /**
   * An intersection observer for monitoring sticky header position
   * @type {IntersectionObserver | null}
   */
  #intersectionObserver = null;

  /**
   * Whether the header has been scrolled offscreen, when sticky behavior is 'scroll-up'
   * @type {boolean}
   */
  #offscreen = false;

  /**
   * The last recorded scrollTop of the document, when sticky behavior is 'scroll-up
   * @type {number}
   */
  #lastScrollTop = 0;

  /**
   * A timeout to allow for hiding animation, when sticky behavior is 'scroll-up'
   * @type {number | null}
   */
  #timeout = null;

  /**
   * The duration to wait for hiding animation, when sticky behavior is 'scroll-up'
   * @constant {number}
   */
  #animationDelay = 300;

  /**
   * Keeps the global `--header-height` custom property up to date,
   * which other theme components can then consume
   */
  #resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry) return;

    const { height } = entry.target.getBoundingClientRect();
    document.body.style.setProperty('--header-height', `${height}px`);

    // Check if the menu drawer should be hidden in favor of the header menu
    if (this.#menuDrawerHiddenWidth && window.innerWidth > this.#menuDrawerHiddenWidth) {
      this.#updateMenuVisibility(false);
    }
  });

  /**
   * Observes the header while scrolling the viewport to track when its actively sticky
   * @param {Boolean} alwaysSticky - Determines if we need to observe when the header is offscreen
   */
  #observeStickyPosition = (alwaysSticky = true) => {
    if (this.#intersectionObserver) return;

    const config = {
      threshold: alwaysSticky ? 1 : 0,
    };

    this.#intersectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry) return;

      const { isIntersecting } = entry;

      if (alwaysSticky) {
        this.dataset.stickyState = isIntersecting ? 'inactive' : 'active';
        changeMetaThemeColor(this.refs.headerRowTop);
      } else {
        this.#offscreen = !isIntersecting || this.dataset.stickyState === 'active';
      }
    }, config);

    this.#intersectionObserver.observe(this);
  };

  /**
   * Handles the overflow minimum event from the header menu
   * @param {OverflowMinimumEvent} event
   */
  #handleOverflowMinimum = (event) => {
    this.#updateMenuVisibility(event.detail.minimumReached);
  };

  /**
   * Updates the visibility of the menu and drawer
   * @param {boolean} hideMenu - Whether to hide the menu and show the drawer
   */
  #updateMenuVisibility(hideMenu) {
    if (hideMenu) {
      this.refs.headerDrawerContainer.classList.remove('desktop:hidden');
      this.#menuDrawerHiddenWidth = window.innerWidth;
      this.refs.headerMenu.classList.add('hidden');
    } else {
      this.refs.headerDrawerContainer.classList.add('desktop:hidden');
      this.#menuDrawerHiddenWidth = null;
      this.refs.headerMenu.classList.remove('hidden');
    }
  }

  #lastScrollY = 0;
  #ticking = false;

  #handleWindowScroll = () => {
    if (!this.#ticking) {
      window.requestAnimationFrame(this.#updateHeadroom);
      this.#ticking = true;
    }
  };

  #updateHeadroom = () => {
    const currentScrollY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
    const scrollDelta = currentScrollY - this.#lastScrollY;
    const threshold = 8; // 8px threshold to prevent jitter
    const topTolerance = 10; // scrollY <= 10 always fully visible

    const isMenuOpen = document.body.classList.contains('menu-open') || 
                       document.body.classList.contains('avyah-megamenu-active') ||
                       Boolean(document.querySelector('.avyah-discover-li.open')) ||
                       Boolean(document.querySelector('.avyah-catalog-item:hover'));

    const headerElements = Array.from(document.querySelectorAll('#header-group, .header-section, #header-component, header-component'));

    if (currentScrollY <= topTolerance) {
      headerElements.forEach(el => {
        el.setAttribute('data-headroom-state', 'top');
        el.classList.remove('headroom--unpinned');
        el.classList.add('headroom--pinned', 'headroom--top');
      });
    } else if (Math.abs(scrollDelta) >= threshold) {
      if (scrollDelta > 0 && !isMenuOpen && currentScrollY > 60) {
        headerElements.forEach(el => {
          el.setAttribute('data-headroom-state', 'unpinned');
          el.classList.remove('headroom--pinned', 'headroom--top');
          el.classList.add('headroom--unpinned');
        });
      } else if (scrollDelta < 0) {
        headerElements.forEach(el => {
          el.setAttribute('data-headroom-state', 'pinned');
          el.classList.remove('headroom--unpinned', 'headroom--top');
          el.classList.add('headroom--pinned');
        });
      }
    }

    this.#lastScrollY = currentScrollY;
    this.#ticking = false;
  };

  connectedCallback() {
    super.connectedCallback();
    this.#resizeObserver.observe(this);
    this.addEventListener('overflowMinimum', this.#handleOverflowMinimum);

    document.addEventListener('scroll', this.#handleWindowScroll, { passive: true });
    this.#updateHeadroom();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.disconnect();
    this.#intersectionObserver?.disconnect();
    this.removeEventListener('overflowMinimum', this.#handleOverflowMinimum);
    document.removeEventListener('scroll', this.#handleWindowScroll);
    document.body.style.setProperty('--header-height', '0px');
  }
}

if (!customElements.get('header-component')) {
  customElements.define('header-component', HeaderComponent);
}

onDocumentLoaded(() => {
  const header = document.querySelector('#header-component');
  const headerGroup = document.querySelector('#header-group');

  // Update header group height on resize of any child
  if (headerGroup) {
    const resizeObserver = new ResizeObserver(() => calculateHeaderGroupHeight(header, headerGroup));

    // Observe all children of the header group
    const children = headerGroup.children;
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      if (element === header || !(element instanceof HTMLElement)) continue;
      resizeObserver.observe(element);
    }

    // Also observe the header group itself for child changes
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          // Re-observe all children when the list changes
          const children = headerGroup.children;
          for (let i = 0; i < children.length; i++) {
            const element = children[i];
            if (element === header || !(element instanceof HTMLElement)) continue;
            resizeObserver.observe(element);
          }
        }
      }
    });

    mutationObserver.observe(headerGroup, { childList: true });
  }
});
