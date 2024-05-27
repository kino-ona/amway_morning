$(function() {

    /* 이름, 휴대폰번호 마스킹 */
    const memberName = $(".member-name").text();
    const memberPhone = $(".member-phone").text();
    $(".member-name").text(maskingName(memberName));
    $(".member-phone").text(maskingPhoneNumber(memberPhone));

})

function maskingName(name) {
    if(name.length > 2) {
        const arrayName = name.split("");
        arrayName.forEach((item, i) => {
            if(i == 0 || i == arrayName.length-1)
                return;
            arrayName[i] = '*';
        });
        const joinName = arrayName.join();
        return joinName.replace(/,/g, '');
    }else {
        return name;
    }
}

function maskingPhoneNumber(phone) {
    const originPhone = phone.split(" ");
    const maskingPhone = originPhone[1].replace(/[0-9]/g, "*");

    const joinPhone = originPhone[0] + " " + maskingPhone + " " + originPhone[2];
    return joinPhone;
}
