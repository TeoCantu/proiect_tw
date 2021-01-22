import axios from 'axios';


// Apeluri axios pentru preluare din baza de date
async function get(url, id = null) {
    try {
        let newUrl = !id ? url : url + "/" + id;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function post(url, item) {
    try {
        return (await axios.post(
            url,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function put(url, id, item) {
    try {
        return (await axios.put(
            url + "/" + id,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function remove(url, id) {
    try {
        return (await axios.delete(
            url + "/" + id
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

export {get, post, put, remove} 