if(isDesktop())
{
    var zoomLevel = window.devicePixelRatio;
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
            transform: `scale(${zoomLevel})`
        });
    });
}