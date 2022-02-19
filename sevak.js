const express = require("express");
const bodyParser = require("body-parser");
// import { BearerParser } from 'bearer-token-parser';
var sha512 = require("js-sha512").sha512;
var sha512 = require("js-sha512").sha384;
// used for nisarg shah
// var TokenGenerator = require('token-generator');
var token = require("token");
const Pbkdf2 = require("nodejs-pbkdf2");
const bearerToken = require("express-bearer-token");
token.defaults.secret = "AAB";
token.defaults.timeStep = 24 * 60 * 60; // 24h in seconds

var events = require("events");
const mysql = require("mysql");
const cors = require("cors");
const json = require("body-parser/lib/types/json");
var url = require("url");
const { query } = require("express");
const { send, connected } = require("process");
const { sha384 } = require("js-sha512");
const { cookie, type } = require("express/lib/response");
const { text } = require("body-parser");
const { AsyncLocalStorage } = require("async_hooks");
const app = express();
var jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const { connect } = require("http2");
const { checkPrime } = require("crypto");
const { runInThisContext } = require("vm");
const { stat } = require("fs");
var nodemailer = require('nodemailer');
const { Console } = require("console");
var con;

// var hostnamefordb='68.66.248.28'

// var dbname='absolu14_sevak';
// var userfordb='absolu14_sevak';

// var passwordfordb='sy)ww&tzQmhy';

var hostnamefordb='127.0.0.1'
var dbname='sevak';
var userfordb='root';
var passwordfordb='';


("use strict");
app.use(
  cors({
    origin: "*",
  })
);
const port = '8000';

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

var privatekey = "1234";
var queryresult;
var ans = [];
var reult;
var transporter;
var mailOptions;
var reciveremail;
var golbaluser;


function configureemail(){
  
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shahnisargdevlopmenttesting@gmail.com',
      pass: 'lenovologin'
    }
  });


  return transporter;



}

function emailoptions(reciveremail,subject,text){
   
  
  
  mailOptions = {
    from: `shahnisargdevlopmenttesting@gmail.com`,
    to: `${reciveremail}`,
    subject: `${subject}`,
    // text: `${text}`,
    html :`${text}`
  };


  return mailOptions;

}

function sendemail(reciveremail,subject,text){

var transporter =configureemail();


var mailOptions =emailoptions(reciveremail,subject,text);


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
   

  }
});


}


function setValue(value) {
  someVar = value;
  console.log(someVar);
}

function connectiondb() {
  con = mysql.createPool({
        host: `${hostnamefordb}`,
        user     : `${userfordb}`,
        password : `${passwordfordb}`,
        database : `${dbname}`,
        multipleStatements: true

  });

  con.getConnection(function(err, connection){
    if(err){
        res.status(500);
        res.json(bodyerr);

    }
    else{
      
    }
  })

  // con.connect(function (err) {
  //   if (err) {
  //     console.log(err);
  //     res.status(500);
  //     res.json(bodyerr);
  //   } else {
  //   }
  // });
}

var bodyerr = {
  status: "400",
  message: "404 not found",
};

var bodyonsucess = {
  status: "200",
  message: "sucess fully done",
};

function setValue(value) {
  someVar = value;
  console.log(someVar);
}

function authrizationverification(req, res, next) {
  var token = req.headers.authorization;
  console.log(token);

  if (token == undefined || token == null) {
    res.status(401);
    res.send("unauthorized");
  } else {
    jwt.verify(token, "secret", function (err, decoded) {
      // console.log()
      // bar
      if (err) {
        res.status(403);

        res.send("unauthorized");
      } else {
        // console.log(req);
        console.log(decoded);

        next();
      }
    });
  }
}
// status: working


app.post("/sevakapi/Register", function (req, res) {
  try {


    var p=l= address=mobilenumber= ifsevakcoordinator= alternatecontactnumber= city=state= createdat=sevak_village_code_id=zone_coordinator_id = null;

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    mobilenumber = req.body.mobilenumber;
    ifsevakcoordinator = req.body.ifsevakcoordinator;
    alternatecontactnumber = req.body.alternatecontactnumber;
    address = req.body.address;
    // // city = req.body.city;
    state = req.body.state;
    // createdat = new Date();








    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
    sevak_village_code_id = null;
    zone_coordinator_id = null;

    var is_register = 1;
    var is_active_status = 0;

    connectiondb();

    console.log(req.body);

    if ((req.body.username && req.body.password && email && ifsevakcoordinator) == null) 
    {
      res.status(203);
      res.json(bodyerr);
    } else {
      var sql = `SELECT user_name ,email  from user where user_name='${username}' || email='${email}';
            `;


      con.query(sql, function (err, result, fields) {
        if (err) {
          res.status(500);
          res.json(bodyerr);

        } else {
          // console.log(result);
ans=result;
console.log(result);

// res.send(result);
console.log(ans.length);



// console.log("thnis is ans[0]",ans.username);

          //    console.log("error is not happen ")
          if (ans.length > 0) {
            if (username == ans[0].user_name || email==ans[0].email) {
              // res.send("user alrteady exist");
              var data = {
                message: "user already exist",
              };
              var c = { ...bodyerr, ...data };
              res.status(203);
              res.json(c);
            }
         
            
            
            
            
          
          }
          else{

            con.end();

            console.log("code is hear");

            var c = sha512(`${username}+${password}+${privatekey}`);

            var sql = `INSERT INTO user ( user_name, email, password, mobile_number, alternate_contact_number, address, city, state,  if_sevak_coordinator, is_register, is_active_status, created_at) VALUES ( '${username}','${email}','${c}', '${mobilenumber}','${alternatecontactnumber}', '${address}', '${city}','${state}', '${ifsevakcoordinator}', '0', '${is_active_status}', '${dateTime}');`


            console.log(sql);
                connectiondb();

            con.query(sql, function (err, result, fields) {
              if (err) {
console.log("error gentrate",err);
                 throw err;


              }
              else {
                ans = result;

                var message = {
                  message: "Registation is Scuess",
                };

                // res.send("hi thanks for callinbg me " + c);
                // res.cookie(`acess_token`, `${d}`, `${options}`);
                // res.send("Registtion is Sucess");
                var combine = { ...bodyonsucess, ...message };
                res.status(200);

                res.json(combine);
                con.end();

              }
            });

          }
          
            // console.log(result);
         
          

        }
      });
    }
  } catch (err) {
    console.log("errors", error);
    res.status(500);
    res.body(bodyerr);


    //    res.status(500);
    //    res,send(bodyerr);
  } finally {


    // con.end();



            // con.end();
  }

  // console.log("req", req);
});

// status: working

app.post('/sevakapi/login', function(req, res) {

  try {
      var username = req.body.username;
      var password = req.body.password;

      // var email = req.body.email;

      // console.log(req.body);


      if ((req.body.username && req.body.password) == null) {

          res.state(404);
          res.json(bodyerr);


      } else {

          var c;
          c = sha512(`${username}+${password}+${privatekey}`);


          connectiondb();



          var sql = `SELECT user_name ,password ,is_active_status, role_id ,sevak_village_code_id FROM user WHERE user_name='${username}'  AND  password='${c}';`

          // var sql=``;


          con.query(sql, function(err, result, fields) {
              if (err) {
                  console.log(err);
                  res.status(404);
                  res.json(bodyerr);


              }


              var data={
                userdetail: result
              }

              console.log(result);

              ans = result;

var sevak_village_code_id=0;




              console.log("ans", ans);

              if (ans.length == 0) {

                  res.status(203);

                  res.json(bodyerr);


              } 
              else if(ans[0].is_active_status==0 )
              {
                res.status(205);
                var message ={
                  message:"contact your admin"
                }
                res.json(message);

              }
              
              
              else if (c == ans[0].password && username==ans[0].user_name && ans[0].is_active_status==1) {

                sevak_village_code_id=ans[0].sevak_village_code_id;

// var sql=`SELECT  user_permission.* from user, user_permission WHERE user.role_id=user_permission.id`;
var sql=`SELECT user.id,user.email,role_permission.permission_id, user_permission.user_permission_name, user_permission.permission_name FROM  user  LEFT JOIN role_mgt ON role_mgt.id=user.role_id LEFT JOIN role_permission on role_permission.role_id=role_mgt.id LEFT JOIN user_permission ON user_permission.id=role_permission.permission_id WHERE user.user_name='${ans[0].user_name}' and user.role_id='${ans[0].role_id}' and role_permission.is_activated=1;`;

console.log(sql);

var userpermission;
con.query(sql, function(err, result, fields) {
if (err) {
  console.log(err);

  throw err
}

else{

  one=result;

  for (let index = 0; index < one.length; index++) {

  delete  one[index].id;
  delete  one[index].email;
  delete  one[index].permission_id;
  delete  one[index].email;
  // userpermission[index].status=1;




 
    
  }



  // var arr = [{key:"11", value:"1100"},{key:"22", value:"2200"}];
var object = one.reduce(
  (obj, item) => Object.assign(obj, { [item.permission_name]: 1 }), {});

  userpermission=object;
    
    










}



})



                  var d = sha384(`${username}+${password}+${privatekey}`);
                  // var d = req.cookie("acesstoken");
                  // var d = sha384(`${d}`);

                  var d = jwt.sign({ data: d }, 'secret', { expiresIn: '1h' });
                  // res.cookie("Acess_Token", `${d}`, { expire: 86400 + Date.now() });
                  res.set({
                      "acesstoken": `${d}`
                  });
                  a = "login sucess";
                   var roleid=ans[0].role_id
                  
                    var sql=`SELECT * FROM role_mgt WHERE id='${roleid}';`;


                    con.query(sql, function(err, result, fields) {

                      if(err){
                        console.log(err);
                        throw err;


                        
                      }

                      else{

                        ans=result;

                        if(ans.length==0)
                        {
                          res.status(404);
                          res.json(bodyerr);

                        }
                        else{

                var userole={
              role:result
                }

                var sql= ` SELECT * FROM village_code_mgt where id ='${sevak_village_code_id}'`;
                con.query(sql, function(err, result, fields) {
          
                  if (err){
                    console.log(err);
                  
                  }
          
                  else{
          
                    var villagecode=result;


                                         
                  body = {
                    headers: {
                        acesstoken: `${d}`
                    },
                    body: `login sucess `
                }

                
                var combine={
                  data,
                  body,
                  bodyonsucess,
                  userole,
                  userpermission,
                  villagecode

                }

                res.json(JSON.parse(JSON.stringify(combine)));

                
          
          }
          con.end();
          })

                


     

                        }






                      }


                    })


                  // res.send(req.header);
                  // res.end("login sucess fully")


                  // res.send(json.stringify(c));





                 





                  // genrating token hear for session storage 


              }

       

          });


      }


  } catch (error) {
      console.log(error);
      res.status(500);
      res.json(bodyerr);


  }

  finally{
    // con.end();

    // console.log("implemnt");

    // con.end();
  }
  // console.log("req", req);



















});

// status: working

