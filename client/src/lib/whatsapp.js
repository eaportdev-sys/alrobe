export const SALES_WA = import.meta.env.VITE_WHATSAPP_SALES || '18767589163';

export const waLink = (msg) => `https://wa.me/${SALES_WA}?text=${encodeURIComponent(msg)}`;

export const cartToWhatsApp = (cart, total, customer={}) => {
  const lines = cart.map((i,n)=>`${n+1}. ${i.name} (${i.id}) x${i.qty} — $${(i.price*i.qty).toFixed(2)}`);
  const msg = `Hello ALROBE INTL! I want to order:%0A${lines.join('%0A')}%0A%0ATotal: $${total.toFixed(2)} USD%0AName: ${customer.name||''}%0APhone: ${customer.phone||''}%0APickup: Kingston Free Zone`;
  // build clean then encode properly
  const plain = `Hello ALROBE INTL! I want to order:\n${cart.map((i,n)=>`${n+1}. ${i.name} (${i.id}) x${i.qty} - $${(i.price*i.qty).toFixed(2)}`).join('\n')}\n\nTotal: $${total.toFixed(2)} USD\nName: ${customer.name||''}\nPhone: ${customer.phone||''}\nPickup: Kingston Free Zone`;
  return waLink(plain);
};

export const carToWhatsApp = (car) => waLink(`Hello ALROBE! I'm interested in ${car.title} (${car.id}) — $${car.price.toLocaleString()}. Is it still available?`);
