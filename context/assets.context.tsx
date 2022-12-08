import React, { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../services/firestore.service"

type AssetsContext = {
  assets: Map<string, string>
}

const AssetsContext = React.createContext<AssetsContext>({
  assets: new Map(),
})

export default function AssetProvider({ children }: { children: any }) {
  const [assets, setAssets] = useState(new Map())

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "assetUrls"), orderBy("name")), (querySnapshot) => {
      const tempAssets = new Map()
      querySnapshot.forEach((doc) => {
        const asset = doc.data()
        tempAssets.set(asset.name, asset.url)
      })
      setAssets(tempAssets)
    })
    return () => {
      unsub()
    }
  }, [])

  return (
    <AssetsContext.Provider
      value={{
        assets,
      }}
    >
      {children}
    </AssetsContext.Provider>
  )
}

export const useAssets = () => {
  const context = React.useContext(AssetsContext)
  if (context === undefined) {
    throw new Error("useAssets must be used inside a AssetProvider")
  }
  return context
}
