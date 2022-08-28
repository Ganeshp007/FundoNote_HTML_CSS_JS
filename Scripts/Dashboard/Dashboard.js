let token = get_tokenWithExpiry('token'); //calls get_token.. fun to validate expiry of token and return it 
if (token != null) {
    getAllNotes();
}
else {
    //if token not present or expired it will throw alert and navigate to login pages
    alert('Please Login first!!');
    window.location.href = 'http://127.0.0.1:5500/Pages/User/UserLogin.html';
}

//declaration of instance variables
const navbar = document.querySelector(".side-navbar");
const btn = document.querySelector('#btn');

const title = document.getElementById('title');
const description = document.getElementById('description');
const bgcolor = 'Blue';

const createnote = document.querySelector('.create-note');
const closebtn = document.querySelector('.close-btn');
const oncreate = document.querySelector('.create1');
const desc = document.querySelector('.create2');

const closeIcon = document.querySelector('.close-icon');
const serchbox = document.querySelector('.search-input');

const displaytnotes = document.querySelector('.notes');
const Remindernotes = document.querySelector('.Remindernotes');
const Archivenotes = document.querySelector('.Archivenotes');
const Trashnotes = document.querySelector('.Trashnotes');

var noteArray;

//Method to toggle sidebar
btn.onclick = function () {
    navbar.classList.toggle("opened");
}

//Event listens when clicked on create note box by calling toggleNOtefields() methd/fun
oncreate.addEventListener('click', () => {
    toggleNOteFields();
})

//Event listends when close btn of create note has been clicked => it will call create note api and close the create note box by calling toggleNoteFields() methd/fun.Also Recalls getAllNotes() fun
closebtn.addEventListener('click', () => {
    let notedata = {
        title: title.value,
        description: description.value,
        bgcolor: bgcolor
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
            getAllNotes();
        },
        error: function (error) {
            console.log(error);
            toggleNOteFields();
        }

    })
})

//Function for  resetting Create Note box fields
function resetNoteFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

//function for toggeling CreateNote box expand and contracts
function toggleNOteFields() {
    createnote.classList.toggle('expand');
    if (createnote.classList.contains('expand')) {
        document.getElementById('title').placeholder = 'Title';
        document.getElementById('pin').classList.add('show');
    }
    else {
        document.getElementById('title').placeholder = 'Take a note...';
        document.getElementById('pin').classList.remove('show');
        resetNoteFields();
    }
}

// Function for calling getAllnote API and storing notesdata into noteArray
function getAllNotes() {
    $.ajax({
        url: 'https://localhost:44315/Note/GetAllNote',
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            noteArray = result.data;
            noteArray.reverse();
            console.log(result);
            displaytnotes.click();
        },
        error: function (error) {
            console.log(error);
        }
    })
}


// => function for sidenav bar item Selection
var links = document.querySelectorAll("ul li");
links.forEach(li => {
    li.addEventListener('click', () => {
        resetLinks();
        li.classList.add("active");
    })
})
function resetLinks() {
    links.forEach(li => {
        li.classList.remove("active");
    })
}

// Event Listens when clicked on Notes in sidenav menu and calls displayAllNotes() to display All notes (Not Trashed,Archived)
displaytnotes.addEventListener('click', () => {
    createnote.style.display = 'block'; // sets the visibility of create-note box to visible
    document.getElementById('Notes').classList.add('display-notes');
    document.getElementById('Notes').classList.remove('other-notes');
    notes = noteArray.filter((x) => {
        return x.isTrash === false && x.isArchive === false;
    });
    console.log(notes);
    displayAllNotes(notes);
})

// Event Listens when clicked on Notes in sidenav menu and calls displayAllNotes() to display All notes (Not Trashed,Archived)
Remindernotes.addEventListener('click', () => {
    console.log('inside reminder');
    createnote.style.display = 'block'; // sets the visibility of create-note box to hide
    document.getElementById('Notes').classList.remove('display-notes');
    document.getElementById('Notes').classList.add('other-notes');
    notes = noteArray.filter((x) => {
        return x.isTrash === false && x.isReminder === true;
    });
    console.log(notes);
    displayReminderNotes(notes);
})

// Event Listens when clicked on Archive in sidenav menu and calls displayAllNotes() to display Archived notes
Archivenotes.addEventListener('click', () => {
    createnote.style.display = 'none'; // sets the visibility of create-note box to hide
    document.getElementById('Notes').classList.remove('display-notes');
    document.getElementById('Notes').classList.add('other-notes');
    notes = noteArray.filter((x) => {
        return x.isTrash === false && x.isArchive === true;
    });
    console.log(notes);
    displayAllNotes(notes);
})

// Event Listens when clicked on Trash in sidenav menu and calls displayAllNotes() to display Trashed notes
Trashnotes.addEventListener('click', () => {
    createnote.style.display = 'none'; // sets the visibility of create-note box to hide
    document.getElementById('Notes').classList.remove('display-notes');
    document.getElementById('Notes').classList.add('other-notes');
    notes = noteArray.filter((x) => {
        return x.isTrash === true;
    });
    console.log(notes);
    displayTrashNotes(notes);
})


