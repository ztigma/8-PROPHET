const isDesktop = () => {
    // Verificamos si NO tiene capacidades táctiles primarias
    return window.matchMedia("(pointer: fine)").matches;
};
var pcStyles =
`
<style>
*{
    -webkit-user-drag: none;
    user-drag: none;
    user-select: none;
    touch-action: none;
}
img
{
    pointer-events: none;
}
body 
{
    cursor: grab;
    overflow: hidden !important;
    position: absolute;
}
body:active 
{
    cursor: grabbing;
}
</style>
`
if (isDesktop()) 
{
    document.head.innerHTML+=pcStyles;
    console.log("Terminal Mode: Desktop CSS Injected.");
}