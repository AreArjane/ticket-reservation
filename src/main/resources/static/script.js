
const filmer =  {
    OPTION_1: "Black Magic",
    OPTION_2: "Way to River",
    OPTION_3: "In Winter Day",
    OPTION_4: "Summer Trip",
    OPTION_5: "American Pie"
};
/**
 * filmselect target (select tag in html doc)
 * put for each key a value option to select tag in @file billetter.html
 */
const filmSelect = $('#filmSet');
Object.keys(filmer).forEach(key => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = filmer[key];
    filmSelect.append(option);

});


/**
 * Validate input with differen function defined.
 * @class Validator
 */
class Validator {
    /**
     * empty @constructor of class Validator
     */
    constructor() {}

    /**
     * Validates a name for first name field with norwegian letters.
     * @param {string} name - The name to validate.
     * @returns {boolean|string} True if valid, or an error message if invalid.
     * @example name Xu is the first male name in chiness, Per Arne first male name in norwegian
     */
    checkNameFor(name) {
        const nameRegX = /^[a-zåøæA-ZÅØÆ]{2,60}$/;
        if(!name) {
            return "Fornavnet er krevende felt!"
        }
        return nameRegX.test(name) ? true : "Bare alfabetisk tegn er tillatt";
    }
    /**
     * Validates a name for last name field with norwegian letters.
     * @param {string} name - The name to validate.
     * @returns {boolean|string} True if valid, or an error message if invalid.
     */
    checkNameEtter(name) {
        const nameRegX = /^[a-zåøæA-ZÅØÆ]{2,60}$/;
        if(!name) {
            return "Etternavnet er krevende felt!";
        }
        return nameRegX.test(name) ? true : "Navnet kan ha bare alfabetisk tegn";
    }

    /**
     * Validates a tlf-nr accourdning to E.164 longest possible with co.code are fifteen digit.
     * @param {string} tlfNr - The nr to validate.
     * @returns {boolean|string} True if valid, or an error message if invalid.
     */
    checkPhoneNumber(tlfNr) {
        const tlfRegX = /^(?:\+|00)\d{8,17}$/;
        if(!tlfNr) {
            return "Telefon nummer er krevende felt!"
        }
        return tlfRegX.test(tlfNr) ? true : "Telefonnummer må starter med landskode + eller 00";
    }
    /**
     * Validates email with only one @ possible, and ending com, co, net or no.
     * @param {string} epost - The email to validate.
     * @returns {boolean|string} True if valid, or an error message if invalid.
     */
    checkEmail(epost) {
        const epostRegX = /^[^@]+@[^@]+\.(?:no|com|co|net)$/;
        if(!epost) {
            return "E-post er krevende felt!"
        }
        return epostRegX.test(epost) ? true : "Sjekke epost formaten .com,.no. Har du glemte @";
    }
    /**
     * Validates antall should be larger than 0.
     * @param {int} antall - Number of tickets.
     * @returns {boolean|string} True if valid, or an error message if invalid.
     */
    checkAntall(antall) {
        const antallRegx = /^[1-9]\d*$/;
        if(!antall) {
            return "Du må oppgi antall billetter";
        }
        return antallRegx.test(antall) ? true : "Ugydig min 1 billett bør velge";
    }

    checkFilm(film) {
        return true;

    }
}




/*Hoved klasse*/

/**
 * Represents a customer with details for a film booking.
 *
 * @class Kunde
 *
 * @constructor
 * @param {string} fornavn - The first name of the customer.
 * @param {string} etternavn - The last name of the customer.
 * @param {string} tlf - The telephone number of the customer.
 * @param {string} epost - The email address of the customer.
 * @param {string} film - The film selected by the customer.
 * @param {number} antall - The number of tickets booked by the customer.
 *
 * @example
 * // Create a new customer with booking details.
 * const customer = new Kunde('Nordmen', 'Ole', '12345678', 'ole.nordmen@example.com', 'Inception', 2);
 */
class Kunde {
    constructor(etternavn,antall,email, film, fornavn, telefon) {
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefon = telefon;
        this.email = email;
        this.film = film;
        this.antall = antall;
        this.validator = new Validator();
    }

    validate() {
        return {
            fornavn : this.validator.checkNameFor(this.fornavn),
            etternavn: this.validator.checkNameEtter(this.etternavn),
            telefon: this.validator.checkPhoneNumber(this.telefon),
            email: this.validator.checkEmail(this.email),
            antall: this.validator.checkAntall(this.antall),
            film: this.validator.checkFilm(this.film)

        };

    }


