export type MovieTypes = {
  year:number,
  title:string,
  info:{
    plot?:string,
    rating?:number,
    directors?: string[],
    release_date?: string,
    genres?: string[],
    image_url?: string,
    rank?: number,
    running_time_secs?: number,
    actors?: string[],
  }
}