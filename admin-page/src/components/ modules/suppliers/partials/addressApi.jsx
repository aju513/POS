import axios from "axios";
import Constants from "../../../../Constants";
 

export const getProvinceData = () => {
  return axios.get(`${Constants.BASE_URL}/province`);
};

export const getDistrictData = (provinceId) => {
  return axios.get(`${Constants.BASE_URL}/district/${provinceId}`);
};

export const getMunicipalityData = (districtId) => {
  return axios.get(`${Constants.BASE_URL}/municipality/${districtId}`);
};
