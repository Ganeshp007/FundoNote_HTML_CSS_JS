window.addEventListener('DOMContentLoaded', () => {

    console.log("=> Connected to Dashboard.js");
    let token = localStorage.getItem('token');
    getAllNotes();

    let navbar = document.querySelector(".side-navbar");
    let btn = document.querySelector('#btn');

    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let bgcolor = 'Blue';

    console.log(title.value);

    let createnote = document.querySelector('.create-note');
    let closebtn = document.querySelector('.close-btn');
    let oncreate=document.querySelector('.create1');
    let desc=document.querySelector('.create2');

    let closeIcon=document.querySelector('.close-icon');
    let serchbox=document.querySelector('.search-input');

    var noteArray;

    btn.onclick = function () {
        navbar.classList.toggle("opened");
    }

    serchbox.addEventListener('focus',()=>{
        closeIcon.classList.remove('hide')
    })
    serchbox.addEventListener('blur',()=>{
        closeIcon.classList.add('hide');
    })

    oncreate.addEventListener('click', () => {
       toggleNOteFields();
    })

    closebtn.addEventListener('click', () => {
        let notedata = {
            title: title.value,
            description: description.value,
            bgcolor:bgcolor
          }
          console.log(notedata);
        $.ajax({
            url: 'https://localhost:44315/Note/AddNote',
            type: 'POST',
            data: JSON.stringify(notedata),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                console.log(result);
                resetNoteFields();
                toggleNOteFields();
              },
            error: function (error) {
                console.log(error);
                toggleNOteFields();
            }
        })
    })

    function resetNoteFields()
    {
        document.getElementById('title').value='';
        document.getElementById('description').value='';
    }

    function toggleNOteFields()
    {
        createnote.classList.toggle('expand');
        if(createnote.classList.contains('expand'))
        {
            document.getElementById('title').placeholder = 'Title';
        }
        else
        {
            document.getElementById('title').placeholder = 'Take a note...';
            resetNoteFields();
        }
    }

    function getAllNotes() {
        $.ajax({
            url: 'https://localhost:44315/Note/GetAllNote',
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                console.log(result);
                noteArray=result.data;
                noteArray.reverse();
              },
              error: function (error) {
                console.log(error);
              }
        })
    }

})