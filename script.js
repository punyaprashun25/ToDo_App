let add = document.getElementById("add");
function add_task() {
    let input = document.getElementById("textName");
    let taskName = input.value;
    let taskBox = document.querySelector(".tasks");
    taskBox.innerHTML += `
        <div class="task">
            <input type="checkbox" name="check" class="check">
            <p class="taskName" editable="true">${taskName}</p>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
        `;
    // count increasing task
    let taskCount = document.getElementById("taskCount");
    taskCount.innerHTML++;

    // checkbox event
    let checkBtns = document.querySelectorAll(".check");
    checkBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.nextElementSibling.classList.toggle("completed");
        });
    });

    // edit btn event
    let editBtns = document.querySelectorAll(".edit");
    editBtns.forEach((edit) => {
        edit.addEventListener("click", () => {
            let taskName = edit.previousElementSibling;

            taskName.setAttribute("contentEditable", "true");

            let checkbox = taskName.previousElementSibling;
            let editBtn = taskName.nextElementSibling;
            let deleteBtn = editBtn.nextElementSibling;

            checkbox.style.display = "none";
            editBtn.style.display = "none";
            deleteBtn.style.display = "none";

            // new button
            let save = document.createElement("button");
            save.innerHTML = "Save";
            save.classList.add("delete");
            save.style.backgroundColor = "green";
            editBtn.parentElement.appendChild(save);
            taskName.focus();

            // Saving edits on pressing Enter
            taskName.addEventListener(
                "keypress",
                (event) => {
                    if (event.key == "Enter")
                        save.click();
                },
                true
            );

            save.addEventListener("click", () => {
                if (confirm("Are you sure?")) {
                    checkbox.style.display = "block";
                    editBtn.style.display = "block";
                    deleteBtn.style.display = "block";
                    save.remove();
                    taskName.removeAttribute("contentEditable");
                }
            });
        });
    });

    // delete btn event
    let deleteBtns = document.querySelectorAll(".delete");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", () => {
            deleteBtn.parentElement.remove();
            taskCount.innerHTML--;
        });
    });

    // reseting input text
    input.value = "";
}
add.addEventListener("click", add_task);

// Entering task on enter press
let input = document.getElementById("textName");
input.addEventListener(
    "keypress",
    (event) => {
        if (event.key == "Enter")
            add.click();
    },
    true
);

// Saving edit on enter press

