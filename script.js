// NOTES APP
function addNote() {
    const input = document.getElementById('noteInput');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    if (input.value.trim() !== "") {
      notes.push(input.value.trim());
      localStorage.setItem('notes', JSON.stringify(notes));
      input.value = '';
      renderNotes();
    }
  }
  
  function renderNotes() {
    const list = document.getElementById('noteList');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    list.innerHTML = '';
    notes.forEach((note, index) => {
      const div = document.createElement('div');
      div.innerHTML = `${note} <span class="note-delete" onclick="deleteNote(${index})">×</span>`;
      list.appendChild(div);
    });
  }
  
  function deleteNote(i) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(i, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  }
  
  window.onload = () => {
    renderNotes();
    renderProducts();
  };
  
  // PRODUCTS FILTER & SORT
  const products = [
    { name: 'Wireless Mouse', category: 'gadgets', price: 750 },
    { name: 'JavaScript Book', category: 'books', price: 499 },
    { name: 'Bluetooth Speaker', category: 'gadgets', price: 1200 },
    { name: 'HTML & CSS Guide', category: 'books', price: 650 },
  ];
  
  function renderProducts(data = products) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    data.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `<h4>${p.name}</h4><p>₹${p.price}</p>`;
      grid.appendChild(div);
    });
  }
  
  function filterProducts() {
    const cat = document.getElementById('categoryFilter').value;
    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
    renderProducts(filtered);
  }
  
  function sortProducts() {
    const order = document.getElementById('sortPrice').value;
    let sorted = [...products];
    if (order === 'asc') sorted.sort((a, b) => a.price - b.price);
    if (order === 'desc') sorted.sort((a, b) => b.price - a.price);
    renderProducts(sorted);
  }
  