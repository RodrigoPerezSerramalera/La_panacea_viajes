function toStringDateDDMMYYY(date) 
{
    date = new Date(date);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(month < 10){
        return `${day}-0${month}-${year}`;
    }
    else{
        return `${day}-${month}-${year}`;
    }
}

function toStringDateYYYYMMDD(date) 
{
    date = new Date(date);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(month < 10){
        return `${year}-0${month}-${day}`;
    }
    else{
        return `${year}-${month}-${day}`;
    }
}