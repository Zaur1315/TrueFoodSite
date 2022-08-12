const Timer = (id, deadLine)=>{
    //const deadLine = '2022-10-25';

function getTimeRemaining(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 *24)),
          hours = Math.floor((t /( 1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);
          
    return {
        'total' : t,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    }
}

function getZero(num){
    if(num >= 0 && num < 10) {
        return `0${num}`;
    }else{
        return num;
    }
};

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          minutes = timer.querySelector('#minutes'),
          hours = timer.querySelector('#hours'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    
        updateClock()

        function updateClock(){
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        minutes.innerHTML = getZero(t.minutes);
        hours.innerHTML = getZero(t.hours);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <=0) {
            clearInterval(timeInterval);
        }
    }
}

    setClock(id, deadLine);
}

export default Timer;