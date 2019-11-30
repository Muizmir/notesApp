'use strict'

// read existing nodes
const getSavedNotes = () => {
    const booksJSON = localStorage.getItem('books')
    try{
        return booksJSON ? JSON.parse(booksJSON) : []
    }catch(e) {
        return []
    }    
}

const removeNote = (noteID) => {
    const noteIndex = books.findIndex((note) =>  note.id === noteID)
    if (noteIndex > -1){
        books.splice (noteIndex, 1)
    }
}

const saveNotes = (books) => {
    localStorage.setItem('books', JSON.stringify(books))
}

// generate the DOM structure of a note
const generateNoteDom = (note) => {
    const noteEL = document.createElement('a')
    const textEL = document.createElement('p')
    const statusEL = document.createElement('p')
    //const button = document.createElement('button')
    //button.textContent = 'x'

    if (note.title.length > 0) {
        textEL.textContent = note.title
    }
    else {
        textEL.textContent = 'Unnamed Note'
    }

    textEL.classList.add('list-item__title')
    
    // noteEL.appendChild(button)
    // button.addEventListener('click', () => {
    //     removeNote(note.id)
    //     localStorage.setItem('books', JSON.stringify(books))
    //     renderNotes(books, filters)
    // })
    noteEL.appendChild(textEL)
    noteEL.setAttribute('href', `/edit.html#${note.id}`)
    noteEL.classList.add('list-item')

    statusEL.textContent = generateLastEdited(note.updatedAt)
    statusEL.classList.add('list-item__subtitle')
    noteEL.appendChild(statusEL)
    return noteEL
}

const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited'){
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }
            else if (a.updatedAt < b.updatedAt){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            }
            else if (a.createdAt < b.createdAt) {
                return 1
            }
            else {
                return 0
            }
        })
    }
    else if (sortBy === 'byAlphabet') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            }
            else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            }
            else {
                return 0
            }
        })
    }
    else {
        return notes
    }
    
}

// render application notes 
const renderNotes =  (notes, filters) => {
    const noteEL = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    noteEL.innerHTML = ''

    if (filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const el = generateNoteDom(note)
            noteEL.appendChild(el)
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        noteEL.appendChild(emptyMessage)
    }
    
}

const generateLastEdited = (time) => {
    return `Last edited ${moment(time).fromNow()}`
}