let data = [
    { id: 1, name: "deno", file: "" },
    { id: 2, name: "willi", file: "" }
];

function readAll() {
    localStorage.setItem("object", JSON.stringify(data));
    let tableData = document.querySelector(".data_table");

    let object = localStorage.getItem("object");
    let objectData = JSON.parse(object);
    let elements = "";

    objectData.map(record => {
        const fileName = record.file ? record.file.name : "No file stored";
        elements += `<tr>
            <td>${record.name}</td>
            <td>${fileName}</td>
            <td>
                ${
                    record.file
                        ? `<a href="${record.file.data}" download="${fileName}">Download File</a>`
                        : "No download"
                }
                </button>
                <button class="edit" onclick="edit(${record.id})">Edit</button>
                <button class="delete" onclick="delet(${record.id})">Delete</button>
            </td>
        </tr>`;
    });
    tableData.innerHTML = elements;
}

function create() {
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".add_div").style.display = "none";
}

function add() {
    let name = document.querySelector(".name").value;
    let fileInput = document.querySelector(".file");
    let file = fileInput.files[0];
    let id = data.length ? data[data.length - 1].id + 1 : 1;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            let newObj = {
                id: id,
                name: name,
                file: { name: file.name, data: event.target.result }
            };
            data.push(newObj);

            document.querySelector(".create_form").style.display = "none";
            document.querySelector(".add_div").style.display = "block";

            readAll();
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select a file.");
    }
}

function edit(id) {
    document.querySelector(".update_form").style.display = "block";
    let obj = data.find(rec => rec.id === id);
    document.querySelector(".uname").value = obj.name;
    document.querySelector(".id").value = obj.id;
}

function update() {
    let id = parseInt(document.querySelector(".id").value);
    let name = document.querySelector(".uname").value;
    let fileInput = document.querySelector(".ufile");
    let file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            let index = data.findIndex(rec => rec.id === id);
            data[index] = {
                id,
                name,
                file: { name: file.name, data: event.target.result }
            };

            document.querySelector(".update_form").style.display = "none";
            readAll();
        };
        reader.readAsDataURL(file);
    } else {
        let index = data.findIndex(rec => rec.id === id);
        data[index].name = name;

        document.querySelector(".update_form").style.display = "none";
        readAll();
    }
}

function delet(id) {
    data = data.filter(rec => rec.id !== id);
    readAll();
}
