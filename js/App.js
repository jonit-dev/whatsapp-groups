document.addEventListener("DOMContentLoaded", () => {
  //Language configuration

  const languageStrings = {
    ptbr: {
      facebook: {
        meta: {
          title: "Grupos de WhatsApp - Vagas",
          description:
            "Acesse vagas exclusivas em todo estado, postadas diariamente"
        }
      },
      title: "Grupos de Whatsapp",
      headline: "Acesse grupos de emprego exclusivos",
      input: {
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "E-mail",
        emailPlaceholder: "Seu e-mail",
        position: "Vaga de interesse",
        positionPlaceholder: "Ex. Vendedor",
        group: "Grupo"
      },
      ctaButton: "Acessar",
      validation: {
        errorEmptyField:
          "Por favor, preencha todos os campos antes de prosseguir!",
        errorInvalidEmail: "Por favor, insira um email válido!"
      }
    },
    eng: {
      facebook: {
        meta: {
          title: "Whatsapp Group - Jobs",
          description: "Access exclusive job positions, posted daily"
        }
      },
      title: "Whatsapp Groups",
      headline: "Access our Job Groups",
      input: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "E-mail",
        emailPlaceholder: "Your e-mail",
        position: "Position",
        positionPlaceholder: "Eg. Receptionist",
        group: "Group"
      },
      ctaButton: "Next",
      validation: {
        errorEmptyField:
          "Please, fill all of the fields below before proceeding!",
        errorInvalidEmail: "Please, insert a valid email!"
      }
    }
  };

  // Firebase initialization ========================================

  // Initialize Firebase
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAAl2MkjcXgFo-2ERPfywDccN61pEd57To",
    authDomain: "app-bo.firebaseapp.com",
    databaseURL: "https://app-bo.firebaseio.com",
    projectId: "app-bo",
    storageBucket: "app-bo.appspot.com",
    messagingSenderId: "948796332411",
    appId: "1:948796332411:web:4136f6ad50c6a1730245de",
    measurementId: "G-W0TFNRTQRZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const database = firebase.database();

  // Main logic ========================================

  console.log("content loaded");

  const urlParams = new URLSearchParams(window.location.search);

  let state = urlParams.get("state");
  let language = urlParams.get("language");

  console.log(state, language);

  const groups = {
    es: [
      {
        name: "Emprego Urgente ES - #1",
        url: "https://chat.whatsapp.com/K3mKt9yREN8JUBfQUN6Y2r"
      },
      {
        name: "Emprego Urgente ES - #2",
        url: "https://chat.whatsapp.com/HJV3zqgoU0W1ZpEa6Rtdym"
      },
      {
        name: "Emprego Urgente ES - #3",
        url: "https://chat.whatsapp.com/E4dtl6wK6xw4uBfuJw7MNW"
      }
    ],
    sp: [
      {
        name: "Emprego Urgente SP - #1",
        url: "https://chat.whatsapp.com/DITRy3cquo38EBkdacf8DS"
      },
      {
        name: "Emprego Urgente SP - #2",
        url: "https://chat.whatsapp.com/IpyZFwgaiDBAnGDTMLmV4i"
      }
    ],
    bh: [
      {
        name: "Emprego Urgente BH - #1",
        url: "https://chat.whatsapp.com/GAyfZlKAfmk006WxsLw5Ds"
      }
    ],
    vancouver: [
      {
        name: "Jobs Vancouver #1",
        url: "https://chat.whatsapp.com/EVXsDCNjUhl7JSZQ3gAQd0"
      }
    ]
  };

  if (!state) {
    state = "es";
    language = "ptbr";
  }

  const strings = languageStrings[language];

  // set facebook meta

  document
    .querySelector("meta[property*='title']")
    .setAttribute("content", strings.facebook.meta.title);
  document
    .querySelector("meta[property*='description']")
    .setAttribute("content", strings.facebook.meta.description);

  // set translation strings

  // title
  document.querySelector(".header-title").innerText = strings.title;

  // headline
  document.querySelector("#headline").innerText = strings.headline;

  // name
  document.querySelector("label[for='name']").innerText = strings.input.name;
  document.querySelector("#name").placeholder = strings.input.namePlaceholder;

  // email
  document.querySelector("label[for=email]").innerText = strings.input.email;
  document.querySelector("#email").placeholder = strings.input.emailPlaceholder;

  // position
  document.querySelector("label[for=position]").innerText =
    strings.input.position;
  document.querySelector("#position").placeholder =
    strings.input.positionPlaceholder;

  // group
  document.querySelector("label[for=group-select]").innerText =
    strings.input.group;

  // cta button
  document.querySelector("#form-submit").value = strings.ctaButton;

  // create and inject options decorator

  const groupSelectDropdown = document.querySelector("#group-select");

  groups[state].forEach(({ name, url }) => {
    let options = `<option value="${url}"
    >${name}</option`;

    groupSelectDropdown.innerHTML += options;
  });

  const leadForm = document.querySelector("#form-signup");

  leadForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log("submitting form data");

    const formData = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      position: document.querySelector("#position").value,
      group: document.querySelector("#group-select option:checked").value
    };

    //basic validation

    if (
      !formData.name ||
      !formData.email ||
      !formData.position ||
      !formData.group
    ) {
      alert(strings.validation.errorEmptyField);
      return;
    }

    if (!HelperClass.validateEmail(formData.email)) {
      alert(strings.validation.errorInvalidEmail);
      return;
    }

    //submit to firebase

    database.ref(`/leads/${language}/${state}`).push(formData);

    console.log(formData);

    // redirect user to group link

    window.location.href = formData.group;
  });
});