app.post('/sevakapi/resetpassword', function(req, res) {



  try {
      var username = req.body.username;
      var password = req.body.password;
      var newpassword = req.body.newpassword;

      if ((req.body.username && req.body.password && newpassword) == null) {
       
        res.status(404);
        res.json({message:"unauthrized way "});


      } else {


        var c = sha512(`${username}+${password}+${privatekey}`);


connectiondb();


          var sql = `SELECT user_name,password  FROM user WHERE user_name='${username}'  AND  password='${c}';`
          
         con.query(sql, function(err, result, fields) {
              if (err) {
                console.log(err);
              }
 

              console.log(result);


        ans=result;
        console.log(ans);


              // console.log("user", typeof(ans[0].user_name));

              //  c = sha512(`${username}+${password}+${privatekey}`);



              if (ans.length==0  || username != ans[0].user_name && c != ans[0].password) {
                 
                
                res.status(203);
var bodyerr={
  status:"203",
  message:"Password is Wrong"
  
}
                  res.json(bodyerr);



              } else {





                  // var t = pbkdf2.hashPassword(`${password}`, (err, cipherText, salt) => {
                  //     console.log("cipher", cipherText);
                  //     console.log("salt", salt);
                  // });

                  // console.log("this is t ", );
                  // either hash or sha 512
                  // genrate acess token 

                  // var d = token.generate([username, password]);
                  // console.log("token genrate ", d);


               var c = sha512(`${username}+${newpassword}+${privatekey}`);

                  console.log("stoping hear");

           
                   
            


                  var sql = `UPDATE user SET password='${c}' WHERE user_name='${username}'`
                  con.query(sql, function(err, result, fields) {
                      if (err) throw err;

                      else {
                          console.log(result);
                          ans = result;
                      }


                      // res.send(result)

                  });







                  console.log("stoping hear");


               
var measaage={
  message :"password is sucess fully reset"

}

var combine={
  bodyonsucess,
  measaage
}

                  // res.send("hi thanks for callinbg me " + c);
                  // res.cookie(`acess_token`, `${d}`, `${options}`);
                  res.status(200);
                  res.json(combine);
                  con.end();


              }



          });



























          // } catch (e) {
          //     console.log(e);
          // }










      }


  } catch (error) {
      console.log(error);
res.status(500);
res.json(bodyerr);

      // res.send("404 not found")

  }
  finally{
    // con.end();
  }
  // console.log("req", req);



















});

// status: working

app.post('/sevakapi/forgetpassword', function(req, res) {



  try {
      var username = req.body.username;
  
      var email=req.body.email;



      if ((req.body.username || req.body.email ) == null) {
       
        res.status(203);
        res.json(bodyerr);

      } 
      else {


       


           connectiondb();


           var sql = `SELECT user_name,email  FROM user WHERE user_name='${username}' || email='${email}';`
          
          con.query(sql, function(err, result, fields) {
              if (err) {
                console.log(err);
                res.status(500);
                res.json(bodyerr);

              }
 
              else{



        ans=result;

      

        // console.log(ans);



              // console.log("user", typeof(ans[0].user_name));

              //  c = sha512(`${username}+${password}+${privatekey}`);



              if (ans.length==0  ||  ( email!=ans[0].email )  ) {
                 
                
                res.status(202);
var bodyerr={
  status:"202",
  message:"email is not register"
}
                  res.json(bodyerr);



              } else {


                reciveremail=ans[0].email;
                golbaluser=ans[0].user_name



var sql=`SELECT user_name, email,  session_time FROM forgot_password WHERE user_name='${ans[0].user_name}' || email='${ans[0].email}' `;


con.query(sql, function(err, result, fields) {
         if (err) {
         console.log(err);
       }

       else{

        console.log(result);
        ans=result;

        var now     = new Date(); 
var year    = now.getFullYear();
var month   = now.getMonth()+1; 
var day     = now.getDate();
var hour    = now.getHours();
var minute  = now.getMinutes();
var second  = now.getSeconds(); 
var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;

var otp=Math.floor(Math.random()*10000);
console.log(otp);


        if(ans.length > 0 && (username==ans[0].user_name || email==ans[0].email)){

          var sql=`UPDATE forgot_password SET temp_otp='${otp}',session_time='${dateTime}' WHERE user_name='${golbaluser}' `


        } 
        
        
        else {
          
          var sql = `INSERT INTO forgot_password(user_name, email, temp_otp, session_time) VALUES ('${golbaluser}','${reciveremail}','${otp}','${dateTime}')`;
      console.log(sql);

      
      }
        

                  con.query(sql, function(err, result, fields) {
                      if (err) 
                      throw err;

                      else {
                          console.log(result);
                          ans = result;
                      }

                var subject="Rest passwrod";

var text=`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
  </div>
  <p style="font-size:1.1em">Hi,</p>
  <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 15 minutes</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">`+`${otp}`+`</h2>
  <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>Your Brand Inc</p>
    <p>1600 Amphitheatre Parkway</p>
    <p>California</p>
  </div>
</div>
</div>`;


console.log("ans",ans);


                      sendemail(reciveremail,subject,text);   
                  });

var message={
  message:"otp is send to email "
}

var combine={
  bodyonsucess,
  message
}

             
res.status(200);
res.json(combine);

                  con.end();


              }



          });



























          // } catch (e) {
          //     console.log(e);
          // }










      }


          } 

});

      }
    }

  catch (error) {
      console.log(error);
res.status(500);
res.json(bodyerr);

      // res.send("404 not found")

  }
  finally{
    // con.end();
  }
  // console.log("req", req);



















});

// status: working

app.post('/sevakapi/resetauthatication', function (req, res) {

 try {

  username=req.body.username;
  newpassword=req.body.newpassword;
  email=req.body.email;
  otp=req.body.otp;
  var now     = new Date(); 
  var year    = now.getFullYear();
  var month   = now.getMonth()+1; 
  var day     = now.getDate();
  var hour    = now.getHours();
  var minute  = now.getMinutes();
  var second  = now.getSeconds(); 
  var match=
  minute=minute+15;
  var date = now.toLocaleDateString();
var time = now.toLocaleTimeString();
  var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;


  if(( email ) && newpassword && otp ==null ){

    res.status(404);
    res.json(bodyerr);




  }

  else{

    connectiondb();

   
var sql=`SELECT user_name, email,session_time,temp_otp FROM forgot_password WHERE user_name='${username}' || email='${email}' `;



con.query(sql, function(err, result, fields) {
  if (err) {
    console.log(err);
  } 
  else{
    console.log(result);
    ans=result;
var dateq=ans[0].session_time;
t=dateq.toLocaleDateString();
var r=dateq.toTimeString();
var clientemail=ans[0].email;



// t=Object.keys(dateq);


var q=[];
q=r.split(" ");

var io=q[0].split("")
console.log(t,"bbbbb",io);
var h=`${io[0]}`+`${io[1]}`;


var xyz=`${io[3]}`+`${io[4]}`;


     if((otp==ans[0].temp_otp && (username==ans[0].user_name || email==ans[0].email)) && (t==now.toLocaleDateString() && h==hour && xyz <= minute )  || email==ans[0].email){

      var c = sha512(`${ans[0].user_name}+${newpassword}+${privatekey}`);

   var sql=`UPDATE user SET  password='${c}' WHERE user_name='${ans[0].user_name}'`


      con.query(sql, function(err, result, fields) {
        if (err) {
          console.log(err);
        } 

        else{
        
            console.log(result);
            res.status(200);
            var message={
              message:"password reset sucessfully"
            }
var combine={
  bodyonsucess,
  message
}

var subject="password reset notification";

var text=`
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
  </div>
  <p style="font-size:1.1em">Hi,</p>
  <p>your Password is changed Sucessfully</p>

  <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>Your Brand Inc</p>
    <p>1600 Amphitheatre Parkway</p>
    <p>California</p>
  </div>
</div>
</div>

`;


sendemail(clientemail,subject,text);




            res.json(combine);
   con.end();



        }


      });


     }

     else{

      res.status(404);
      res.json(bodyerr);
      

     }
  


  }

  

})




  }
   
 } catch (error) {

  res.status(500);
  res.json(bodyerr);

   
 }
 finally{
  
 


 }










  
})

// get user profile full in db
// all in one stuff 
// work in progress

app.post('/sevakapi/userdata', function (req, res) {


  try {

    connectiondb();

    var sql=`select user.* from user`;
    
  
  


 
con.query(sql, function(err, result, fields) {

if (err){
  console.log(err);

}
else{

   var result1=result;
var c=result1.length
   for (let index = 0; index < c; index++) {

    delete result1[index].password;


     
   }






   var sql=`SELECT * FROM role_mgt`;
   con.query(sql, function(err, result, fields) {

    if (err){
      console.log(err);
    
    }

    else{

      var result2=result
      var sql= ` SELECT * FROM village_code_mgt`;
      con.query(sql, function(err, result, fields) {

        if (err){
          console.log(err);
        
        }

        else{

          var result3=result;


          var sql=` SELECT * FROM zone_coordinator_mgt` 

          con.query(sql, function(err, result, fields) {
            if (err){
              console.log(err);
            
            }

            else{
              var result4=result
              console.log(result)
              
              var finalresult={
                result1,
                result2,
                result3,
                result4
              }

              res.json(finalresult);

 

            }

          })

        }

        
      })
    }



   })




}

})



  } catch (error) {
    
  }

  finally{

  }




})

// get data for paticuor village data 
// status: working


app.post('/sevakapi/userdata/:id', function (req, res) {

  sevak_village_code_id=req.body.sevak_village_code_id

  var t=req.params("id");

  if(t==1){

  var sql=`SELECT * FROM village_code_mgt`

  }
  else if(t==2){

var sql=`SELECT * form village_code_mgt where id='${sevak_village_code_id}'`




  }


  con.query(sql, function(err, result, fields) {

    if (err){
      console.log(err);
      res.status(404);
      res.json(bodyerr);
      
    
    }

    else{


      res.status(200);
      var combine={
        bodyonsucess,
        data:result

      }
      res.json(combine)

      con.end();


    }

  })


  

  




  
  
})


// status: working

// patient data header
// only for headers
// used for genrat downaldo main file 

app.get('/sevakapi/downlaodallpatientdata', function(req, res) {

  try{

      connectiondb();

      // console.log(req.params)
      // console.log(req.params.id)
      var sql = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${dbname}' AND TABLE_NAME = 'patient_data';`
      con.query(sql, function(err, result, fields) {
          if (err) throw err;
          console.log(typeof(result));
          // var combine={...bodyonsucess,...result};
          // res.send(result);

           var d={
               data :[`${result}`
               ]
           }
console.log(result.length);

var combine={bodyonsucess,result};

          res.json(combine);
          
          

      });
      // con.end();

  }


  catch(err){
    res.status(500);
    res.json(bodyerr);
    // con.end();


  }


finally{
 
 


}

  
      





})





// upload patient data in form genral 

