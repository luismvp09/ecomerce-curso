

       // variables


       const carrito = document.querySelector('#carrito');
       const contenedorCarrito = document.querySelector('#lista-carrito tbody');
       const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
       const ListaCursos = document.querySelector('#lista-cursos');
       let articulosCarrito = [];


       cargarEventListeners()
    function cargarEventListeners() {
        //cuando agregas un curso precionando agregar al carrito
        ListaCursos.addEventListener('click', agregarCurso);

        // Elimina cursos del carrito
        carrito.addEventListener('click',eliminarCurso);

        // vaciar el carrito

        vaciarCarritoBtn.addEventListener('click', () =>{
           articulosCarrito = []; // reseteamos el arreglo

           limpiarHTML();
        })
    }

    // funciones

    function agregarCurso(e) {
        e.preventDefault();

        if (e.target.classList.contains('agregar-carrito')) {
            const cursoSeleccionado = e.target.parentElement.parentElement
            leerDatosCuso(cursoSeleccionado);
        } 
    }
    // Elimina un curso el carrito
    function eliminarCurso(e) {
        if (e.target.classList.contains('borrar-curso')) {
           const cursoId = e.target.getAttribute('data-id');

           //Elimina del arreglo de articulosCarrito por el data-id
           articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
           
           carritoHTML(); // itera sobre el carrito y muestra su HTML
        }
    }

    // lee el contenido del html al que le dimos click y extrae la info del curso
       function leerDatosCuso(curso) {
        //console.log(curso)

        // crear un objeto con el contenido del curso actual
        const infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad:1

        }
        // revisa si un elemento ya existe en el carrito
        const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
        
        if (existe) {
            // actualizamos la cantidad
            const cursos = articulosCarrito.map( curso =>{
                if (curso.id === infoCurso.id) {
                    curso.cantidad++;
                    return curso;    // retorna los objetos actualisado
                }else{
                    return curso;   // retorna los objetos que no son los duplicados
                }
            });
            articulosCarrito = [...cursos]
        }else{
             // agrega elementos al arreeglo carrito
             articulosCarrito = [...articulosCarrito,infoCurso];
        }


       

        console.log(articulosCarrito)

        carritoHTML();
       }



       // muestra el carrito de compra en  html
  
       function carritoHTML() {

        // linpiar el HTML
        limpiarHTML()

     

        // recorre el carrito y genera el html
        articulosCarrito.forEach( curso =>{
            //console.log(curso)
            const { imagen,titulo,precio,cantidad,id} = curso;
            const row = document.createElement('tr');
            row.innerHTML = `
               
             <td>
                 <img src="${imagen}" width="100">
             </td>
              <td>
                  ${titulo}
              </td>
              <td>
                  ${precio}
              </td>
              <td>
                  ${cantidad}
              </td>
              <td>
               <a hre="#" class="borrar-curso" data-id="${id}"> X </a>
              </td>
            
            `;
            //agrega el html del carrito en el tbody
            contenedorCarrito.appendChild(row);
        })
       } 
       

       // elimina los curso del tbody
       function limpiarHTML() {
        //forma lenta
        // contenedorCarrito.innerHTML = '';

        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        }

       }