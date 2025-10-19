// server/promo-tracker.ts
export const getPromoSpotsLeft = async () => {
  // Connect to your database
  const used = await db.query('SELECT COUNT(*) FROM orders WHERE promo = "first25"');
  return 25 - used;
};
