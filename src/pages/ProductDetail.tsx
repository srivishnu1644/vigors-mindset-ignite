
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { products } from "@/data/products";
import { useCartStore } from "@/hooks/useCartStore";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  
  const product = products.find(p => p.id === parseInt(id || '0'));
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/my-cart')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/my-cart')}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-7 h-7 text-orange-400" />
              {product.name}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <Card className="bg-black/60 border-purple-500/20 overflow-hidden">
              <CardContent className="p-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-96 object-contain bg-gray-800 rounded-lg" 
                />
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                {product.price}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  onClick={decrementQuantity}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold px-4">{quantity}</span>
                <Button
                  onClick={incrementQuantity}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
              onClick={() => addItem(product, quantity)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add {quantity} to Cart
            </Button>

            {/* Product Features */}
            <Card className="bg-black/60 border-purple-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Premium quality materials</li>
                  <li>✓ Fast shipping available</li>
                  <li>✓ 30-day return policy</li>
                  <li>✓ Customer support included</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
