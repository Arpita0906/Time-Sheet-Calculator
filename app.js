
let calculateTotalHours = () => {
    
    let totalHours = 0;

    document.querySelectorAll('.total-hour-day').forEach(hours =>{
        //parse to decimal upto 2 decimal places
        totalHours += parseFloat(hours.innerText);
    });

    //if not a number then set to 0
    if(isNaN(totalHours)){
        totalHours = 0;
    }

    totalHours = totalHours.toFixed(2);

    document.querySelector('#total-hours').innerText = totalHours;
}

function getValues(querySelector) {
    let values = [];
    document.querySelectorAll(querySelector).forEach(element => {
        values.push(element.value);
    });
    return values;
}


let calculateTotalHoursPerDay = () => {

    // get all the start and end hours and mins
    let startHours = getValues('.start-hour');
    let startMin = getValues('.start-min');
    let endHours = getValues('.end-hour');
    let endMin = getValues('.end-min');
    let startTimes = getValues('.start-time');
    let endTimes = getValues('.end-time');
    let breakHours = getValues('.break-hour');
    let breakMin = getValues('.break-min');

    let totalWorkHourPerDay = document.querySelectorAll('.total-hour-day');

    for(let i = 0; i < totalWorkHourPerDay.length; i++){

        let time1 = `${startHours[i]}:${startMin[i]} ${startTimes[i]}`
        let time2 = `${endHours[i]}:${endMin[i]} ${endTimes[i]}`

        // Convert the input times to JavaScript Date objects with a default date of 1/1/1970
        let d1 = new Date("1/1/1970 " + time1);
        let d2 = new Date("1/1/1970 " + time2);

        // Calculate the difference in milliseconds
        var diffMs = d2.getTime() - d1.getTime();

        // Difference should be positive
        if(diffMs < 0){
            error.innerText = 'Ending time should be greater than starting time';
            diffMs = 0;
            totalWorkHourPerDay[i].innerText = diffMs.toFixed(2);
            totalWorkHourPerDay[i].style.color = 'red';
            continue;
        }

        // Calculate the break hour and min to milliseconds
        let breakHourInMs = breakHours[i] * 60 * 60 * 1000;
        let breakMinInMs = breakMin[i] * 60 * 1000;


        // Subtract the break hour and min from the total time
        diffMs = diffMs - breakHourInMs - breakMinInMs;

        // Convert the difference to hours, minutes, and seconds
        let diffHours = Math.floor(diffMs / 1000 / 60 / 60);
        let diffMinutes = Math.floor((diffMs / 1000 / 60) % 60);

        // convert to text to a decimal upto 2 decimal places

        let diffHoursInDecimal = parseFloat(`${diffHours}.${diffMinutes}`);

        totalWorkHourPerDay[i].innerText =  diffHoursInDecimal.toFixed(2);

    }

}

let error = document.querySelector('.error');

let checkDigitRange = (e, x, y) => {
    let value = e.value;
    console.log(value);
    // check if value is a number and between 1 to 12
    if(isNaN(value) || value < x || value > y){
        console.log('error');
        error.innerText = `Please enter a number between ${x} to ${y}`
        // e.target.value = '';
        return true;
    }else{
        error.innerText = '';
        return false;
    }
}


function addListeners(querySelector, minRange, maxRange) {
    let elements = document.querySelectorAll(querySelector);
    elements.forEach(element => {
        element.addEventListener('input', (e) => {
            if(checkDigitRange(e.target, minRange, maxRange)){
                element.classList.add('mismatch');
            }else{
                element.classList.remove('mismatch');
            }
        });
    });
}

addListeners('.start-hour', 1, 12);
addListeners('.start-min', 0, 59);
addListeners('.end-hour', 1, 12);
addListeners('.end-min', 0, 59);
addListeners('.break-hour', 0, 24);
addListeners('.break-min', 0, 59);


document.querySelector('.calculate').addEventListener('click', () => {

    calculateTotalHoursPerDay();
    calculateTotalHours();

});

calculateTotalHoursPerDay();
calculateTotalHours();


document.querySelector('.clear').addEventListener('click', () => {

    document.querySelectorAll('.start-hour').forEach(hour => {
        hour.value = 00;
    });
    document.querySelectorAll('.start-min').forEach(min => {
        min.value = 00;
    });
    document.querySelectorAll('.end-hour').forEach(hour => {
        hour.value = 00;
    });
    document.querySelectorAll('.end-min').forEach(min => {
        min.value = 00;
    });
    document.querySelectorAll('.break-hour').forEach(hour => {
        hour.value = 00;
    });
    document.querySelectorAll('.break-min').forEach(min => {
        min.value = 00;
    });
    document.querySelectorAll('.total-hour-day').forEach(hour => {
        hour.innerText = 0.00.toFixed(2);
    });
    document.querySelector('#total-hours').innerText = 0.00.toFixed(2);

    document.querySelectorAll('.start-time').forEach(time => {
        time.value = 'AM';
    });
    document.querySelectorAll('.end-time').forEach(time => {
        time.value = 'AM';
    });

});