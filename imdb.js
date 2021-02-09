document.addEventListener('DOMContentLoaded', function() {  
   const spinner = document.querySelector('#spinner')

   const ruta = window.location.search
   const urlRuta = new URLSearchParams(ruta)
   
   if (urlRuta.get('id')) {
      // console.log(urlRuta.get('id'))
      spinner.removeAttribute('hidden')
      filmografia(urlRuta.get('id'))
   } else {
      console.log('no')
   }


   function filmografia(id) {
      fetch(`https://imdb8.p.rapidapi.com/actors/get-all-filmography?nconst=${id}`, {
          "method": "GET",
          "headers": {
             "x-rapidapi-key": "fbc53aa5dcmshdab3386b41c3cb5p18e10djsnd8fb8a658268",
             "x-rapidapi-host": "imdb8.p.rapidapi.com"
          }
      })
      .then(response1 => 
         response1.json()
      )
      .then (data1 => {
         spinner.setAttribute('hidden','')
         console.log(data1.filmography)
         const peliculas = data1.filmography
         peliculas.forEach(element => {
         if (element.titleType ==='movie') {
               const li = document.createElement('li')
               // console.log(i, element.title)
               if (element.image===undefined) {
                  
               } else {
                  var img = document.createElement('img')
                  img.src = element.image.url
                  img.width=100
                  img.onmouseover = function() {img.width=300}
                  img.onmouseout = function() {img.width=100}
               }
               li.innerHTML = 'Titulo: ' + element.title + ' Año: ' + element.year
               + ' Personaje: ' + element.characters

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
      fetch(`https://imdb8.p.rapidapi.com/title/auto-complete?q=${q}`, {
         "method": "GET",
         "headers": {
            "x-rapidapi-key": "fbc53aa5dcmshdab3386b41c3cb5p18e10djsnd8fb8a658268",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
         }
      })
      .then(response => 
         response.json()
      )
      .then(data => {
         console.log(data)
         spinner.setAttribute('hidden','')
         const resultado = data.d
         resultado.forEach(element => {
            const li = document.createElement('li')
            const ref = document.createElement('a')
            
            ref.href = 'imdb2.html?id='+element.id
            ref.textContent = element.l
            
            li.appendChild(ref)
            document.querySelector('#resultados').append(li)
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