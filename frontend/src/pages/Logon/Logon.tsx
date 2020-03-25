import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './Logon.style.css';

import Logo from '../../assets/logo.svg';
import HerosImg from '../../assets/heroes.png';

import api from '../../services/api';

const Logon = () => {
    const [id, setId] = useState('');
    const history = useHistory();

    const handleLogon = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await api.post('/login', { id });
            localStorage.setItem('@BeTheHero:ongId', id);
            localStorage.setItem('@BeTheHero:ongName', response.data.name);
            history.push('/profile');
        } catch (err) {}
    };

    return (
        <div className="logon-container">
            <section className="form">
                <img src={Logo} alt="Be the Hero" />

                <form onSubmit={handleLogon}>
                    <h1>Do your Logon</h1>

                    <input
                        type="text"
                        placeholder="Your ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">
                        Logon
                    </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Do not have register?
                    </Link>
                </form>
            </section>

            <img src={HerosImg} alt="Heros" />
        </div>
    );
};

export default Logon;
