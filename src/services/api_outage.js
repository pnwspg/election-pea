import httpClient from "@/services/httpClient"
import {server} from "@/services/constants"

export const getOutages = () =>{
    return httpClient.get(server.OUTAGE_URL)
}
export const getOutageById = id =>{
    return httpClient.get(server.OUTAGE_URL + `/id/${id}` )
}
export const addOutage = data => {
    return httpClient.post(server.OUTAGE_URL, data)
}
export const deleteOutage = id => {
    return httpClient.delete(server.OUTAGE_URL+ `/id/${id}`)
}
export const updateOutage = data => {
    return httpClient.put(server.OUTAGE1_URL, data)
}

export const updateOutage2 = data => {
    return httpClient.put(server.OUTAGE2_URL, data)
}

