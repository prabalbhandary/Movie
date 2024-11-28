import Link from "next/link";


const Genrecard = (props) => {
    return (
        <>
           <Link href={props.link}>
            <div className="cardgenre">
                <img src={props.image} alt="Image" loading="lazy" />
                <div className="card__content">
                    <p className="card__title">{props.title}</p>
                    <p className="card__description">{props.description}</p>
                </div>
            </div>
           </Link>
        </>
    )
}

export default Genrecard;