import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import SearchBar from './SearchBar';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Caramel Frappuccino',
    price: 5.95,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&h=200',
    category: 'Frappuccino'
  },
  {
    id: '2',
    name: 'Caffè Latte',
    price: 4.95,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=200&h=200',
    category: 'Hot Coffee'
  },
  {
    id: '3',
    name: 'Iced Green Tea',
    price: 3.95,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=200&h=200',
    category: 'Iced Tea'
  },
  {
    id: '4',
    name: 'Cold Brew',
    price: 4.45,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=200&h=200',
    category: 'Cold Coffee'
  },
  {
    id: '5',
    name: 'Chocolate Muffin',
    price: 3.25,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=200&h=200',
    category: 'Bakery'
  },
  {
    id: '6',
    name: 'Chai Tea Latte',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=200&h=200',
    category: 'Hot Tea'
  },
  {
    id: '7',
    name: 'Espresso',
    price: 2.95,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=200&h=200',
    category: 'Hot Coffee'
  },
  {
    id: '8',
    name: 'Iced Coffee',
    price: 3.95,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=200&h=200',
    category: 'Cold Coffee'
  },
  {
    id: '9',
    name: 'Butter Croissant',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=200&h=200',
    category: 'Bakery'
  },
  {
    id: '10',
    name: 'Mocha Frappuccino',
    price: 5.95,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=200&h=200',
    category: 'Frappuccino'
  },
  {
    id: '11',
    name: 'Nitro Cold Brew',
    price: 4.95,
    image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?auto=format&fit=crop&w=200&h=200',
    category: 'Cold Coffee'
  },
  {
    id: '12',
    name: 'Blueberry Scone',
    price: 3.25,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=200&h=200',
    category: 'Bakery'
  }
];

// Rest of the component remains exactly the same
type ProductGridProps = {
  onProductSelect: (product: Product) => void;
};

const ProductGrid: React.FC<ProductGridProps> = ({ onProductSelect }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    image: '',
    category: ''
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) return;

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: Number(newProduct.price),
      image: newProduct.image || 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&h=200',
      category: newProduct.category
    };

    setProducts(prev => [...prev, product]);
    setNewProduct({ name: '', price: 0, image: '', category: '' });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-starbucks-green rounded-lg text-white hover:bg-starbucks-green-light transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`btn-category ${!selectedCategory ? 'active' : 'inactive'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`btn-category ${selectedCategory === category ? 'active' : 'inactive'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => onProductSelect(product)}
            className="product-card group"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 rounded-lg transition-colors" />
            </div>
            <h3 className="font-medium text-sm text-white/90">{product.name}</h3>
            <p className="text-starbucks-gold font-medium">${product.price.toFixed(2)}</p>
            <span className="text-xs text-white/60">{product.category}</span>
          </button>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-starbucks-green-dark p-6 rounded-xl shadow-xl max-w-md w-full border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Add New Product</h2>
              <button onClick={() => setShowAddForm(false)} className="text-white/60 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price || ''}
                  onChange={e => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-1">Category</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-1">Image URL (optional)</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={e => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-starbucks-green hover:bg-starbucks-green-light text-white py-2 rounded-lg transition-colors"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;