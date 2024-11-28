import React from "react";
import Head from "next/head";
import Genrecard from "@/components/Genrecard";

const category = () => {
  return (
    <>
      <Head>
        <title>Genre - Category | Makmovies</title>
      </Head>
      <section className="genrenamesec">
        <div className="genrename">
          <h1>Explore by Genre</h1>
          <p>
            Explosive stunts, action-packed adventures, and heart-pounding
            suspense await you on the big screen. Experience the thrill of real
            action and excitement like never before.
          </p>
        </div>
      </section>
      <section className="genremoviesec genremovie">
        <Genrecard link={'/genre/action'} image={"/img/action.jpg"} title={'Action Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/adventure'} image={"/img/adventure.jpg"} title={'Adventure Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/animation'} image={"/img/animation.jpg"} title={'Animation Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/comedy'} image={"/img/comedy.jpg"} title={'Comedy Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/crime'} image={"/img/crime.jpg"} title={'Crime Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/drama'} image={"/img/drama.jpg"} title={'Drama Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/fantasy'} image={"/img/fantasy.jpg"} title={'Fantasy Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/horror'} image={"/img/horror.jpg"} title={'Horror Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/mystery'} image={"/img/mystery.jpg"} title={'Mystery Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/romance'} image={"/img/romantic.jpg"} title={'Romantic Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/science_fiction'} image={"/img/scifi.jpg"} title={'Science Fiction Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
        <Genrecard link={'/genre/thriller'} image={"/img/thriller.jpg"} title={'Thriller Movies'} description={'Explosive stunts, action-packed adventures, and heart-pounding suspense await you on the big screen. Experience the thrill of real action and excitement like never before.'} />
      </section>
    </>
  );
};

export default category;