app.post('/sevakapi/uploadallpatientdata', function(req, res) {
  
  try{
    var iiii=req.body;

    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;

    var sevakdata=req.body.villagedata;
    var sevakusername=req.body.username;


    if((sevakdata.distcode && sevakdata.distname && sevakdata.village && sevakdata.villagename)!=null){
     
 
     connectiondb();
     
    var sql=`SELECT id FROM village_code_mgt where dist_code='${sevakdata.distcode}' && dist_name='${sevakdata.distname}' && village_code='${sevakdata.village}' && 	village_name='${sevakdata.villagename}' `
 
    con.query(sql,
       function(err, result) {
   
     if (err) {
         console.log(err);
         res.status(500);
 
         res.json(bodyerr);
 
     }
 
     else{
       ans=result;

       console.log(ans);

 
       if(ans.length>0){
 
         sevakvillageid=ans[0].id;
 
         try{
 
           var sql =`INSERT INTO patient_data(paitent_number, adhar_number, followup_need, follow_up_date, paitent_name, paitent_address, paitent_age, paitent_mobile_number, paitent_sex, paitent_matrial_status, family_income_level, income_level, education_level, if_allergies, if_allergies_specify, smoking, tobaccouse, form_tobaccouse_chew_tobacco_product, tobaccouse_number_per_day, if_alcoholuse, freq_alcoholuse, diet_restriction, if_vegetarian_non_vegetarian, drug_abuse, family_history_father_alive_or_deceased, father_age_at_death, father_death_reason, family_history_mother_alive_or_deceased, mother_age_at_death, mother_death_reason, family_diseases_history_list, medical_history_diseases_list, if_diabetes, which_age_diabetes_detect, taking_insulin, taking_diabetes_pills, last_time_checked_blood_pressure, freq_feet_checking, sore_or_irritations, past_last_twelve_months_diabetes_checkups_no, past_last_twelve_months_hba1c_checkups_no, examined_your_feet_for_diabetes, due_to_diabetes_eyesight_less_visible, know_diabetic_retinopathy, blood_pressure_checkup, have_high_blood_pressure, doctor_said_high_blood_pressure, did_you_checked_cholesterol, cholesterol_level, last_blood_cholesterol_checkup, do_you_know_breast_cancer_examination, how_often_do_you_check_yourself_breast_cancer, pap_smear, if_pap_smear_last_test, do_u_smoke, do_you_know_what_happens_when_you_smoke_lot, chew_tobacco, mouth_cancer_awareness, have_a_toilet, toilet_inside_or_outside, do_you_have_stoves, if_yes_its_type, type_of_drinking_water, measurements_height, weight, lbs, bmi, waist_circumference, hip_circumference, systolic_bp, diastolic_bp, blood_pressure, pulse_rate, fasting_blood_sugar, fasting_blood_sugar_diagnosis, rbs_randomly_blood_sugar, rbs_randomly_blood_sugar_diagnosis, followup_comments, signature, if_female_pregnant, expected_date_of_delivery, gestational_diabetes, gender_child, child_birth_weight, gestational_age_child, have_tuberculosis, have_hemoglobin, have_bloodpressure, have_diabetes,sevak_username,created_at,dist_code, dist_name, village_code, village_name) VALUES ?`;
       
           var values = []

     
     
      
           values = req.body.data;
           copyofdata=[].concat(values);


           patcheddata=[`${sevakusername}`,`${dateTime}`,`${sevakdata.distcode}`,
         `${sevakdata.distname}`, `${sevakdata.village}`,`${sevakdata.villagename}`]

     var temparray=[];

   
     for (let index = 0; index < values.length; index++) {

      let v1= values[index]
      for (let j =85 ; j <89; j++) {
        if(v1[j]== 'Y' || 'yes' || 'Yes' ){
          
          v1[j]=1;

        }
        else{
          v1[j]=0;

        }
      }
       
       
     }


 
    


           for (let index = 0; index < values.length ; index++) {

      
      
      
      
            values[index]= values[index].concat(patcheddata);
      
               
        
      
             
           }

     console.log(values);
     console.log();

     
     
       
       con.query(sql, [values], function(err, result) {
       
               if (err) {
                   console.log(err);
                   res.status(202);
     var combine={
       bodyerr,
       err
     }
                   res.json(combine);
       
               } else {
                   res.status(200);
                   res.json(bodyonsucess);  
               }
       
           })
       
       
       }
       catch(err){
   
         res.status(500);
         res.json(bodyerr);
     
     
     }
     finally{
       con.end();
       
       }
 
       }

       else{
        res.status(404);
        res.json(bodyerr);

       }
 
     
 
     }
    
   });
 
 
 
 
 
 
    }

    else{
      
      res.status(404);
      res.json(bodyerr);


    }
  }


    catch(err){
  
        res.status(500);
        res.json(bodyerr);
    
    
    }
    finally{
      // con.end();
      
      }



  
 
  

  
  })

  // all patientdata

  app.post('/sevakapi/allpatiendata/:pagination/:limit',  function(req, res) {

    var pagination=req.params.pagination;
    var limit=req.params.limit;
    
    try {
    
            connectiondb();
            var sql = `SELECT * FROM sevakdata where id between ${pagination} AND  ${pagination*limit}`;
            con.query(sql, function(err, result) {
    
                if (err) {
                    res.status(401);
                    res.json(bodyerr);
    
            

    
    
    
                } else {
    
                    var data = result;
    
    
    
    
    
    
                    // console.log(result);
                    // res.send(result)
                    var combination={bodyonsucess,result};
    
                    
                    res.json(combination);
    
    // con.end();
    
    
    
    
    
    
    
    
                }
    
            })
    
        } catch (err) {
          // con.end();
        }
    
    });

  // testing api

    app.get('/sevakapi/connectdb', function(req, res)  {

      // var mysql      = require('mysql');
  connection = mysql.createConnection({
        host     : `${hostnamefordb}`,
        user     : `${userfordb}`,
        password : `${passwordfordb}`,
        database : `${dbname}`
      })

      try{
        connection.connect();
        res.send("sucess");
      }
      catch(err){
        res.send("error",err)
      }
      


      
  
      
 
        });




// this api for dropdown in file upload screen




    app.post('/sevakapi/villagecode/1', function(req, res)  { 

    console.log(req.body);


connectiondb();

if(req.body.distcode==null)
{
  var sql=`SELECT id , dist_code ,dist_name FROM village_code_mgt where is_active_status=1`;



}


con.query(sql,function(err, result) {

  if(err)
  {
  console.log(err);
  res.status(500);
  res.json(bodyerr);
  
  }
  else{
  
    
  
    var combine={
       data:result,
      bodyonsucess
    }
    res.status(200);
  
    res.json(combine);
  
  
  
    // con.end();
  
  }
  
  
  })




      


      
  
      
 
        });
        // this api for dropdown in file upload screen
    app.post('/sevakapi/villagecode/2', function(req, res)  {

    console.log(req.body);


connectiondb();
 if(req.body.distcode !=null ){
 
  var sql=`SELECT id,dist_code,dist_name FROM village_code_mgt where dist_code='${req.body.distcode}'` 

}

else{

  
}









con.query(sql,function(err, result) {

  if(err)
  {
  console.log(err);
  res.status(500);
  res.json(bodyerr);
  
  }
  else{
  
    
  
    var combine={
       data:result,
      bodyonsucess
    }
    res.status(200);
  
    res.json(combine);
  
  
  
    // con.end();
  
  }
  
  
  })




      


      
  
      
 
        });
        // this api for dropdown in file upload screen
    app.post('/sevakapi/villagecode/4', function(req, res)  {

    console.log(req.body);


connectiondb();

 if(req.body.village!=null)
  {
    var sql=`SELECT id, dist_code ,dist_name,village_code, village_name FROM village_code_mgt where dist_code='${req.body.distcode}' && dist_name='${req.body.distname}' &&  village_code='${req.body.village}'` 
  }




else{


}









con.query(sql,function(err, result) {

  if(err)
  {
  console.log(err);
  res.status(500);
  res.json(bodyerr);
  
  }
  else{
  
    
  
    var combine={
       data:result,
      bodyonsucess
    }
    res.status(200);
  
    res.json(combine);
  
  
  
    // con.end();
  
  }
  
  
  })




      


      
  
      
 
        });
// this api for dropdown in file upload screen
        
    app.post('/sevakapi/villagecode/3', function(req, res)  {

    console.log(req.body);


connectiondb();
 if(req.body.distname !=null ){
 
  var sql=`SELECT id,dist_code,dist_name,village_code FROM village_code_mgt where dist_name='${req.body.distname}'` 

}

else{


}









con.query(sql,function(err, result) {

  if(err)
  {
  console.log(err);
  res.status(500);
  res.json(bodyerr);
  
  }
  else{
  
    
  
    var combine={
       data:result,
      bodyonsucess
    }
    res.status(200);
  
    res.json(combine);
  
  
  
    // con.end();
  
  }
  
  
  })




      


      
  
      
 
        });

      

        app.post('/sevakapi/followup/tb', function (req, res) {

          try{


            connectiondb();

            // var sql=``;
            var sql=`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${dbname}' AND TABLE_NAME = 'disease_patient_data'`;

            con.query(sql,function(err, result) {

              if(err){
                res.status(500);
                res.json(bodyerr);
           
              }
           
              else{
           
               console.log(result);
               
           
           
           
                
              }
               
           
             });


          }

          catch(err){

          }


        })


// disease master api
// status: working


app.post('/sevakapi/add/disease',function (req, res)
{

  var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;

  // var date=new date();

  console.log(req.body);

  var values=[]
  try {


if((req.body.diseasename && req.body.status)==null){

  res.status(404);
  res.json(bodyerr);

 
  



}

else{
  connectiondb();
    
  var sql=`INSERT INTO disease_master (disease_name,status) VALUES ('${req.body.diseasename}','${req.body.status}');`




con.query(sql, function(err, result) {
     
    if (err) {
        console.log(err);
        res.status(500);

        res.json(bodyerr);

    } else {
        res.status(200);
        var combine={
          bodyonsucess
        }
        res.json(combine);  
    }

})
}



  } catch (error) {

    console.log(err);
    res.status(500);
    
  }

})

// update disease data

// status: working


app.post('/sevakapi/update/disases',function (req, res)
{

  try {

  var id=req.body.id;

  var  disease_name=req.body.diseasename;
  var  status=req.body.status;

if((id && disease_name && status )==null){
 
  res.status(404);
  res.json(bodyerr);


}
else{

  connectiondb();
    
  var sql=`UPDATE disease_master SET disease_name='${disease_name}',status='${status}',updated_at=CURRENT_TIMESTAMP where  id='${id}'`


  con.query(sql, function(err, result) {
     
    if (err) {
        console.log(err);
        res.status(500);

        res.json(bodyerr);

    } else {
        res.status(200);
        var combine={
          bodyonsucess
        }
        res.json(combine);  

    }

})

}


  



  } catch (error) {
    
  }

})


// view disease data
// status: working



app.post('/sevakapi/view/disasesdata/:id',function (req, res)
{

  try {

    if(req.params.id==0){



      var sql=`SELECT * FROM disease_master where status=1`;



    }
    else{

      
    var sql=`SELECT * FROM disease_master where id='${req.params.id}'`

    }

     


    connectiondb();
    
    con.query(sql, function(err, result) {
       
      if (err) {
          console.log(err);
          res.status(500);

          res.json(bodyerr);

      } else {
         res.status(200);

         var combine={
           bodyonsucess,
           data: result

         }
         res.json(combine);

      }

  })



  } catch (error) {

    res.status(500);
    res.json(bodyerr);

    
  }

})


//view or display quetions api
// status: working




app.post('/sevakapi/view/quetions/:id/:page?/:limit?',function (req, res)
{

  var page;


     var a=page=req.params.page;
     var b=req.params.limit;

var c=a*b;
var b=c;

var a=c-10;



  try {

    if(req.params.id==0){



      var sql=`SELECT * FROM disease_wise_quetion_master where id between ${a} AND ${b}`



    }
    else{

      
    var sql=`SELECT * FROM  disease_wise_quetion_master  where id='${req.params.id}'`

    }

     


    connectiondb();
    
    con.query(sql, function(err, result) {
       
      if (err) {
          console.log(err);
          res.status(500);

          res.json(bodyerr);

      } else {

        result1=result;


        var combine={
          bodyonsucess,
          data: result1

        }

 
        if(req.params.id==0){

var sql=`select  COLUMN_TYPE AS anyAliasName , data_type from information_schema.columns where table_schema = '${dbname}' and table_name = 'disease_wise_quetion_master'`

con.query(sql, function(err, result) {
     
  if (err) {
    console.log(err);
    res.status(500);

    res.json(bodyerr);

           }

  else{

    result2=result;

    var temp={
      data2:result2
    }
var sql=`SELECT * FROM disease_master`;


con.query(sql, function(err, result) {


  if (err) {
    console.log(err);
    res.status(500);

    res.json(bodyerr);

           }

           else{
            result3=result;
            var temp2={
              data3 :result3
            }
var temp3;

var sql=`select count(*) as noofrecords from disease_wise_quetion_master`
con.query(sql, function(err, result) {
  if (err) {
    console.log(err);
    res.status(500);

    res.json(bodyerr);

           }

           else
           {

            result4=result;
            console.log(result[0].noofrecords);

var Total_Records =result[0].noofrecords;
var Total_Pages = parseInt(Total_Records/10);
var ee=parseInt(page);

var curent_page=ee;
var next_page =ee+1;

var next_pageurl='';
            

             temp3={
              pagination:{
                current_page: curent_page,
                totoalpage:Total_Pages,
                totoalrecords:Total_Records,
                next_page:next_page,
                next_pageurl:next_pageurl
              }

            }


           }

           var a={...combine,...temp,...temp2,...temp3};


           res.status(200);
           res.json(a);

})


           
           }

})


  


           }


})

        }

        else{
          res.status(200);

       
         res.json(combine);
        }




         

      }

  })



  } catch (error) {

    res.status(500);
    res.json(bodyerr);

    
  }

})

