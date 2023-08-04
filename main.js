const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const textList = document.getElementById('textList');
const savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
for (const text of savedTexts) {
    addTextItem(text);
}
function addTextItem(text) {
    const newTextDiv = document.createElement('div');
    newTextDiv.className = 'text-item';
    const newText = document.createElement('span');
    newText.textContent = text;
    const editButton = document.createElement('button');
    editButton.textContent = 'تعديل';
    editButton.addEventListener('click', function () {
        const updatedText = prompt('يرجى تحديث النص:', text);
        if (updatedText !== null) {
            newText.textContent = updatedText;
            const index = savedTexts.indexOf(text);
            if (index > -1) {
                savedTexts[index] = updatedText;
                localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
            }
        }
    });
    const removeButton = document.createElement('button');
    removeButton.textContent = 'حذف';
    removeButton.addEventListener('click', function () {
        textList.removeChild(newTextDiv);
        const index = savedTexts.indexOf(text);
        if (index > -1) {
            savedTexts.splice(index, 1);
            localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
        }
    });
    const buttonsDiv = document.createElement('div');
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(removeButton);
    newTextDiv.appendChild(newText);
    newTextDiv.appendChild(buttonsDiv);
    textList.appendChild(newTextDiv);
}
function addText() {
    const text = textInput.value.trim();
    if (text !== '') {
        addTextItem(text);
        savedTexts.push(text);
        localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
        textInput.value = '';
    }
}
addButton.addEventListener('click', addText);
textInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addText();
    }
});