var imgarr= ["../photos/1.png","../photos/2.png","../photos/3.png","../photos/4.png","../photos/1.png"];
        var i=0;
          function startshow(){
              t=setInterval("nextfun()",1000);
          }
          function nextfun(){
              i++;
              if(i>=imgarr.length) i=0;
              myimg.src= imgarr[i];
          }

          function toggleMenu() {
            const nav = document.querySelector('.nav');
            const menuToggle = document.getElementById('menu-toggle');
            nav.classList.toggle('menu-show');
        }
        //dropdown 
        $(function(){
        $('#dropdown-toggle').on('click', function (e) {
            e.stopPropagation();
    
            $(this).next('.dropdown-menu').toggleClass('show');
        });
    
        // Close the dropdown when clicking outside
        $(document).on('click', function () {
            $('.dropdown-menu').removeClass('show');
        });
        
    });
 