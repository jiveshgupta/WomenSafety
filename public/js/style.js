function locateMe(){
    result = window.confirm("send emergency mail to your mail-list");
    if(result){
    navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true});
    function successLocation(position){
      console.log("ergt");
      latitude=position.coords.latitude,
      longitude=position.coords.longitude
      console.log('locateMe');
    $.post("/sendMail",{latitude:latitude,longitude:longitude});
    }
    
    function errorLocation(){ 
      console.log("error");
    }
  }
    }