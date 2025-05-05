import React from 'react';
import UserNav from '../Component/UserNav';
import './userHealth.css';
import UserMainNav from '../Component/UserMainNav';
import { useTranslation } from 'react-i18next';

const UserHealth = () => {

    const { t } = useTranslation();

    return (
        <div className='mainUser'>
            <UserNav />
            <UserMainNav />
            <div className='health-card'>
                <div className='health-main'>
                <h3 className='question'>{t('who')}</h3>
                <p>
                    {t('who_des')}
                </p>
                <h3 className='question'>{t('criteria')}</h3>
                <ul>
                    <li>{t('c1')}</li>
                    <li>{t('c2')}</li>
                    <li>{t('c3')}</li>
                    <li>{t('c4')}</li>
                    <li>{t('c5')}</li>
                    <li>{t('c6')}</li>
                </ul>

                <h3 className='question'>{t('risk')}</h3>
                <ul>
                    <li>{t('r1')}</li>
                    <li>{t('r2')}</li>
                    <li>{t('r3')}</li>
                    <li>{t('r4')}</li>
                    <li>{t('r5')}</li>
                </ul>
                
                <h3 className='question'>{t('type_donors')}</h3>
                <ul>
                    <li>{t('t1')}</li>
                    <li>{t('t2')}</li>
                    <li>{t('t3')}</li>
                    <li>{t('t4')}</li>
                </ul>
                </div>
            </div>
        </div>
    );
}

export default UserHealth;
