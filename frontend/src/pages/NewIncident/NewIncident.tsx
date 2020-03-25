import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './NewIncident.style.css';

import LogoImg from '../../assets/logo.svg';

import api from '../../services/api';

const NewIncident = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);

    const history = useHistory();

    const ongId = localStorage.getItem('@BeTheHero:ongId');

    const handleNewIncident = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                },
            });

            history.push('/profile');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be the Hero" />

                    <h1>Create a new Incident</h1>
                    <p>
                        Describe more details from incident to find a hero to
                        solve this.
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Go back to Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Title Incident"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Value"
                        value={value}
                        onChange={e => setValue(Number(e.target.value))}
                    />

                    <button type="submit" className="button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewIncident;
