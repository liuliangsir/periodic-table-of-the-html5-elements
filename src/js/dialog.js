(doc => {
  doc.querySelector('.table-container').addEventListener(
    'click',
    ({ target }) => {
      const parent = target.closest('div');
      const dialogElement = parent.querySelector('dialog');
      const deactivateElement = parent.querySelector('input[type="radio"]:last-child');

      let result;
      if (/(?<!de)activate/.test(target.className)) {
        dialogElement.style.cssText = `margin: initial;min-height: ${doc.body.scrollHeight}px;`;

        result = dialogElement.showModal();
      } else {
        dialogElement.removeAttribute('style');

        result = dialogElement.close('close') || (deactivateElement.checked = true);
      }

      return result;
    },
    false
  );
})(document, globalThis);
