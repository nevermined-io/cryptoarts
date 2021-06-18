import React, { PureComponent, FormEvent } from 'react'
import { History } from 'history'
import { DDO } from '@nevermined-io/nevermined-sdk-js'

import { Market } from '../../context'
import Route from '../../components/templates/Route'
import styles from './index.module.scss'

import meta from '../../data/meta.json'
import withTracker from '../../hoc/withTracker'
import banner from '../../img/banner.svg'
import { ArtworksOrCategories } from '../../components/organisms/ArtworksOrCategories'
import ArtworkTeaser from '../../components/molecules/ArtworkTeaser'
import CircleButton from '../../components/atoms/CircleButton'
import { ShortArrowIcon, EyeIcon } from '../../components/icons'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
}

const testAsset = new DDO(JSON.parse("{\"@context\":\"https://w3id.org/did/v1\",\"id\":\"did:nv:a71af044ad64d219f207f1a6bcfaf15a79ce06b4a7f31f40303098e5e5f24e7b\",\"publicKey\":[{\"id\":\"did:nv:a71af044ad64d219f207f1a6bcfaf15a79ce06b4a7f31f40303098e5e5f24e7b\",\"type\":\"EthereumECDSAKey\",\"owner\":\"0xe2DD09d719Da89e5a3D0F2549c7E24566e947260\"}],\"authentication\":[{\"type\":\"RsaSignatureAuthentication2018\",\"publicKey\":\"did:nv:a71af044ad64d219f207f1a6bcfaf15a79ce06b4a7f31f40303098e5e5f24e7b\"}],\"service\":[{\"type\":\"metadata\",\"index\":0,\"serviceEndpoint\":\"http://172.17.0.1:5000/api/v1/metadata/assets/ddo/did:nv:a71af044ad64d219f207f1a6bcfaf15a79ce06b4a7f31f40303098e5e5f24e7b\",\"attributes\":{\"curation\":{\"rating\":0,\"numVotes\":0,\"isListed\":true},\"main\":{\"type\":\"dataset\",\"name\":\"Party Phone Anthem\",\"dateCreated\":\"2021-06-16T12:51:29Z\",\"author\":\"Robomonck\",\"license\":\"CC BY-SA: Attribution-ShareAlike 4.0 International\",\"price\":\"1200000000000000000\",\"files\":[{\"contentType\":\"image/jpeg\",\"contentLength\":\"1\",\"compression\":\"jpeg\",\"index\":0}],\"datePublished\":\"2021-06-16T12:52:57Z\"},\"additionalInformation\":{\"description\":\"r4rqww\",\"copyrightHolder\":\"Robomonck\",\"categories\":[\"Digital Collage\"]},\"encryptedFiles\":\"0x5276586b696836423864516f644e4a694264674a477a32615965676c58764d574338434539715250614d2b526273652b593454453577524a6b46357854433456396b305865766c4f48525a53664373584c314d754238437946314f6975304455357370777150686f63765254703377613352392b74586b34703648684d4b752f506647756262616c6b6641724f734e357054783552734778685a6e457a42703955696e456642685172366a312b554a514931616a767975507a68735a30715a6e334e416566326a58426f6b4e7a6d59566e4a71796b367542485348456a4a64484175773745557230736c506f507935325a335734344d4b775250357252474b57494777564d6e6d345333704d7a727052794e72753537694f49597439512f315969412f47666a376442454d776931644971634f6a6850345a3936513775762f4f617977304c6839665062306e395664726a79663473513d3d|0x2ba522580743b0170709afed594db4148d252be7e8d559969b436e498b80d2f094349bd598f3fb850df28262e6987bd20c1c8e8dbd7b9db5e391c5218227110034877fe9ff87189e59a9698da712115d7551685df71718ab7218ef0f29b5bdf03f6ca304d4f311f4983439816e30a049c06a6f2251aaf8cbac215a217de3b801\"}},{\"type\":\"authorization\",\"index\":2,\"serviceEndpoint\":\"http://localhost:8030\",\"attributes\":{\"main\":{\"publicKey\":\"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2qIisJyMd6YXJNzs23zKLajtPC7w6aO9mXq+Ukr6d3cVmPCx8XJRTT3IV7PmHb3o4XFc8ZGX5/SSg7tp5/cfAIg9XF13yjssJttaDTa4srhLJvxyjR8cHEJ39GevFTgrtbYzXTZ723ROJP4NEDxtp8a0f5l7W3NTH8v39k3G50QIDAQAB\",\"service\":\"PSK-RSA\",\"threshold\":0}}},{\"type\":\"nft-sales\",\"index\":6,\"serviceEndpoint\":\"http://localhost:8030/api/v1/gateway/services/nft\",\"templateId\":\"0x36fa66586327d3a83175c6e68d2cd0b4e373ed06\",\"attributes\":{\"main\":{\"name\":\"nftSalesAgreement\",\"creator\":\"0xe2DD09d719Da89e5a3D0F2549c7E24566e947260\",\"datePublished\":\"2021-06-16T12:52:57Z\",\"price\":\"1200000000000000000\",\"timeout\":86400},\"additionalInformation\":{\"description\":\"\"},\"serviceAgreementTemplate\":{\"contractName\":\"NFTSalesTemplate\",\"events\":[{\"name\":\"AgreementCreated\",\"actorType\":\"consumer\",\"handler\":{\"moduleName\":\"nftSalesTemplate\",\"functionName\":\"fulfillLockPaymentCondition\",\"version\":\"0.1\"}}],\"fulfillmentOrder\":[\"lockPayment.fulfill\",\"transferNFT.fulfill\",\"escrowPayment.fulfill\"],\"conditionDependency\":{\"lockPayment\":[],\"transferNFT\":[],\"escrowPayment\":[\"lockPayment\",\"transferNFT\"]},\"conditions\":[{\"name\":\"lockPayment\",\"timelock\":0,\"timeout\":0,\"contractName\":\"LockPaymentCondition\",\"functionName\":\"fulfill\",\"parameters\":[{\"name\":\"_did\",\"type\":\"bytes32\",\"value\":\"a71af044ad64d219f207f1a6bcfaf15a79ce06b4a7f31f40303098e5e5f24e7b\"},{\"name\":\"_rewardAddress\",\"type\":\"address\",\"value\":\"0xe2DD09d719Da89e5a3D0F2549c7E24566e947260\"},{\"name\":\"_tokenAddress\",\"type\":\"address\",\"value\":\"\"},{\"name\":\"_amounts\",\"type\":\"uint256[]\",\"value\":[\"1.2\"]},{\"name\":\"_receivers\",\"type\":\"address[]\",\"value\":[\"0xe2DD09d719Da89e5a3D0F2549c7E24566e947260\"]}],\"events\":[{\"name\":\"Fulfilled\",\"actorType\":\"publisher\",\"handler\":{\"moduleName\":\"lockPaymentCondition\",\"functionName\":\"fulfillTransferNFTCondition\",\"version\":\"0.1\"}}]},{\"name\":\"transferNFT\",\"timelock\":0,\"timeout\":0,\"contractName\":\"TransferNFTCondition\",\"functionName\":\"fulfill\",\"parameters\":[{\"name\":\"_documentId\",\"type\":\"bytes32\",\"value\":\"a71af044ad64d219f207f1a6bcfaf15a79ce06b4a7f31f40303098e5e5f24e7b\"},{\"name\":\"_receiver\",\"type\":\"address\",\"value\":\"\"},{\"name\":\"_numberNfts\",\"type\":\"uint256\",\"value\":\"1\"},{\"name\":\"_conditionId\",\"type\":\"bytes32\",\"value\":\"\"}],\"events\":[{\"name\":\"Fulfilled\",\"actorType\":\"publisher\",\"handler\":{\"moduleName\":\"transferNFT\",\"functionName\":\"fulfillEscrowPaymentCondition\",\"version\":\"0.1\"}},{\"name\":\"TimedOut\",\"actorType\":\"consumer\",\"handler\":{\"moduleName\":\"access\",\"functionName\":\"fulfillEscrowPaymentCondition\",\"version\":\"0.1\"}}]},{\"name\":\"escrowPayment\",\"timelock\":0,\"timeout\":0,\"contractName\":\"EscrowPaymentCondition\",\"functionName\":\"fulfill\",\"parameters\":[{\"name\":\"_did\",\"type\":\"bytes32\",\"value\":\"a71af044ad64d219f207f1a6bcfaf15a79ce06b4a7f31f40303098e5e5f24e7b\"},{\"name\":\"_amounts\",\"type\":\"uint256[]\",\"value\":[\"1.2\"]},{\"name\":\"_receivers\",\"type\":\"address[]\",\"value\":[\"0xe2DD09d719Da89e5a3D0F2549c7E24566e947260\"]},{\"name\":\"_sender\",\"type\":\"address\",\"value\":\"\"},{\"name\":\"_tokenAddress\",\"type\":\"address\",\"value\":\"\"},{\"name\":\"_lockCondition\",\"type\":\"bytes32\",\"value\":\"\"},{\"name\":\"_releaseCondition\",\"type\":\"bytes32\",\"value\":\"\"}],\"events\":[{\"name\":\"Fulfilled\",\"actorType\":\"publisher\",\"handler\":{\"moduleName\":\"escrowPaymentCondition\",\"functionName\":\"verifyRewardTokens\",\"version\":\"0.1\"}}]}]}}},{\"type\":\"nft-access\",\"index\":7,\"serviceEndpoint\":\"http://localhost:8030/api/v1/gateway/services/nft-access\",\"templateId\":\"0xfD5CDB5074E8BFf573E0f10ab72e7b4C4051aF35\",\"attributes\":{\"main\":{\"name\":\"nftAccessAgreement\",\"creator\":\"0xe2DD09d719Da89e5a3D0F2549c7E24566e947260\",\"datePublished\":\"2021-06-16T12:52:57Z\",\"price\":\"1200000000000000000\",\"timeout\":86400},\"additionalInformation\":{\"description\":\"\"},\"serviceAgreementTemplate\":{\"contractName\":\"NFTAccessTemplate\",\"events\":[{\"name\":\"AgreementCreated\",\"actorType\":\"consumer\",\"handler\":{\"moduleName\":\"nftAccessTemplate\",\"functionName\":\"fulfillNFTHolderCondition\",\"version\":\"0.1\"}}],\"fulfillmentOrder\":[\"nftHolder.fulfill\",\"nftAccess.fulfill\"],\"conditionDependency\":{\"nftHolder\":[],\"nftAccess\":[]},\"conditions\":[{\"name\":\"nftHolder\",\"timelock\":0,\"timeout\":0,\"contractName\":\"NFTHolderCondition\",\"functionName\":\"fulfill\",\"parameters\":[{\"name\":\"_did\",\"type\":\"bytes32\",\"value\":\"a71af044ad64d219f207f1a6bcfaf15a79ce06b4a7f31f40303098e5e5f24e7b\"},{\"name\":\"_holderAddress\",\"type\":\"address\",\"value\":\"\"},{\"name\":\"_numberNfts\",\"type\":\"uint256\",\"value\":\"1\"}],\"events\":[{\"name\":\"Fulfilled\",\"actorType\":\"publisher\",\"handler\":{\"moduleName\":\"nftHolderCondition\",\"functionName\":\"fulfillNFTHolderCondition\",\"version\":\"0.1\"}}]},{\"name\":\"nftAccess\",\"timelock\":0,\"timeout\":0,\"contractName\":\"NFTAccessCondition\",\"functionName\":\"fulfill\",\"parameters\":[{\"name\":\"_documentId\",\"type\":\"bytes32\",\"value\":\"a71af044ad64d219f207f1a6bcfaf15a79ce06b4a7f31f40303098e5e5f24e7b\"},{\"name\":\"_grantee\",\"type\":\"address\",\"value\":\"\"}],\"events\":[{\"name\":\"Fulfilled\",\"actorType\":\"publisher\",\"handler\":{\"moduleName\":\"nftAccess\",\"functionName\":\"fulfillNFTAccessCondition\",\"version\":\"0.1\"}},{\"name\":\"TimedOut\",\"actorType\":\"consumer\",\"handler\":{\"moduleName\":\"access\",\"functionName\":\"fulfillNFTAccessCondition\",\"version\":\"0.1\"}}]}]}}}],\"created\":\"2021-06-16T12:52:57Z\",\"proof\":{\"created\":\"2021-06-16T12:52:57Z\",\"creator\":\"0xe2DD09d719Da89e5a3D0F2549c7E24566e947260\",\"type\":\"DDOIntegritySignature\",\"signatureValue\":\"0x4dab18afa34e5943f1ff168603dac4686e85b2f4a16540c132bdb25ffd3884742072bbf2fa533becdb2ddc233dba7b143ca2a15dd5f46a0374518491c962adae1b\",\"checksum\":{\"0\":\"0xa49fe42b35a4abf6bf28fc6f4bb98e19803aebff92a2f234f92c81508c9fef8c\",\"2\":\"0x2adc1f0a81a9078825ed2b85a6a2dc3416c890500e1bbb07c21c458b4a4d7ae0\",\"6\":\"0x2532451eaeb20ad5ed3128ed212323d91c04c0e906ed6094815ba9026efda566\",\"7\":\"0xabe7c787fa774ec608153cbd0dd71e54a49633bcbcbf5df231cca2aeaf9e3609\"}}}"))

class Home extends PureComponent<HomeProps, HomeState> {
    public static contextType = Market

    public searchAssets = (
        search: string,
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        this.props.history.push(`/search?text=${search}`)
    }

    public render() {
        console.log(testAsset)
        return (
            <Route
                title={meta.title}
                description={meta.description}
                className={styles.home}
            >
                <div className={styles.topWrapper}>
                    <ArtworkTeaser className={styles.topImage} artwork={testAsset} />

                    <div className={styles.topMenu}>
                        <CircleButton><ShortArrowIcon left/></CircleButton>
                        <CircleButton primary large className={styles.topMenuMiddle}>
                            <EyeIcon size={38}/>
                        </CircleButton>
                        <CircleButton><ShortArrowIcon right/></CircleButton>
                    </div>
                </div>

                <ArtworksOrCategories searchAssets={this.searchAssets}/>
            </Route>
        )
    }
}

export default withTracker(Home)