// api for add quetions
// status: working


app.post('/sevakapi/add/quetions',function (req, res)
{

  var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;

  // var date=new date();

  console.log(req.body);

  var values=[]
  try {




    var id=req.body.diseasename;
    var status=req.body.status;
    var quetion= req.body.quetions;
    var type=req.body.type;
var followup=req.body.followup

if((id && status  && quetion && type )==null){

  res.status(404);
  res.json(bodyerr);

 
  



}

else{
  connectiondb();
    
  var sql=`INSERT INTO disease_wise_quetion_master(disease_id,quetions,type,status,is_folloup_question,created_at) VALUES ('${id}','${quetion}','${type}','${status}','${followup}',CURRENT_TIMESTAMP)`




con.query(sql, function(err, result) {
     
    if (err) {
        console.log(err);
        res.status(500);

        res.json(bodyerr);

    } else {
        res.status(200);
        var combine={
          bodyonsucess
        }
        res.json(combine);  
    }

})
}



  } catch (error) {

    console.log(err);
    res.status(500);
    
  }

})

// update api for quetions
// status: working



app.post('/sevakapi/update/quetions',function (req, res)
{

  try {
    var followup=null;

    var did=req.body.diseasename;
    var status=req.body.status;
    var quetion= req.body.quetions;
    var type=req.body.type;
    var id=req.body.id
   followup=req.body.followup;


if((id && status && quetion && type && did)==null){
 
  res.status(404);
  res.json(bodyerr);


}
else{

  connectiondb();
    
  var sql=`UPDATE disease_wise_quetion_master SET disease_id='${did}',quetions='${quetion}',type='${type}',status='${status}',is_folloup_question='${followup}' where id='${id}' `

console.log(sql);

  con.query(sql, function(err, result) {
     
    if (err) {
        console.log(err);
        res.status(500);

        res.json(bodyerr);

    } else {
        res.status(200);
        var combine={
          bodyonsucess
        }
        res.json(combine);  

    }

})

}


  



  } catch (error) {
    
  }

})

// search api for quetions
// status: working

app.post('/sevakapi/searchquetions', function (req, res) {
console.log(req.body);

  var key=req.body.key;
  console.log(key);

  if(key==null){
 
     res.status(404);
     res.json(bodyerr);


  }

  else{
connectiondb();
    var sql=`select * from disease_wise_quetion_master`;



    con.query(sql, function(err, result) {

      if (err) {
        console.log(err);
        res.status(500);

        res.json(bodyerr);

    }

    else{

      // console.log(result);

      // console.log(result);
var lenth=result.length;
var finalarray=[];


 key=key.toLowerCase();


      for (let index = 0; index < lenth; index++) {
        
           console.log(typeof(key));

          var text= result[index].quetions;
          text=text.toLowerCase();


          //  console.log((text));
          var postialns=text.includes(key);

          // var postialns=text.search(`${key}`);
          if(postialns==true){
console.log(1);

             finalarray.push(result[index]);


              }
         
        
      }
      
  


// for(var i=0; i<result.length; i++) {
//   for(key in result[i]) {
//     if(result[i][key].indexOf(key)!=-1) {
//       finalarray.push(result[i]);
//     }
//   }
// }


      res.status(200);
      res.json(finalarray);




    }

    })



  }



})


// status: working
// get data by disease id 

app.get('/sevakapi/followupexcel/:id', function (req, res) {
 
  try {



    var id=req.params.id;


    

     var sql=`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${dbname}' AND TABLE_NAME = 'patient_data';`;

      connectiondb();


      con.query(sql, function(err, result) {

        if (err) {
          console.log(err);
          res.status(500);
  
          res.json(bodyerr);
  
      }
      else{

       var result1=[];
       var length=result.length;


        for (let index = 0; index <= 10; index++) {
             
          result1[index]=result[index];
          
          
        }

        if(id==2)
{
        var sql=`SELECT * FROM disease_wise_quetion_master WHERE disease_id ='${2}' AND status ='1'`;
}
else if(id==1){
  var sql=`SELECT * FROM disease_wise_quetion_master WHERE disease_id ='${1}' AND status ='1'`;

}

else if(id==3){
  var sql=`SELECT * FROM disease_wise_quetion_master WHERE disease_id ='${3}' AND status ='1'`;
}

else if(id==4){

  var sql=`SELECT * FROM disease_wise_quetion_master WHERE disease_id ='${4}' AND status ='1'`;

}
        con.query(sql, function(err, result) {

          if (err) {
            console.log(err);
            res.status(500);
    
            res.json(bodyerr);
    
        }
        else{
          result2=result;
          var combine={
            bodyonsucess,
            genralquetions:result1,
            diseasequetions:result2
          }

          res.status(200);
          res.json(combine);

        }

        })



      }

      })



    


   







    
  } catch (error) {
    
  }

  
  
  
  })

  
  // upload folloup excel by disease
// status: working

  app.post('/sevakapi/uploadfollowupexcel/:id', function (req, res) {


    console.log(req.body);

    // res.send('Got a POST request')
    var array1=req.body.data;
    var diseasid=req.params.id;

    var id=req.params.id
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
    // console.log(day,typeof(date));
  console.log(now);

    console.log(dateTime);

  
    const after15days = new Date();
    after15days.setDate(after15days.getDate() + 15);
             var date2=after15days.getDate();
            var month2=after15days.getMonth();
            var year2=after15days.getFullYear();

             var days15after = year2+'/'+month2+'/'+date2+' '+hour+':'+minute+':'+second;      


  console.log("after15dayts",days15after);









  
    var distcode=req.body.villagedata.distcode;
    var distname=req.body.villagedata.distname;
    var villagecode=req.body.villagedata.village;
    var villagename=req.body.villagedata.villagename;
    var  values=[];

    var shortarray=[];
    
    
    
    const lenth=array1.length;
    
    const finalarray=[];
    
    var copyofdata=[].concat(array1);
try {


  
  if((distcode && distname && villagecode && villagename && id)==null ){
    res.status(404);
    res.json(bodyerr);


  }
  
 else{

  var sql= `INSERT INTO disease_patient_data_transaction(paitent_number, adhar_number, disease_id, disease_question_id,disease_question_ans, created_at, dist_code, dist_name, village_code, village_name, follow_up, follow_up_date) VALUES ?`;


var quetionsheaderlist=req.body.quetionheader.splice(0,11);

console.log(quetionsheaderlist);
console.log(req.body.quetionheader);




  for (let index = 0; index < lenth; index++) {

    let temp= [].concat(array1[index]);
       temp.splice(0,10);
  
    // temparray.push();
    // shortarray[index]=temp;
    // shortarray[index]='${temp}';
    shortarray[index]=temp;


    
  
  
    
  }
  
console.log(shortarray);
  for (let index = 0; index <lenth; index++) {
  
    let some=copyofdata[index];
    let patientno=some[0];
    let adhar_no=some[1];
    let ida=id;
    let dateandtime=dateTime;
    let followup=some[2];
    let followupdate;
    if(followup=='yes' || followup=='y' || followup==true){

      followup=1;

      followupdate=days15after;




    }
    else{

      followup=0;
      followupdate=null;


    }
    // let followupdate=;


    var q={
      data :shortarray[index]
    }

    // var trasform=q.tostring();
   var transform= JSON.stringify(q);
   var quetionsstore={
     data: req.body.quetionheader
   }

   var trasform2=JSON.stringify(quetionsstore);


    // console.log(trasform);

  
    // var array=[`${patientno}`,`${adhar_no}`,`${ida}`,`${q}`,`CURRENT_TIMESTAMP`,`${distcode}`,`${distname}`,`${villagecode}`,`${villagename}`,`${followup}`,`${followupdate}` ];
    var array=[`${patientno}`,`${adhar_no}`,`${ida}`,`${trasform2}`,`${transform}`,`CURRENT_TIMESTAMP`,`${distcode}`,`${distname}`,`${villagecode}`,`${villagename}`,`${followup}`,`${followupdate}`];


  
    finalarray.push(array);
  
    
  }

  console.log("this is final array",finalarray);


 }
connectiondb();



 con.query(sql,[finalarray] ,function(err, result) {
  if (err) {
    console.log(err);
    res.status(500);

    res.json(bodyerr);

     }

     else{




      console.log(result);


var sql2=`UPDATE disease_patient_data_transaction SET disease_question_id='SELECT quetions FROM disease_wise_quetion_master WHERE disease_id' where created_at='[value-7]' AND disease_id='[value-4]',`;


      res.status(200);
      var combine={
        bodyonsucess

      }
      res.json(bodyonsucess);



     }




 })

  
} catch (err) {
 console.log(err); 
}


  })


  // search api for patient no/adharno/         [by villagedata[optinal] and/or by diseaseid[optinal]]

// status: working
// api no3

  app.post('/sevakapi/follwupsearch/:patientno/:diseaseid?', function (req, res) {

var bypatientno=req.params.patientno;
var bydisease=req.params.diseaseid;
var villagedata=req.body.villagedata;
var distcode,distname,villagecode,villagename;


if(villagedata){

  distcode=villagedata.distcode;
  distname=villagedata.distname;
  villagecode=villagedata.villagecode;
  villagename=villagedata.villagename;

  
}



try {

   if(bypatientno==null || bypatientno==undefined){

    res.status(404);
    res.json(bodyerr);

   }
   else{

    var sql=``;

    if(!bydisease){

      if(!distcode){
sql=`SELECT * FROM disease_patient_data_transaction where paitent_number='${bypatientno}' OR  adhar_number='${bypatientno}'`;
      }
    else if(distcode){

          sql=`SELECT * FROM disease_patient_data_transaction where (paitent_number='${bypatientno}' OR  adhar_number='${bypatientno}') AND  (dist_code='${distcode}' AND  dist_name='${distname}' AND  village_code='${villagecode}' AND village_name='${villagename}') `;
    } 
   }
    else if(bydisease){

      if(!distcode){
              sql=`SELECT * FROM disease_patient_data_transaction where (paitent_number='${bypatientno}' OR  adhar_number='${bypatientno}') AND disease_id='${bydisease}'`;
      }
      else if(distcode && distname && villagecode && villagename ){


              sql=`SELECT * FROM disease_patient_data_transaction where (paitent_number='${bypatientno}' OR  adhar_number='${bypatientno}') AND (disease_id='${bydisease}') AND (dist_code='${distcode}' AND  dist_name='${distname}' AND  village_code='${villagecode}' AND village_name='${villagename}');`;

      }




    }
    
    connectiondb();

    con.query(sql,function(err, result) {
   if(err){
console.log(err);

    res.status(404);
    res.json(bodyerr);


   }
   else{

    result1=result;
var temparray=[]

// var x=JSON.parse(JSON.stringify(JSON.parse(result[0].disease_question_ans)));

    // for (let index = 0; index < array.length; index++) {
       
    //   temparray.push(JSON.parse(result.disease_question_ans));

      
    // }

    var combine={
      data:result1
    }

res.status(200);
res.json(combine);




   }


    });




   }



} catch (error) {
  
}

  })


// search  api for  genral patient data  patient no/ adhar no   [by villagedata[optinal]]   

