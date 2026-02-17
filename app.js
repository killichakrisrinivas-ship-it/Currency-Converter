const dropdowns=document.querySelectorAll(".container select")
 const btn=document.querySelector("button");
  const fromCurr=document.querySelector(".from select");
   const toCurr=document.querySelector(".to select");
   const output=document.querySelector("#output-text");

 for(select of dropdowns){
  for(currCode in countryList){
  let newOption=document.createElement("option");
  newOption.innerText=currCode;
  newOption.value=currCode;
  select.append(newOption);
  
 }
 select.addEventListener("change" ,(evt) => {
updateFlag(evt.target);
 })

 
 }
 updateFlag = (element) =>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
 }
 btn.addEventListener("click", async(evt) => {
  evt.preventDefault();
  let amt=document.querySelector("input");
  let amtval=amt.value;
  if(amtval==="" || amtval<0){
    amtval=1;
    amt.value="1";
  }
  
  const url=`https://open.er-api.com/v6/latest/${fromCurr.value}`;
  let response =await fetch(url);
  if (!response.ok) {
  output.innerText = "Network error";
  return;
}
  let data=await response.json();
  let rate=data.rates[toCurr.value];
  if(rate){
    let finalAmount=Number(amtval)*rate;
    output.innerText=`${amtval} ${fromCurr.value} =${finalAmount.toFixed(2)} ${toCurr.value}`;
  }
  else{
    output.innerText="Unable to fetch exchange rate"
  }
 
 });