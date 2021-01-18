(function(){
    const stageElem = document.querySelector('.stage'); 
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const mousePos = {x: 0, y: 0};
    let maxScrollValue;
 
    function resizeHandler(){
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener('scroll', function(){
        const scrollPer = pageYOffset / maxScrollValue; 
        const zMove = scrollPer * 980 - 490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
        
        //Progress bar
        barElem.style.width = scrollPer * 100 + '%';
    });
 
    window.addEventListener('mousemove', function(e) {
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) + '0deg)';
    })

    window.addEventListener('resize', resizeHandler);

    stageElem.addEventListener('click', function(e){
        new Character({
            xPos: e.clientX / window.innerWidth * 100,
            speed: Math.random() * 0.4 + 0.2 //캐릭터가 생성될 때 랜덤하게 캐릭터의 스피드를 정한다.
        });
    });

    resizeHandler();

})();