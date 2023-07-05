document.querySelector(".btn").addEventListener("click" ,(e)=>{

    x=document.querySelector(".search1").value;
   
    

    if(x.value != ""){

        document.querySelector(".parent").innerHTML =" ";
        get_image(x);
    }
    else{
        e.preventDefault();
    }
})
function get_image(x)
{
    const key="3ykk1ILdbaCmXLzXHQH4eN3S6lt7R_HqwlNivu8tm68";
    const url='https://api.unsplash.com/search/photos/?client_id='+key+'&query='+x+'&per_page=50';

    fetch(url).then(res => res.json()).then(result => App_images(result));
}
function App_images(data)
{
    for(let i=0; i<30 ; i++)
    {
       add_imag(data.results[i])
    }
}

function add_imag(info)
{
    document.querySelector(".parent").innerHTML +=
    `
    <div class="ch1" onclick="openImage(${info.links.download})">

            <img src="${info.urls.full}" alt="">

        </div>
    
    `
};


function openImage(image)
{
    console.log(image);
    window.open(image,'_blank');
};


document.querySelector(".search1").addEventListener("keyup",e=>{
    if(e.key === "Enter" && e.target.value){
        document.querySelector(".parent").innerHTML =" ";
        get_image(e.target.value);
    }

    
})



 