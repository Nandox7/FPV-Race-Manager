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
    

angular.module('myApp').service('pilotService', ['$q', PilotService]);

    function PilotService($q) {
        return {
            getPilots: getPilots,
            getById: getPilotById,
            getByName: getPilotByName,
            create: createPilot,
            destroy: deletePilot,
            update: updatePilot
        };

        function getPilots() {
            console.log('Fetching pilots...');
            var deferred = $q.defer();
            var query = "SELECT * FROM pilots";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getPilotById(id) {
            console.log('Fetching pilot= by id...');
            var deferred = $q.defer();
            var query = "SELECT * FROM pilots WHERE pilot_id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getPilotByName(name) {
            console.log('Fetching pilot by name...');
            var deferred = $q.defer();
            var query = "SELECT * FROM pilots WHERE name LIKE  '" + name + "%'";
            connection.query(query, [name], function (err, rows) {
                if (err) deferred.reject(err);

                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function createPilot(pilot) {
            console.log('Creating pilots...');
            var deferred = $q.defer();
            var query = "INSERT INTO pilots SET ?";
            connection.query(query, pilot, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }

        function deletePilot(id) {
            console.log('Deleting pilot...');
            var deferred = $q.defer();
            var query = "DELETE FROM pilots WHERE pilot_id = ?";
            connection.query(query, [id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        }

        function updatePilot(pilot) {
            console.log('Updating pilot...');
            var deferred = $q.defer();
            var query = "UPDATE pilots SET name = ? WHERE pilot_id = ?";
            connection.query(query, [pilot.name, pilot.pilot_id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();
