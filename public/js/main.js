//https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=056df593d38e54ccf68f6f715a6dfe7d
const submitBtn=document.getElementById("submitBtn");
const cityName=document.getElementById('temp-city');
const city_notification=document.getElementById("middle-layer");
const city_temperature=document.getElementById("c_temp");
const city_status=document.getElementById("status");
const temp_data=document.getElementById("temp_data");

var K2C=(f)=>{
    var c=Math.round((f-273.15)*100)/100;
    return c;
}
var hideLower=()=>{
    if(temp_data.classList[0]!=="data-hide")
    {
        temp_data.classList.add("data-hide");
        city_status.classList.add("data-hide");
    }
}
var showLower=()=>{
    if(temp_data.classList[0]=="data-hide")
    {
        temp_data.classList.remove("data-hide");
        city_status.classList.remove("data-hide");
    }
}

var setStatus=(status)=>{
    if(status=="Clear"){
        city_status.innerHTML='<i class="fas fa-sun" style="color:#eccc68;"></i>';
    }else if(status=="Clouds"){
        city_status.innerHTML='<i class="fas fa-cloud" style="color:#f1f2f6;"></i>';
    }else if(status=="Rain"){
        city_status.innerHTML='<i class="fas fa-cloud-rain" style="color:#a4b0be;"></i>';
    }else{
        city_status.innerHTML='<i class="fas fa-cloud" style="color:#f1f2f6;"></i>';
    }
}
const getInfo=async(event)=>{
    event.preventDefault();
    let cityVal =cityName.value;
    if(cityVal==""){
        hideLower();
        city_notification.innerHTML ="City Name can't be empty";
    }else{
        try{
            hideLower();
            city_notification.innerHTML="<div class='loader m-auto'></div>";
            let url="https://api.openweathermap.org/data/2.5/weather?q="+cityVal+"&appid=056df593d38e54ccf68f6f715a6dfe7d";
            const response=await fetch(url);
            const data=await response.json();
            const arrData=[data];
            const status=arrData[0].weather[0].main;
            const cityInfo=arrData[0].name+","+arrData[0].sys.country;
            const temperature=arrData[0].main.temp;
            setStatus(status);
            city_notification.innerHTML=cityInfo;
            city_temperature.innerText=K2C(temperature);
            showLower();
        }catch{
            hideLower();
            city_notification.innerHTML="Enter a valid City";
        }
    }
    
}

submitBtn.addEventListener('click',getInfo);