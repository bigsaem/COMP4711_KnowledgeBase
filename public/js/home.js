let profilesDiv = document.getElementById('profilesDiv');

function showAddArtistForm() {
    let form = document.getElementById('inputForm');
    if(form.style.display == "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
}

function addArtistButton() {
    
    let name = document.getElementById('addName').value;
    let about = document.getElementById('addAbout').value;
    let url = document.getElementById('addImageURL').value;
    let div = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let text = document.createTextNode(about);
    let br = document.createElement("br");
    let btn = document.createElement("button");

    div.classList.add("profile");
    btn.classList.add("deleteButton");
    btn.onclick = function() {deleteButton(this)};
    btn.textContent = "Delete";
    img.src = url;
    img.style.float = "left";
    img.style.padding = "0px 10px";
    div.appendChild(img);
    span.textContent = name;
    p.appendChild(span);
    p.appendChild(br);
    p.appendChild(text);
    p.appendChild(btn);
    div.appendChild(p);

    profilesDiv.appendChild(div);
}


alert("To reset the search field, press search when the input is empty");