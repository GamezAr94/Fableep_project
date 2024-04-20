const lanMsg = {
    not_existing_email: {
        en: "That email is not registered",
        es: "Ese correo electrónico no está registrado",
        it: "Quell'indirizzo email non è registrato",
        ko: "해당 이메일은 등록되지 않았습니다",
        fr: "Cet e-mail n'est pas enregistré",
    },
    not_valid_email: {
        en: "Please enter a valid email",
        es: "Por favor, ingresa un correo electrónico válido",
        it: "Per favore, inserisci un'email valida",
        ko: "유효한 이메일을 입력하세요",
        fr: "Veuillez saisir une adresse e-mail valide",
    },
    empty_email: {
        en: "Please enter an email",
        es: "Por favor, ingresa un correo electrónico",
        it: "Per favore, inserisci un'email",
        ko: "이메일을 입력하세요",
        fr: "Veuillez saisir une adresse e-mail",
    },
    not_valid_password: {
        en: "That password is incorrect",
        es: "Esa contraseña es incorrecta",
        it: "Quella password non è corretta",
        ko: "그 암호는 잘못되었습니다",
        fr: "Ce mot de passe est incorrect",
    },
    duplicated_email: {
        en: "The email is already registered",
        es: "El correo electrónico ya está registrado",
        it: "L'email è già registrata",
        ko: "해당 이메일은 이미 등록되어 있습니다",
        fr: "L'e-mail est déjà enregistré",
    },
    empty_password: {
        en: "Please enter a password",
        es: "Por favor, ingresa una contraseña",
        it: "Per favore, inserisci una password",
        ko: "비밀번호를 입력하세요",
        fr: "Veuillez saisir un mot de passe",
    },
    // SEND EMAIL MSG
    subject_email_verification: {
        en: "Thank you for registering! Please verify your account",
        es: "¡Gracias por registrarte! Por favor, verifica tu cuenta",
        it: "Grazie per esserti registrato! Si prega di verificare il proprio account",
        ko: "가입해 주셔서 감사합니다! 계정을 확인해주세요",
        fr: "Merci de vous être inscrit ! Veuillez vérifier votre compte",
    },
    body_email_verification: {
        en: "Please click the link below to complete your account verification",
        es: "Por favor, haz clic en el enlace de abajo para completar la verificación de tu cuenta",
        it: "Si prega di cliccare sul link sottostante per completare la verifica dell'account",
        ko: "계정 확인을 완료하려면 아래 링크를 클릭하세요",
        fr: "Veuillez cliquer sur le lien ci-dessous pour finaliser la vérification de votre compte",
    },
    email_not_sent: {
        en: "Imposible to send the verification email, please try again or use a different email",
        es: "No es posible enviar el email de verificacion, por favor intente de nuevo o use un email differente",
        it: "Si prega di cliccare sul link sottostante per completare la verifica dell'account",
        ko: "계정 확인을 완료하려면 아래 링크를 클릭하세요",
        fr: "Veuillez cliquer sur le lien ci-dessous pour finaliser la vérification de votre compte",
    },
};

/**
 * function to get the error message in different languages
 * @param {string} code the language code to get
 * @param {string} lan the language to find
 * @returns plain error message if the message doesnt exist or the error in that language
 */
const getMessage = (code, lan) => {
    if (code == "") {
        return "code not valid";
    }
    if (lan == "") {
        return "language not valid";
    }
    if (!lanMsg[code] || !lanMsg[code][lan]) {
        return "not existing msg";
    }
    return lanMsg[code][lan];
};

module.exports = getMessage;
