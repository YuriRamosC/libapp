import { useRouter } from 'next/router';


export default function Funcionario() {
    const router = useRouter();
    console.log(router.query);

    return ( <div>Funcionario </div>);
}