// ==UserScript==
// @name         Amazon – Archive Order
// @version      0.5
// @description  Re-Add Order Archiving back into Amazon.com
// @match        https://www.amazon.com/gp/css/order-history*
// @grant        none
// @updateURL    https://github.com/dannyvoid/amazon-archive-order-userscript/raw/main/archive_order.user.js
// @downloadURL  https://github.com/dannyvoid/amazon-archive-order-userscript/raw/main/archive_order.user.js
// ==/UserScript==

(function() {
  'use strict';

  function addArchive() {
    document
      .querySelectorAll('li.yohtmlc-order-level-connections')
      .forEach(li => {
        if (li.querySelector('.archive-order')) return;

        const detailsLink = li.querySelector('a[href*="order-details"]');
        if (!detailsLink) return;
        const params = new URLSearchParams(detailsLink.search);
        const orderId = params.get('orderID') || params.get('orderId');
        if (!orderId) return;

        const sep = document.createElement('i');
        sep.className = 'a-icon a-icon-text-separator';
        sep.setAttribute('role', 'img');

        const a = document.createElement('a');
        a.className = 'a-link-normal archive-order';
        a.href = `https://www.amazon.com/gp/css/order-history/archive/archiveModal.html?orderId=${orderId}`;
        a.textContent = 'Archive';
        a.target = '_blank';

        li.appendChild(sep);
        li.appendChild(a);
      });
  }

  window.addEventListener('load', addArchive);
  new MutationObserver(addArchive).observe(document.body, {
    childList: true,
    subtree: true
  });
})();