//function displays the filtered notearray from respective event listener using template literals to pass code dynamically
function displayAllNotes(Notesdata) {
        document.getElementById('Notes').innerHTML = Notesdata.map((note) =>
        `<div class="display-div" style="background-color:${note.bgcolor};">
            <div  id="notefields" onclick="dailogopen(${JSON.stringify(note).split('"').join("&quot;")})">
                <p class="p1" id="title1">${note.title}</p>
                <P class="p2" id="description1">${note.description}</P>
            </div>
            <div class="card-footer">
                <img onclick="reminderNote(${note.noteId})" src="../../Assets/Dashboard/add_reminder.png" />
                <img onclick="addPersonNote(${note.noteId})" src="../../Assets/Dashboard/add_person.png" />
                <div class="dropdown-color">
                <img src="../../Assets/Dashboard/color.png" />
                    <div id="color-option" class="dropdown-colorContent">
                        <img onclick="setcolor('white',${note.noteId})" src="../../Assets/Dashboard/icons-unavailable.png" alt="" />
                        <img onclick="setcolor('rgb(255, 87, 51)',${note.noteId})" src="../../Assets/Dashboard/red-circle.png" alt="" />
                        <img onclick="setcolor('rgb(255, 189, 51)',${note.noteId})" src="../../Assets/Dashboard/orange-circle.png" alt="" />
                        <img onclick="setcolor('rgb(243, 246, 59)',${note.noteId})" src="../../Assets/Dashboard/yellow-circle.png" alt="" />
                        <img onclick="setcolor('rgb(51, 232, 255)',${note.noteId})" src="../../Assets/Dashboard/blue-circle.png" alt="" />
                        <img onclick="setcolor('rgb(51, 255, 87)',${note.noteId})" src="../../Assets/Dashboard/green-circle.png" alt="" />
                        <img onclick="setcolor('rgb(183, 127, 42)',${note.noteId})" src="../../Assets/Dashboard/brown-circle.png" alt="" />
                    </div>                
                </div>
                <img onclick="addImgNote(${note.noteId})" src="../../Assets/Dashboard/add_image.png" />
                <img onclick="archiveNote(${note.noteId})" src="../../Assets/Dashboard/archive.png" />
                
                <div class="dropdown-more">
                    <img id="More" src="../../Assets/Dashboard/more.png" />
                    <div id="more-option" class="dropdown-content">
                        <span onclick="trashNote(${note.noteId})">Delete Note</span>
                        <span>Add Label</span>
                        <span>Add Drawing</span>
                        <span>Make a copy</span>
                    </div>                
                </div>
            </div>

            <div id="updatedailog" class="updatedailogbox">
                <div class="dailog-headers">
                    <textarea type="text" id="da-title" class="t1"></textarea>
                    <img class="d-pin"  src="../../Assets/Dashboard/pin.png" />
                </div>
                    <textarea type="text" class="t2" id="da-description" ></textarea>
                <div class="dailog-footer">
                    <div>
                        <img src="../../Assets/Dashboard/add_reminder.png" />
                        <img src="../../Assets/Dashboard/add_person.png" />
                        <div class="dropdown-color2">
                            <img src="../../Assets/Dashboard/color.png" />
                                <div id="color-option2" class="dropdown-colorContent2">
                                    <img onclick="updatecolor('white',${note.noteId})" src="../../Assets/Dashboard/icons-unavailable.png" alt="" />
                                    <img onclick="updatecolor('rgb(252, 44, 3)',${note.noteId})" src="../../Assets/Dashboard/red-circle.png" alt="" />
                                    <img onclick="updatecolor('rgb(255, 163, 26)',${note.noteId})" src="../../Assets/Dashboard/orange-circle.png" alt="" />
                                    <img onclick="updatecolor('rgb(255, 255, 51)',${note.noteId})" src="../../Assets/Dashboard/yellow-circle.png" alt="" />
                                    <img onclick="updatecolor('rgb(3, 90, 252)',${note.noteId})" src="../../Assets/Dashboard/blue-circle.png" alt="" />
                                    <img onclick="updatecolor('rgb(26, 255, 26)',${note.noteId})" src="../../Assets/Dashboard/green-circle.png" alt="" />
                                    <img onclick="updatecolor('rgb(114, 85, 32)',${note.noteId})" src="../../Assets/Dashboard/brown-circle.png" alt="" />
                                </div>                
                            </div>
                        <img src="../../Assets/Dashboard/add_image.png" />
                        <img src="../../Assets/Dashboard/archive.png" />
                        <div class="dropdown-more2">
                            <img id="More" src="../../Assets/Dashboard/more.png" />
                            <div id="more-option2" class="dropdown-content2">
                                <span>Delete Note</span>
                                <span>Add Label</span>
                                <span>Add Drawing</span>
                                <span>Make a copy</span>
                            </div>                
                        </div>
                        <img src="../../Assets/Dashboard/undo.png" />
                        <img src="../../Assets/Dashboard/redo.png" />
                    </div>   
                    <div>
                        <button id="da-close" class="d-close" onclick="updatecall()">Close</button>
                    </div>    
                </div>
            </div>
        </div>
        `     
    ).join(' ');
};

