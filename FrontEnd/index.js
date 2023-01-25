function createFigure(post) {
    const figure = document.createElement('figure');
    const imageElement = document.createElement('img')
    imageElement.src = post.imageUrl;
    imageElement.crossOrigin = 'anonymous'
    figure.appendChild(imageElement);
    const figcaptionElement = document.createElement('figcaption');
    figcaptionElement.innerText = post.title;
    figure.appendChild(figcaptionElement);
    return figure
    
}

async function fetchProjet() {
    const gallery = document.querySelector('.gallery')
    
    const r = await fetch('http://localhost:5678/api/works', {
        method: 'GET',
        headers:{
            "Accept": "application/json",
        }
        
    })
    console.log(r);
    if (!r.ok === true){
        throw new Error('Impossible de contacter le serveur')
        
    }
    const posts = await r.json();
    gallery.innerHTML = ('')
    for (let post of posts){
        gallery.append(createFigure(post));
    }
    
}
fetchProjet()







   
    
