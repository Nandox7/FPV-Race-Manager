(function () {
    'use strict';
    //var sqlite3 = require('sqlite3').verbose();
    var mysql = require('mysql');

    // Create new db connection
    //var connection = new sqlite3.Database('daabase.db');

    console.log("Loading dbservice...");

    // Creates MySql database connection
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "fpvrm"
    });

    console.log("MySQL connection created...");
    

angular.module('myApp').service('dbService', ['$q', DbService]);

    function DbService($q) {
        return {
            getPilots: getPilots,
            getById: getPilotById,
            getByName: getPilotByName,
            create: createPilot,
            destroy: deletePilot,
            update: updatePilot,
            select: select
        };

        function getPilots() {
            console.log('Fetching pilots...');
            var deferred = $q.defer();
            var query = "SELECT * FROM pilot";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
             return deferred.promise;
        }

        function getPilotById(id) {
            console.log('Fetching pilot= by id...');
            var deferred = $q.defer();
            var query = "SELECT * FROM pilot WHERE id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getPilotByName(name) {
            console.log('Fetching pilot by name...');
            var deferred = $q.defer();
            var query = "SELECT * FROM pilot WHERE name LIKE  '%" + name + "%'";
            connection.query(query, [name], function (err, rows) {
                if (err) deferred.reject(err);

                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function createPilot(pilot) {
            console.log('Creating pilots...', updatePilot);
            var deferred = $q.defer();
            var query = "INSERT INTO pilot SET ?";
            connection.query(query, pilot, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }

        function updatePilot(pilot) {
            console.log('Updating pilot...', pilot);
            var deferred = $q.defer();
            var query = "UPDATE pilot SET name=?, firstname=?, lastname=?, alias=?, email=?, club=?, country=?, transponderid=?, isinactive=? WHERE id = ?";
            connection.query(query, [pilot.name, pilot.firstname, pilot.lastname, pilot.alias, pilot.email, pilot.club, pilot.country, pilot.transponderid, pilot.isinactive, pilot.id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }

        function deletePilot(id) {
            console.log('Deleting pilot...');
            var deferred = $q.defer();
            var query = "DELETE FROM pilot WHERE id = ?";
            connection.query(query, [id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        }

         function select(query) {
            console.log('DBService SELECT...');
            var deferred = $q.defer();
            //var query = "SELECT * FROM pilots";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
             return deferred.promise;
        }
    }
})();
