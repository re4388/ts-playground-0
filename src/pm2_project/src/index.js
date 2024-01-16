"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const assert_1 = require("assert");
const pg_connection_string_1 = require("pg-connection-string");
const connectionString = 'postgres://local:local@127.0.0.1:54399/hermes_local';
function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield checkPgConnectionAlive(connectionString, 'SELECT 1');
            console.log('------->res.rowCount: ', res.rowCount);
            (0, assert_1.strictEqual)(res.rowCount, 1);
        }
        catch (err) {
            console.log(err);
        }
    });
}
checkConnection().then(res => console.log(res)).catch(err => console.log(err));
function checkPgConnectionAlive(connectionString, query) {
    // No query provided by the user, use SELECT 1
    if (!query || (typeof query === 'string' && query.trim() === '')) {
        query = 'SELECT 1';
    }
    return new Promise((resolve, reject) => {
        const config = (0, pg_connection_string_1.parse)(connectionString);
        if (typeof config.ssl === 'string') {
            config.ssl = config.ssl === 'true';
        }
        if (config.password === '') {
            reject(new Error('Password is undefined.'));
            return;
        }
        const client = new pg_1.Client(config);
        client.on('error', (error) => {
            console.log('postgres', 'Error caught in the error event handler.');
            reject(error);
        });
        client.connect((err) => {
            if (err) {
                client.end();
                reject(err);
            }
            try {
                client.query(query, (_err, res) => {
                    resolve(res);
                    client.end();
                });
            }
            catch (e) {
                client.end();
                reject(e);
            }
        });
    });
}
