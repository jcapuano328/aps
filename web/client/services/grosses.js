import fetch from 'node-fetch';
import UrlPattern from 'url-pattern';
import {BASE_URL, GROSSES_SEARCH_URL } from '../constants/rest';
import toJson  from './tojson';

let GrossesService = {
    fetch(start, unit, token) {        
        let pattern = new UrlPattern(GROSSES_SEARCH_URL);
        let url = BASE_URL + pattern.stringify({start: start.toISOString(), unit: unit});
        return fetch(url, {
            method: 'get',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(toJson);
    },
    groupByPerson(data) {
        let persons = data.reduce((a,c) => {
            if (!a.includes(c.employee.id)) {
                a.push(c.employee.id);
            }
            return a;
        }, []);

        return persons.map((personid) => {
            let grosses = data.filter((d) => d.employee.id == personid);
            return {
                "id": personid,
                "name": grosses[0].employee.name,
                "title": grosses[0].employee.title,
                "grosses": grosses.map((gross) => {
                    return {
                        "id" : gross.id,
                        "amount": gross.amount,
                        "rent": gross.employee.rent,
                        "on": gross.on,
                        "modified": gross.modified,
                        "modifiedby": gross.modifiedby
                    };
                })
            };
        });
    }
};

module.exports = GrossesService;
