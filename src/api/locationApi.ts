import axios from 'axios';

export const locationApi = {
  getProvinces() {
    return axios.get('https://vapi.vnappmob.com/api/province/');
  },
  getDistricts(provinceId: string) {
    return axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
  },
  getWards(districtId: string) {
    return axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
  },
};
