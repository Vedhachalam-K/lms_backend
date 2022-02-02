var fs = require('fs');

function deleteFile(filePath){
    fs.unlink(filePath, (err) => {
        if(err){
            console.log(err);
        }
    });
    console.log('File deleted');
}

function validateFile(data){

    var result = 'Uploaded file is not valid';

    console.log('-----------------------------------------');
    var rawSplit = data.split('\n');
    var totalLength = rawSplit.length;
    console.log("Uploaded length = "+totalLength);

    var validSplit = getValidSplit(rawSplit);

    /* for(var i=0;i<validSplit.length;i++){
        console.log(i + " -- " + validSplit[i]);
    } */

    var validLength = validSplit.length;
    console.log("Valid length = "+validLength);

    if(validLength % 6 == 0){
        if(checkQuestions(validSplit)){
            result = 'File uploaded successfully';
        }
    }
    
    return result;
}

function getValidSplit(rawSplit){
    var validSplit = [];
    var j = 0;

    for(var i=0;i<rawSplit.length;i++){
        //console.log(rawSplit[i].trim() + " ----- " + rawSplit[i].trim().length);

        if(rawSplit[i].trim().length > 0){
            validSplit[j] = rawSplit[i].trim();
            j++;
        }
    }

    return validSplit;
}

function checkQuestions(validSplit){
    var result = true;

    var totalLines = validSplit.length;
    var totalQuestions = totalLines/6;
    console.log("Total questions: "+ totalQuestions);

    for(var i=0;i<totalLines;i=i+6){

        console.log(i + " ---- " + validSplit[i].includes("?") + " ---- " + validSplit[i]);

        if(!validSplit[i].includes("?")){
            result = false;
            break;
        }
    }

    return result;
}

module.exports = {
    deleteFile,
    validateFile,
    getValidSplit
}