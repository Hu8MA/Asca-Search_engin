const wrapper = document.querySelector(".wrapper"),
infotext=wrapper.querySelector(".info-text"),
synonyms = wrapper.querySelector(".synonyms .list"),
volumeIcon=wrapper.querySelector(".word i");
searchInput=wrapper.querySelector("input");
let audio;


function data(result,word)
{
    if(result.title)//if api can't fetch the data of thes word
    {
        document.querySelector(".wrapper").style.display="none";
       //  infotext.innerHTML=`Searching the meaing of <span>"${word}"</span> . Plase try to search author word `;
    }
    
    else
    { 
        document.querySelector(".wrapper").style.display="block";

         console.log(result);
        wrapper.classList.add("active");
        let definitions=result[0].meanings[0].definitions[0];
        
        if(result[0].phonetics.length !== 0)
        {

            phonetics=`${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;
            document.querySelector(".word span").innerText=phonetics;
            audio=new Audio( result[0].phonetics[0].audio);
        }
        else
        {
            phonetics=`${result[0].meanings[0].partOfSpeech}  `;
            document.querySelector(".word span").innerText=phonetics;        }

        document.querySelector(".word p").innerText=result[0].word;

        document.querySelector(".meaning span").innerText=definitions.definition;

        document.querySelector(".example span").innerText=definitions.example;
       
       
       if(result[0].meanings[0].synonyms[0] === undefined )
       {
           synonyms.parentElement.style.display="none";
       }
       
        else
        { synonyms.parentElement.style.display="block";
            synonyms.innerHTML="";

            for(let i=0 ; i<5 ; i++)
            {
                let tag =`<span onclick=search('${result[0].meanings[0].synonyms[i]}')>${result[0].meanings[0].synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend",tag);
            } 
        }

    }
}


function search(word)
{
    searchInput.value=word;
    fetchApi(word);
}


function fetchApi(word)
{
        infotext.style.color="#000";
        
        infotext.innerHTML=`Searching the meaing of <span>"${word}"</span>`;
        let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        //method call data function with passing api response and searched word as an argument
        fetch(url).then(res => res.json()).then(result => data(result,word));
} 

document.querySelector(".search1").addEventListener("keyup",e=>{
    if(e.key === "Enter" && e.target.value){
    fetchApi(e.target.value);}

    
});

 
volumeIcon.addEventListener("click",()=>{

    audio.play();
}
);

document.querySelector(".btn").addEventListener("click" , (e)=>
{
    x=document.querySelector(".search1").value.trim();
   
    if(x !== ""){
 
        fetchApi(x);
   }
    else
    {
      e.preventDefault();
    }

});