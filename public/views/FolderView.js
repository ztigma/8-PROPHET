class FolderView extends Vista
{
    constructor(tag)
    {
        super(tag);
        /**
         * @type {Array<String>}
         */
        this.rutas = [];//yes!!! YES YES YESYEYEYSYSYES!
    }
    async Render(spot)
    {
        let i = 0;
        let seguirCargando = true;

        /**
         * @type {Element}
         */
        let loading = new Vista().w.set_childrens
            ([
                'L O A D I N G . . .'
            ])
            .set_styles
            ({
                position:'absolute'
                ,
                top:'50vh'
                ,
                left:'50vw'
                ,
                transform: 'translate(-50%, -50%)'
            })
        ;

        while(seguirCargando)
        {
            let name = `${i}.jpg`;
            let img = new Image();
            let path = `${spot}/${name}` 
            img.src = path;

            let b = await new Promise
            (
                resolve => 
                {
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(false);
                }
            );

            if(b)
            {
                this.rutas.push(path);
                i++;
            }
            else
            {
                seguirCargando = false;
            }
        }
        console.log(`i: ${i}`);

        loading.remove();
        
        return this.rutas;//???
    }
}


/**

async function renderizarHastaElFin() {
    const contenedor = document.getElementById('galeria-seikan');
    let i = 1;
    let seguirCargando = true;

    while (seguirCargando) {
        const nombreImagen = `${i}.jpg`;
        const img = new Image();
        img.src = `./public/imagenes/${nombreImagen}`;

        // Intentamos cargar la imagen
        const existe = await new Promise(resolve => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });

        if (existe) {
            contenedor.appendChild(img);
            i++;
        } else {
            seguirCargando = false; // El bucle se rompe cuando no encuentra la siguiente
        }
    }
}
 */
