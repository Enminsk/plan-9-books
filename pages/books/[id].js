import Image from 'next/image';
import styles from '../../styles/BookInfo.module.css';


export const getStaticPaths = async () => {
    const response = await fetch('https://gutendex.com/books');
    const data = await response.json();

    const paths = data.results.map(({ id }) => ({
        params: { id: id.toString() }
    }));

    return {
        paths,
        fallback: false,
    }
};

export const getStaticProps = async (context) => {
    const { id } = context.params;
    const response = await fetch(`https://gutendex.com/books/${id}`);
    const data = await response.json();

    return {
        props: { book: data },
    }
};

const BookInfo = ({ book: { title, download_count, formats, authors, subjects } }) => {
    return (
        <div className={styles.conteiner}>
            <div className={styles.img}>
                <Image
                    src={formats["image/jpeg"]}
                    alt={title}
                    width={225}
                    height={375}
                />
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <span>{subjects}</span>
                {authors.map(({ name }) =>
                    <span key={name}>Автор: {name}</span>)}
                <span>Скачали {download_count} раз</span>
            </div>
        </div>
    );
}

export default BookInfo;