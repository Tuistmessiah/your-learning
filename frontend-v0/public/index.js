console.log("My script is running!")

const button = document.getElementById('add-item-btn');

console.log(button)

button.addEventListener('click', () => {
    console.log('I clicked my button, yeahhhh!')
});

const myElement = document.getElementsByClassName('my-row');
console.log(myElement)
document.firstChild(myElement)
document.querySelector('.button')
fetch('http://localhost:3001/authors')
    .then((result => {
        return result.json()
    }))
    .then((realResult) => {
        console.log(realResult)
        const ourTable = document.getElementById('our-table');

        for(let i = 0; i < realResult.length; i++) {
            const newRow = document.createElement('tr');
            const newCellName = document.createElement('td');
            newCellName.textContent = realResult[i].au_fname;
            const newCellLastName = document.createElement('td');
            newCellLastName.textContent = realResult[i].au_lname;
            newRow.appendChild(newCellName);
            newRow.appendChild(newCellLastName);
            ourTable.appendChild(newRow);
        }


    });