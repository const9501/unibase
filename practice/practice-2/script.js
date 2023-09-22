const URL = 'https://jsonplaceholder.typicode.com/posts'

const tBody = document.getElementsByTagName('tbody')[0]
const table = document.getElementsByTagName('table')[0]

let posts = []
let filteredPosts = []

const getData = async () => {
	try {
		const res = await fetch(URL)
		if (!res.ok) {
			printError()
			document.querySelector('.loader').classList.add('d-none')
		}
		return await res.json()
	} catch (e) {
		printError()
		document.querySelector('.loader').classList.add('d-none')
	}

}

const rowTemplate = (post, index) => {
	return ` <tr>
    <td>${post.id}</td>
    <td>${post.userId}</td>
    <td>${post.title}</td>
    <td>${post.body}</td>
  </tr>`
}

getData()
	.then(data => {
		if (data) {

			posts = []

			data.forEach(post => {
				posts.push(post)
			})

			renderPosts(posts)
			document.querySelector('.loader').classList.add('d-none')
			table.classList.remove('d-none')
		}
	})


const renderPosts = (data = []) => {
	data.forEach((post, index) => {
		tBody.insertAdjacentHTML('beforeend', rowTemplate(post, index))
	})
}

const sortPostsByStr = (col, direction = 1) => {

	if (filteredPosts.length) {
		filteredPosts.sort((a, b) => a[col].localeCompare(b[col]))
		return direction === 1 ? filteredPosts : filteredPosts.reverse()
	} else {
		posts.sort((a, b) => a[col].localeCompare(b[col]))
		return direction === 1 ? posts : posts.reverse()
	}

}
const sortPostsByNumber = (col, direction = 1) => {
	if (filteredPosts.length) {
		filteredPosts.sort((a, b) => a[col] - b[col])
		return direction === 1 ? filteredPosts : filteredPosts.reverse()
	} else {
		posts.sort((a, b) => a[col] - b[col])
		return direction === 1 ? posts : posts.reverse()
	}
}

const printError = () => {
	const error = (
		'<div class="error">\n' +
		'  <img src="assets/errorIcon.png" class="error-icon">\n' +
		'  <span class="error__message">Failed to load posts, something went wrong</span>\n' +
		'</div>'
	)
	document.body.insertAdjacentHTML('beforeend', error)
}

const removeRows = () => {
	const rows = Array.from(tBody.children)

	rows.forEach(item => {
		item.remove()
	})
}


const indexSortBtn = document.querySelector('.id')
const userIdSortBtn = document.querySelector('.user-id')
const titleSortBtn = document.querySelector('.title')
const bodySortBtn = document.querySelector('.body')

let sortByIdDirection = -1
let sortByUserIdDirection = -1
let sortByTitleDirection = -1
let sortByBodyDirection = -1

indexSortBtn.onclick = () => {
	sortByIdDirection *= -1
	removeRows()
	renderPosts(sortPostsByNumber('id', sortByIdDirection))
}

userIdSortBtn.onclick = () => {
	sortByUserIdDirection *= -1
	removeRows()
	renderPosts(sortPostsByNumber('userId', sortByUserIdDirection))
}
titleSortBtn.onclick = () => {
	sortByTitleDirection *= -1
	removeRows()
	renderPosts(sortPostsByStr('title', sortByTitleDirection))
}

bodySortBtn.onclick = () => {
	sortByBodyDirection *= -1
	removeRows()
	renderPosts(sortPostsByStr('body', sortByBodyDirection))
}


const searchInput = document.querySelector('.search-input')

searchInput.oninput = (event) => {

	const str = event.target.value.toLocaleLowerCase()

	if (str.length >= 3) {
		filteredPosts = posts.filter(post => {
			if (post.title.toLocaleLowerCase().includes(str) || post.body.toLocaleLowerCase().includes(str)) {
				return post
			}
		})

		removeRows()
		renderPosts(filteredPosts)
	}


	if (str === '') {
		filteredPosts = []
		removeRows()
		renderPosts(posts)
	}
}


