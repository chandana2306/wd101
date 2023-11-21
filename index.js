const elements = {
    inputName: document.getElementById("name"),
    inputEmail: document.getElementById("email"),
    inputPassword: document.getElementById("password"),
    inputTerms: document.getElementById("acceptTerms"),
    form: document.getElementById("registration-form"),
    submitButton: document.getElementById("submit"),
    inputDob: document.getElementById("dob"),
    historyTable: document.getElementById("userTable"),
};

const dateLimits = {
    minDateOfBirth: new Date(new Date().getFullYear() - 55, new Date().getMonth(), new Date().getDate()),
    maxDateOfBirth: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),
};

const isDateValid = (givenDate) => {
    const userDate = new Date(givenDate);
    return userDate.getTime() <= dateLimits.maxDateOfBirth.getTime() && userDate.getTime() >= dateLimits.minDateOfBirth.getTime();
};

const isFormValid = () => {
    return elements.form.checkValidity();
};

const getAllEntries = () => {
    return JSON.parse(localStorage.getItem("userData")) || [];
};

const displayHistorys = () => {
    const allEntries = getAllEntries();

    const headerRow = `
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Date of Birth</th>
        <th>Accepted terms?</th>
    </tr>`;

    const dataRows = allEntries.map((entry) => {
        const row = Object.values(entry).map((value) => `<td>${value}</td>`).join("");
        return `<tr>${row}</tr>`;
    }).join("\n");

    elements.historyTable.innerHTML = `${headerRow}${dataRows}`;
};

const saveToStorages = (name, email, password, dob, terms) => {
    const userData = {name, email, password, dob, terms};
    const allEntries = getAllEntries();
    allEntries.push(userData);
    localStorage.setItem("userData", JSON.stringify(allEntries));
};

elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!isFormValid()) {
        return;
    }

    if (!isDateValid(elements.inputDob.value)) {
        alert(`must have been born between 18 and 55 years ago`);
        return;
    }

    saveToStorages(elements.inputName.value, elements.inputEmail.value, elements.inputPassword.value, elements.inputDob.value, elements.inputTerms.checked);
    displayHistorys();
    elements.form.reset();
});

displayHistorys();
