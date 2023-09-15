const API_KEY = "cdf194177728b3f9a1f10fe1795e361a";
const BASE_PATH = "https://api.themoviedb.org/3";
//-------------*movie화면 nowplaying----------
interface IMovie {
  id: number;
  backdrop_path: string; //배경사진
  poster_path: string; //포스터사진
  title: string; //제목
  overview: string; //줄거리
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?language=en-US&api_key=${API_KEY}`
  ).then(res => res.json());
}

//-------------*home화면 tv*---------------------------------
interface IHOMETV {
  id: number;
  title: string;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  media_type: string;
  popularity: number;
  releas_date: string;
  vote_average: number;
  vote_count: number;
}
export interface IGetHOMETVResult {
  page: number;
  results: IHOMETV[];
  total_pages: number;
  total_results: number;
}
export function getHomeTv() {
  return fetch(
    `${BASE_PATH}/trending/tv/week?language=en-US&api_key=${API_KEY}`
  ).then(res => res.json());
}

// //all
// interface IAll {
//   id: number;
//   title: string;
//   name: string;
//   overview: string;
//   backdrop_path: string;
//   poster_path: string;
//   media_type: string;
//   popularity: number;
//   releas_date: string;
//   vote_average: number;
//   vote_count: number;
// }
// export interface IGetAllResult {
//   page: number;
//   results: IAll[];
//   total_pages: number;
//   total_results: number;
// }

//home화면 trending all
// export function getAlls() {
//   return fetch(
//     `${BASE_PATH}/trending/all/week?language=en-US&api_key=${API_KEY}`
//   ).then(res => res.json());
// }
