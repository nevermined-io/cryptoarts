import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Header.module.scss'

import menu from '../../data/menu'
import logo from '../../img/logo.svg'
import logoText from '../../img/logoText.svg'

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
                <NavLink to="/">
                    <div className={styles.headerContent}>
                        <div
                            className={styles.headerLogo}
                            style={{ background: `url(${logo})` }}
                        />

                        <div
                            className={styles.headerTitle}
                            style={{ background: `url(${logoText})`}}
                        />
                    </div>

                    <div className={styles.headerNav}>
                        <nav className={styles.headerMenu}>
                            {menu.map(item => (
                                <MenuItem key={item.title} item={item} />
                            ))}
                        </nav>
                        <AccountStatus className={styles.accountStatus} />

                    </div>
                </NavLink>
            </header>
        )
    }
}
