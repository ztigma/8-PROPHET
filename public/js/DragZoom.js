if(isDesktop())
{
    var zoomLevel = window.devicePixelRatio;
    var posX = 0;
    var posY = 0;
    const step = 40;

    window.addEventListener('keydown', (e) => {

        if(is_loading)
        {
            return;
        }
        
        console.log('tecla')
        // 1. Detectamos la tecla
        if (e.key === 'ArrowUp') {
            // Para que la cámara suba, el contenido debe bajar (Y aumenta)
            posY += step;
            e.preventDefault(); // Evitamos que el navegador intente hacer scroll normal
        } 
        else if (e.key === 'ArrowDown') {
            // Para que la cámara baje, el contenido debe subir (Y disminuye)
            posY -= step;
            e.preventDefault();
        }
        // Control Horizontal (Izquierda/Derecha)
        else if (e.key === 'ArrowLeft') {
            // Para que la cámara vaya a la izquierda, el mundo se mueve a la derecha
            posX += step;
            e.preventDefault();
        }
        else if (e.key === 'ArrowRight') {
            // Para que la cámara vaya a la derecha, el mundo se mueve a la izquierda
            posX -= step;
            e.preventDefault();
        }

        // 2. Aplicamos la transformación al body (o al contenedor que desees)
        // Usamos translate3d para forzar la aceleración por hardware (GPU), es más suave.
        document.body
        .set_styles
        ({
            transform: `translate3D(${posX}px, ${posY}px, 0) scale(${zoomLevel})`
        });
    });


    document.body
    .set_styles
    ({
        transform: `scale(${zoomLevel})`,
    })
    ;
    window.addEventListener('resize', () => {
        zoomLevel = window.devicePixelRatio;
        
        console.log(`zoom level: ${zoomLevel}`);

        document.body
        .set_styles
        ({
            transform: `translate3D(${posX}px, ${posY}px, 0) scale(${zoomLevel})`
        });
    });

    let isDragging = false;
    let startX, startY;
    let velocityX = 0;
    let velocityY = 0;
    let lastMouseX, lastMouseY;
    let animationFrame;

    // Configuración de la física
    const friction = 0.99; // Qué tan rápido se detiene (0.98 es más resbaloso, 0.90 es más pesado)

    function applyInertia() {
        if (isDragging) 
        {
            return; // Si estamos arrastrando, no hay inercia
        }
        // Aplicamos la velocidad a las posiciones
        posX += velocityX;
        posY += velocityY;

        // Aplicamos fricción (la velocidad se reduce en cada frame)
        velocityX *= friction;
        velocityY *= friction;

        // Actualizamos el body
        document.body.set_styles({
            transform: `translate3d(${posX}px, ${posY}px, 0) scale(${zoomLevel})`
        });

        // Si todavía hay movimiento perceptible, seguimos la animación
        if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
            animationFrame = requestAnimationFrame(applyInertia);
        }
    }
    window.addEventListener('mousedown', (e) => {

        if(is_loading)
        {
            return;
        }
        
        velocityX = 0;
        velocityY = 0;

        isDragging = true;
        cancelAnimationFrame(animationFrame); // Detenemos inercia previa si existía
        
        startX = e.pageX - posX;
        startY = e.pageY - posY;
        
        lastMouseX = e.pageX;
        lastMouseY = e.pageY;
        
        document.body.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', (e) => {

        if(is_loading)
        {
            return;
        }
        
        if (!isDragging) return;

        // Calculamos la velocidad actual basándonos en el movimiento del frame anterior
        velocityX = e.pageX - lastMouseX;
        velocityY = e.pageY - lastMouseY;

        lastMouseX = e.pageX;
        lastMouseY = e.pageY;

        posX = e.pageX - startX;
        posY = e.pageY - startY;

        document.body.set_styles({
            transform: `translate3d(${posX}px, ${posY}px, 0) scale(${zoomLevel})`
        });
    });
    window.addEventListener('mouseup', () => {

        if(is_loading)
        {
            return;
        }
        
        isDragging = false;
        document.body.style.cursor = 'grab';
        
        // Al soltar, iniciamos el ciclo de inercia
        applyInertia();
    });
}
