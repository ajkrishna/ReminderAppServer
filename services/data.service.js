const db=require('./db');

const reg=(uid,uname,pswd)=>
  {
    return db.Event.findOne({uid})
    .then(user=>{
       // console.log(user);
        if(user)
        {
        return{ 
          statusCode:422,
           status: false,
         message:"User already Exists....Please Login"}
        }
        else
        {
          const newUser=new db.Event({
            uid,
            username:uname,
            password:pswd,
            events:[]
          })
          newUser.save();
          return{ 
            statusCode:200,
            status: true,
            message: ("Successfully registered")}
        
        }
      })
      }

  const login=(req,uID,password)=>
        {
          var uid=parseInt(uID);
          return db.Event.findOne({uid,password})
          .then(user=>{
           // console.log(user);
            if(user)
                  {
                    req.session.currentUser=user.uid;
                  return{ 
                      statusCode:200,
                      status:true,
                    message:"Login successful",
                    name:user.username,
                    uid:user.uid
                  }
                  }
                  else
                  {
                   return {statusCode:422,
                    status:false,
                  message:"Invalid credentials",
                }
                  }
          })
        }
       
       const saveve=(req,i,edate,edesc)=>
       {
           let uid=req.session.currentUser;
        return db.Event.findOne({uid})
          .then(user=>{
            //console.log(user);
            if(user){
            user.events.push({
                event_id:i,evedate:edate,evedesc:edesc
              })
            user.save();
            return{ 
              statusCode:200,
              status:true,
              evedate:edate,
            message:"Saved successfully"} 
            }
            else
                  {
                   return {statusCode:422,
                    status:false,
                  message:"Try Again..."
                }}
         })
       }
    const display=(req,uID)=>
  {
   // let uid=req.session.currentUser;
   var uid=parseInt(uID);
        return db.Event.findOne({uid})
        .then(user=>{
          console.log(user);
          if(user)
          {
          let len=user.events.length;
          let edate=[];
          let edesc=[];
          for(let i=0;i<len;i++)
          {
            edate.push(user.events[i].evedate);
            edesc.push(user.events[i].evedesc)
          }
        
          return{ 
            statusCode:200,
            status:true,
            event_date:edate,
            event_desc:edesc
          } 
          }
          else
           {
                 return {statusCode:422,
                  status:false,
                message:"Try Again..."
              }}
       })
  }

       module.exports={
        reg,
        login,
        saveve,
        display
      }