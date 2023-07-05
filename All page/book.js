
document.querySelector(".btn").addEventListener("click" , (e)=>
{
  document.querySelector('.father').innerHTML="";
   x=document.querySelector(".search").value.trim();
   
   if(x !== ""){

     fetchBook(x);
  }
   else
   {
     e.preventDefault();
   }
});



function fetchBook(text)
{
  document.querySelector('.father').innerHTML="";

  let key ="AIzaSyCh3Laeqtsxo-dXtwhnb8uRCS3fihsqmxg";
 
  
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}&orderBy=relevance&key=${key}&maxResults=40`)
  .then(res => res.json())
  .then(result =>{

               result.items.forEach(item => {

                   designPage(item); 
               }) 
               }  

        ) .catch(err => console.log(err));

}
function designPage(info)
{
  
  console.log(info);

  let description="";
  if(info.volumeInfo.description === undefined)
  {
    description="that not have Decription";
  }
  else
  {
    description = info.volumeInfo.description;
   
  }
  document.querySelector('.father').innerHTML +=
  ` 
   <div class="parent" onclick="location.href='${info.volumeInfo.previewLink}'">

              <div class="ch1">

                              <div class="b1">

                                  <img src=${info.volumeInfo.imageLinks.thumbnail} alt="book">

                              </div>
                            
                              <div class="b2">

                                    <ul class="x">
                                      
                                      <li id="title">Title:<span> ${info.volumeInfo.title}</span> </li>
                                      <li>Authors:<span> ${info.volumeInfo.authors }</span></li>
                                      <li>Categories: <span>${info.volumeInfo.categories }</span></li>
                                      <li>Language: <span>${info.volumeInfo.language}</span> </li>
                                      <li>PageCount:<span> ${info.volumeInfo.pageCount} page </span></li>
                                      <li>Publisher:<span> ${info.volumeInfo.publishedDate} </span></li>

                                    </ul>

                              </div>
        
              </div>


                    <div class="ch2">

                        <span>Description : </span>
        
                        <p>${description}</p>
        
                    </div>


    </div>
  
    ` ;
};
document.querySelector(".search").addEventListener("keyup",e=>{
  if(e.key === "Enter" && e.target.value){
    fetchBook(e.target.value);}

  
});
 
 

