(doc => {
  doc.querySelector('.table-container').addEventListener(
    'click',
    event => {
      const { target } = event;
      const parent = target.closest('div');
      const dialogElement = parent.querySelector('dialog');
      const deactivateElement = parent.querySelector('input[type="radio"]:last-child');

      let result;
      if (/(?<!de)activate/.test(target.className)) {
        result = dialogElement.showModal();
      } else {
        result = dialogElement.close('close') || (deactivateElement.checked = true);
      }

      return result;
    },
    false
  );
})(document, globalThis);
