const API_KEY = "cdf194177728b3f9a1f10fe1795e361a";
const BASE_PATH = "https://api.themoviedb.org/3";

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
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(res =>
    res.json()
  );
}
