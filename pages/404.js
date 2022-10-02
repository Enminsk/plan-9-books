import Link from 'next/link';

const Error = () => (
    <div>
        <h1>404</h1>
        <h2>Такой страницы здесь нет!</h2>
        <p>Перейти на <Link href="/"><a>главную страницу</a></Link></p>
    </div>
);

export default Error