// status: working

  app.post('/sevakapi/search/:patientno', function (req, res) {

var bypatientno=req.params.patientno;
// var bydisease=req.params.diseaseid;
var villagedata=req.body.villagedata;
var distcode,distname,villagecode,villagename;


if(villagedata){

  distcode=villagedata.distcode;
  distname=villagedata.distname;
  villagecode=villagedata.villagecode;
  villagename=villagedata.villagename;

  
}



try {

   if(bypatientno==null || bypatientno==undefined){

    res.status(404);
    res.json(bodyerr);

   }
   else{

    var sql=``;

 

      if(!distcode){
sql=`SELECT *  FROM  patient_data where paitent_number='${bypatientno}'`;
      }
    else if(distcode){

          sql=`SELECT * FROM patient_data where (paitent_number='${bypatientno}') AND  (dist_code='${distcode}' AND  dist_name='${distname}' AND  village_code='${villagecode}' AND village_name='${villagename}') `;
    } 
  
    connectiondb();
console.log(sql);

    con.query(sql,function(err, result) {
   if(err){
console.log(err);

    res.status(404);
    res.json(bodyerr);


   }
   else{

    result1=result;

    var combine={
      data:result1
    }

res.status(200);
res.json(combine);




   }


    });




   }



} catch (error) {
  
}

  })


  // search qetion by disease id 


  app.post('/sevakapi/search/follupquetions/diseasename/:diseaseid', function (req, res){

    try {

      var diseasid=req.params.diseaseid;

      if(!diseasid){
        res.status(404);
        res.json(bodyerr);

      }
  else{

var sql=`SELECT * FROM disease_wise_quetion_master where disease_id='${diseasid}';`;

connectiondb();


con.query(sql,function(err, result) {


        if(err){
    console.log(err);
    
        res.status(404);
        res.json(bodyerr);
    
    
       }

       else{
result1=result;
        res.status(200);
        var combine={
          ...bodyonsucess,
          diseasequetions:result1
        }
        res.json(combine);


       }



})


 }

      
    } catch (error) {
      
    }

  })

// currently working

  app.post('/sevakapi/allpatiendata/pageno/:pagination/limits/:limit',  function(req, res) {

    // var pagination=req.params.pagination;
    // var limit=req.params.limit*pagination;
    // var page=parseInt(pagination);
    // var start=(page-1)*limit;
    // var limited=page*limit;


    var pagination=req.params.pagination;  

    var limit=req.params.limit;
    

    var page=parseInt(pagination);

    var page2=(page)
    var limited=page*limit;
    var start=limit*(page-1);





  
    // var bypatientno=req.params.patientno;

var villagedata=req.body.villagedata;
var distcode,distname,villagecode,villagename;

var startdate=req.body.date.startdate;
var enddate=req.body.date.enddate;

if(!startdate && !enddate ){
 
  res.status(404);
  res.json(bodyerr);




}


if(villagedata){

  distcode=villagedata.distcode;
  distname=villagedata.distname;
  villagecode=villagedata.village;
  villagename=villagedata.villagename;

  
}
    
// SELECT *  FROM  patient_data where (created_at between '2022-01-19%' AND '2022-01-27%') OR  (created_at='2022-01-19%') LIMIT 10 OFFSET 0

    try {


var sql=``;
      if(!distcode){

       
      

          sql=`SELECT *  FROM  patient_data where date(created_at) between date('${startdate}') AND date('${enddate}') LIMIT ${limit} OFFSET ${start}`;

     


      }

     

      else if(distcode){
    
 
     

  // sql=`SELECT * FROM patient_data where created_at between ('${startdate}' AND '${enddate}' )  AND  dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' LIMIT ${limited} OFFSET ${start}`;

 sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}') LIMIT ${limit} OFFSET ${start}`;


       

       
      }

      console.log(sql);



      console.log(sql);
    
            connectiondb();


            con.query(sql, function(err, result) {
    
                if (err) {
                    // res.status(401);
                    res.status(404);
                    res.json(bodyerr);
                    console.log(err);

            
                 sql='';
                 
    
    
                } else{

                  result1=result;



                  var temp3;

                  if(!distcode){
 
                     sql=`select count(id) as noofrecords from patient_data where date(created_at) between date('${startdate}') AND date('${enddate}')  `;

                  }

                  else{


                    sql=`select count(*) as noofrecords from patient_data  where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND ( dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}')`

                  }

                 
                  

                  

                  con.query(sql, function(err, result) {
                    if (err) {
                      console.log(err);
                      res.status(500);
                  
                      res.json(bodyerr);
                  
                             }
                  
                             else
                             {
                  
                              result4=result;
                              console.log(result[0].noofrecords);
                  
                  var Total_Records =result[0].noofrecords;
                  var Total_Pages = parseInt(Total_Records/10);
                  var ee=parseInt(pagination);
                  
                  var curent_page=ee;
                  var next_page =ee+1;
                  
                  var next_pageurl='';
                              
                  
                               temp3={
                                pagination:{
                                  current_page: curent_page,
                                  totoalpage:Total_Pages,
                                  totoalrecords:Total_Records,
                                  next_page:next_page,
                                  next_pageurl:next_pageurl
                                }
                  
                              }
                  
                  
                             }
                  
                             var combine={
                              data:result1,
                              ...temp3
                            }

                           
                  
                             res.status(200);
                             res.json(combine);
                  
                  })
               
               
               
               
             
              
              










              
              
              
                 }
    
            })
    
        } catch (err) {
          // con.end();
        }
    
    });
  

app.post('/sevakapi/getvillagedata',  function(req, res) {


  try {

    var sql=`SELECT dist_code,dist_name,village_code,village_name FROM village_code_mgt where is_active_status=1`;

    console.log(sql);
    
    connectiondb();


    con.query(sql, function(err, result) {

      if (err) {
        // res.status(401);
        res.status(500);
        res.json(bodyerr);
        console.log(err);
    }

    else{

       result1=result;

       var combine={
         result1:result1,
         bodyonsucess
       }

       res.status(200);
       res.json(combine);



    }


    })
    

  } catch (err) {

    res.status(500)
    res.json(bodyerr)
    
  }

});


// get permissiion lisr


app.post('/sevakapi/getpermissionlist/:roleid',  function(req, res) {

  try {

    var roleid=req.params.roleid;


    var sql=`SELECT * FROM role_permission where role_id='${roleid}'`;

    connectiondb();

    
    con.query(sql, function(err, result) {

      if (err) {
        // res.status(401);
        res.status(500);
        res.json(bodyerr);
        console.log(err);
    }

    else{

       result1=result;

       var combine={
         result1:result1,
         bodyonsucess
       }

       res.status(200);
       res.json(combine);



    }


    })


    
  } catch (error) {
    
  }


});

// get roles detais if rqeureded 
app.post('/sevakapi/getrolesdetails',  function(req, res) {

  try {

    var sql=`SELECT * FROM role_mgt`;

    connectiondb();

    
    con.query(sql, function(err, result) {

      if (err) {
        // res.status(401);
        res.status(500);
        res.json(bodyerr);
        console.log(err);
    }

    else{

       result1=result;

       var combine={
         result1:result1,
         bodyonsucess
       }

       res.status(200);
       res.json(combine);



    }


    })


    
  } catch (error) {
    
  }


});


// for updating permission 

app.post('/sevakapi/updatepermission/:roleid',  function(req, res) {

  try {

    var roleid=req.params.roleid;

    var permissionid=req.body.data;

    var roledetails=req.body.role;

    connectiondb();

    var sql=`UPDATE role_mgt SET role_name='${roledetails.rolename}',is_active_status='${roledetails.status}' where id='${roleid}'`;
   var sql2



    con.query(sql, function(err, result) {
      if (err) {
        // res.status(401);
        res.status(500);
        res.json(bodyerr);
        console.log(err);
    }
 


else{

  var sql=`SELECT permission_id ,is_activated  FROM role_permission where role_id='${roleid}'`;

  con.query(sql, function(err, result) {

    if (err) {
      // res.status(401);
      res.status(500);
      res.json(bodyerr);
      console.log(err);
  }

  else{

     result1=result;

     var temparray=[]

for (let index = 0; index < result.length; index++) {

for (let j = 0; j < permissionid.length; j++) {


  if(result[index].permission_id==permissionid[j]){

    if(result[index].is_activated==0){


      var a={
        is_activated:1,
        permission_id:result[index].permission_id,
        roleid:`${roleid}`

       }

   temparray.push(a);

    }
    

    else{

      var a={
        is_activated:0,
        permission_id:result[index].permission_id,
        roleid:`${roleid}`

       }

   temparray.push(a);

    }
    
 



  }
 
   


}


}



var values=temparray;

for (let index = 0; index < temparray.length; index++) {


var sql=`UPDATE role_permission SET is_activated= '${temparray[index].is_activated}' WHERE  permission_id='${temparray[index].permission_id}' && role_id='${temparray[index].roleid}'`;







console.log(sql);



con.query(sql,function(err, result) {

if (err) {
  // res.status(401);
  res.status(500);
  res.json(bodyerr);
  console.log(err);
}

else{

var result2=result;


console.log(result2);






}


})

}


if(roledetails.status==0)
{
     sql2=`UPDATE user SET is_active_status='0' WHERE is_active_status='1' AND  role_id=${roleid}`
}
else if(roledetails.status==1){
   sql2=`UPDATE user SET is_active_status='1' WHERE is_active_status='0' AND  role_id=${roleid}`

}


con.query(sql2, function(err, result) {

  if (err) {
    // res.status(401);
    res.status(500);
    res.json(bodyerr);
    console.log(err);
}

else{
  

  var combine={
    bodyonsucess
    }
    
    res.status(200);
    res.json(combine);

}
})








    



  }


  })
}




   
       })

    


    
  } catch (error) {
    
  }


});

// get permission and its releted role type 
// also get all user permiission

app.post('/sevakapi/allpermissionlist/:roleid',  function(req, res) {

  try {

    var roleid=req.params.roleid;


    var sql=`SELECT * FROM user_permission`;

    connectiondb();

    
    con.query(sql, function(err, result) {

      if (err) {
        // res.status(401);
        res.status(500);
        res.json(bodyerr);
        console.log(err);
    }

    else{

       result1=result;
       var roleid=req.params.roleid;


       var sql=`SELECT * FROM role_permission where role_id='${roleid}'`;

       con.query(sql, function(err, result) {

        if (err) {
          // res.status(401);
          res.status(500);
          res.json(bodyerr);
          console.log(err);
      }
  
      else{
  
         result2=result;
  
        
  
         



         var combine={
          result1:result1,
          result2:result2,
          bodyonsucess
        }
 
        res.status(200);
        res.json(combine);
  
  
  
      }
  
  
      })




       

      



    }


    })


    
  } catch (error) {
    
  }


});

app.post('/sevakapi/getuserdetails',  function(req, res) {

  try {

    var sql=`SELECT * FROM user_permission`;

    connectiondb();

    
    con.query(sql, function(err, result) {

      if (err) {
        // res.status(401);
        res.status(500);
        res.json(bodyerr);
        console.log(err);
    }

    else{

       result1=result;

       var combine={
         result1:result1,
         bodyonsucess
       }

       res.status(200);
       res.json(combine);



    }


    })


    
  } catch (error) {
    
  }


});


