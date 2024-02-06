import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchAssets, fakeFetchCrypto } from "../api";
import { percentDiff } from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

const mapAssets = ({ assets, result }) => {
  return assets.map((asset) => {
    const coin = result.find((o) => o.id === asset.id),
      totalAmount = asset.amount * coin.price;
    return {
      grow: asset.price < coin.price,
      growPercent: percentDiff(asset.price, coin.price),
      totalAmount: totalAmount,
      totalProfit: totalAmount - asset.amount * asset.price,
      name: coin.name,
      ...asset,
    };
  });
};

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    async function preload() {
      setLoading(true);
      let assets = await fakeFetchAssets();
      const { result } = await fakeFetchCrypto();
      setAssets(mapAssets({ assets: assets, result: result }));
      setCrypto(result);
      setLoading(false);
    }

    preload();
  }, []);

  function addAsset(asset) {
    setAssets((prev) =>
      mapAssets({ assets: [...prev, asset], result: crypto })
    );
  }

  return (
    <CryptoContext.Provider value={{ assets, crypto, loading, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
