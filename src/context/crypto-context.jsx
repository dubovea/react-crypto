import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchAssets, fakeFetchCrypto } from "../api";
import { percentDiff } from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    async function preload() {
      setLoading(true);
      let assets = await fakeFetchAssets();
      const { result } = await fakeFetchCrypto();

      assets = assets.map((asset) => {
        const coin = result.find((o) => o.id === asset.id),
          totalAmount = asset.amount * coin.price;
        return {
          grow: asset.price < coin.price,
          growPercent: percentDiff(asset.price, coin.price),
          totalAmount: totalAmount,
          totalProfit: totalAmount - asset.amount * asset.price,
          ...asset,
        };
      });
      setAssets(assets);
      setCrypto(result);
      setLoading(false);
    }

    preload();
  }, []);

  return (
    <CryptoContext.Provider value={{ assets, crypto, loading }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
