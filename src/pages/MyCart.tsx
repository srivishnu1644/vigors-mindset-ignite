
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Plus, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { products } from "@/data/products";
import { useCartStore } from "@/hooks/useCartStore";

const MyCart = () => {
  const navigate = useNavigate();
  const { addItem, getCartItemCount } = useCartStore();
  const cartItemCount = getCartItemCount();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-7 h-7 text-orange-400" />
              Accessories
            </h1>
          </div>
          <Button
            onClick={() => navigate('/billing')}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 relative"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Go to Billing
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="bg-black/60 border-purple-500/20 flex flex-col overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <CardHeader className="p-0">
                <img src={product.image} alt={product.name} className="h-40 w-full object-contain bg-gray-800" />
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{product.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(product);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyCart;
