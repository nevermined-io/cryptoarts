import React, { PureComponent } from 'react'
import cx from 'classnames'
import styles from './CategoryImage.module.scss'

import digitalphoto from '../../img/categories/DigitalPhotography1.jpg'
import digitalcollage from '../../img/categories/DigitalCollage.jpg'
import fineart from '../../img/categories/FineArt.jpg'
import illustration from '../../img/categories/Illustration.jpg'
import digipainting from '../../img/categories/DigitalPainting.png'
import threedrenders from '../../img/categories/3DRenders.gif'
import arsounddesign from '../../img/categories/ARSoundDesign.gif'
import genart from '../../img/categories/GenerativeArt.gif'
import mixmedia from '../../img/categories/MixedMedia.gif'
import vrexp from '../../img/categories/VRExperiences.gif'
import fallback from '@oceanprotocol/art/jellyfish/jellyfish-back.svg'

const categoryImageFile = (category: string) => {
    switch (category) {
        case 'Digital Photography':
        case 'digitalphoto':
            return digitalphoto
        case 'Digital Collage':
        case 'digitalcollage':
            return digitalcollage
        case 'Fine Art':
        case 'fineart':
            return fineart
        case 'Illustration':
        case 'illustration':
            return illustration
        case 'Digital Painting':
        case 'digipainting':
            return digipainting
        case '3D Renders':
        case 'threedrenders':
            return threedrenders
        case 'AR':
        case 'ar':
            return arsounddesign
        case 'Sound Design':
        case 'sounddesign':
            return arsounddesign
        case 'Generative Art':
        case 'genart':
            return genart
        case 'Mixed Media':
        case 'mixmedia':
            return mixmedia
        case 'VR Experience':
        case 'vrexp':
            return vrexp
        default:
            return fallback
    }
}

export default class CategoryImage extends PureComponent<{
    category: string
    header?: boolean
    dimmed?: boolean
}> {
    public render() {
        const image = categoryImageFile(this.props.category)
        const classNames = cx(styles.categoryImage, {
            [styles.header]: this.props.header,
            [styles.dimmed]: this.props.dimmed
        })

        return (
            <div
                className={classNames}
                style={{ backgroundImage: `url(${image})` }}
            />
        )
    }
}
