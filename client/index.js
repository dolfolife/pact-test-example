import axios from "axios";

export const getMeDogs = ({url, port}) => {
  return axios.request({
    method: "GET",
    baseURL:`${url}:${port}/`,
    url: '/dogs',
    headers: {'Accept': 'application/json'}
  });
};
