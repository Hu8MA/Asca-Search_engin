document.querySelector('.btn').addEventListener('click', (e)=>
{
    document.querySelector('.vedios').innerHTML ="";
    
     let x = "AIzaSyDLz3y2qmXBltMpsSTbNJdOF3INMgqgzHY";
    
     let value_search=document.querySelector('.search').value ;
    
      console.log(value_search);
      if(value_search !== "")
     {
       get_vedio(x,value_search,50);
     }
     else
     {     
          alert("enter the value");
          e.preventDefault();
     }
 
});

document.querySelector('.search').addEventListener("keyup" , function(e){

     let x = "AIzaSyDLz3y2qmXBltMpsSTbNJdOF3INMgqgzHY";
    
     let value_search=document.querySelector('.search1').value.trim() ;
    
     console.log("hh");

     if (e.key == "Enter")
     {
                 
       // console.log("hh");

                if(value_search !== "")
                {
                    
                   get_vedio(x,value_search,50);
                
                }
               
                else
                {
                    alert("enter the value");
                    e.preventDefault();
                }
    }

   
 
});

function get_vedio(key, value_search , limit){

    fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults="+limit+"&order=relevance&q="+value_search+"&type=video&type=channel&videoDefinition=any&videoType=any&key="+key)

   .then(Response => Response.json())
       .then(data => 
                   {
                           data.items.forEach(item => {

                               get_info_channel(item); 
                               console.log(data);
                       })
       
                   }  
       ).catch(err => alert(err));
} ;

function get_info_channel(info){

       // can use that way =>
      //fetch("https://www.googleapis.com/youtube/v3/channels?key="+key-api+"&part=snippet&id=info.snippet.channelId)

     fetch("https://www.googleapis.com/youtube/v3/channels?"  + new URLSearchParams({

         key:"AIzaSyDLz3y2qmXBltMpsSTbNJdOF3INMgqgzHY",
         part:'snippet',
         id:info.snippet.channelId,
     })) 
     .then(Response => Response.json())
     .then(data => {
         // in hear i will add propertes named channel on data jason of
         // info that hold the imag the vedio we can change this to any name
         
         info.channel_imag_of_vedio=data.items[0].snippet.thumbnails.default.url;

         make_vedio(info);
     })

  };
  function make_vedio(info)
  {
      
   // console.log(info);

     document.querySelector('.vedios').innerHTML +=
    `
        <div class="parent" onclick="location.href='https://youtube.com/watch?v=${info.id.videoId}'">

                    <div class="pictuerVedio">

                        <img src="${info.snippet.thumbnails.high.url}" alt="">

                    </div>

                    
                   <div class="p1">
                            
                   <img src=${info.channel_imag_of_vedio} alt=""  >
                        
                                <span>${info.snippet.channelTitle}</span>
                    </div>


                    
                    <div class="p2">
                    
                    <p>${info.snippet.title}</p>

                    <span id="Date">publishTime : ${info.snippet.publishTime.substring(0,10)}</span>

                    </div>  

          </div>

        `

  }