//To update color====
function setcolor(color,noteId){
    $.ajax({
       url: `https://localhost:44315/Note/UpdateBgcolor/${noteId}/${color}`,
       type: 'PUT',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
       },
       success: function (result) {
           console.log(result);
           getAllNotes();
       },
       error: function (error) {
           console.log(error);
       }
   })
}
// ======

// For change in bgcolor dailog box
let noteBgcolor="";
function updatecolor(color){
    noteBgcolor=color;
    document.getElementById("color-option2").style.visibility="hidden";
}

// TO Update Note ====
var data;
function dailogopen(notedata){
    document.querySelector('.main').classList.add("main-blur");
    document.getElementById("updatedailog").classList.add("updatedailogbox-show");
    document.getElementById("updatedailog").style.background=notedata.bgcolor;
    let da_title=document.getElementById("da-title");
    da_title.innerHTML=notedata.title;
    let da_description=document.getElementById("da-description");
    da_description.innerHTML=notedata.description;
    
    if(noteBgcolor=="")
    {
        noteBgcolor=notedata.bgcolor;
    }

     data={
        noteId:notedata.noteId,
        title:da_title.value,
        description:da_description.value,
        bgcolor: noteBgcolor,
        isPin: notedata.isPin,
        isArchive: notedata.isArchive,
        isRemainder: notedata.isReminder,
        isTrash: notedata.isTrash 
    }
    console.log(data);
}

function updatecall()
{
    document.getElementById("updatedailog").classList.remove("updatedailogbox-show");
    document.querySelector('.main').classList.remove("main-blur");
    let da_title=document.getElementById("da-title");
    let da_description=document.getElementById("da-description");
    let flag=false;
    if(data.title!=da_title.value || data.description!=da_description.value || data.bgcolor!= noteBgcolor)
    {
        data.title=da_title.value;
        data.description=da_description.value;
        data.bgcolor=noteBgcolor;
        flag=true;
    }
    if(flag==true)
    {
        console.log(data);
      updateNote(data);
    }
}

function updateNote(data)
{
    $.ajax({
        url: `https://localhost:44315/Note/UpdateNote/${data.noteId}`,
        type: 'PUT',
        data:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            console.log(result);
            getAllNotes();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

// ======

//function to display trash notes
function displayTrashNotes(Notesdata) {
    document.getElementById('Notes').innerHTML = Notesdata.map((note) =>
        `<div class="display-div">
            <div>
                <p class="p1">${note.title}</p>
                <P class="p2">${note.description}</P>
            </div>
            <div class="card-footer-trash">
                <img src="../../Assets/Dashboard/delete_forever_.png" alt="">
                <img onclick="trashNote(${note.noteId})" src="../../Assets/Dashboard/restore_from_trash.png" alt="">
            </div>
        </div>
       `
    ).join(' ');
};

//function to display to be Remindered notes
function displayReminderNotes(Notesdata) {
    console.log(Notesdata);
    document.getElementById('Notes').innerHTML = Notesdata.map((note) =>
        `<div class="display-div">
             <div>
                <p class="p1">${note.title}</p>
                <P class="p2">${note.description}</P>
            </div>
            <div class="reminder">
                <P class="p3">Reminder=${note.isReminder}</p>     
            </div>
            <div class="card-footer">
                <img src="../../Assets/Dashboard/add_reminder.png" />
                <img src="../../Assets/Dashboard/add_person.png" />
                <div class="dropdown-color">
                    <img src="../../Assets/Dashboard/color.png" />
                        <div id="color-option" class="dropdown-colorContent">
                            <span>No color</span>
                            <span>Red</span>
                            <span>Orange</span>
                            <span>Blue</span>
                        </div>                
                    </div>
                <img src="../../Assets/Dashboard/add_image.png" />
                <img src="../../Assets/Dashboard/archive.png" />
                <div class="dropdown-more">
                        <img id="More" src="../../Assets/Dashboard/more.png" />
                        <div id="more-option" class="dropdown-content">
                            <span onclick="trashNote(${note.noteId})">Delete Note</span>
                            <span>Add Label</span>
                            <span>Add Drawing</span>
                            <span>Make a copy</span>
                        </div>                
                    </div>
            </div>
        </div>
        `
    ).join(' ');

};

//function which call Archive note API
function archiveNote(noteid) {
    $.ajax({
        url: `https://localhost:44315/Note/Archive/${noteid}`,
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            console.log(result);
            getAllNotes();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//function which calls trtash Note API
function trashNote(noteid) {
    $.ajax({
        url: `https://localhost:44315/Note/Trash/${noteid}`,
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            console.log(result);
            getAllNotes();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//function to get token if not expired or else it will return
function get_tokenWithExpiry(key) {
    let tokendata = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (tokendata == null) {
        return null;
    }

    let item = JSON.parse(tokendata);
    let now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null;
    }
    return item.value;
}

