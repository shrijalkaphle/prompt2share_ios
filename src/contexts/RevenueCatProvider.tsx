import { createContext, useContext, useEffect, useState } from 'react'
import { Platform } from 'react-native';
import Purchases, { CustomerInfo, LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';


const APIKeys = {
    ios: "appl_yswhEBvdHcXijQaHMdbJfqIUYNZ",
    android: ""
}
interface IRevenueCatProvider {
    purchasePackage?: (pack: PurchasesPackage) => Promise<any>;
    restorePermission?: () => Promise<CustomerInfo>
    user: UserState
    packages: PurchasesPackage[]
}

export interface UserState {
    cookies: number
    items: string[]
    pro: boolean
}

const RevenueCatContext = createContext<IRevenueCatProvider | null>(null);

export const useRevenueCat = () => {
    return useContext(RevenueCatContext) as IRevenueCatProvider;
}

export const RevenueCatProvider = ({children}: any) => {
    const [user, setUser] = useState<UserState>({cookies:0,items:[],pro:false})
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false)

    useEffect(() => {
        const init = async () => {
            if (Platform.OS === 'ios') {
                await Purchases.configure({ apiKey: APIKeys.ios })
            } else {
                await Purchases.configure({ apiKey: APIKeys.android })
            }
            setIsReady(true)
            Purchases.setLogLevel(LOG_LEVEL.DEBUG)
            await loadOfferings()
        }

        init()
    },[])

    const loadOfferings = async () => {
        const offerings = await Purchases.getOfferings()
        const currentOfferings = offerings.current
        if(currentOfferings) {
            setPackages(currentOfferings.availablePackages)
        }
    }

    const purchasePackage = async (pack: PurchasesPackage) => {
        try {
            const customerInfo = await Purchases.purchasePackage(pack)
            return {"status": true}
        } catch (error) {
            return {"status": false}
        }
    }

    const restorePermission = async () => {
        
    }

    const value = {
        packages: packages,
        user: user,
        purchasePackage: purchasePackage,
        restorePermission: undefined
    }

    return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>
}