import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Books.module.css';


/* const Books = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://gutendex.com/books');
            const data = await response.json();
            setResults(data)
        }
        fetchData();
    }, []);


    useEffect (() => {
        document.addEventListener('scroll', scrollHendler)

        return function () {
            document.removeEventListener('scroll', scrollHendler)
        }
    }, [])

    const scrollHendler = (e) => {
        console.log('scroll');
    }

    return (
        <div className={styles.wraper}>
            <ul>
                {results.map(({ id, title, formats }) => (
                    <li key={id}>
                        <Image
                            src={formats["image/jpeg"]}
                            alt={title}
                            width={175}
                            height={275}
                        />
                        <Link href={`books/${id}`}>
                            <a>{title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Books; */

export const getStaticProps = async () => {
    const response = await fetch('https://gutendex.com/books');
    const data = await response.json();

    if(!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { books: data },
    }
};

const Books = ({ books: { results } }) => {
    return (
        <div className={styles.wraper}>
            <div className={styles.conteiner}>
                {results.map(({ title, id, formats, download_count, authors }) => (
                    <div className={styles.card} key={id}>
                        <Image
                            src={formats["image/jpeg"]}
                            alt={title}
                            width={175}
                            height={275}
                        />
                        <Link href={`books/${id}`}>
                            <a className={styles.title}>{title}</a>
                        </Link>
                        {authors.map(({ name }) =>
                            <span className={styles.subtitle} key={name}>Автор: {name}</span>)}
                        <p>Скачали {download_count} раз</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Books;