function Character(info){
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';

    document.querySelector('.stage').appendChild(this.mainElem);

    this.mainElem.style.left = info.xPos + '%';

    //스크롤 중인지 아닌지 체크
    this.scrollState = false; //기본으로 false값을 가진다
    this.lastScrollTop = 0; //바로 이전 스크롤 위치
    this.xPos = info.xPos;
    this.direction;
    this.speed = 0.3;
    this.runningState; //좌우 이동 중인지 확인하는
    this.rafId;
    this.init();
}

Character.prototype = {
    consturctor: Character,
    init: function(){
        const self = this;

        window.addEventListener('scroll', function() {
            clearTimeout(self.scrollState);

            if(!self.scrollState){
                self.mainElem.classList.add('running');
                console.log('runnig class worked')
            }

            self.scrollState = setTimeout(function() {
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500);

            //이전 스크롤 위치와 현재 스크롤 위치를 비교
            //마지막 스크롤 위치 > 현재의 스크롤 위치
            if (self.lastScrollTop > pageYOffset) {
                //이전 스크롤 위치가 크다면 ->스크롤 올리고 있다 -> 캐릭터 얼굴이 보인다.
                self.mainElem.setAttribute('data-direction', 'backward');
            } else {
                //현재 스크롤 위치가 크다면 ->스크롤 내리고 있다 -> 캐릭터 뒤통수가 보인다. 
                self.mainElem.setAttribute('data-direction', 'forward');
            }

            self.lastScrollTop = pageYOffset;
        });

        window.addEventListener('keydown', function(e){
            if(self.runningState) return; //키보드 이벤트가 중복으로 발생하지 않도록(속도 일정하게)

            console.log('keypush');
            if (e.keyCode == 37) {
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');
                self.run(self);
                self.runningState = true;
            } else if (e.keyCode == 39) {
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');
                self.run(self);
                self.runningState = true;
            }
        });
        window.addEventListener('keyup', function(e) {
            self.mainElem.classList.remove('running');
            cancelAnimationFrame(self.rafId);
            self.runningState = false;
        });
    },
    run: function(self){
        //const self = this;

        if (self.direction == 'left') {
            self.xPos -= self.speed;
        }else if (self.direction == 'right') {
            self.xPos += self.speed;
        }
        self.mainElem.style.left = self.xPos + '%';

        self.rafId = requestAnimationFrame(function () {
            self.run(self);
        });
    }
};   