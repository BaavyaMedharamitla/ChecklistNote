// ---------------- THEME ----------------

const body = document.body;
const toggle = document.getElementById("themeToggle");
const circle = document.querySelector(".toggle-circle");

const savedTheme = localStorage.getItem("theme");

if(savedTheme){
    body.className = savedTheme;
}

updateToggle();

toggle.addEventListener("click", () => {
    body.classList.toggle("light");
    body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        body.classList.contains("light") ? "light" : "dark"
    );

    updateToggle();
});

function updateToggle(){
    circle.style.transform =
        body.classList.contains("light")
            ? "translateX(28px)"
            : "translateX(0)";
}

// ---------------- SCROLL ----------------

function scrollToWorkspace(){
    document.getElementById("workspace").scrollIntoView({
        behavior:"smooth"
    });
}

// ---------------- NOTES ----------------

function addNote() {
    const input = document.getElementById('noteInput');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    if(input.value.trim() !== ""){
        notes.push({
            text:input.value.trim(),
            completed:false
        });

        localStorage.setItem('notes', JSON.stringify(notes));
        input.value = '';

        renderNotes();
    }
}

function renderNotes(){
    const list = document.getElementById('noteList');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    list.innerHTML = '';

    notes.forEach((note,index) => {

        const div = document.createElement('div');

        div.innerHTML = `
            <span
                style="
                    cursor:pointer;
                    text-decoration:${note.completed ? 'line-through':'none'};
                    opacity:${note.completed ? '.55':'1'};
                "
                onclick="toggleNote(${index})"
            >
                ${note.text}
            </span>

            <span class="note-delete"
                onclick="deleteNote(${index})">
                ×
            </span>
        `;

        list.appendChild(div);
    });

    updateTaskCount();
}

function toggleNote(index){
    const notes = JSON.parse(localStorage.getItem('notes'));
    notes[index].completed = !notes[index].completed;

    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

function deleteNote(index){
    const notes = JSON.parse(localStorage.getItem('notes'));

    notes.splice(index,1);

    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

function updateTaskCount(){
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    document.getElementById("taskCount").textContent = notes.length;
}

// ---------------- PRODUCTS ----------------

const products = [
{
name:'Wireless Mouse',
category:'gadgets',
price:750
},
{
name:'Bluetooth Speaker',
category:'gadgets',
price:1200
},
{
name:'JavaScript Guide',
category:'books',
price:499
},
{
name:'React Mastery',
category:'books',
price:899
}
];

function renderProducts(data = products){
    const grid = document.getElementById('productGrid');

    grid.innerHTML = '';

    data.forEach(product => {
        const div = document.createElement('div');

        div.className = 'product-card';

        div.innerHTML = `
            <h4>${product.name}</h4>
            <p>₹${product.price}</p>
        `;

        grid.appendChild(div);
    });
}

function filterProducts(){
    const cat = document.getElementById('categoryFilter').value;

    const filtered = cat === 'all'
        ? products
        : products.filter(p => p.category === cat);

    renderProducts(filtered);
}

function sortProducts(){
    const order = document.getElementById('sortPrice').value;

    let sorted = [...products];

    if(order === 'asc'){
        sorted.sort((a,b)=>a.price-b.price);
    }

    if(order === 'desc'){
        sorted.sort((a,b)=>b.price-a.price);
    }

    renderProducts(sorted);
}

// ---------------- DASHBOARD TILT ----------------

const dashboard = document.querySelector(".dashboard-preview");

document.addEventListener("mousemove",(e)=>{
    const x = (window.innerWidth/2 - e.pageX)/45;
    const y = (window.innerHeight/2 - e.pageY)/45;

    dashboard.style.transform = `
        rotateY(${x}deg)
        rotateX(${-y}deg)
    `;
});

// ---------------- PARTICLES ----------------

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<90;i++){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2+1,
        dx:(Math.random()-0.5)*0.45,
        dy:(Math.random()-0.5)*0.45
    });
}

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

        ctx.fillStyle = body.classList.contains("light")
            ? "rgba(79,70,229,.22)"
            : "rgba(99,102,241,.28)";

        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ---------------- INIT ----------------

window.onload = () => {
    renderNotes();
    renderProducts();
};
