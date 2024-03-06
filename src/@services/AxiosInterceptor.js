import React, { useEffect } from 'react';
import axios from 'axios';
import { Constants } from '@services';
import { useDispatch, useSelector } from 'react-redux';
import { AuhMethods } from '@services/auth';

var CryptoJS = require('crypto-js');
const MKV = 'L#2Qe2vQNs$)Rdl*Cd(!';

const AxiosInterceptor = ({ ...props }) => {
  const dispatch = useDispatch();
  const org = useSelector(({ org }) => org);

  useEffect(() => {

  }, [org])

  axios.defaults.baseURL = Constants.API_URL;
  axios.interceptors.request.use(
    (config) => {
      var iTem = localStorage.getItem('cypress_user_1001');
      var bytes = iTem ? CryptoJS.AES.decrypt(iTem, MKV).toString(CryptoJS.enc.Utf8) : null;
      var authUser = bytes ? JSON.parse(bytes) : null;

      if (authUser) {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(authUser), MKV).toString();
        localStorage.setItem('cypress_user_1001', ciphertext);

        var token = authUser && authUser.accessToken ? `Bearer ${authUser.accessToken}` : 'Bearer ';
        if (token.length > 0) {
          config.headers.Authorization = token;
        }

        // if (org) {
        //   config.data = {
        //     ...config.data,
        //     org_id: org._id
        //   };
        // }

        return config;
      } else {
        return config;
      }
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        let data = response.data;
        if (!data.status) {
          if (data.code && data.code == 1001) {
            return dispatch(AuhMethods.basic.onLogout());
          }
        }
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return <div></div>;
};

export default AxiosInterceptor;
