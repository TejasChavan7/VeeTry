const Product = require('../models/Product');
const isMatchingGender = require('../helpers/matchGender'); // Updated path

// Helper: pick best items by category
function pickBest(items) {
  return items.sort((a, b) => b.averageReview - a.averageReview)[0] || null;
}

exports.generateOutfit = async (req, res) => {
  try {
    const { gender, age, occupation, event } = req.body;
    console.log("Form values:", req.body);

    const all = await Product.find({});

    // Build search tags
    const tags = [gender, age, occupation, event].map(s => s.toLowerCase());

    // Filter products based on tags + gender
    const filtered = all.filter(p => {
      const meta = `${p.category} ${p.description} ${p.title} ${p.brand}`.toLowerCase();
      const matchesTag = tags.some(tag => meta.includes(tag));
      const matchesGender = isMatchingGender(p, gender);
      return matchesTag && matchesGender;
    });

    console.log("Filtered products:", filtered.length);

    // Group by category
    const byCategory = filtered.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || [];
      acc[p.category].push(p);
      return acc;
    }, {});

    // Pick best products per category
    const rawOutfit = {
      accessories: pickBest(byCategory['accessories'] || []),
      footwear: pickBest(byCategory['footwear'] || []),
      men: pickBest(byCategory['men'] || []),
      women: pickBest(byCategory['women'] || []),
    };

    // ✅ Only include non-null categories
    const outfit = Object.fromEntries(
      Object.entries(rawOutfit).filter(([_, value]) => value !== null)
    );

    res.json(outfit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};