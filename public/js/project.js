
    // JavaScript code

    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");
    
      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
    
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
    
    window.addEventListener("scroll", reveal);
    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[slideIndex - 1].style.display = "block";
    }

    var topslideIndex = 1;
    TopshowSlides(topslideIndex);

    function TopplusSlides(n) {
      TopshowSlides(topslideIndex += n);
    }

    function TopshowSlides(n) {
      var i;
      var topslides = document.getElementsByClassName("topmySlides");
      if (n > topslides.length) { topslideIndex = 1 }
      if (n < 1) { topslideIndex = topslides.length }
      for (i = 0; i < topslides.length; i++) {
        topslides[i].style.display = "none";
      }
      topslides[topslideIndex - 1].style.display = "block";
    }


    // Automatic slideshow timer
    var slideTimer = setInterval(function () { plusSlides(1) }, 5000);

    // Pause slideshow when hovering over the container
    var container = document.getElementsByClassName("slideshow-container")[0];
    container.onmouseover = function () {
      clearInterval(slideTimer);
    }

    // Resume slideshow when mouse leaves the container
    container.onmouseout = function () {
      slideTimer = setInterval(function () { plusSlides(1) }, 5000);
    }

    window.addEventListener("scroll", reveal);

    window.addEventListener('scroll', function () {
      var element = document.querySelector('.container2');
      var position = element.getBoundingClientRect();
      var windowHeight = window.innerHeight;

      if (position.top = 800) {
        element.classList.add('visible');
      }
    });

    container2.onmouseover = function () {
      var box = document.getElementsByClassName("box");
      box.style.height = 100;

    }



      
const prevBtns = document.querySelectorAll("#signup_cont .btn-prev");
const nextBtns = document.querySelectorAll("#signup_cont .btn-next");
const progress = document.getElementById("#signup_cont progress");
const formSteps = document.querySelectorAll("#signup_cont .form-step");
const progressSteps = document.querySelectorAll("#signup_cont .progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
btn.addEventListener("click", () => {
  formStepsNum++;
  updateFormSteps();
  updateProgressbar();
});
});

prevBtns.forEach((btn) => {
btn.addEventListener("click", () => {
  formStepsNum--;
  updateFormSteps();
  updateProgressbar();
});
});

function updateFormSteps() {
formSteps.forEach((formStep) => {
  formStep.classList.contains("form-step-active") &&
    formStep.classList.remove("form-step-active");
});

formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
progressSteps.forEach((progressStep, idx) => {
  if (idx < formStepsNum + 1) {
    progressStep.classList.add("progress-step-active");
  } else {
    progressStep.classList.remove("progress-step-active");
  }
});

const progressActive = document.querySelectorAll(".progress-step-active");

progress.style.width =
  ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}
function name(){
// insert data into a table
const firstname=document.getElementById('username').value;
const lastname=document.getElementById('position').value;}

// validation part
function validatename(){
  var f_name=document.form[1].firstname.value; 
  var l_name=document.form[1].lastname.value; 
     


if (f_name==null || f_name==""){  
alert(" first Name can't be blank"); 
formStepsNum--;
updateFormSteps();
  updateProgressbar();
return false; 
  
} 

if (l_name==null || l_name==""){  
alert(" last Name can't be blank");
formStepsNum--;
updateFormSteps();
  updateProgressbar();
return false;  
  
} 
return true;

}


function validatephone_email(){
  var num=document.form[1].phone.value; 
  var x=document.form[1].email.value;  
var atposition=x.indexOf("@");  
var dotposition=x.lastIndexOf("."); 
var phoneno = /^\d{10}$/;
if (!(num.value.match(phoneno))){  

alert("please enter your correct mobile number");
formStepsNum--;
updateFormSteps();
updateProgressbar();
return false; 
}

  
if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);
formStepsNum--; 
updateFormSteps();
  updateProgressbar();
return false; 
  
} 
return true; 
}

function matchpass(){  
  var firstpassword=document.form[1].cr_password.value;  
  var secondpassword=document.form[1].vr_password.value;  
    
  if(firstpassword==secondpassword){  
  return true;  
  }  
  else{  
  alert("password must be same!");  
  formStepsNum--;
  updateFormSteps();
  updateProgressbar();
  return false;  
  }  
}  

function CheckPassword(inputtxt) 
{ 
var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
if(matchpass()){
if(inputtxt.value.match(passw)) 
{ 

return true;
}}
else
{ 
alert('please make a strong password !');
formStepsNum--;
  updateFormSteps();
  updateProgressbar();
return false;
}
}
function validateall(){
if(CheckPassword(document.form[1].vr_password)==true ){
  return true;
}
else{
  alert('check once something is not usual');
  return false;
}
}




