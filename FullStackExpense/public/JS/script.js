console.log("Running..");

async function handleSubmit(e) {
    e.preventDefault();

    let amount = e.target.amount.value;
    let title = e.target.title.value;
    let category = e.target.cat.value;
    const editId = document.getElementById('Addexp').getAttribute("data-edit-id");

    if (editId) {
        await fetch(`http://localhost:3000/expenses/${editId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, amount, category }),
            headers: { 'Content-Type': 'application/json' }
        });
        document.getElementById('Addexp').removeAttribute("data-edit-id");
    } else {
        await fetch('http://localhost:3000/expenses', {
            method: 'POST',
            body: JSON.stringify({ title, amount, category }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    await display();
    e.target.reset();
}

async function display() {
    let conatiner = document.getElementById("expances");
    conatiner.innerHTML = "";

    let res = await fetch('http://localhost:3000/expenses');
    let allExp = await res.json();

    allExp.forEach(element => {
        let newEle = document.createElement('div');
        newEle.className = `
            expnc w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md border border-blue-200 
            text-gray-800 p-4 mb-3 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center 
            transition hover:shadow-lg`;

        newEle.setAttribute('data-id', element.id);
        newEle.setAttribute('data-title', element.title);
        newEle.setAttribute('data-amount', element.amount);
        newEle.setAttribute('data-category', element.category);

        let para = document.createElement('p');
        para.innerHTML = `<span class="font-semibold text-blue-600">₹${element.amount}</span> - 
                          <span class="capitalize">${element.title}</span> 
                          <span class="text-sm text-gray-500">[${element.category}]</span>`;
        para.className = "text-base mb-3 sm:mb-0";

        let btnGroup = document.createElement('div');
        btnGroup.className = "space-x-2 flex-shrink-0 flex";

        let editbtn = document.createElement('button');
        editbtn.innerHTML = "Edit";
        editbtn.onclick = function () { edit(this) };
        editbtn.className = `
            bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-1.5 
            rounded-full shadow-sm transition duration-200`;

        let delbtn = document.createElement('button');
        delbtn.innerText = "Delete";
        delbtn.onclick = function () { deleteExpance(this) };
        delbtn.className = `
            bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1.5 
            rounded-full shadow-sm transition duration-200`;

        btnGroup.appendChild(editbtn);
        btnGroup.appendChild(delbtn);
        newEle.appendChild(para);
        newEle.appendChild(btnGroup);
        conatiner.appendChild(newEle);
    });
}


async function deleteExpance(element) {
    let exp = element.closest('.expnc');
    let id = exp.getAttribute('data-id');

    await fetch(`http://localhost:3000/expenses/${id}`, {
        method: "DELETE",
    });

    await display();
}

async function edit(element) {
    let exp = element.closest('.expnc');
    let id = exp.getAttribute('data-id');
    let title = exp.getAttribute('data-title');
    let amount = exp.getAttribute('data-amount');
    let category = exp.getAttribute('data-category');

    document.getElementById('amount').value = amount;
    document.getElementById('desc').value = title;
    document.getElementById('cat').value = category;

    document.getElementById('Addexp').setAttribute("data-edit-id", id);
}

display();
