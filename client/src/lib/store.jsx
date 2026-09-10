import { createContext, useContext, useState, useMemo } from 'react';
const Store = createContext();
export const StoreProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const add = (item) => setCart(c => {
    const f = c.find(x=>x.id===item.id);
    if(f) return c.map(x=>x.id===item.id?{...x, qty:x.qty+1}:x);
    return [...c, {...item, qty:1}];
  });
  const remove = (id) => setCart(c=>c.filter(x=>x.id!==id));
  const setQty = (id, qty) => setCart(c=>c.map(x=>x.id===id?{...x, qty:Math.max(1,qty)}:x));
  const clear = () => setCart([]);
  const total = useMemo(()=>cart.reduce((s,x)=>s+x.price*x.qty,0),[cart]);
  return <Store.Provider value={{cart, add, remove, setQty, clear, total, count:cart.reduce((s,x)=>s+x.qty,0)}}>{children}</Store.Provider>
};
export const useStore = () => useContext(Store);
