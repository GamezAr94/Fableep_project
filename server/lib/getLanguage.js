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
    min_password: {
        en: "Minimum password length is 6 characters",
        es: "La longitud mínima de la contraseña es de 6 caracteres",
        it: "La lunghezza minima della password è di 6 caratteri",
        ko: "최소 비밀번호 길이는 6자입니다",
        fr: "La longueur minimale du mot de passe est de 6 caractères",
    },
    // SEND EMAIL MSG
    subject_email_verification: {
        en: "Thank you for registering! Please verify your account",
        es: "¡Gracias por registrarte! Por favor, verifica tu cuenta",
        it: "Grazie per esserti registrato! Si prega di verificare il proprio account",
        ko: "가입해 주셔서 감사합니다! 계정을 확인해주세요",
        fr: "Merci de vous être inscrit ! Veuillez vérifier votre compte",
    },
    body_email_verification_title: {
        en: "Almost Done!",
        es: "¡Casi Listo!",
        it: "Quasi fatto!",
        ko: "거의 끝났어요!",
        fr: "Presque fini !",
    },
    body_email_verification: {
        en: "Please click the link below to complete your account verification:",
        es: "Por favor, haz clic en el enlace de abajo para completar la verificación de tu cuenta:",
        it: "Si prega di cliccare sul link sottostante per completare la verifica dell'account:",
        ko: "계정 확인을 완료하려면 아래 링크를 클릭하세요:",
        fr: "Veuillez cliquer sur le lien ci-dessous pour finaliser la vérification de votre compte:",
    },
    body_email_verification_footer: {
        en: "On behalf of the Fableep team, thank you for choosing us. Enjoy the fabulous stories!",
        es: "En nombre del equipo de Fableep, gracias por elegirnos. ¡Disfruta de las fabulosas historias!",
        it: "A nome del team di Fableep, grazie per averci scelto. Buona lettura delle favolose storie!",
        ko: "파블립 팀 대신, 저희를 선택해 주셔서 감사합니다. 멋진 이야기를 즐겨보세요!",
        fr: "Au nom de l'équipe Fableep, merci de nous avoir choisis. Profitez des histoires fabuleuses !",
    },
    button_email_verify: {
        en: "Verify Account",
        es: "Verificar Cuenta",
        it: "Verifica Account",
        ko: "계정 확인",
        fr: "Vérifier le compte",
    },
    email_not_sent: {
        en: "Imposible to send the verification email, please try again or use a different email",
        es: "No es posible enviar el email de verificacion, por favor intente de nuevo o use un email differente",
        it: "Si prega di cliccare sul link sottostante per completare la verifica dell'account",
        ko: "계정 확인을 완료하려면 아래 링크를 클릭하세요",
        fr: "Veuillez cliquer sur le lien ci-dessous pour finaliser la vérification de votre compte",
    },
    not_valid_code_passed: {
        en: "Not valid code was passed",
        es: "No se ha proporcionado un código válido",
        it: "Il codice inserito non è valido",
        ko: "유효하지 않은 코드가 전달되었습니다",
        fr: "Un code non valide a été transmis",
    },
    user_not_found_try_again: {
        en: "User not found please try sign in again",
        es: "Usuario no encontrado, por favor, intente iniciar sesión nuevamente",
        it: "Utente non trovato, si prega di provare a accedere nuovamente",
        ko: "사용자를 찾을 수 없습니다. 다시 로그인을 시도하십시오.",
        fr: "Utilisateur non trouvé, veuillez réessayer de vous connecter",
    },
    error_verifying_email_account: {
        en: "Error verifying email account please contact support",
        es: "Error al verificar la cuenta de correo electrónico, por favor, póngase en contacto con soporte",
        it: "Errore durante la verifica dell'account email, si prega di contattare il supporto",
        ko: "이메일 계정 확인 중 오류가 발생했습니다. 지원팀에 문의하세요.",
        fr: "Erreur lors de la vérification du compte email, veuillez contacter le support",
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
