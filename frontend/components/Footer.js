import Link from "next/link"

const Footer = () => {
    return (
        <>
            <footer className='footer'>
                <section className="m-auto footersec">
                    <div className="fcontent">
                        <div className="flogo">
                            <h1>
                                <Link href="/">MakMovies</Link>
                            </h1>
                        </div>
                        <div className="quicklink">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/movies">Movies</Link>
                            </li>
                            <li>
                                <Link href="/series">Series</Link>
                            </li>
                            <li>
                                <Link href="/genre">Genre</Link>
                            </li>
                            <li>
                                <Link href="/all">All Movies</Link>
                            </li>
                            <li>
                                <Link href="/genre">Category</Link>
                            </li>
                            <li>
                                <Link href="/bollywood">Bollywood</Link>
                            </li>
                            <li>
                                <Link href="/hollywood">Hollywood</Link>
                            </li>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>Copyright &copy; {new Date().getFullYear()} All rights reserved | by &nbsp;<Link href="/">MakMovies</Link>&nbsp;</p>
                    </div>
                    <div className="fperasec">
                        <p>Disclaimer :- We doesn't store any files on our server. We only redirect you from one domain to another. All contents are provided by non-affiliated third parties.</p>
                    </div>
                </section>
            </footer>
        </>
    )
}

export default Footer