import { useState } from "react"
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const create = async object => {
        const response = await axios.post(baseUrl, object)
        setResources(resources.concat(response.data))
    }

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }

    return [
        resources, { create, getAll }
    ]
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}