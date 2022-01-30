// var options = {
//     method: 'GET',
//     url: 'https://bing-news-search1.p.rapidapi.com/news/search',
//     params: {
//       q: 'Crypto',
//       count: '50',
//       freshness: 'Day',
//       textFormat: 'Raw',
//       safeSearch: 'Off'
//     },
//     headers: {
//       'x-bingapis-sdk': 'true',
//       'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
//       'x-rapidapi-key': '3dd9ff2cbdmsh7028426a1fa3adcp1687e4jsna042d7506e4f'
//     }
//   };

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '3dd9ff2cbdmsh7028426a1fa3adcp1687e4jsna042d7506e4f'
}

//const baseUrl = 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd';
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({url, headers : cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;
