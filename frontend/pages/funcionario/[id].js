import { useRouter } from 'next/router';


export default function FuncionarioPage() {
    return (
        <FuncionarioHome 
        funcionario={dbExterno.usuario}
        />
    )
}

export async function getServerSideProps(context) {
    const nodezada = context
}