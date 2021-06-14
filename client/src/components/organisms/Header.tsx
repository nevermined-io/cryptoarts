import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import AccountStatus from '../molecules/AccountStatus'
import CircleButton from '../atoms/CircleButton'
import { EditIcon, AccountConnectedIcon, MenuIcon } from '../icons'
import styles from './Header.module.scss'

import menu from '../../data/menu'
import logo from '../../img/logo.svg'

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
                    <img src={logo} />
                </NavLink>

                <CircleButton className={styles.publishButton} to="/publish"><EditIcon /></CircleButton>

                <div className={styles.accountWrapper}>
                    <CircleButton secondary><AccountConnectedIcon /></CircleButton>
                </div>
                <CircleButton><MenuIcon /></CircleButton>


{/*
                <div className={styles.headerNav}>
                    <nav className={styles.headerMenu}>
                        {menu.map(item => (
                            <MenuItem key={item.title} item={item} />
                        ))}
                    </nav>
                    <AccountStatus className={styles.accountStatus} />

                </div>*/}
            </header>
        )
    }
}