app.post('/sevakapi/insertpermission/:roleid',  function(req, res) {

  try {

    var roleid=req.params.roleid;

    var permissionid=req.body.data;

    var roledetails=req.body.role;

    connectiondb();

    // var sql=`UPDATE role_mgt SET role_name='${roledetails.rolename}',is_active_status='${roledetails.status}' where id='${roleid}'`;

var sql=`INSERT INTO role_mgt( role_name, is_active_status) VALUES ('${roledetails.rolename}','${roledetails.status}')`;

    con.query(sql, function(err, result) {
      if (err) {
        // res.status(401);
        res.status(500);
        res.json(bodyerr);
        console.log(err);
    }
 


else{

  var sql=`SELECT permission_id ,is_activated  FROM role_permission where role_id='${roleid}'`;

  con.query(sql, function(err, result) {

    if (err) {
      // res.status(401);
      res.status(500);
      res.json(bodyerr);
      console.log(err);
  }

  else{

     result1=result;

     var temparray=[]

for (let index = 0; index < result.length; index++) {

for (let j = 0; j < permissionid.length; j++) {


  if(result[index].permission_id==permissionid[j]){

    if(result[index].is_activated==0){


      var a={
        is_activated:1,
        permission_id:result[index].permission_id,
        roleid:`${roleid}`

       }

   temparray.push(a);

    }
    

    else{

      var a={
        is_activated:0,
        permission_id:result[index].permission_id,
        roleid:`${roleid}`

       }

   temparray.push(a);

    }
    
 



  }
 
   


}


}



var values=temparray;

for (let index = 0; index < temparray.length; index++) {


var sql=`UPDATE role_permission SET is_activated= '${temparray[index].is_activated}' WHERE  permission_id='${temparray[index].permission_id}' && role_id='${temparray[index].roleid}'`;







console.log(sql);



con.query(sql,function(err, result) {

if (err) {
  // res.status(401);
  res.status(500);
  res.json(bodyerr);
  console.log(err);
}

else{

var result2=result;


console.log(result2);






}


})

}

var combine={
bodyonsucess
}

res.status(200);
res.json(combine);




    



  }


  })
}




   
       })

    


    
  } catch (error) {
    
  }


});


app.post('/sevakapi/usercrudview/pageno/:pagination/limits/:limit',  function(req, res) {

  try {



    var pagination=req.params.pagination;  

    var limit=req.params.limit;
    

    var page=parseInt(pagination);

    var page2=(page)
    var limited=page*limit;
    var start
    if(page==1){

      start=limited-9;
    }
    else{
   
     start=limited-10;


    }
    
    


    var sql=`select 
    user.id,
    user.user_name,
    user.email,
    user.sevak_village_code_id as  uservillageid,
    role_mgt.role_name,
    role_mgt.is_active_status as rolestatus,
    user.is_active_status as userstatus,
    zone_coordinator_mgt.zone_name,
    village_code_mgt.dist_code, 
    village_code_mgt.dist_name,
    village_code_mgt.village_code,
    village_code_mgt.village_name 
     from user 
    LEFT OUTER JOIN  role_mgt on user.role_id=role_mgt.id
    LEFT OUTER JOIN  village_code_mgt on user.sevak_village_code_id= village_code_mgt.id 
    LEFT OUTER JOIN   zone_coordinator_mgt  on  user.zone_coordinator_id=zone_coordinator_mgt.id
    where  user.id limit ${limited} offset ${start}`;

    connectiondb();

    con.query(sql, function(err, result) {
      if (err) {
        // res.status(401);
        res.status(500);
        res.json(bodyerr);
        console.log(err);
    }
    else{

      result1=result;

  
      var sql=`SELECT count(id) as noofrecords FROM user `;

      con.query(sql, function(err, result) {
        if (err) {
          // res.status(401);
          res.status(500);
          res.json(bodyerr);
          console.log(err);
      }

      else{

        result2=result;


        var Total_Records =result2[0].noofrecords;
        var Total_Pages = parseInt(Total_Records/10);
        var ee=parseInt(pagination);
        
        var curent_page=ee;
        var next_page =ee+1;
        
        var next_pageurl='';
                    
        
                     temp3={
                      pagination:{
                        current_page: curent_page,
                        totoalpage:Total_Pages,
                        totoalrecords:Total_Records,
                        next_page:next_page,
                        next_pageurl:next_pageurl
                      }
                    }


        var combine={
          userdata:result1,
          ...temp3
        }
  
        res.status(200);
        res.json(combine);



      }
    });



   


    }
  })


    
    
  } catch (error) {

    res.status(500);
    res.json(bodyerr);

    
  }


});

// get user by id 

app.post('/sevakapi/singleuser/:id',  function(req, res) {

  try {



var id=req.params.id;


    


    var sql=`select 
    user.id,
    user.if_sevak_coordinator,
    user.city,
    user.state,
    user.address,
    user.mobile_number,
    user.alternate_contact_number,
    user.user_name,
    user.email,
    user.sevak_village_code_id as  uservillageid,
    role_mgt.id as roleid,
    role_mgt.role_name,
    role_mgt.is_active_status as rolestatus,
    user.is_active_status as userstatus,
    zone_coordinator_mgt.zone_name,
    village_code_mgt.dist_code, 
    village_code_mgt.dist_name,
    village_code_mgt.village_code,
    village_code_mgt.village_name 
     from user 
    LEFT OUTER JOIN  role_mgt on user.role_id=role_mgt.id
    LEFT OUTER JOIN  village_code_mgt on user.sevak_village_code_id= village_code_mgt.id 
    LEFT OUTER JOIN   zone_coordinator_mgt  on  user.zone_coordinator_id=zone_coordinator_mgt.id
    where  user.id='${id}'`;

    connectiondb();



    con.query(sql, function(err, result) {
      if(err){
        res.status(500);
        res.json(bodyerr);
        
      }
   
   
           else{
   
             result1=result;
   
             
           var combine={
             userdata:result1,
      
           }
     
           res.status(200);
           res.json(combine);
           }
   
   
   
   
       });




    
    
  } catch (error) {

    res.status(500);
    res.json(bodyerr);

    
  }


});


app.post('/sevakapi/getroles', function(req, res) {

  
try {

  var sql=`SELECT * FROM role_mgt`;

  connectiondb();


  con.query(sql, function(err, result) {
    if (err) {
      // res.status(401);
      res.status(500);
      res.json(bodyerr);
      console.log(err);
  }

  else{

    result1=result;




    var combine={
      bodyonsucess,
      userdata:result1,

    }

    res.status(200);
    res.json(combine);



  }
});




  
} catch (error) {

  res.status(500);
  res.json(bodyerr);

  
}

  





})


app.post('/sevakapi/updateuser', function(req, res) {


  try {

    var data=req.body.data;
    var id=parseInt(data.id);
    var username=data.username;
    var email=data.email;
    var mobilenumber=data.mobilenumber;
    var altertivecontact=data.alternatecontactnumber;
    var adress=data.adress;
    var city=data.city;
    var state=data.state;
   var villagecodeid=data.villagename;
   var zone_coordinator_id=1;
   var if_sevak_coordinator=parseInt(data.ifsevakcoordinator);
  var is_active_status=parseInt(data.userstatus);
  var rolid=parseInt(data.rolename);


  var sql
if(villagecodeid==null){

   sql=`UPDATE user SET role_id='${rolid}',user_name='${username}',email='${email}',mobile_number='${mobilenumber}',alternate_contact_number='${altertivecontact}',address='${adress}',city='${city}',state='${state}',sevak_village_code_id='0',zone_coordinator_id='${zone_coordinator_id}',if_sevak_coordinator='${if_sevak_coordinator}',is_active_status='${is_active_status}' WHERE id='${id}'`

}
else{

  
 sql=`UPDATE user SET role_id='${rolid}',user_name='${username}',email='${email}',mobile_number='${mobilenumber}',alternate_contact_number='${altertivecontact}',address='${adress}',city='${city}',state='${state}',sevak_village_code_id='${villagecodeid}',zone_coordinator_id='${zone_coordinator_id}',if_sevak_coordinator='${if_sevak_coordinator}',is_active_status='${is_active_status}' WHERE id='${id}'`

}


   connectiondb()

    console.log(sql);


    con.query(sql, function(err, result) {
      if (err) {
        // res.status(401);
        res.status(500);
        res.json(bodyerr);
        console.log(err);
    }
  
    else{
  
      result1=result;
  
  
  
  
      var combine={
        bodyonsucess,
        userdata:result1,
  
      }
  
      res.status(200);
      res.json(combine);
  

  
  
    }
  });
  

    
  } catch (err) {

    res.status(500);
    res.json(bodyerr);
    console.log(err);


    
  }



})


app.post('/sevakapi/add/villagecode',function (req, res)
{

  var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;

  // var date=new date();

  console.log(req.body);

  var values=[]

  try {
    var dist_code=req.body.distcode;
    var dist_name=req.body.distname;
    var village_code=req.body.villagecode;
    var village_name=req.body.villagename;
    var contact_address=req.body.contactaddress;
    var conatct_number=req.body.conatctnumber;
    var is_active_status=req.body.status;

if((dist_code && dist_name  && village_code && village_name && contact_address && conatct_number && is_active_status )==null){
  res.status(404);
  res.json(bodyerr);
}

else{
  connectiondb();
  var sql=`INSERT INTO village_code_mgt(dist_code, dist_name, village_code, village_name, contact_address, conatct_number, is_active_status, created_at) VALUES ('${dist_code}','${dist_name}','${village_code}','${village_name}','${contact_address}','${conatct_number}','${is_active_status}',CURRENT_TIMESTAMP)`

con.query(sql, function(err, result) {
     
    if (err) {
        console.log(err);
        res.status(500);

        res.json(bodyerr);

    } else {
        res.status(200);
        var combine={
          bodyonsucess
        }
        res.json(combine);  
    }

})
}



  }
   catch (error) {

    console.log(error);
    res.status(500);
    res.status(bodyerr);

    
  }

})


app.post('/sevakapi/update/villagecode',function (req, res)
{

  try {
    var followup=null;
   var id=req.body.id
    var dist_code=req.body.distcode;
    var dist_name=req.body.distname;
    var village_code=req.body.villagecode;
    var village_name=req.body.villagename;
    var contact_address=req.body.contactaddress;
    var conatct_number=req.body.conatctnumber;
    var is_active_status=req.body.status;


    if((dist_code && dist_name  && village_code && village_name && contact_address && conatct_number && is_active_status )==null){
      res.status(404);
      res.json(bodyerr);
    }
    
else{

  connectiondb();
    
  var sql=`UPDATE village_code_mgt SET 
  dist_code='${dist_code}',dist_name='${dist_name}',village_code='${village_code}',village_name='${village_name}',contact_address='${contact_address}',conatct_number='${conatct_number}',is_active_status='${is_active_status}',updated_at=CURRENT_TIMESTAMP WHERE id='${id}' `

console.log(sql);

  con.query(sql, function(err, result) {
     
    if (err) {
        console.log(err);
        res.status(500);

        res.json(bodyerr);

    } else {
        res.status(200);
        var combine={
          bodyonsucess
        }
        res.json(combine);  

    }

})

}


  



  } catch (error) {

    res.status(500);
    res.json(bodyerr);
    console.log(error);


    
  }

})



app.post('/sevakapi/view/villagecodefound/:id/:page?/:limit?',function (req, res)
{

  var page;


     var a=page=req.params.page;
     var b=req.params.limit;

var c=(a-1)*b;
// var b=c;




  try {

    var sql
    if(req.params.id==0){

       sql=`SELECT * FROM village_code_mgt where id LIMIT ${b} OFFSET ${c} `


    }
    else{

       sql=`SELECT * FROM village_code_mgt where id='${req.params.id}' `


    }

     



     


    connectiondb();
    
    con.query(sql, function(err, result) {

    if(err)
{

  res.status(500);
  res.json(bodyerr);


}
    else{

      result1=result;



var sql=`SELECT COUNT(id) as noofrecords FROM village_code_mgt `

      con.query(sql, function(err, result) {
        if (err) {
          console.log(err);
          res.status(500);
      
          res.json(bodyerr);
      
                 }
      
                 else
                 {
      
                  result4=result;
                  console.log(result[0].noofrecords);
      
      var Total_Records =result[0].noofrecords;
      var Total_Pages = parseInt(Total_Records/10);
      var ee=parseInt(page);
      
      var curent_page=ee;
      var next_page =ee+1;
      
      var next_pageurl='';
                  
      
                   temp3={
                    pagination:{
                      current_page: curent_page,
                      totoalpage:Total_Pages,
                      totoalrecords:Total_Records,
                      next_page:next_page,
                      next_pageurl:next_pageurl
                    }
      
                  }


                  var combine={
                    result1:result1,
                    ...temp3

                  }

                  res.status(200);
                  res.json(combine);

      
      
                 }
      
            
      })

   }


})

 



  } catch (error) {

    res.status(500);
    res.json(bodyerr);

    
  }

})


