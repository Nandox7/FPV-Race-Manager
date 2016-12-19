(function () {
    'use strict';
    var mysql = require('mysql');

    console.log("Loading pilotService...");

    // Creates MySql database connection
    var connection = mysql.createConnection({
        host: "valhalla.ukwest.cloudapp.azure.com",
        user: "customer_admin",
        password: "q1w2e3",
        database: "customer_manager"
    });

angular.module('myApp').service('customerService', ['$q', CustomerService]);

    function CustomerService($q) {
        return {
            getCustomers: getCustomers,
            getById: getCustomerById,
            getByName: getCustomerByName,
            create: createCustomer,
            destroy: deleteCustomer,
            update: updateCustomer
        };

        function getCustomers() {
            console.log('Fetching customers...');
            var deferred = $q.defer();
            var query = "SELECT * FROM customers";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getCustomerById(id) {
            console.log('Fetching customers= by id...');
            var deferred = $q.defer();
            var query = "SELECT * FROM customers WHERE customer_id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getCustomerByName(name) {
            console.log('Fetching customer by name...');
            var deferred = $q.defer();
            var query = "SELECT * FROM customers WHERE name LIKE  '" + name + "%'";
            connection.query(query, [name], function (err, rows) {
                if (err) deferred.reject(err);

                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function createCustomer(customer) {
            console.log('Creating customer...');
            var deferred = $q.defer();
            var query = "INSERT INTO customers SET ?";
            connection.query(query, customer, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }

        function deleteCustomer(id) {
            console.log('Deleting customer...');
            var deferred = $q.defer();
            var query = "DELETE FROM customers WHERE customer_id = ?";
            connection.query(query, [id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        }

        function updateCustomer(customer) {
            console.log('Updating customer...');
            var deferred = $q.defer();
            var query = "UPDATE customers SET name = ? WHERE customer_id = ?";
            connection.query(query, [customer.name, customer.customer_id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();
