/*- b-more -*/
document.addEventListener('DOMContentLoaded', function () {
    const bMore = document.querySelector('.b-more');
    if (!bMore) return;

    const icon = bMore.querySelector('.b-more__icon');
    const dropdown = bMore.querySelector('.b-more__dropdown');

    if (!icon || !dropdown) return;

    icon.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
        if (!bMore.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
});

/*- b-widget -*/
document.querySelectorAll('.b-widget').forEach(widget => {
    const toggleLink = widget.querySelector('.b-show-link');
    const content = widget.querySelector('.b-widget__content');

    if (toggleLink && content) {
        toggleLink.addEventListener('click', () => {
            const isOpen = !content.classList.contains('hidden');

            toggleLink.classList.toggle('close', isOpen);
            toggleLink.textContent = isOpen ? 'Show more' : 'Show less';
            content.classList.toggle('hidden', isOpen);
        });
    }
});

/*- select -*/
document.addEventListener("DOMContentLoaded", () => {
    const allSelects = document.querySelectorAll(".select");

    if (!allSelects.length) return;

    function closeAll(event) {
        allSelects.forEach(select => {
            if (!select.contains(event.target)) {
                select.classList.remove("open");
                const dropdown = select.querySelector(".select__dropdown");
                const selectText = select.querySelector(".select__text");
                if (dropdown) dropdown.classList.remove("show");
                if (selectText) selectText.classList.remove("open");
            }
        });
    }

    allSelects.forEach(select => {
        const selectText = select.querySelector(".select__text");
        const dropdown = select.querySelector(".select__dropdown");
        const listItems = select.querySelectorAll(".select__dropdown li");
        const input = select.querySelector("input[type='text']");
        const placeholderText = select.querySelector(".select__placeholder-text");

        if (!selectText || !dropdown || !input || !listItems.length) return;

        if (input.value) {
            const matchedItem = Array.from(listItems).find(item => item.textContent.trim() === input.value.trim());

            if (matchedItem) {
                listItems.forEach(li => li.classList.remove("active"));
                matchedItem.classList.add("active");

                selectText.textContent = matchedItem.textContent;

                if (placeholderText) {
                    placeholderText.classList.add("hidden");
                }

                select.classList.add("selected");
            }
        } else {
            input.value = selectText.textContent;
        }

        selectText.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = select.classList.contains("open");
            closeAll(event);
            select.classList.toggle("open", !isOpen);
            selectText.classList.toggle("open", !isOpen);
            dropdown.classList.toggle("show", !isOpen);
        });

        listItems.forEach(item => {
            item.addEventListener("click", (event) => {
                event.stopPropagation();
                listItems.forEach(li => li.classList.remove("active"));
                item.classList.add("active");

                selectText.textContent = item.textContent;
                input.value = item.textContent;

                if (placeholderText) {
                    placeholderText.classList.add("hidden");
                }

                select.classList.add("selected");

                select.classList.remove("open");
                dropdown.classList.remove("show");
            });
        });
    });

    document.addEventListener("click", closeAll);
});

/*- vertical-scroll -*/
var swiper = new Swiper(".vertical-scroll", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    mousewheel: true,
});

/*- b-activity -*/
document.addEventListener("DOMContentLoaded", function () {
    const activityBlock = document.querySelector(".b-activity");
    if (!activityBlock) return;

    const listItems = activityBlock.querySelectorAll(".b-activity__list li");
    const moreLink = activityBlock.querySelector(".b-more-link");
    const initiallyVisibleCount = 4;

    if (!listItems.length || !moreLink) return;

    function hideExtraItems() {
        listItems.forEach((li, index) => {
            if (index >= initiallyVisibleCount) {
                li.classList.add("hidden");
            } else {
                li.classList.remove("hidden");
            }
        });
        moreLink.classList.remove("open");
        moreLink.textContent = "Show more";
    }

    function showAllItems() {
        listItems.forEach(li => li.classList.remove("hidden"));
        moreLink.classList.add("open");
        moreLink.textContent = "Show less";
    }

    hideExtraItems();

    moreLink.addEventListener("click", function () {
        const isExpanded = moreLink.classList.contains("open");
        if (isExpanded) {
            hideExtraItems();
        } else {
            showAllItems();
        }
    });
});

/*- input-file -*/
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.input-file').forEach(docFileContainer => {
        const fileInput = docFileContainer.querySelector('.input-file__field');
        const fileText = docFileContainer.querySelector('.input-file__text');
        const errorText = docFileContainer.querySelector('.input-file__error-text');

        if (fileInput && fileText && errorText) {
            const allowedExtensions = ['docx', 'xlsx'];

            fileInput.addEventListener('change', () => {
                if (fileInput.files.length > 0) {
                    const fileName = fileInput.files[0].name;
                    const fileExtension = fileName.split('.').pop().toLowerCase();

                    if (allowedExtensions.includes(fileExtension)) {
                        fileText.textContent = fileName;
                        fileText.classList.remove('hidden');
                        errorText.classList.remove('show');
                    } else {
                        fileText.classList.add('hidden');
                        errorText.classList.add('show');
                    }
                } else {
                    fileText.textContent = 'Выбрать файл';
                    fileText.classList.remove('hidden');
                    errorText.classList.remove('show');
                }
            });
        }
    });
});

/*- email-input -*/
document.addEventListener("DOMContentLoaded", () => {
  const emailInputs = document.querySelectorAll(".email-input");

  if (!emailInputs.length) return;

  emailInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const prevValue = input.value;
      input.value = prevValue.replace(/[а-яА-ЯёЁ]/g, "");

      if (prevValue !== input.value) {
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });
  });
});

/*- input-field -*/
document.querySelectorAll('.input-field').forEach(field => {
    const input = field.querySelector('input');
    const counterSpan = field.querySelector('.input-field__text span');
    const maxLength = 80;

    if (!input || !counterSpan) return;

    input.maxLength = maxLength;

    input.addEventListener('input', () => {
        if (input.value.length > maxLength) {
            input.value = input.value.slice(0, maxLength);
        }

        counterSpan.textContent = `${input.value.length}/${maxLength}`;
    });
});

/*- textarea-field -*/
document.querySelectorAll('.textarea-field').forEach(field => {
    const textarea = field.querySelector('textarea');
    const counterSpan = field.querySelector('.textarea-field__text span');
    const maxLength = 500;

    if (!textarea || !counterSpan) return;

    textarea.maxLength = maxLength;

    textarea.addEventListener('input', () => {
        if (textarea.value.length > maxLength) {
            textarea.value = textarea.value.slice(0, maxLength);
        }
        counterSpan.textContent = `${textarea.value.length}/${maxLength}`;
    });
});