var imgarr= ["../images/1.png","../images/2.png","../images/3.png","../images/4.png","../images/1.png"];
var i=0;
  function startshow(){
      t=setInterval("nextfun()",1000);
  }
  function nextfun(){
      i++;
      if(i>=imgarr.length) i=0;
      myimg.src= imgarr[i];
  }