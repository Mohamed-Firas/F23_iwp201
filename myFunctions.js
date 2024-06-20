
$(document).ready(function () {
    function generateCaptcha() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var captcha = '';
        for (var i = 0; i < 6; i++) {
            var index = Math.floor(Math.random() * characters.length);
            captcha += characters.charAt(index);
        }
        return captcha;
    }

    var currentCaptcha = generateCaptcha();
    $('#captchaDisplay').text(currentCaptcha);

    function refreshCaptcha() {
        currentCaptcha = generateCaptcha();
        $('#captchaDisplay').text(currentCaptcha);
    }

    $('#refreshCaptcha').click(function () {
        refreshCaptcha();
    });

    $(".check").change(function () {
        $(this).closest("tr").next(".hidden").toggleClass("visible");
    });

    function validateForm() {
        var isValid = true;
        var errorMsg = "";

        var nationalID = $('#nationalID').val();
        var regexNationalID = /^(0[1-9]|1[0-4])[0-9]{9}$/;
        if (!regexNationalID.test(nationalID)) {
            errorMsg += "الرقم الوطني غير صالح\n";
            isValid = false;
        }

        var fullName = $('#fullName').val();
        if (fullName && !/^[أ-ي\s]+$/.test(fullName)) {
            errorMsg += ". يجب استخدام الأحرف العربية  .\n";
            isValid = false;
        }

        var dob = $('#dob').val();
        if (dob && !/^\d{2}-\d{2}-\d{4}$/.test(dob)) {
           errorMsg += ". يرجى إدخال التاريخ بالتنسيق التالي dd-mm-yyyy.\n";
           isValid = false;
        }

        var mobile = $('#mobile').val();
        if (mobile && !/^09[^12]\d{7}$/.test(mobile)) {
            errorMsg += "رقم الجوال غير صالح\n";
            isValid = false;
        }

        var email = $('#email').val();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMsg += "البريد الالكتروني غير صالح.\n";
            isValid = false;
        }

        if (!isValid) {
            alert(errorMsg);
        }

        return isValid;
    }

    $('#continueButton').click(function () {
        if ($('input[type="radio"]:checked').length > 0) {
            $('#formContainer').fadeIn();
        } else {
            alert('يرجى الاختيار أولاً.');
        }
    });

    $('#closeForm').click(function () {
        $('#formContainer').fadeOut();
    });

    $('#propertyForm').on('submit', function (e) {
        e.preventDefault(); 

        if (validateForm()) {
            var userCaptcha = $('#captchaInput').val();
            if (userCaptcha === currentCaptcha) {

                var selectedDetails = $('input[type="radio"]:checked').closest("tr").next("tr.hidden").find("ul li").map(function () {
                    return $(this).text();
                }).get().join('\n');
                alert('تم حجز العقار بنجاح! \n\nتفاصيل العقار:\n' + selectedDetails);
                $('#formContainer').fadeOut();
                $('#captchaInput').val('');
                refreshCaptcha();
            } else {
                alert('رمز التحقق غير صحيح. حاول مرة أخرى.');
                $('#captchaInput').val('');
                refreshCaptcha();

            }
        }
    });
});
