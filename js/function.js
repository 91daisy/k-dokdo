$(function(){
  // 'navigation' 영역
  const arrTopVal = [];
  for(let i=0; i<5; i++){
  arrTopVal[i] = $('section>article').eq(i).offset().top;
  };

  console.log('arrTopVal =',arrTopVal);

  const moveFn = function(idx){
    $('html,body').stop().animate({scrollTop:arrTopVal[idx]-100},'easeInOutCubic');
  };

  const $mnu = $('header > nav > .gnb > li > a');

  $mnu.on('click',function(evt){
    evt.preventDefault();
    const nowIdx = $mnu.index(this);
    moveFn(nowIdx);
  });

  $(window).on('scroll', function(){
    
    const scrollTop = $(window).scrollTop();
    console.log(scrollTop);
    for(let i=0; i<5; i++){
    if(scrollTop>=arrTopVal[i]-200){
    $mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
    }else if(scrollTop<arrTopVal[0]-100){
    $mnu.parent().removeClass('on');}
    };
  });

  $('header > .logo > a').on('click', function(evt){
    evt.preventDefault();
    $('html,body').stop().animate({scrollTop:0});
  });
  // end of 'navigation' 영역
  
  //'dokdo' 영역 자동재생
    const $btnPlay = $('section > .dokdo > .dokdo_slides ~ span.play');
    const $btnPause = $('section > .dokdo > .dokdo_slides ~ span.pause')
    let nowIdx = 0;
    let intervalKey;

    const slideFn = function(){
    const $slide = $('section > .dokdo > .dokdo_slides');
    const $cont = $slide.children('li')

    $slide.stop().animate({left:-1280},function(){
      $cont.eq(0).appendTo($slide);
      $slide.css({left:0});
    });
   };

  $btnPlay.on('click', function(){
    clearInterval(intervalKey);
    intervalKey = setInterval(function(){
      slideFn();
    },3000);
    console.log('시작!')
  });

  $btnPause.on('click', function(){
    clearInterval(intervalKey);
    console.log('멈추기!')
  });
  // end of 'dokdo'영역

  // window 로드
  $(window).on('load', function(){
    slideFn();
  
    intervalKey = setInterval(()=>{
    slideFn();
    },3000);
  }); //end of window 로드

});