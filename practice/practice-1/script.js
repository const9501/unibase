const validateInput = (inputEl) => {
	const setValid = (el) => {
		el.parentElement.classList.remove('invalid')
		if (el.name === 'file') {
			filePickerText.classList.remove('red')
		}
	}

	const setInvalid = (el) => {
		el.parentElement.classList.add('invalid')
		if (el.name === 'file') {
			filePickerText.classList.add('red')
		}
	}

	if (!inputEl.value) {
		setInvalid(inputEl)
	} else {
		const regName = /^[а-яА-ЯёЁa-zA-Z0-9\s]{1,35}$/
		const regPhone = /^\+?\d{8,15}$/
		const regEmail = /^([A-Za-z])([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

		switch (inputEl.name) {
			case 'name':
				if (regName.test(inputEl.value)) {
					setValid(inputEl)
				} else {
					setInvalid(inputEl)
				}
				break
			case 'phone':
				if (regPhone.test(inputEl.value)) {
					setValid(inputEl)
				} else {
					setInvalid(inputEl)
				}
				break
			case 'email':
				if (regEmail.test(inputEl.value)) {
					setValid(inputEl)
				} else {
					setInvalid(inputEl)
				}
				break
			case 'file':
				if (inputEl.value) {
					setValid(inputEl)
				} else {
					setInvalid(inputEl)
				}
				break
			case 'direction':
				if (inputEl.value) {
					setValid(inputEl)
				} else {
					setInvalid(inputEl)
				}
				break
		}
	}
}
const validateForm = (form) => {
	submitBtn.setAttribute('disabled', 'disabled')
	const elements = [...formInputs, select]
	let str = ''
	elements.forEach((el) => {
		if (el.parentElement.classList.contains('invalid') || el.value === '') {
			str += ' invalid'
		} else {
			str += ' valid'
		}
	})

	if (!str.includes('invalid')) {
		submitBtn.removeAttribute('disabled')
	} else {
		submitBtn.setAttribute('disabled', 'disabled')
	}
}

const form = document.querySelector('.form')
const formInputs = form.querySelectorAll('input[required]')
const submitBtn = form.querySelector('.submit-btn')
const select = document.querySelector('.select')
const filePickerText = document.querySelector('.file-input-container__text')


formInputs.forEach((el) => {
	el.addEventListener('input', () => {
		validateInput(el)
		validateForm(form)
	})
	el.addEventListener('blur', () => {
		validateInput(el)
		validateForm(form)
	})
})

select.addEventListener('input', () => {
	validateInput(select)
	validateForm(form)
})

select.addEventListener('blur', () => {
	validateInput(select)
	validateForm(form)
})

form.onsubmit = (event) => {
	event.preventDefault()
	alert('send')
}


//////////////////// FILE PICKER ////////////////////

const fileInput = document.querySelector('.file-input-container__input')
const img = document.querySelector('.file-input-container__preview-img')
const inputText = document.querySelector('.file-input-container__text-content')
const deleteImgBtn = document.querySelector('.delete-button')

fileInput.onchange = () => {
	const file = fileInput.files[0]
	const reader = new FileReader()

	reader.onload = event => {
		inputText.classList.add('d-none')
		img.classList.remove('d-none')
		img.src = event.target.result
	}
	reader.readAsDataURL(file)
}

deleteImgBtn.onclick = () => {
	inputText.classList.remove('d-none')
	img.classList.add('d-none')
	fileInput.value=''
	validateInput(fileInput)
	validateForm(form)
}

//////////////////// FILE PICKER ////////////////////


const openModalBtn = document.querySelector('.open-modal-btn')
const closeModalBtn = document.querySelector('.close-modal-btn')
const modalBody = document.querySelector('.modal-body')

openModalBtn.onclick = () => {
	modalBody.classList.add('open')
}

openModalBtn.onclick = () => {
	modalBody.classList.add('open')
	document.body.classList.remove('o-hidden')
}

closeModalBtn.onclick = (event) => {
	event.preventDefault()
	modalBody.classList.remove('open')
}

document.body.onclick = (event) => {
	if(event.target === document.body) {
		modalBody.classList.remove('open')
	}
}