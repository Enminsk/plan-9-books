import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import Link from 'next/link';
import styles from '../styles/Header.module.css';


const Header = () => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const inputChangeHandler = (event) => {
        setValue(event.target.value)
    };

    const getStaticProps = async () => {
        const response = await fetch(`https://gutendex.com//books?search=${text}%20${text}`);
        const data = await response.json();

        const scrollHendler = (e) => {
            console.log('skroll');
        }

        if (!data) {
            return {
                notFound: true,
            }
        }

        return {

            props: { books: data },
        }

    };

/*     const getServerSideProps = async ({ params }) => {
        const response = await fetch(`https://gutendex.com//books?search=${text}%20${text}`);
        const book = await response.json();

        if (!book) {
            return {
                notFound: true,
            }
        }

        return {
            props: { book },
        }
    }; */

    const getSearch = (text) => {
        return fetch(`https://gutendex.com//books?search=${text}%20${text}`).then((r) => r.json()
        );
    };

    const getSearchDebounce = useCallback(debounce((value) =>
        getSearch(value)
            .then(({ data }) => {
                setOptions(data)
            }), 500), []);

    useEffect(() => {
        if (value.length > 2) {
            getSearchDebounce(value)
        }
    }, [value]);

    return (
        <header>
            <div className={styles.conteiner}>
                <h2><Link href="/"><a>Books</a></Link></h2>
                <input className={styles.search} value={value} onChange={inputChangeHandler}></input>
                <ul>
                    {options.map((books) => (
                        <Link key={books.id} to={`/books/${books.id}`} onClick={onOptionClick}>
                            <li>
                                {books.title}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </header>
    )
};

export default Header;