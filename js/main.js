if(navigator.serviceWorker){
    window.addEventListener("load",()=>{
         navigator.serviceWorker
         .register("../sw_cached_site.js")
         .then((reg)=>{console.log('Service Workers registered');})
         .catch((err)=>{console.log('Service Workers Error : ', err);})
    })
}