app.post('/sevakapi/searchvillagcode', function (req, res) {
 
 
  console.log(req.body);
  
    var key=req.body.key;
    console.log(key);
  
    if(key==null){
   
       res.status(404);
       res.json(bodyerr);
  
  
    }
  
    else{
  connectiondb();
      var sql=`select * from  village_code_mgt where dist_code LIKE '${key}' OR dist_name LIKE '${key}' OR village_code LIKE '${key}' OR  village_name='${key}'`;
  
  
  
      con.query(sql, function(err, result) {
  
        if (err) {
          console.log(err);
          res.status(500);
  
          res.json(bodyerr);
  
      }
  
      else{
  

        console.log(result);
        res.status(200);
        var combine={
          bodyonsucess,
          result1:result
        }
        res.json(combine)

  
           
          
        }
      })
    } 
  })

  // TOTOAL FOLLUP

  app.post('/sevakapi/counterapi', function (req, res) {
 
    try {


      var now     = new Date(); 
      var year    = now.getFullYear();
      var month   = now.getMonth()+1; 
      var day     = now.getDate();
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds(); 
      var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;

      var startdate=dateTime;
      var enddate=dateTime;
  
  
  
    
          var sql=`SELECT count(id) as Patientcounter FROM patient_data`;
  
          var sql2=`SELECT  count(id) as todayupdatedrecords   FROM  patient_data where date(created_at) between date('${startdate}') AND date('${enddate}')  `;
  
     
          var sql3=`SELECT count(sevak_username) as records,sevak_username as user FROM patient_data`;

    var sql4=`SELECT count(id) as todaysfollup FROM disease_patient_data_transaction  where date(created_at) between date('${startdate}') AND date('${enddate}')`;

    
  
      var sql5=`SELECT count(id) as activatevillage FROM village_code_mgt WHERE is_active_status=1`;
  
      var sql6=`SELECT count(id) as records,dist_code,dist_name,village_code,village_name
      FROM  disease_patient_data_transaction
    where dist_code=(SELECT MAX(dist_code) FROM disease_patient_data_transaction)  AND
    dist_name=(SELECT MAX(dist_name) FROM disease_patient_data_transaction) AND
    village_code=(SELECT MAX(village_code) FROM disease_patient_data_transaction) AND
    village_name=(SELECT MAX(village_name) FROM disease_patient_data_transaction)  ` ;
  
    var sql7=`SELECT count(p.id) as counter ,disease_master.disease_name
    FROM  disease_patient_data_transaction as p left join
  disease_master on  p.disease_id=disease_master.id
  where p.disease_id=1`
  var sql8=`SELECT count(p.id) as counter ,disease_master.disease_name
  FROM  disease_patient_data_transaction as p left join
  disease_master on  p.disease_id=disease_master.id
  where p.disease_id=2`
  
  var sql9=`SELECT count(p.id) as counter ,disease_master.disease_name
  FROM  disease_patient_data_transaction as p left join
  disease_master on  p.disease_id=disease_master.id
  where p.disease_id=3`
  
  var sql10=`SELECT count(p.id) as counter ,disease_master.disease_name
  FROM  disease_patient_data_transaction as p left join
  disease_master on  p.disease_id=disease_master.id
  where p.disease_id=4`

  var sql11=`SELECT count(id) as totalfollup FROM disease_patient_data_transaction`
  
  
  
          connectiondb();  
      
          con.query(`${sql};${sql3};${sql5};${sql6};${sql7};${sql8};${sql9};${sql10};${sql2};${sql4};${sql11}`, function(err, result) {
      
            if (err) {
              console.log(err);
              res.status(500);
      
              res.json(bodyerr);
      
          }
      
          else{
      
    
            console.log(result);
            res.status(200);
            var combine={
              bodyonsucess,
              patientcounter:result[0],
              nameofuser:result[1],
              activatedvillage:result[2],
              databyvillage:result[3],
              tbcounter:result[4],
              hbcounter:result[5],
              bpcounter:result[6],
              diabetescounter:result[7],
              todayupdatepatientdata:result[8],
              follupdata:result[9],
              totalfollup:result[10]

             

            }
            res.json(combine)
    
      
               
              
            }
          })

      
    } catch (error) {

      res.status(500);
      res.json(bodyerr);
      console.log(error);


      
    }
      
    })

    // TOTAL PATIENT

    app.post('/sevakapi/counterapi1', function (req, res) {


      try {


        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
  
        var startdate=dateTime;
        var enddate=dateTime;

        var sql=`SELECT COUNT(ID) AS PATIENTTBCOUNTER  FROM patient_data WHERE  have_tuberculosis=1`;
        var sql1=`SELECT COUNT(ID) AS PATIENTTBCOUNTER  FROM patient_data WHERE  have_hemoglobin=1`;
        var sql2=`SELECT COUNT(ID) AS PATIENTTBCOUNTER  FROM patient_data WHERE  have_diabetes=1`;
        var sql3=`SELECT COUNT(ID) AS PATIENTTBCOUNTER  FROM patient_data WHERE  have_bloodpressure=1`;

  
          connectiondb();

          
      
        con.query(`${sql};${sql1};${sql2};${sql3}`, function(err, result) {
    
          if (err) {
            console.log(err);
            res.status(500);
    
            res.json(bodyerr);
    
        }
    
        else{
    
  
          console.log(result);
          res.status(200);
          var combine={
            bodyonsucess,
            havetb:result[0],
            havehb:result[1],
            havediabitc:result[2],
            havebp:result[3]
            

           

          }
          res.json(combine)
  
    
             
            
          }
        })



        
      } catch (error) {

        res.status(500);
        res.json(bodyerr);
        console.log(error);
    
        
      }

    })

    // TODAY FOLLUP


    app.post('/sevakapi/counterapi2', function (req, res) {


      try {


        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
  
        var startdate=dateTime;
        var enddate=dateTime;

        var sql=`SELECT count(p.id) as counter ,disease_master.disease_name FROM  disease_patient_data_transaction as p left join disease_master on  p.disease_id=disease_master.id  where p.disease_id=1 AND date(p.created_at) between date('${startdate}') AND date('${enddate}')`;
        
        
        var sql1=`SELECT count(p.id) as counter ,disease_master.disease_name FROM  disease_patient_data_transaction as p left join disease_master on  p.disease_id=disease_master.id  where p.disease_id=2 AND date(p.created_at) between date('${startdate}') AND date('${enddate}')`;
      
       
        var sql2=`SELECT count(p.id) as counter ,disease_master.disease_name FROM  disease_patient_data_transaction as p left join disease_master on  p.disease_id=disease_master.id where p.disease_id=3 AND date(p.created_at) between date('${startdate}') AND date('${enddate}')`;
       
       
        var sql3=`SELECT count(p.id) as counter ,disease_master.disease_name  FROM  disease_patient_data_transaction as p left join disease_master on  p.disease_id=disease_master.id where p.disease_id=4 AND date(p.created_at) between date('${startdate}') AND date('${enddate}')`;


        connectiondb();  
      
        con.query(`${sql};${sql1};${sql2};${sql3}`, function(err, result) {
    
          if (err) {
            console.log(err);
            res.status(500);
    
            res.json(bodyerr);
    
        }
    
        else{
    
  
          console.log(result);
          res.status(200);
          var combine={
            bodyonsucess,
            tuberculosis:result[0],
            hemoglobin:result[1],
            bloodPressure:result[2],
            diabetes:result[3],
         

           

          }
          res.json(combine)
  
    
             
            
          }
        })

    
  } catch (error) {

    res.status(500);
    res.json(bodyerr);
    console.log(error);


    
  }


     

    })

    // Today Patient

    app.post('/sevakapi/counterapi4', function (req, res) {


      try {


        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
  
        var startdate=dateTime;
        var enddate=dateTime;

        var sql=`SELECT COUNT(ID) AS PATIENTTBCOUNTER  FROM patient_data WHERE  have_tuberculosis=1 AND date(created_at) between date('${startdate}') AND date('${enddate}') `;


        var sql1=`SELECT COUNT(ID) AS PATIENTTBCOUNTER  FROM patient_data WHERE  have_hemoglobin=1   AND   date(created_at) between date('${startdate}') AND date('${enddate}')`;


        var sql2=`SELECT COUNT(ID) AS PATIENTTBCOUNTER  FROM patient_data WHERE  have_diabetes=1  AND   date(created_at) between date('${startdate}') AND date('${enddate}')`;
        var sql3=`SELECT COUNT(ID) AS PATIENTTBCOUNTER  FROM patient_data WHERE  have_bloodpressure=1 AND   date(created_at) between date('${startdate}') AND date('${enddate}')`;


        connectiondb();


        con.query(`${sql};${sql1};${sql2};${sql3}`, function(err, result) {
    
          if (err) {
            console.log(err);
            res.status(500);
    
            res.json(bodyerr);
    
        }
    
        else{
    
  
          console.log(result);
          res.status(200);
          var combine={
            bodyonsucess,
            havetb:result[0],
            havehb:result[1],
            havediabitc:result[2],
            havebp:result[3]
            

           

          }
          res.json(combine)
  
    
             
            
          }
        })



        
      } catch (error) {

        res.status(500);
        res.json(bodyerr);
        console.log(error);
    

        
      }

    })

    // for chart 

    app.post('/sevakapi/patientdata/chart1', function (req, res) {


      try {


        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
  
        var startdate=dateTime;

  

        var enddate=dateTime;

        var sql= `SELECT COUNT(patient_data.id) as yaxis,(MONTH(created_at)) as xaxis ,CONCAT(MONTH(created_at),'-',YEAR(created_at)) as zaxis FROM patient_data where (created_at) group BY MONTH(created_at)  limit 12`;


       

        connectiondb();


        con.query(sql, function(err, result) {
    
          if (err) {
            console.log(err);
            res.status(500);
    
            res.json(bodyerr);
    
        }
    
        else{
    
  
          console.log(result);
          res.status(200);
          var combine={
            bodyonsucess,
            patietndata:result
            

           

          }
          res.json(combine)
  
    
             
            
          }
        })



        
      } catch (error) {

        res.status(500);
        res.json(bodyerr);
        console.log(error);
    

        
      }

    })
    app.post('/sevakapi/follupdata/chart1', function (req, res) {


      try {


        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
  
        var startdate=dateTime;
        var enddate=dateTime;

        var sql= `SELECT COUNT(disease_patient_data_transaction.id) as yaxis,(MONTH(created_at)) as xaxis,
        CONCAT(MONTH(created_at),'-',YEAR(created_at)) as zaxis FROM disease_patient_data_transaction	 where MONTH(created_at) group BY MONTH(created_at)  limit 12`;


      


        connectiondb();


        con.query(sql, function(err, result) {
    
          if (err) {
            console.log(err);
            res.status(500);
    
            res.json(bodyerr);
    
        }
    
        else{
    
  
          console.log(result);
          res.status(200);
          var combine={
            bodyonsucess,
            patietndata:result
            

           

          }
          res.json(combine)
  
    
             
            
          }
        })



        
      } catch (error) {

        res.status(500);
        res.json(bodyerr);
        console.log(error);
    

        
      }

    })


    app.post('/sevakapi/patientdata/chart2', function (req, res) {

 try {

  var sql=`SELECT count(id) as value,CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM patient_data GROUP BY date(created_at) DESC`;
  
  var sql1=`SELECT count(id) as value,CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM patient_data WHERE have_tuberculosis=1 GROUP BY date(created_at) DESC 	`

  var sql2=`SELECT count(id) as value,CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM patient_data WHERE have_hemoglobin=1 GROUP BY date(created_at) DESC 	`
  // var sql=`SELECT count(id) as value,date(created_at)  name  FROM patient_data GROUP BY date(created_at) DESC`;
  var sql3=`SELECT count(id) as value,CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM patient_data WHERE have_bloodpressure=1 GROUP BY date(created_at) DESC 	`
  // var sql=`SELECT count(id) as value,date(created_at)  name  FROM patient_data GROUP BY date(created_at) DESC`;
  var sql4=`SELECT count(id) as value,CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM patient_data WHERE have_diabetes=1 GROUP BY date(created_at) DESC 	`


  connectiondb();

  con.query(`${sql};${sql1};${sql2};${sql3};${sql4}`, function(err, result) {
    
    if (err) {
      console.log(err);
      res.status(500);

      res.json(bodyerr);

  }
else{

  res.status(200);

  var combine={
    patientdatabydate:result[0],
    havetb:result[1],
    havehb:result[2],
    havebp:result[3],
    havediabitc:result[4]

  }

  res.json(combine)

}

  })
   
 } catch (error) {
  
  res.status(500);
  res.json(bodyerr);
  console.log(error);


   
 }

    })
    app.post('/sevakapi/follupdata/chart2', function (req, res) {

 try {

  var sql=`SELECT count(id) as value,CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM disease_patient_data_transaction GROUP BY date(created_at) DESC`;
  
  var sql1=`SELECT count(id) as value,CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM disease_patient_data_transaction WHERE disease_id=1 GROUP BY date(created_at) DESC 	`

  var sql2=`SELECT count(id) as value,CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM disease_patient_data_transaction WHERE disease_id=2 GROUP BY date(created_at) DESC 	`
  // var sql=`SELECT count(id) as value,date(created_at)  name  FROM patient_data GROUP BY date(created_at) DESC`;
  var sql3=`SELECT count(id) as value,CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM disease_patient_data_transaction WHERE disease_id=3 GROUP BY date(created_at) DESC 	`
  // var sql=`SELECT count(id) as value,date(created_at)  name  FROM patient_data GROUP BY date(created_at) DESC`;
  var sql4=`SELECT count(id) as value, CONCAT(DAY(created_at),'-',MONTH(created_at),'-',YEAR(created_at)) as name  FROM disease_patient_data_transaction WHERE disease_id=4 GROUP BY date(created_at) DESC 	`


  connectiondb();

  con.query(`${sql};${sql1};${sql2};${sql3};${sql4}`, function(err, result) {
    
    if (err) {
      console.log(err);
      res.status(500);

      res.json(bodyerr);

  }
else{

  res.status(200);

  var combine={
    patientdatabydate:result[0],
    havetb:result[1],
    havehb:result[2],
    havebp:result[3],
    havediabitc:result[4]

  }

  res.json(combine)

}

  })
   
 } catch (error) {
  
  res.status(500);
  res.json(bodyerr);
  console.log(error);


   
 }

    })


    app.post('/sevakapi/reports/pageno/:pagination/limits/:limit/:excel?',  function(req, res) {

      // var pagination=req.params.pagination;
      // var limit=req.params.limit*pagination;
      // var page=parseInt(pagination);
      // var start=(page-1)*limit;
      // var limited=page*limit;
  console.log(req.body);

  
      var pagination=req.params.pagination;  
  
      var limit=req.params.limit;
      
  
      var page=parseInt(pagination);
  
      var page2=(page)
      var limited=page*limit;
      var start=limit*(page-1);
  
  
  
  
  
    
      // var bypatientno=req.params.patientno;
  
  var villagedata=req.body.villagedata;
  var distcode,distname,villagecode,villagename;
  
  var startdate=req.body.date.startdate;
  var enddate=req.body.date.enddate;
  
  if(!startdate && !enddate ){
   
    res.status(404);
    res.json(bodyerr);
  
  
  
  
  }
  
  
  if(villagedata){
  
    distcode=villagedata.distcode;
    distname=villagedata.distname;
    villagecode=villagedata.village;
    villagename=villagedata.villagename;
   sevakname=villagedata.sevakname;
   diseaselist=villagedata.diseaselist;

    
  }
      
  // SELECT *  FROM  patient_data where (created_at between '2022-01-19%' AND '2022-01-27%') OR  (created_at='2022-01-19%') LIMIT 10 OFFSET 0
  
      try {
  
  
  var sql=``;
if(distcode){


  if(diseaselist=='all' && sevakname=='all'){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND  (dist_code='${distcode}' AND  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}')    LIMIT ${limit} OFFSET ${start}`;

  }

  else if(sevakname!='all' && diseaselist!='all'){

   if(diseaselist==1){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}') AND (have_tuberculosis=1)  AND  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }
   else if(diseaselist==2){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}') AND (have_hemoglobin=1)  AND (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;


  }
  else  if(diseaselist==3){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}') AND (have_bloodpressure=1)  AND (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;


  }
  else if(diseaselist==4){


    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}') AND (have_diabetes=1) AND (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;


  }
}

else if(sevakname=='all' && diseaselist!='all'){


  if(diseaselist==1){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND (have_tuberculosis=1)  AND  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }
  else if(diseaselist==2){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND (have_hemoglobin=1)  AND  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }
  else if(diseaselist==3){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND (have_bloodpressure=1)  AND  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }
 else  if(diseaselist==4){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND (have_diabetes=1)  AND (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }

 



  }


  else if (sevakname!='all' && diseaselist=='all'){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}')   AND  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }




}
else if(!distcode){
  
  if(diseaselist=='all' && sevakname=='all'){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}')    LIMIT ${limit} OFFSET ${start}`;

  }

  else if(sevakname!='all' && diseaselist!='all'){

   if(diseaselist==1){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}') AND (have_tuberculosis=1)  OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }
   else if(diseaselist==2){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}') AND (have_hemoglobin=1)  OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;


  }
  else  if(diseaselist==3){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}') AND (have_bloodpressure=1)  OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;


  }
  else if(diseaselist==4){


    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}') AND (have_diabetes=1)  OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;


  }
}

