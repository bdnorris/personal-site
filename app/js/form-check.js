var stateList = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];

var errorDictionary = {empty:'*Please enter your ', emptyEmail:'*Please enter your email', validEmail:'*Must be a valid email', validState:'*Must be a valid state', emptyState:'*Please enter your state', validPhone:'*Must be a valid phone number', emptyState:'*Please enter your phone number', lengthPhone:'*Phone Number can only be 10 numbers', lettersPhone:'Phone cannot contain letters', emptyZip:'*Please enter your zip code', onlyZip:'*Zip Code can only be 5 numbers'};


//------------ hashID for better session tracking. collectionEmaillogName for MarlinEmailLog -------//
var hashID = Math.random().toString(36).substring(7),
    collectionEmaillogName = 'Southeastern Mills Landing Page';
//-------------//

$('form').on("submit", function(e) {

    sendGA('event', 'SubmissionForm', 'submit', '#'+hashID);

    e.preventDefault();

    var errors = true;

    $('form').find(':input').each(function(){

        if (this.tagName == 'INPUT') {

            if (this.required && this.value.length <= 0) {
                sendGA('event', 'SubmissionForm', 'error', '#'+hashID+' empty required - '+this.name);
                addError(this.name, errorDictionary.empty+this.name);
                errors = false;
            } else {
                removeError(this.name);
            }

            var inputType = this.name;

            if (inputType == undefined) {
                inputType == e.target.id;
            }

            if (inputType == 'zip') {
                checkZip(this);
            } else if (inputType == 'phone') {
                checkPhone(this);
            } else if (inputType == 'email') {
                checkEmail(this);
            } else if (inputType == 'state') {
                checkState(this);
            }
        }
    });

    $('form').find(':input').each(function(){
        if ($(this).hasClass('error-input')) {
            errors = false;
            sendGA('event', 'SubmissionForm', 'error', '#'+hashID+' generic validation');
        }
    });

    if (errors) {
        submitForm(e);
    }

});


$('form').on("keyup focusout", function(e) {

    var inputType = e.target.name;

    if (inputType == undefined) {
        inputType == e.target.id;
    }

    if (inputType == 'zip') {
        checkZip(e.target, e.originalEvent.type);
    } else if (inputType == 'phone') {
        checkPhone(e.target, e.originalEvent.type);
    } else if (inputType == 'email' && e.originalEvent.type == 'blur') {
        checkEmail(e.target);
    } else if (inputType == 'state' && e.originalEvent.type == 'blur') {
        checkState(e.target);
    }

    if (e.originalEvent.type == 'blur') {
        var error = 0,
            required = 0;

        $('form').find(':input').each(function(){
            if (this.required) {
                required++;
            }
            if (this.tagName == 'INPUT') {
                if ((this.required && this.value.length > 0) && !$(this).hasClass('error-input')) {
                    error++;
                }
            }
            else {
              removeError(e.target.name);
            }
        });

        if (error == required) {
            $('form [type=submit]').addClass('active');
        } else {
            $('form [type=submit]').removeClass('active');
        }
    }


});

function submitForm(e) {

    var formData = {};

    sendGA('event', 'SubmissionForm', 'Success', '#'+hashID);

    $('form').find(':input').each(function(){
        if (this.tagName == 'INPUT' && this.type !== 'submit') {
            formData[this.name] = this.value;
        }
        // This addition makes sure the password input is turned back into a password input before submittal.
        // If you don't do this, it won't register on the user's password manager.
        if (this.id == 'password') {
          this.type = 'password';
        }

    });

    console.dir(formData);

    var errorMessage = 'There was an error in submitting the form.',
        collectionName = collectionEmaillogName,
        // ajaxURL = 'http://emaillog.marlinnetwork.com/Api/LogForm/'+collectionName,
        ajaxURL = 'http://NERF',
        ajaxData = JSON.stringify(formData);

    //ajaxURL = 'fail';

    //console.log(ajaxURL);
    //console.dir(ajaxData);

    $.ajax({
        type: "POST",
        url: ajaxURL,
        dataType: "json",
        data: ajaxData,
        success: function(data){
            console.dir(data);
            window.location.href = 'index.html';
        },
        failure: function(errMsg) {
            console.log(errMsg);
        }
    });

}

