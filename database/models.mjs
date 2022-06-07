const {Sequelize, DataTypes} = require('sequelize');


// Połączenie z bazą danych - lepiej użyć Postgresa (zadanie 0, patrz również niżej)
// Czy to może skończyć się błędem?

const models = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

// Zadanie 1
const Wycieczka = models.define('Wycieczka', {
    nazwa: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    opis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    krotki_opis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    obrazek: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cena: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    data_poczatku: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    data_konca: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            validate_date(value) {
                if (value < this.data_poczatku) {
                    console.log(value);
                    console.log(this.data_poczatku);
                    throw new Error('Data końca wycieczki musi być późniejsza niż data początku');
                }
            }
        }
    },
    liczba_dostepnych_miejsc: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    promocja: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 100
        }
    }
});

// Zadanie 2
const Zgloszenie = models.define('Zgloszenie', {
    imie: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nazwisko: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    liczba_miejsc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
});

// Zadanie 3
// Tu dodaj kod odpowiedzialny za utworzenie relacji pomiędzy modelami db.Wycieczka i db.Zgloszenie


Zgloszenie.belongsTo(Wycieczka, {
    foreignKey: 'wycieczka_id',
});

// Zadania 4-6 w innych plikach

// ========================================
// Zadanie 0 - kontynuacja; proszę napisać kod poniżej, wg komentarzy

try {
    // Sprawdzenie poprawności połączenia (authenticate; co się dzieje, gdy błąd?)
    console.log('Nawiązuję połączenie z bazą...');
    models.authenticate().then(() => {
        console.log('Udało się.');
    }, (err) => {
        console.log('Błąd połączenia:', err);
    });


    console.log('Synchronizuję modele z zawartością bazy...');
    models.sync({alter: true}).then(() => {
        console.log('Udało się.');
    }, (err) => {
        console.log('Błąd synchronizacji:', err);
    });

} catch (err) {
    console.error('Nie udało się. Error: ', err);
}

module.exports = {database: models, Wycieczka, Zgloszenie};
