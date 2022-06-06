import {Sequelize, DataTypes} from 'sequelize';

// Połączenie z bazą danych - lepiej użyć Postgresa (zadanie 0, patrz również niżej)
// Czy to może skończyć się błędem?

const database = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

// Zadanie 1
const Wycieczka = database.define('Wycieczka', {
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
        type: DataTypes.STRING, //do zmiany,
        allowNull: true
    },
    cena: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        min: 0
    },
    data_poczatku: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_konca: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isAfter: {
                args: ['data_poczatku'],
            }
        }
    },
    liczba_dostepnych_miejsc: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

//tutaj powinien być ten moduł???

// Zadanie 2
const Zgloszenie = database.define('Zgloszenie', {
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
        isEmail: true,
        allowNull: false
    },
    liczba_miejsc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1
    },
});

// Zadanie 3
// Tu dodaj kod odpowiedzialny za utworzenie relacji pomiędzy modelami db.Wycieczka i db.Zgloszenie

Wycieczka.hasMany(Zgloszenie);

// Zadania 4-6 w innych plikach

// ========================================
// Zadanie 0 - kontynuacja; proszę napisać kod poniżej, wg komentarzy

try {
    // Sprawdzenie poprawności połączenia (authenticate; co się dzieje, gdy błąd?)
    console.log('Nawiązuję połączenie z bazą...');
    await database.authenticate();
    console.log('Udało się.');

    console.log('Synchronizuję modele z zawartością bazy...');
    await database.sync({ alter: true });
    console.log('Udało się.');

} catch (err) {
    console.error('Nie udało się. Error: ', err);
}

export {database, Wycieczka, Zgloszenie};
