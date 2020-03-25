import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './Profile.style.css';

import LogoImg from '../../assets/logo.svg';

import api from '../../services/api';

import { Incident } from '../../models/models';

const Profile = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);

    const history = useHistory();

    const ongName = localStorage.getItem('@BeTheHero:ongName');
    const ongId = localStorage.getItem('@BeTheHero:ongId');

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId,
            },
        }).then(response => setIncidents(response.data));
    }, [ongId]);

    const handleDeleteIncident = async (id: number) => {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                },
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    };

    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Be the Hero" />
                <span>Welcome, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Create new Incident
                </Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Incidents registered</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE:</strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(incident.value)}
                        </p>

                        <button
                            onClick={() => handleDeleteIncident(incident.id)}
                        >
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
