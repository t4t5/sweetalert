const useCases = [
  {
    text: "success messages",
    className: 'success',
  },
  {
    text: "error messages",
    className: 'error',
  },
  {
    text: "warning modals",
    className: 'warning',
  },
];

let currentIndex = 0;

const initRotater = () => {
  updateUseCase(true);
  setInterval(updateUseCase, 4000); 
}

const updateUseCase = (isInitial) => {
  const useCase = useCases[currentIndex];
  const nextUseCase = useCases[getNextIndex()];

  updateText(useCase, nextUseCase);
  updateModal(useCase, nextUseCase, isInitial);

  currentIndex = getNextIndex();
}

const updateModal = (useCase, nextUseCase, isInitial) => {
  const { className } = useCase;

  const contentOverlayEl = document.querySelector('.modal-content-overlay');

  if (!contentOverlayEl) return;

  if (!isInitial) {
    contentOverlayEl.classList.add('show');
  }

  const modalEl = document.querySelector('.swal-modal-example');

  modalEl.dataset.type = className;

  const contentEls = document.querySelectorAll('.example-content');

  setTimeout(() => {
    contentEls.forEach(contentEl => {
      if (contentEl.classList.contains(className)) {
        contentEl.classList.add('show');
      } else {
        contentEl.classList.remove('show');
      }
    });

    contentOverlayEl.classList.remove('show');
  }, 500);
}

const updateText = (useCase, nextUseCase) => {
  const { text } = useCase;
  const { text: nextText } = nextUseCase;

  const rotatorEl = document.querySelector('.text-rotater');

  if (!rotatorEl) return;

  rotatorEl.classList.add('slide-up');

  setTimeout(() => {
    rotatorEl.innerHTML = `
      <span>${text}</span>
      <span>${nextText}</span>
    `;
    rotatorEl.classList.remove('slide-up');
  }, 2000);

}

const getNextIndex = () => {
  if (useCases[currentIndex + 1]) {
    return currentIndex + 1;
  } else {
    return 0;
  }
}

export default initRotater();

