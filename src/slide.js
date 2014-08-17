function $(e){ return document.getElementById(e);}

var bnrNum = new Number(1);
var navNumMax = new Number(0);
var timmer = new Number(3000);

window.onload = function(){
  var bnrLi = $('jskeySlideBnrLi');
  var navLi = $('jskeySlideNav'); 
  var navItm = navLi.getElementsByTagName("li");
      navNumMax = navItm.length;
       
  bnrLi.style.width = (navNumMax*228)+"px";
  
  $('jskeyLeftBtn').firstChild.onclick = leftMove;
  $('jskeyRightBtn').firstChild.onclick = rightMove;
  
  $('slideArea').addEventListener("touchstart", touchSlideMove, false);
  $('slideArea').addEventListener("touchmove", touchSlideMove, false);
  $('slideArea').addEventListener("touchend", touchSlideMove, false);
   
   for(i=0; i<navNumMax; i++){   
     navItm[i].firstChild.addEventListener("touchstart", navClick, false);
     navItm[i].firstChild.addEventListener("touchend", navClick, false);
     navItm[i].firstChild.addEventListener("click", navClick, false);

     function navClick(e){
       e.preventDefault();
       var targetNum = e.target.innerHTML;
       var targetLi = e.target.parentNode;
   
       targetLi.className ="";
       targetLi.className="cur";
       
       if(e.type == "touchstart"){
       navItm[i].firstChild.className = "";
       e.target.className ="cur";
       }
       if(e.type == "touchend"){
       e.target.className ="";
       }     
       navMove(targetNum);
       return false;
     }   
   }
timerID = setTimeout("timeMove()", timmer);
};

function leftMove(){  
  if(bnrNum > 1){
    bnrNum -= 1;
  }else{
    bnrNum = 1;
  }
  navMove(bnrNum);
  return false;
}

function rightMove(){
  if(bnrNum >= navNumMax){
    bnrNum = navNumMax;
  }else{
    bnrNum +=1;
  }
  navMove(bnrNum);
  return false;
}

function navMove(num){  
  bnrLi = $('jskeySlideBnrLi');
  bnrNum = new Number(num);
  moveX = (bnrNum-1)*228;
  bnrLi.style.WebkitTransform = "translate(-"+moveX+"px,0)";
  
  var navLi = $('jskeySlideNav');
  var navItm = navLi.getElementsByTagName("li");
  
  for(i=0;i<navNumMax;i++){
    navItm[i].className ="";
  }
  navItm[(bnrNum -1)].className="cur";
  clearTimeout(timerID);
  timerID = setTimeout("timeMove()", timmer);   
}

function timeMove(){
  if(bnrNum >= navNumMax){
    bnrNum = 1;
  }else{
    bnrNum +=1;
  }
  navMove(bnrNum);
}

function touchSlideMove(e){
  var touch = e.touches[0];
  if(e.type == "touchstart"){
    startX = touch.pageX;
  }
  if(e.type == "touchmove"){
    curX = touch.pageX;
    e.preventDefault();
  }
  if(e.type == "touchend"){
    e.preventDefault();
    if((startX < curX)&&((curX - startX)>30)){
      leftMove();
    }else if((startX > curX)&&((startX - curX)>30)){
      rightMove();
    }    
  }
}

