export default function createModal(container) {
    const modalContent = document.createElement('div');
    modalContent.className = 'modal__content';

    const modalHeader = document.createElement('h1');
    modalHeader.className = 'modal__header';
    modalHeader.textContent = 'Выберите псевдоним';

    const modalFooter = document.createElement('form');
    modalFooter.className = 'modal__footer';

    const modalInput = document.createElement('input');
    modalInput.className = 'form__input';
    modalInput.name = 'login';
    modalInput.type = 'text';

    const modalButton = document.createElement('button');
    modalButton.className = 'modal__ok';
    modalButton.type = 'submit';
    modalButton.textContent = 'Продолжить';

    modalContent.append(modalHeader);
    modalContent.append(modalFooter);
    modalFooter.append(modalInput);
    modalFooter.append(modalButton);
    container.append(modalContent);
}