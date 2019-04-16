import apiUrl from '../apiConfig'
import axios from 'axios'

export const getEntries = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/entries',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const getEntry = (user, id) => {
  return axios({
    url: apiUrl + `/entries/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
export const createEntry = (user, createData) => {
  return axios({
    url: apiUrl + '/entries',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      entry: {
        title: createData.title,
        text: createData.text
      }
    }
  })
}

export const deleteEntry = (user, id) => {
  return axios({
    url: apiUrl + `/entries/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const updateEntry = (user, id, updateData) => {
  return axios({
    url: apiUrl + `/entries/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      entry: {
        title: updateData.title,
        text: updateData.text
      }
    }
  })
}
