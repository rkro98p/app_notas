

const notas = document.getElementById('notas')
const btn_guardar =document.getElementById('save_changes')
const template_nota=document.getElementById('template-nota').content
const fragment = document.createDocumentFragment()
let notas_p = {}

document.addEventListener('DOMContentLoaded',e => {fetchData()})
notas.addEventListener('click',e=>{borrarNota(e)})
btn_guardar.addEventListener('click', ()=>{nuevaNota()})




//borrar nota
const borrarNota = (e) => {

    if(e.target.classList.contains('btn-danger'))
    {
        delete notas_p[e.target.dataset.id]
        pintarNotas()

    }
}

//traer productos
const fetchData = async () => {

    if(localStorage.getItem('notas')){
        notas_p=JSON.parse(localStorage.getItem('notas'))        
        pintarNotas()
        
    }
    /*
    const res = await fetch('./notas.json');
    const data = await res.json()   
    pintarNotas(data)*/
}

//pintar notas
const pintarNotas = () =>{
    notas.innerHTML=''
    Object.values(notas_p).forEach(item =>{
        template_nota.querySelector('h5').textContent = item.titulo
        template_nota.querySelector('p').textContent = item.texto
        template_nota.querySelector('button').dataset.id=item.id
        const clone = template_nota.cloneNode(true)
        fragment.appendChild(clone)
    })
    notas.appendChild(fragment)
}

//nueva nota
const nuevaNota = () =>{
        const titulo = document.getElementById('text_input').value
        const texto = document.getElementById('text_area').value

        keys = Object.keys(notas_p)

        if(keys.length > 0){
            n=keys.reduce((a,b) => notas_p[a] > notas_p[b] ? a : b)
            console.log(n);
            n++
        }else{
            n=1
        }
        

        const nota = {
            id:n,
            titulo:titulo,
            texto:texto
        }
        notas_p[nota.id]= { ...nota}
        localStorage.setItem('notas',JSON.stringify(notas_p))
        document.getElementById('text_input').value=''
        document.getElementById('text_area').value=''        
        pintarNotas()
}
