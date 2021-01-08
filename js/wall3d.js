(function(){
     
    const houseElem = document.querySelector('.house');
    let maxScrollValue = document.body.offsetHeight - window.innerHeight;
 
    window.addEventListener('scroll', function(){
        console.log(pageYOffset / maxScrollValue);
    });

})();