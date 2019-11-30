'use strict'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#lastEdited')

const noteID = location.hash.substring(1,)
let books = getSavedNotes()
let note = books.find((el) => el.id === noteID)

if (note === undefined){
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(books)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(books)
})

removeElement.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(books)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) =>{
    if(e.key === 'books'){
        books = JSON.parse(e.newValue)
        let note = books.find((el) => el.id === noteID)

        if (note === undefined) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt)
    }
})
