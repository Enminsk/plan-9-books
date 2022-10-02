import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
    return (
        <>
            <Head>
                <title>Книги которые читают | Главная</title>
                <meta name="title" content="books" />
            </Head>
            <div>
                <h1>Чтиво, которое хочется!</h1>
                <Link href="/books/">
                    <a>Все книги</a>
                </Link>
            </div>
        </>
    );
}

export default Home;