function validateEmail(valor, divError) {
    if (
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            valor
        )
    ) {
        divError.innerHTML = "";
        return true;
    } else {
        divError.innerHTML = " * Email incorrecto";
        return false;
    }
}