else if(sevakname=='all' && diseaselist!='all'){


  if(diseaselist==1){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND (have_tuberculosis=1)  OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }
  else if(diseaselist==2){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND (have_hemoglobin=1)  OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }
  else if(diseaselist==3){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND (have_bloodpressure=1)  OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }
 else  if(diseaselist==4){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )  AND (have_diabetes=1)  OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }

 



  }


  else if (sevakname!='all' && diseaselist=='all'){

    sql=` SELECT * FROM patient_data where date(created_at) between date('${startdate}') AND date('${enddate}' )    AND  (sevak_username='${sevakname}')   OR  (dist_code='${distcode}' OR  dist_name='${distname}' OR  village_code='${villagecode}' OR village_name='${villagename}' )     LIMIT ${limit} OFFSET ${start}`;

  }

}

if(req.params.excel){
  var a=[]
  a=sql.split(/limit/i);
  console.log(a[0]);

  sql=a[0];
  

// sql=sql.replace(/limit/i/\d /offset/\d,"")
console.log("take me flag", sql);

}


var sql2=sql;

var sql3=sql2.replace("*", "Count(id) as noofrecords ");

console.log("this is ",sql3);

var sql4=sql3.split("LIMIT");

console.log("this is sql4",sql4[0]);

 var sql5=sql4[0];


        console.log(sql);
  
  
  
        console.log(sql);
      
              connectiondb();
  
  
              con.query(sql, function(err, result) {
      
                  if (err) {
                      // res.status(401);
                      res.status(404);
                      res.json(bodyonerr);
                      console.log(err);
  
              
                   sql='';
                   
      
      
                  } else{
  
                    result1=result;
  
  
  
                    var temp3;
  
                   
  
                   
                    
  
                    
  
                    con.query(sql5, function(err, result) {
                      if (err) {
                        console.log(err);
                        res.status(500);
                    
                        res.json(bodyerr);
                    
                               }
                    
                               else
                               {
                    
                                result4=result;
                                console.log(result[0].noofrecords);
                    
                    var Total_Records =result[0].noofrecords;
                    var Total_Pages = parseInt(Total_Records/10);
                    var ee=parseInt(pagination);
                    
                    var curent_page=ee;
                    var next_page =ee+1;
                    
                    var next_pageurl='';
                                
                    
                                 temp3={
                                  pagination:{
                                    current_page: curent_page,
                                    totoalpage:Total_Pages,
                                    totoalrecords:Total_Records,
                                    next_page:next_page,
                                    next_pageurl:next_pageurl
                                  }
                    
                                }
                    
                    
                               }
                    
                               var combine={
                                data:result1,
                                ...temp3
                              }
  
                             
                    
                               res.status(200);
                               res.json(combine);
                    
                    })
                 
                 
                 
                 
               
                
                
  
  
  
  
  
  
  
  
  
  
                
                
                
                   }
      
              })
      
          } catch (err) {
            // con.end();
            res.status(500);
            res.json(bodyonerr);

          }
      
      });


      app.post('/sevakapi/getsevaklist',function (req, res)
      {
      
        try {
        
      
      

      
        connectiondb();
          
        var sql=`SELECT email  FROM user`;
      
      console.log(sql);
      
        con.query(sql, function(err, result) {
           
          if (err) {
              console.log(err);
              res.status(500);
      
              res.json(bodyerr);
      
          } else {
              res.status(200);
              var combine={
                bodyonsucess,
                result1:result
              }
              res.json(combine);  
      
          }
      
      })
      

      
      
        
      
      
      
        } catch (error) {
      
          res.status(500);
          res.json(bodyerr);
          console.log(error);
      
      
          
        }
      
      })


      app.post('/sevakapi/downloads',function (req, res)
      {
      
        try {

        var dates = req.body.date
        var startdate=dates.startdate
        var end=dates.enddate

        
     
         
      
      

      
        connectiondb();
          
        var sql=`SELECT count(id) as records,village_name FROM patient_data WHERE created_at BETWEEN '${startdate}' AND '${end}' GROUP by village_name;`;


      
      console.log(sql);
      console.log("");
      console.log("");
      console.log("");
      
        con.query(sql, function(err, result) {
           
          if (err) {
              console.log(err);
              res.status(500);
      
              res.json(bodyerr);
      
          } else {
              res.status(200);
              var combine={
                bodyonsucess,
                result1:result
              }
              res.json(combine);  
      
          }
      
      })
      

      
      
        
      
      
      
        } catch (error) {
      
          res.status(500);
          res.json(bodyerr);
          console.log(error);
      
      
          
        }
      
      })


// app.post('/sevakapi/adddisease',function (req, res)
// {

//   try {

// var disease_name=req.body.disease_name
// var status


// if(req.body.data){
 
  

// }


//     connectiondb();
    
//     var sql=INSERT INTO disease_master (disease_name, status, created_at) VALUES ?


// var values =[];







//     con.query(sql, [values], function(err, result) {
       
//       if (err) {
//           console.log(err);
//           res.status(500);

//           res.json(bodyerr);

//       } else {
//           res.status(200);
//           res.json(bodyonsucess);  
//       }

//   })



//   } catch (error) {
    
//   }

// })
// app.post('/sevakapi/adddisease',function (req, res)
// {

//   try {


// if(req.body.data){
 
  

// }


//     connectiondb();
    
//     var sql=`INSERT INTO disease_master (disease_name, status, created_at) VALUES ?`


// var values =[];







//     con.query(sql, [values], function(err, result) {
       
//       if (err) {
//           console.log(err);
//           res.status(500);

//           res.json(bodyerr);

//       } else {
//           res.status(200);
//           res.json(bodyonsucess);  
//       }

//   })



//   } catch (error) {
    
//   }

// })



  
  











// app.listen(8000, () => console.log('Listening on port' ,server.address().port));
// console.log('Example app listening at http://localhost:', server.address().port);





var listener = app.listen(port, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

