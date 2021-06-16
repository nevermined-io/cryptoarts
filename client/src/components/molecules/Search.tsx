import React, { ChangeEvent, FormEvent, PureComponent } from 'react'
import styles from './Search.module.scss'
import Button from '../atoms/Button'
import Form from '../atoms/Form/Form'
import Input from '../atoms/Form/Input'
import { SearchIcon } from '../icons'

interface SearchProps {
    searchAssets: any
}

interface SearchState {
    search: string
}

export default class Search extends PureComponent<SearchProps, SearchState> {
    public state = {
        search: ''
    }

    private inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.target.value
        })
    }

    public render() {
        const { search } = this.state

        return (
            <Form
                onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    this.props.searchAssets(search, e)
                }
                minimal
            >
                <Input
                    type="search"
                    name="search"
                    label="Search for data sets"
                    className={styles.inputLimit}
                    placeholder="Search"
                    value={search}
                    onChange={this.inputChange}
                    group={
                        <Button className={styles.searchButton} disabled={!search}>
                            <SearchIcon size={30} />
                        </Button>
                    }
                />
            </Form>
        )
    }
}
