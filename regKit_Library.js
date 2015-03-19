(function (window) {

function defineregister() {

    var register = [ ];
     var indicator=0;

      register.databaseping = function ()
            {
            var xmlhttp;
            if (window.XMLHttpRequest)
              {// code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp=new XMLHttpRequest();
              }
            else
              {// code for IE6, IE5
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
            xmlhttp.onreadystatechange=function()
              {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
                }
              }
            xmlhttp.open("GET","http://127.0.0.1:1337/",true);
            xmlhttp.send();

        }


     register.passwordChanged = function () {

            var strength = document.getElementById('strength');
                var progbar = document.getElementById('bar');

                 var normalRegex = new RegExp("^(?=.*[A-Z].*[A-Z].*[A-Z])(?=.*[!@#$&*].*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z]).{6,24}");
                var mediumRegex = new RegExp("^(?=.*[A-Z].*[A-Z].*[A-Z])(?=.*[!@#$&*].*[!@#$&*]*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z]).{6,24}");
                var strongRegex= new RegExp("^(?=.*[A-Z].*[A-Z].*[A-Z])(?=.*[!@#$&*].*[!@#$&*].*[!@#$&*].*[!@#$&*].*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z]).{6,24}$");
               

                var enoughRegex = new RegExp("(?=.{2,}).*", "g");

                var pwd = document.getElementById("pass");
                // alert(pwd.value);
                if (pwd.value.length==0) {
                strength.innerHTML = 'Type Password';
                } else if (false == enoughRegex.test(pwd.value)) {
                strength.innerHTML = 'More Characters';
                } 
                else if (strongRegex.test(pwd.value)) {
                strength.innerHTML = '<span style="color:green">Strong</span>';
                progbar.value="95";
                } else if (mediumRegex.test(pwd.value)) {
                strength.innerHTML = '<span style="color:orange">Medium</span>';
                 progbar.value="55";
                } else {
                strength.innerHTML = '<span style="color:red">Weak</span>';
                 progbar.value="10";
                }

    };



    register.validateForm = function () {

           var password1=document.getElementById("pass").value;
                            var password2=document.getElementById("pass1").value; 

                            if(password1==password2){
                              
                                if(register.ValidEmail() && register.isPhoneNumberFormatValid()){
                                    return true;
                                }else{
                                    return false;
                                }

                            }else{
                              alert("Password does not Match.Please re-enter password");
                                return false;
                            }
    };




    register.onRefresh = function () {

            document.getElementById("myForm").reset();

    };

    register.sessionstoragebybtn = function () {

            register.saveToSessionStorgae()
            register.onRefresh();

    };


    register.updateOnlineStatus = function () {

            alert("User is online");
                    if(indicator==1){
                                register.readFromLocalStorage();
                                indicator--;
                              }

    };


    register.updateOfflineStatus = function () {

            alert("User is offline");
             register.saveToLocalStorage();
                                indicator++;
                                register.formclear();
                  

    };




    register.localclear = function () {

             localStorage.clear();

    };



    
    register.formclear = function () {

                document.getElementById("user").value="";
                document.getElementById("lastuser").value="";
                document.getElementById("email").value="";
                document.getElementById("pass").value="";
                document.getElementById("pass1").value="";
                document.getElementById("ssn").value="";
                document.getElementById("phone").value="";
                document.getElementById("creditnum").value="";

    };

    register.saveToSessionStorgae = function () {

                    sessionStorage.removeItem("formfiller");

                    sessionStorage.setItem("formfiller",register.toJSONString());   
      };


    


    register.readFromSessionStorage = function () {
             
                var forms=sessionStorage.getItem("formfiller");
                register.readFromJSONString(forms);
        
    };





    register.toJSONString = function () {

            
                var user = document.getElementById("user").value;
                var lastuser = document.getElementById("lastuser").value;
                var email=document.getElementById("email").value;
                var pass=document.getElementById("pass").value;
                var pass1=document.getElementById("pass1").value;
                var ssn=document.getElementById("ssn").value;
                var phone=document.getElementById("phone").value;
                var creditnum=document.getElementById("creditnum").value;

                    var formfiller = [{"username": user,
                                        "lastuser":lastuser,
                                        "email":email,
                                        "pass":pass,
                                        "ssn":ssn,
                                        "creditnum":creditnum,
                                        "phone":phone}];
                    var JSONforfiller = JSON.stringify(formfiller);
                    return JSONforfiller;
    };



    register.readFromJSONString = function (forms) {

                var form1=[];
                var form1=JSON.parse(forms);


                document.getElementById("user").value=form1[0].username;
                document.getElementById("lastuser").value=form1[0].lastuser;
                document.getElementById("email").value=form1[0].email;
                document.getElementById("pass").value=form1[0].pass;
                document.getElementById("pass1").value=form1[0].pass;
                document.getElementById("ssn").value=form1[0].ssn;
                document.getElementById("phone").value=form1[0].phone;
                document.getElementById("creditnum").value=form1[0].creditnum;
        
    };

         register.saveToLocalStorage = function () {

                 
                if (Modernizr.localstorage) {
                    alert("Your Browser supports Local Storage");
                    localStorage.removeItem("formfiller");
                    localStorage.setItem("formfiller",register.toJSONString());   
           
            }else{

              alert("Sorry,your browser does not support localstorage");

            }

    };


            register.readFromLocalStorage = function () {

                if (Modernizr.localstorage) {
                            var forms=localStorage.getItem("formfiller");
                            register.readFromJSONString(forms);
                    }else{

                            alert("Sorry,your browser does not support localstorage");

                    }

    };

    register.isPhoneNumberFormatValid=function()

    {     var phone=document.getElementById('phone');
          var phonenoformat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
          if(phone.value.match(phonenoformat))
            {return true;}
        else{alert("Please enter valid phone number");
        return false;}

    };


    register.ValidEmail=function()

    {     var email=document.getElementById('email');
          var emailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(email.value.match(emailformat))
            {return true;}
        else{alert("Please enter valid email id");
        return false;}

    };

    return register;

    }

if(typeof(register) === 'undefined') {
    window.register = defineregister();

}
}) (window);


