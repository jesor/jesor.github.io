document.addEventListener('DOMContentLoaded', function() {  
   const spinner = document.querySelector('#spinner')

   const ruta = window.location.search
   console.log(`la ruta es:${ruta}`)
   const urlRuta = new URLSearchParams(ruta)
   
   if (urlRuta.get('id')) {
      // console.log(urlRuta.get('id'))
      spinner.removeAttribute('hidden')
      filmografia(urlRuta.get('id'))
   } else {
      console.log('no')
   }


   function filmografia(id) {
      fetch(`https://imdb-api.com/en/API/FullCast/k_isn52y76/${id}`)
      .then(response1 => 
         response1.json()
      )
      .then (data1 => {
         spinner.setAttribute('hidden','')
         console.log(data1)
         const peliculas = data1.actors
         peliculas.forEach(element => {
         if ('movie' ==='movie') {
               const li = document.createElement('li')
               // console.log(i, element.title)
               if (element.image===undefined) {
                  
               } else {
                  var img = document.createElement('img')
                  img.src = element.image
                  img.width=100
                  img.onmouseover = function() {img.width=300}
                  img.onmouseout = function() {img.width=100}
               }
               li.innerHTML = 'Titulo: ' + element.name 

               document.querySelector('#resultados').append(li)
               document.querySelector('#resultados').append(img)
               
            }
         });

      })
      .catch(err => {
         console.error(err);
      });
   }
   
   function busqueda(q) {

      spinner.removeAttribute('hidden')
      fetch(`https://imdb-api.com/es/API/SearchAll/k_isn52y76/${q}`)
      .then( 
         jesor => jesor.json()
      )
      .then(data => {
         console.log(data)
         spinner.setAttribute('hidden','')
         const resultado = data.results
         resultado.forEach(element => {
            const li = document.createElement('li')
            const ref = document.createElement('a')
            const img = document.createElement('img')

            const titulo = element.title
            img.src = element.image

            img.width=100
            img.onmouseover = () => {img.width=300}
            img.onmouseout = () => {img.width=100}

            ref.href = 'imdb2.html?id='+element.id
            ref.appendChild(img)

            li.appendChild(ref)

            document.querySelector('#resultados').append(li)
            document.querySelector('#resultados').append(titulo)
         });
         
      })
      .catch(err => {
         console.error(err);
      });
   }
   
   document.querySelector('form').onsubmit = () => {
      
      document.querySelector('h1').innerHTML = "Resultados IMDB";

      if (!document.querySelector('li')===true) {
         console.log('')
      } else {
         document.querySelector('ul').innerHTML=""
      }

      const consulta = document.querySelector('#consulta').value
      busqueda(consulta)
      
      return false;
   }
})