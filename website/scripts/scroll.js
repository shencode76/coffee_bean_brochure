document.addEventListener("DOMContentLoaded", function() {
    var scroller = scrollama();
  
    scroller
      .setup({
        step: ".interactive-section .arabica, .interactive-section .robusta, .section",
        offset: 0.5,
        debug: false
      })
      .onStepEnter(function(response) {
        if (response.element.classList.contains('arabica')) {
          document.getElementById('arabica-intro').classList.add("visible");
          playArabicaAnimation();
        } else if (response.element.classList.contains('robusta')) {
          document.getElementById('robusta-intro').classList.add("visible");
          playRobustaAnimation();
        } else {
          document.getElementById('flavor-factors').classList.add("visible");
          document.getElementById('flavor-profile').classList.add("visible");
          document.getElementById('market').classList.add("visible");
        }
      })
      .onStepExit(function(response) {
        if (response.element.classList.contains('arabica')) {
          document.getElementById('arabica-intro').classList.remove("visible");
          stopArabicaAnimation();
        } else if (response.element.classList.contains('robusta')) {
          document.getElementById('robusta-intro').classList.remove("visible");
          stopRobustaAnimation();
        }
      });
  
    function playArabicaAnimation() {
      let animation = document.getElementById('arabica-animation');
      animation.innerHTML = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="50" fill="green" stroke="brown" stroke-width="5">
          <animate attributeName="r" from="50" to="100" dur="2s" begin="0s" repeatCount="indefinite"/>
        </circle>
      </svg>`;
    }
  
    function stopArabicaAnimation() {
      let animation = document.getElementById('arabica-animation');
      animation.innerHTML = '';  // 停止动画
    }
  
    function playRobustaAnimation() {
      let animation = document.getElementById('robusta-animation');
      animation.innerHTML = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="50" width="100" height="100" fill="brown">
          <animate attributeName="width" from="100" to="200" dur="2s" begin="0s" repeatCount="indefinite"/>
        </rect>
      </svg>`;
    }
  
    function stopRobustaAnimation() {
      let animation = document.getElementById('robusta-animation');
      animation.innerHTML = '';  // 停止动画
    }
  });
