import { all } from "axios";

const LargeMovieCard = ({allMovies}) => {
  
   console.log(allMovies[0])
    return (
      <div className="w-full h-full flex justify-center border pt-20 ">
        {allMovies.length > 1 ? (
          <div className="border w-11/12 h-full flex pt-7 flex-col items-center ">
            <h1>{allMovies[0].snippet.title}</h1>
            <div className="w-full bigVidDiv pt-5">
              <iframe
                className="w-full h-full bigvid"
                src={`https://www.youtube.com/embed/${allMovies[0].id.videoId}`}
                title="Featured Movie"
                allowFullScreen
                
              ></iframe>
            </div>
          </div>
        ) : (
          "...Loading"
        )}
      </div>
    );
};

export default LargeMovieCard;
