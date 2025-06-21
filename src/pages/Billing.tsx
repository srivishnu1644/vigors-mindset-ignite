
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from "@/hooks/useCartStore";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const Billing = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, removeItem, updateQuantity, clearCart } = useCartStore();
  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8">Add some products from accessories to get started.</p>
        <Button onClick={() => navigate('/my-cart')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Accessories
        </Button>
      </div>
    );
  }

  const parsePrice = (price: string): number => {
    return parseFloat(price.replace('INR', '').trim());
  }

  const handlePayment = () => {
    toast.success("Payment successful! Thank you for your order.");
    clearCart();
    navigate('/my-cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => navigate('/my-cart')}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Accessories
          </Button>
          <h1 className="text-2xl font-bold">Billing Details</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-black/60 border-purple-500/20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-white">Product</TableHead>
                    <TableHead className="text-white">Quantity</TableHead>
                    <TableHead className="text-white">Unit Price</TableHead>
                    <TableHead className="text-right text-white">Total</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map(item => (
                    <TableRow key={item.id} className="border-gray-800">
                      <TableCell className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-md bg-gray-800" />
                        <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="text-sm text-gray-400 max-w-xs truncate">{item.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell className="text-right">INR { (parsePrice(item.price) * item.quantity).toFixed(2) }</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4 text-red-500"/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-black/60 border-purple-500/20">
            <CardHeader>
              <CardTitle>Billing & Shipping Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <Input id="name" placeholder="John Doe" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Shipping Address</label>
                  <Textarea id="address" placeholder="123 Victory Rd" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div className="flex gap-4">
                    <Input placeholder="City" className="bg-gray-800 border-gray-700 text-white" />
                    <Input placeholder="State" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div className="flex gap-4">
                    <Input placeholder="ZIP Code" className="bg-gray-800 border-gray-700 text-white" />
                    <Input placeholder="Country" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                    <label htmlFor="card" className="block text-sm font-medium text-gray-300 mb-1">Card Details</label>
                    <Input id="card" placeholder="Card Number" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div className="flex gap-4">
                    <Input placeholder="MM/YY" className="bg-gray-800 border-gray-700 text-white" />
                    <Input placeholder="CVC" className="bg-gray-800 border-gray-700 text-white" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4">
                <div className="w-full flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span>INR {total.toFixed(2)}</span>
                </div>
                <div className="w-full flex justify-between text-lg">
                    <span>Taxes (18%)</span>
                    <span>INR {(total * 0.18).toFixed(2)}</span>
                </div>
                <div className="w-full flex justify-between font-bold text-xl text-purple-400 pt-2 border-t border-gray-700">
                    <span>Total</span>
                    <span>INR {(total * 1.18).toFixed(2)}</span>
                </div>
                <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6 mt-4"
                    onClick={handlePayment}
                >
                    Pay Now
                </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Billing;