function checkZip(e, eventType) {
    let replaced = e.value.replace(' ', ''),
        error = '';
    $(e).val(replaced);

    if (e.value.length == 0) {
        error = 'emptyZip';
        addError(e.name, errorDictionary.emptyZip);
     } else if (!$.isNumeric(e.value)) {
         error = 'onlyZip';
        addError(e.name, errorDictionary.onlyZip);
     } else if (replaced.length > 5 ) {
         error = 'onlyZip';
         addError(e.name, errorDictionary.onlyZip);
     } else {
         removeError(e.name);
     }

    if (error !== '') {
        sendGA('event', 'SubmissionForm', 'error', '#'+hashID+' zip validation - '+error);
    }

}

function checkPhone(e, eventType) {
    let filter = /^[0-9-+().\s]+$/;
    let removed = e.value.replace(/[^0-9]/g, '');
    let error = '';

    if (eventType !== 'blur') {
        if (e.value.length == 0) {
            error = 'emptyPhone';
            addError(e.name, errorDictionary.emptyPhone);
        } else if (!filter.test(e.value)) {
            error = 'lettersPhone';
            addError(e.name, errorDictionary.lettersPhone);
        } else if (removed.length == 10 ) {

            let testValue = e.value.search(/^\(?\d{3}\D*\d{3}\D*\d{4}$/);
            if (testValue == 0) {
              let parts = e.value.match(/^\(?(\d{3})\D*(\d{3})\D*(\d{4})$/);
              e.value = '('+parts[1]+') '+parts[2]+'-'+parts[3];
            }

            removeError(e.name);
        } else if (removed.length > 10) {
            error = 'lengthPhone';
            addError(e.name, errorDictionary.lengthPhone);
        }



    } else {

        if (e.value.length == 0) {
            error = 'emptyPhone';
            addError(e.name, errorDictionary.emptyPhone);
        } else if (removed.length !== 10) {
            error = 'lengthPhone';
            addError(e.name, errorDictionary.lengthPhone);
        } else if (e.value.length !== 0) {
            removeError(e.name);
        }
    }

    if (error !== '') {
        sendGA('event', 'SubmissionForm', 'error', '#'+hashID+' phone validation - '+error);
    }

}

function checkEmail(e) {

    let filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        error = '';

    if (e.value.length == 0) {
        error = 'emptyEmail';
        addError(e.name, errorDictionary.emptyEmail);
    } else if ( !filter.test(e.value)  ) {
        error = 'validEmail';
        addError(e.name, errorDictionary.validEmail);
    } else if (!this.submitTry && e.value.length !== 0) {
        removeError(e.name);
    }

    if (error !== '') {
        sendGA('event', 'SubmissionForm', 'error', '#'+hashID+' email validation - '+error);
    }
}

function checkState(e) {
    let error = '';

    if (e.value.length == 0) {
        error = 'emptyState';
        addError(e.name, errorDictionary.emptyState);
    } else if (stateList.indexOf(e.value.toUpperCase()) == -1 ) {
        error = 'validState';
        addError(e.name, errorDictionary.validState);
    } else if (!this.submitTry && e.value.length !== 0) {
        removeError(e.name);
    }

    if (error !== '') {
        sendGA('event', 'SubmissionForm', 'error', '#'+hashID+' state validation - '+error);
    }
}

/*****************
    EDIT THESE
******************/

function sendGA(event, eventCategory, eventAction, eventLabel) {
    //replace with GTM if wanted
    if (typeof ga === 'function') {
        ga('send', event, eventCategory, eventAction, eventLabel);
    }
}

function addError(eName, errorMessage) {
    //console.log('eName: '+eName);
    //console.log('addError: '+errorMessage);

    // $("label[for='"+eName+"'] span").html(errorMessage);
    $("label[for='"+eName+"'] span").html(errorMessage).addClass('error-label');
    $("input[name='"+eName+"']").addClass('error-input');

}

function removeError(eName) {
    // $("label[for='"+eName+"'] span").html('');
    $("label[for='"+eName+"'] span").html('').removeClass('error-label');
    $("input[name='"+eName+"']").removeClass('error-input');

}
