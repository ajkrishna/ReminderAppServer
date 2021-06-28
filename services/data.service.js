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
       
       const saveve=(req,edate,edesc)=>
       {
           let uid=req.session.currentUser;
        return db.Event.findOne({uid})
          .then(user=>{
            //console.log(user);
            if(user){
            user.events.push({
                evedate:edate,evedesc:edesc
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
         // console.log(user);
          if(user)
          {
          let len=user.events.length;
          let edate=[];
          let edesc=[];
          
          for(let i=0;i<len;i++)
          {
            edate.push(user.events[i].evedate);
            edesc.push(user.events[i].evedesc);
            
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

  const deleve=(uID,edate,edesc)=>{
    var uid=parseInt(uID);
    return db.Event.updateOne({uid:uid},{$pull:{events:{evedate:edate,evedesc:edesc} }
      
    }).then(user=>{
      if(!user){
        return{statusCode:422,
        status:false,
        message:"Operation Failed"}
      }
      return{statusCode:200,
        status:true,
        event_date:edate,
        message:"Event has been deleted successfully"}
  
    })
  }

  const editeve=(uID,editdate,editdesc,edate,edesc)=>{
    var uid=parseInt(uID);
   
   return db.Event.updateOne({uid:uid,"events.evedate": edate, "events.evedesc": edesc},
   {$set: {"events.$.evedate": editdate, "events.$.evedesc": editdesc}})
   .then(user=>{
      if(user)
          { 
          return{ 
            statusCode:200,
            status:true,
            event_date:editdate,
            event_desc:editdesc,
            message:"Updated Successfully"
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
        display,
        deleve,
        editeve
      }