import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";

export default function all() {
  const { alldata, loading } = useFetchData(`/api/getmovies`);
  const publishedData = alldata.filter((ab) => ab.status === "publish");
  
  return (
    <>
      <Head>
        <title>All Movies & Web Series Download | Makmovies</title>
      </Head>
      <section className="genrenamesec">
        <div className="genrename">
          <h1>All Movies & Series</h1>
          <p>
            Explosive stunts, action-packed adventures, and heart-pounding
            suspense await you on the big screen. Experience the thrill of real
            action and excitement like never before.
          </p>
        </div>
      </section>
      <section className="genremoviesec">
        <div className="genremovie">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {publishedData.map((movie) => {
                return (
                  <div key={movie._id} className="mcard">
                    <Link href={`/movies/${movie.slug}`}>
                      <div className="cardimg">
                        <img
                          src={movie.smposter}
                          alt="movie poster"
                          loading="lazy"
                        />
                      </div>
                      <div className="contents">
                        <h5>{movie.title}</h5>
                        <h6>
                          <span>{movie.year}</span>
                          <div className="rate">
                            <i className="cardfas">
                              <FaHeart />
                            </i>
                            <i className="cardfas">
                              <FaEye />
                            </i>
                            <i className="cardfas">
                              <FaStar />
                            </i>
                            <h6>{movie.rating}</h6>
                          </div>
                        </h6>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </>
  )
}

