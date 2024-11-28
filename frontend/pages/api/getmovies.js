import { mongooseConnect } from "@/lib/mongoose";
import { Movie } from "@/models/Movie";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    if (method === "GET") {
        if(req.query?.id){
            const movies = await Movie.findById(req.query.id);
            res.json(movies);
        }else if(req.query?.title){
            const title = await Movie.find({title: req.query.title});
            res.json(title);
        }else if(req.query?.titlecategory){
            const titlecategory = await Movie.find({titlecategory: req.query.titlecategory});
            res.json(titlecategory.reverse());
        }else if(req.query?.genre){
            const genre = await Movie.find({genre: req.query.genre});
            res.json(genre.reverse());
        }else if(req.query?.category){
            const category = await Movie.find({category: req.query.category});
            res.json(category.reverse());
        }else if(req.query?.slug){
            const slug = await Movie.find({slug: req.query.slug});
            res.json(slug.reverse());
        }else{
            const movies = await Movie.find();
            res.json(movies.reverse());
        }
    } else {
        res.status(405).json({message: "Method not allowed"});
    }
}