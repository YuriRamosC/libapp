import { useRouter } from 'next/router';


export default function Livro() {
    const router = useRouter();
    console.log(router.query);

    return ( <div>Livros </div>);
}