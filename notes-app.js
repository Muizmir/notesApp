'use strict'

let books = getSavedNotes()

const filters = {
    searchText : '',
    sortBy : 'byEdited'
}

renderNotes(books,filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const iden = uuidv4()
    const timestamp = moment().valueOf()
    books.push({
        id : iden ,
        title : '' ,
        body : '',
        createdAt : timestamp,
        updatedAt : timestamp
    })
    localStorage.setItem('books', JSON.stringify(books))
    location.assign(`/edit.html#${iden}`)
})


document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value  
    renderNotes(books, filters) 
    console.log(filters.searchText)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(books, filters)    
})

window.addEventListener('storage', (e) => {
    if (e.key === 'books') {
        books = JSON.parse(e.newValue)
        renderNotes(books, filters)
    }
})


// const now = new Date('21 December 2008 2:45:09')
// console.log(now.getTime())
// console.log('Year : ' + now.getFullYear())
// console.log('Month : ' + now.getMonth())
// console.log('Day : ' + now.getDate())
// console.log('Hours : ' + now.getHours())
// console.log('Minutes : ' + now.getMinutes())
// console.log('Seconds : ' + now.getSeconds())

// const date1 = new Date('21 December 2017')
// const timestap1 = date1.getTime();
// console.log('Date1 : ' + timestap1)

// const date2 = new Date('21 March 2012')
// const timestap2 = date2.getTime();
// console.log('Date2 : ' + timestap2)

// if (timestap1 > timestap2){
//     console.log('Date 1 comes later than Date 2')
// }else{
//     console.log('Date 2 comes later than Date 1')
// }

// const now = new moment ()
// now.add(2, 'year').subtract(12, 'days')
// console.log(now.toString())
// console.log(now.minutes())
// console.log(now.format('MMMM Do, YYYY'))
// console,console.log(now.fromNow());
// console.log(now.valueOf())

// //set birthday
// const bday = new moment()
// bday.year(1990)
// bday.month(3)
// bday.date(17)
// console.log(bday.format('MMM DD, YYYY'))
