async function getData() {
    let res = await fetch("/data");
    res = await res.json();

    let Books = document.getElementById("AllotedBooks");
    Books.innerHTML = '';
    console.log(res);

    res.forEach((book) => {
        const hasFine = book.totalFine && book.totalFine > 0;

        Books.innerHTML += `
   <article id=${book.id}  data-fine=${book.totalFine || 0}
                    class="bg-gray-800 rounded-lg p-6 shadow-lg drop-shadow-lg flex flex-col justify-between min-w-[280px]">
                    <div class="mb-4">
                        <h3 class="text-lg font-semibold text-white mb-2">Book Name: ${book.bookName}</h3>
                        <p class="text-gray-300 leading-relaxed mb-2">
                            <span class="font-semibold">Book taken on:</span> ${formatDate(book.alloteDate)}
                        </p>
                        <p class="text-gray-300 leading-relaxed mb-2">
                            <span class="font-semibold">Book return date:</span> ${formatDate(book.dueDate)}
                        </p>
                        <p class="text-green-400 font-semibold">Current fine: ${book.totalFine}</p>
                    </div>
                    <button onclick="Return(${book.id})"
                        class="mt-auto self-start bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-md transition-colors duration-300"
                        aria-label="Return Computer Network by Andrew">
                        Return book
                    </button>
                </article>`;
    });

}
getData();
function Return(id) {

    const bookDiv = document.getElementById(id);
    let fine = parseFloat(bookDiv.getAttribute('data-fine')) || 0;

    bookDiv.innerHTML = '';
    if (fine > 0) {
        bookDiv.innerHTML = `
       <p class="text-red-700 font-semibold mb-3">Total Fine: ${fine} rs</p>
    <button onclick="payFine(${id})" 
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Pay fine
    </button>

   
    `;
    }
    else {
        payFine(id);
    }
}
async function payFine(id) {

    const response = await fetch('/payFine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });
    document.getElementById(id).remove();
    const res = await response.json();

    slip();

}
async function slip() {
    const response = await fetch('/slip');
    const res = await response.json();
    let retruns = document.getElementById("Returns");

    retruns.innerHTML = '';
    res.forEach((ret) => {
        retruns.innerHTML += `
  <article class="text-white">
                    <h3 class="text-lg font-semibold mb-1">Book Name: ${ret.bookName}</h3>
                    <p class="mb-1 text-gray-300"><span class="font-semibold">Fine:</span> ${ret.totalFine}</p>
                    <p class="text-gray-300"><span class="font-semibold">Returned on:</span> ${formatDate(ret.returnDate)}
                    </p>
                </article>`;
    });
}
slip();
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
}