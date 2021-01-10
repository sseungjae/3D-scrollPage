(function(){
     
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const mousePos = {x: 0, y: 0};
    let maxScrollValue;
 
    function resizeHandler(){
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener('scroll', function(){
        const scrollPer = pageYOffset / maxScrollValue 
        const zMove = scrollPer * 980 - 490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
        
        //Progress bar
        barElem.style.width = scrollPer * 100 + '%';
    });
 
    window.addEventListener('mousemove', function(e) {
        mousePos.x = -1 +(e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 +(e.clientY / window.innerHeight) * 2;
        console.log(mousePos);
    })

    window.addEventListener('resize', resizeHandler);
    resizeHandler();

})();