   async add_new_ticket() {
        const validatorResult = this.validate();
        let hasError  = false;
        Object.entries(validatorResult).forEach(([key, result]) => {
            const errorElement = document.querySelector(`#err-${key}`);
            if (result !== true) {
                errorElement.textContent = result;
                hasError = true;
            } else {
                errorElement.textContent = '';
            }
        });

        if(!hasError) {
            const dataen = JSON.stringify(this);
            try {
                const response = await fetch("http://localhost:8080/api/billetter", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: dataen
                });

                return await response.json();

            } catch(error) {
                console.error("Error med a ligge til billeter", error);
                return Promise.reject(error);
            }
        } else {

            return Promise.reject(new Error("Validation failed, errors displayed."));
        }
    }

    find_all_ticket() {
        fetch("http://localhost:8080/api/billetter/alle")
            .then(response => response.json())
            .then(data => {
                table_maker(data);


            })
            .catch(error => console.log("error fetching data from DataBase", error));

    }

    /*find_by_etternavn(etternavn, fornavn) {


        fetch(`api/billetter/alle_by_etternavn/${etternavn}/${fornavn}`)
            .then(response => response.json())
            .then(data => {
                table_maker(data)
            })
            .catch(error => console.log("Error finding etternavnet", error));
    }*/

   /* Endre_billet(id) {
        fetch(`http://localhost:8080/api/billetter/endre/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fornavn: document.getElementById('fornavn').value,
                etternavn: document.getElementById('etternavn').value,
                telefon: document.getElementById('tlf').value,
                email: document.getElementById('epost').value,
                film: document.getElementById('filmSet').value
            })
        })
            .then(response => response.json())
            .then(data => {

                document.getElementById('billett-form').scrollIntoView();

            })
            .catch(error => console.error('Error updating the detalies'));

    }*/

    delete_by_etternavn(etternavn) {
        const data = JSON.stringify(this)
        fetch(`http://localhost:8080/api/billetter/delete/${etternavn}`, {
            method: 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete records");
                }
                return response.json();
            }).then(data => console.log("Deleted succesfully", data))
            .catch(error => console.log("Erorr with delete", error));
    }

    async update_by_id(id){
        const validatorResult = this.validate();
        let hasError  = false;
        Object.entries(validatorResult).forEach(([key, result]) => {
            const errorElement = document.querySelector(`#err-${key}`);
            if (result !== true) {
                errorElement.textContent = result;
                hasError = true;
            } else {
                errorElement.textContent = '';
            }
        });

        if(!hasError) {
            const dataen = JSON.stringify(this);
            try {
                const response = await fetch(`http://localhost:8080/api/billetter/endre/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: dataen
                });

                return await response.json();

            } catch(error) {
                console.error("Error med a endre billeten", error);
                return Promise.reject(error);
            }
        } else {

            return Promise.reject(new Error("Validation failed, errors displayed."));
        }

    }

    delete_by_id(id) {
        fetch(`http://localhost:8080/api/billetter/delete/ByID/${id}`, {
            method: 'DELETE', headers : {
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete record: " + response.status);
                }
                console.log("Record deleted successfully");
                this.find_all_ticket();
            })
            .catch(error => console.error("Error during deletion", error));
    }


    delete_alle(){
        fetch("http://localhost:8080/api/billetter/delete/alle", {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error med sletting");
                }
                return response.json();
            }).then(data => { console.log("Data er slettet", data); this.find_all_ticket();})
            .catch(error => console.log("Error med sletting", error));
    }

}
function table_maker(billetter) {
     const tbody = $('#kunde-liste');
     tbody.empty();

    billetter.forEach(bilett => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${bilett.film}</td>
            <td>${bilett.antall}</td>
            <td>${bilett.fornavn}</td>
            <td>${bilett.etternavn}</td>
            <td>${bilett.telefon}</td>
            <td>${bilett.email}</td>
            <td><button class="delete-btn btn btn-dark" data-id="${bilett.id}">Slette</button>
            <button class="edit-btn btn btn-dark" data-id="${bilett.id}">Endre</button></td>`;
        tbody.append(tr);

    });


}

/*HTML Loader
* **********************************************************************************************************/

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector(".bilett-form");
    if(form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            fornavn = document.querySelector('#fornavn').value;
            etternavn = document.querySelector('#etternavn').value;
            telefon = document.querySelector('#tlf').value;
            email = document.querySelector('#epost').value;
            film = document.querySelector('#filmSet').selectedOptions[0].text;
            antall = document.querySelector('#antall').value;

            const kunde = new Kunde(etternavn, antall, email, film, fornavn, telefon);
            try {

                const data = await kunde.add_new_ticket()
                console.log("Billter ligget i dabase vellykket");
                kunde.find_all_ticket();
                this.reset();
            } catch (error) {
                console.error("Det sjedde en feil", error);
            }
        });
    } else {
        console.log('Slet not found');

    }
});




document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector(".update-form");

    const ticketDataString = sessionStorage.getItem('currentTicket');
    if (ticketDataString) {
        const ticketData = JSON.parse(ticketDataString);


        document.querySelector('#fornavn').value = ticketData.fornavn || '';
        document.querySelector('#etternavn').value = ticketData.etternavn || '';
        document.querySelector('#tlf').value = ticketData.telefon || '';
        document.querySelector('#epost').value = ticketData.email || '';
        document.querySelector('#filmSet').value = ticketData.film || '';
        document.querySelector('#antall').value = ticketData.antall || '';
        document.querySelector('#id').value = ticketData.id || '';


        sessionStorage.removeItem('currentTicket');
    }


        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            fornavn = document.querySelector('#fornavn').value;
            etternavn = document.querySelector('#etternavn').value;
            telefon = document.querySelector('#tlf').value;
            email = document.querySelector('#epost').value;
            film = document.querySelector('#filmSet').selectedOptions[0].text;
            antall = document.querySelector('#antall').value;
            sessionStorage.removeItem('currentTicket');

            const kunde = new Kunde(etternavn, antall, email, film, fornavn, telefon);
            try {

                //const data = await kunde.update_by_id(id);
                console.log("Billter er vellykket og oppdatert");
                alert('Billetten er oppdatert');
                window.location.replace('http://localhost:8080/ticket/kjop');

            } catch (error) {
                console.error("Det sjedde en feil", error);
            }
        });

});


document.addEventListener('DOMContentLoaded', function() {
    const sletteButton = document.querySelector('#sletteButton');
    if (sletteButton) {
        sletteButton.addEventListener('click', function() {
            const kunde = new Kunde();
            const userConfirm = confirm("Er du sikker pa slette alle billeter?");

            if (userConfirm) {
                kunde.delete_alle();
                alert("Alle billeter bli slettet");
                $('#kunde-liste').empty();
            } else {
                alert("Sletting avbrudd");
            }
        });
    } else {
        console.log('Slette Button not found');
    }
});


document.addEventListener("DOMContentLoaded", () => {

    const tbody = document.querySelector('#kunde-liste');
    if(tbody) {
        tbody.addEventListener('click', async (event) => {
            if (event.target.classList.contains('edit-btn')) {
                const id = event.target.dataset.id;

                console.log(id);
                try {
                    const response = await fetch(`http://localhost:8080/api/billetter/${id}`);
                    if (response.ok) {
                        const ticketData = await response.json();
                        sessionStorage.setItem('currentTicket', JSON.stringify(ticketData));
                        window.location.href = "http://localhost:8080/ticket/endre";
                    } else {
                        throw new Error('Failed to fetch: ' + response.statusText);
                    }
                } catch (error) {
                    console.error("Failed to load ticket data for editing", error);
                }


            } else if (event.target.classList.contains('delete-btn')) {
                const id = event.target.dataset.id;
                console.log(id);
                kund = new Kunde();
                kund.delete_by_id(id);
            }
        })
    } else {console.log('Error');}

});

document.addEventListener("DOMContentLoaded", function() {
    const bakB =  document.querySelector('#bakk-endre');
    if(bakB) {
        bakB.addEventListener('click', function(){

            window.location.replace('http://localhost:8080/ticket/kjop');
        });

    } else {
        console.log('Slette Button not found');
    }

});

document.addEventListener("DOMContentLoaded", function() {
    const resetB =  document.querySelector('#reset-form');
    if(resetB) {
        resetB.addEventListener('click', function(){
            $('#B-form')[0].reset();

        });

    } else {
        console.log('Slette Button not found');
    }

});



