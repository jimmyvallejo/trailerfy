import axios from "axios";


export const GET= async (req) => {
   
    


  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=new movie trailers&key=${process.env.YOUTUBE_KEY}`
    );
     
    let result = []

    let data = response.data.items;

    data.forEach((elem) => {
        console.log(elem)
        result.push(elem)
    })

   
    return new Response(JSON.stringify(result), { status: 200 });
  

} catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
