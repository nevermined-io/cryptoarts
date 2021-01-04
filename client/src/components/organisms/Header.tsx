import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Header.module.scss'

import menu from '../../data/menu'
import meta from '../../data/meta.json'

const MenuItem = ({ item }: { item: any }) => (
    <NavLink
        to={item.link}
        className={styles.link}
        activeClassName={styles.linkActive}
        exact
    >
        {item.title}
    </NavLink>
)

export default class Header extends PureComponent {
    public render() {
        return (
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <NavLink to="/" className={styles.headerLogo}>
                        <svg className={styles.headerLogoImage} width="550" height="191" viewBox="0 0 550 191" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M184.343 203.548L0 37.131V-131L184.315 35.391V-131L368.657 35.417L549.586 -131V37.131L368.657 203.548L184.343 37.157V203.548Z" fill="url(#paint0_linear)"/>
                            <defs>
                                <linearGradient id="paint0_linear" x1="0" y1="-131" x2="560.817" y2="-110.973" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#7834f9"/>
                                    <stop offset="1" stopColor="#67cff9"/>
                                </linearGradient>
                            </defs>
                        </svg>


                        <h1 className={styles.headerTitle}>{meta.title}</h1>
                    </NavLink>

                    <nav className={styles.headerMenu}>
                        {menu.map(item => (
                            <MenuItem key={item.title} item={item} />
                        ))}
                        <AccountStatus className={styles.accountStatus} />
                    </nav>
                </div>
            </header>
        )
    }
}
