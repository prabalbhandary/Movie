import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {IoClose} from "react-icons/io5";
import {BiSearch} from "react-icons/bi";
import {FaBars, FaStar} from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";

export default function Header() {
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("nav");
            header.classList.toggle("sticky", window.scrollY > 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    },[])
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [searchbar, setSearchbar] = useState(false);
    const [activeLink, setActiveLink] = useState("/");

    const [movieshortname, setMovieshortname] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState(null);

    const {alldata, loading} = useFetchData("/api/getmovies");
    const publishedData = alldata.filter(ab => ab.status === "publish");

    useEffect(() => {
      if(!movieshortname.trim()){
        setSearchResult([]);
        return;
      }
      const filteredMovies = publishedData.filter(movie => movie.title.toLowerCase().includes(movieshortname.toLowerCase()));
      setSearchResult(filteredMovies);
    }, [movieshortname])
    const handleMovieClick = () => {
      setMovieshortname("");
    }
    const searchRef = useRef(null);
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setMovieshortname("");
      }
    }

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    }
    useEffect(() => {
      setActiveLink(router.pathname);
    }, [router.pathname]);
    const handleNabarOpen = () => {
      setNavbar(!navbar);
    }
    const handleNabarClose = () => {
      setNavbar(false);
    }
    const handleSearchbarOpen = () => {
      setSearchbar(!searchbar);
    }
    const handleSearchbarClose = () => {
      setSearchbar(false);
    }

  return (
    <>
      <nav className="header">
        <h1 className="logo" data-text="&nbsp; MakMovies &nbsp;">
          <a href="/">&nbsp; MakMovies &nbsp;</a>
        </h1>
        <form className={searchbar ? "search_bar active" : "search_bar"}>
          <input type="text" placeholder="Search Movies Here....." value={movieshortname} onChange={(e) => setMovieshortname(e.target.value)} />
          <div className="searchclose" onClick={handleSearchbarClose}>
            <IoClose />
          </div>
          {
            movieshortname && (
              <div className="search_results">
                <h2>---:Search Result:---</h2>
                <ul>
                  {
                    searchResult.length > 0 ? (
                      searchResult.slice(0, 20).map((movie) =>(
                        <Link key={movie._id} onClick={handleMovieClick} href={`/movies/${movie.slug}`}>
                          <div className="moviesearchlist">
                            <div>
                              <img src={movie.smposter} width={80} height={110} alt="" />
                            </div>
                            <div className="searchbarinfo">
                              <h5>{movie.title}</h5>
                              <h4>Rating: <FaStar /> <span>{movie.rating}</span></h4>
                              <h4>Release Year: {movie.year}</h4>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p>No Movie Found</p>
                    )
                  }
                </ul>
              </div>
            )
          }
        </form>
        <div id={navbar ? "navbaractive" : "navbar"}>
          <div className="navlogomovie">
            <h1 className="logo" data-text="&nbsp; MakMovies &nbsp;">
              <a href="/">&nbsp; MakMovies &nbsp;</a>
            </h1>
            <div className="navclosesvg" onClick={handleNabarClose}>
                <IoClose />
            </div>
          </div>
          <ul className={clicked ? "navbar active" : "navbar"} onClick={handleNabarClose}>
            <li>
                <Link href="/" className={activeLink === '/' ? 'active' : ''} onClick={() => handleLinkClick('/')}>Home</Link>
            </li>
            <li>
                <Link href="/movies" className={activeLink === '/movies' ? 'active' : ''} onClick={() => handleLinkClick('/movies')}>Movies</Link>
            </li>
            <li>
                <Link href="/series" className={activeLink === '/series' ? 'active' : ''} onClick={() => handleLinkClick('/series')}>Series</Link>
            </li>
            <li>
                <Link href="/bollywood" className={activeLink === '/bollywood' ? 'active' : ''} onClick={() => handleLinkClick('/bollywood')}>Bollywood</Link>
            </li>
            <li>
                <Link href="/hollywood" className={activeLink === '/hollywood' ? 'active' : ''} onClick={() => handleLinkClick('/hollywood')}>Hollywood</Link>
            </li>
            <li>
                <Link href="/contact" className={activeLink === '/contact' ? 'active' : ''} onClick={() => handleLinkClick('/contact')}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="mobile">
          <BiSearch className="opensearchsvg" onClick={handleSearchbarOpen} />
          <FaBars onClick={handleNabarOpen} />
        </div>
      </nav>
    </>
  );
}