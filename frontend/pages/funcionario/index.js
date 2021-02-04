import React, { useState } from 'react';
import { useRouter } from 'next/router';


export default function FuncionarioHome() {
    const router = useRouter();
    console.log(router.query);
    const [name, setName] = React.useState();

    return ( <div>Funcionario {name} </div>);
}