class Utility{
    
  clock(){
    var period = 'AM';
    var today = new Date();
    var h = today.getHours();
    if(h>12){
      h = h-12;
      period = 'PM';
    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    
    m = utility.checkTime(m);
    s = utility.checkTime(s);
  
    document.getElementById('kh-clock').innerHTML = h + " : " + m + " : " + s+' '+period;
    utility.t = setTimeout(utility.clock, 500);
  }
  
  checkTime(i) {
    if (i < 10){i = "0" + i};  
    return i;
  }

}//end class

const utility = new Utility();

export default utility;